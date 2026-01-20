/**
 * Theme Utility
 *
 * 將 site.config.json 中的顏色轉換為 CSS 變數，
 * 並在執行時注入到文件中。
 *
 * 現在支援：
 * - Theme Presets（視覺風格預設）
 * - Profession Map（職業映射系統）
 */

import {getPreset} from './presets'
import {getProfessionConfig} from './professionMap'

/**
 * 將 hex 顏色轉換為 RGB 值
 * @param {string} hex - Hex 色碼（例如 '#8B4513' 或 '8B4513'）
 * @returns {string} 空格分隔的 RGB 值（例如 '139 69 19'）
 */
export function hexToRgb(hex) {
    // 移除 # 符號
    const cleanHex = hex.replace('#', '')

    // 解析 hex 值
    const r = parseInt(cleanHex.substring(0, 2), 16)
    const g = parseInt(cleanHex.substring(2, 4), 16)
    const b = parseInt(cleanHex.substring(4, 6), 16)

    // 返回空格分隔的字串（供 Tailwind CSS 使用）
    return `${r} ${g} ${b}`
}

/**
 * 將 hex 顏色轉換為 HSL 值（用於生成色階）
 * @param {string} hex - Hex 色碼
 * @returns {object} HSL 值 { h, s, l }
 */
export function hexToHsl(hex) {
    const cleanHex = hex.replace('#', '')
    let r = parseInt(cleanHex.substring(0, 2), 16) / 255
    let g = parseInt(cleanHex.substring(2, 4), 16) / 255
    let b = parseInt(cleanHex.substring(4, 6), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h,
        s,
        l = (max + min) / 2

    if (max === min) {
        h = s = 0
    } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6
                break
            case g:
                h = ((b - r) / d + 2) / 6
                break
            case b:
                h = ((r - g) / d + 4) / 6
                break
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    }
}

/**
 * 產生較亮的顏色
 * @param {string} hex - 基礎 hex 色碼
 * @param {number} amount - 亮化程度 (0-100)
 * @returns {string} 較亮顏色的 RGB 字串
 */
export function lighten(hex, amount) {
    const hsl = hexToHsl(hex)
    const newL = Math.min(100, hsl.l + amount)
    return hslToRgbString(hsl.h, hsl.s, newL)
}

/**
 * 產生較暗的顏色
 * @param {string} hex - 基礎 hex 色碼
 * @param {number} amount - 暗化程度 (0-100)
 * @returns {string} 較暗顏色的 RGB 字串
 */
export function darken(hex, amount) {
    const hsl = hexToHsl(hex)
    const newL = Math.max(0, hsl.l - amount)
    return hslToRgbString(hsl.h, hsl.s, newL)
}

/**
 * HSL 轉 RGB 字串
 */
function hslToRgbString(h, s, l) {
    s /= 100
    l /= 100
    const a = s * Math.min(l, 1 - l)
    const f = (n) => {
        const k = (n + h / 30) % 12
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return Math.round(255 * color)
    }
    return `${f(0)} ${f(8)} ${f(4)}`
}

/**
 * 產生 Google Fonts URL
 * @param {string[]} fonts - 字體名稱陣列
 * @returns {string} Google Fonts URL
 */
export function getGoogleFontsUrl(fonts) {
    const uniqueFonts = [...new Set(fonts.filter(Boolean))]
    const fontParams = uniqueFonts
        .map((font) => {
            const formatted = font.replace(/\s+/g, '+')
            return `family=${formatted}:wght@300;400;500;600;700`
        })
        .join('&')

    return `https://fonts.googleapis.com/css2?${fontParams}&display=swap`
}

/**
 * 動態載入 Google Fonts
 * @param {string[]} fonts - 要載入的字體名稱陣列
 */
export function loadGoogleFonts(fonts) {
    const url = getGoogleFontsUrl(fonts)

    // 檢查字體是否已載入
    const existingLink = document.querySelector(
        `link[href*="fonts.googleapis.com"]`
    )
    if (existingLink) {
        existingLink.href = url
    } else {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = url
        document.head.appendChild(link)
    }
}

/**
 * 從配置初始化主題
 * 將 CSS 變數注入到 :root
 *
 * @param {object} config - site.config.json 的內容（可能已經與職業預設合併）
 */
export function initializeTheme(config) {
    const {theme, profile, ui, seo} = config
    const root = document.documentElement

    // 檢查是否有職業設定
    const profession = profile?.profession
    const professionConfig = profession ? getProfessionConfig(profession) : null

    // ═══════════════════════════════════════════════════════════════════════════
    // STEP 1: 套用 Theme Preset（佈局變數）
    // ═══════════════════════════════════════════════════════════════════════════
    const presetName = ui?.themePreset || professionConfig?.preset || 'default'
    const preset = getPreset(presetName)

    // 套用所有 preset CSS 變數
    Object.entries(preset).forEach(([key, value]) => {
        // 跳過非 CSS 屬性（name, label 等）
        if (key.startsWith('--')) {
            root.style.setProperty(key, value)
        }
    })

    // 將 preset 名稱設為 data 屬性（供 CSS 選擇器使用）
    root.dataset.preset = presetName

    // 如果有職業，也加上職業標記
    if (profession) {
        root.dataset.profession = profession
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // STEP 2: 套用用戶顏色（覆蓋 preset 顏色）
    // ═══════════════════════════════════════════════════════════════════════════
    // 設定顏色 CSS 變數（RGB 格式，支援 Tailwind alpha）
    root.style.setProperty('--color-primary', hexToRgb(theme.primaryColor))
    root.style.setProperty('--color-secondary', hexToRgb(theme.secondaryColor))
    root.style.setProperty('--color-background', hexToRgb(theme.backgroundColor))
    root.style.setProperty('--color-text', hexToRgb(theme.textColor))
    root.style.setProperty('--color-muted', hexToRgb(theme.mutedColor))

    // 產生顏色變體（用於 hover 狀態等）
    root.style.setProperty('--color-primary-light', lighten(theme.primaryColor, 15))
    root.style.setProperty('--color-primary-dark', darken(theme.primaryColor, 10))
    root.style.setProperty(
        '--color-secondary-light',
        lighten(theme.secondaryColor, 15)
    )
    root.style.setProperty(
        '--color-background-alt',
        darken(theme.backgroundColor, 3)
    )

    // ═══════════════════════════════════════════════════════════════════════════
    // STEP 3: 套用字體
    // ═══════════════════════════════════════════════════════════════════════════
    // 設定字體 CSS 變數
    root.style.setProperty('--font-body', `'${theme.fontFamily}', sans-serif`)
    root.style.setProperty(
        '--font-heading',
        `'${theme.headingFont || theme.fontFamily}', serif`
    )

    // 載入 Google Fonts
    const fontsToLoad = [theme.fontFamily]
    if (theme.headingFont && theme.headingFont !== theme.fontFamily) {
        fontsToLoad.push(theme.headingFont)
    }
    loadGoogleFonts(fontsToLoad)

    // ═══════════════════════════════════════════════════════════════════════════
    // STEP 4: 套用 SEO Meta Tags
    // ═══════════════════════════════════════════════════════════════════════════
    // 設定頁面標題
    if (seo?.siteTitle) {
        document.title = seo.siteTitle
    }

    // 設定 meta description
    if (seo?.siteDescription) {
        let metaDesc = document.querySelector('meta[name="description"]')
        if (!metaDesc) {
            metaDesc = document.createElement('meta')
            metaDesc.name = 'description'
            document.head.appendChild(metaDesc)
        }
        metaDesc.content = seo.siteDescription
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 調試資訊
    // ═══════════════════════════════════════════════════════════════════════════
    console.log('🎨 Theme initialized:', {
        preset: presetName,
        profession: profession || 'none',
        primary: theme.primaryColor,
        font: theme.fontFamily,
    })
}

/**
 * 佔位圖產生器
 * 返回一個帶顏色的佔位圖 data URL
 *
 * @param {string} color - 佔位圖的 hex 顏色
 * @param {number} width - 寬度
 * @param {number} height - 高度
 * @returns {string} 佔位圖的 Data URL
 */
export function getPlaceholderImage(color = '#f5f5f5', width = 400, height = 300) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    // 填充顏色
    ctx.fillStyle = color
    ctx.fillRect(0, 0, width, height)

    // 加入細微紋理
    ctx.fillStyle = 'rgba(0,0,0,0.03)'
    for (let i = 0; i < width; i += 20) {
        for (let j = 0; j < height; j += 20) {
            if ((i + j) % 40 === 0) {
                ctx.fillRect(i, j, 10, 10)
            }
        }
    }

    return canvas.toDataURL('image/png')
}

export default {
    hexToRgb,
    hexToHsl,
    lighten,
    darken,
    loadGoogleFonts,
    initializeTheme,
    getPlaceholderImage,
}
