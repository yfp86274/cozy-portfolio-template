/**
 * Theme Utility
 *
 * Converts hex colors from site.config.json to CSS variables
 * and injects them into the document at runtime.
 *
 * Now supports Theme Presets for different visual styles.
 */

import {getPreset} from './presets'

/**
 * Convert a hex color to RGB values
 * @param {string} hex - Hex color code (e.g., '#8B4513' or '8B4513')
 * @returns {string} RGB values as space-separated string (e.g., '139 69 19')
 */
export function hexToRgb(hex) {
    // Remove # if present
    const cleanHex = hex.replace('#', '')

    // Parse hex values
    const r = parseInt(cleanHex.substring(0, 2), 16)
    const g = parseInt(cleanHex.substring(2, 4), 16)
    const b = parseInt(cleanHex.substring(4, 6), 16)

    // Return as space-separated string for Tailwind CSS
    return `${r} ${g} ${b}`
}

/**
 * Convert a hex color to HSL values for generating shades
 * @param {string} hex - Hex color code
 * @returns {object} HSL values { h, s, l }
 */
export function hexToHsl(hex) {
    const cleanHex = hex.replace('#', '')
    let r = parseInt(cleanHex.substring(0, 2), 16) / 255
    let g = parseInt(cleanHex.substring(2, 4), 16) / 255
    let b = parseInt(cleanHex.substring(4, 6), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
        h = s = 0
    } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break
            case g:
                h = ((b - r) / d + 2) / 6;
                break
            case b:
                h = ((r - g) / d + 4) / 6;
                break
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    }
}

/**
 * Generate a lighter shade of a color
 * @param {string} hex - Base hex color
 * @param {number} amount - Amount to lighten (0-100)
 * @returns {string} RGB string for the lighter color
 */
export function lighten(hex, amount) {
    const hsl = hexToHsl(hex)
    const newL = Math.min(100, hsl.l + amount)
    return hslToRgbString(hsl.h, hsl.s, newL)
}

/**
 * Generate a darker shade of a color
 * @param {string} hex - Base hex color
 * @param {number} amount - Amount to darken (0-100)
 * @returns {string} RGB string for the darker color
 */
export function darken(hex, amount) {
    const hsl = hexToHsl(hex)
    const newL = Math.max(0, hsl.l - amount)
    return hslToRgbString(hsl.h, hsl.s, newL)
}

/**
 * Convert HSL to RGB string
 */
function hslToRgbString(h, s, l) {
    s /= 100
    l /= 100
    const a = s * Math.min(l, 1 - l)
    const f = n => {
        const k = (n + h / 30) % 12
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return Math.round(255 * color)
    }
    return `${f(0)} ${f(8)} ${f(4)}`
}

/**
 * Generate Google Fonts URL for specified fonts
 * @param {string[]} fonts - Array of font names
 * @returns {string} Google Fonts URL
 */
export function getGoogleFontsUrl(fonts) {
    const uniqueFonts = [...new Set(fonts.filter(Boolean))]
    const fontParams = uniqueFonts.map(font => {
        const formatted = font.replace(/\s+/g, '+')
        return `family=${formatted}:wght@300;400;500;600;700`
    }).join('&')

    return `https://fonts.googleapis.com/css2?${fontParams}&display=swap`
}

/**
 * Load Google Fonts dynamically
 * @param {string[]} fonts - Array of font names to load
 */
export function loadGoogleFonts(fonts) {
    const url = getGoogleFontsUrl(fonts)

    // Check if font is already loaded
    const existingLink = document.querySelector(`link[href*="fonts.googleapis.com"]`)
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
 * Initialize theme from configuration
 * Injects CSS variables into :root
 * @param {object} config - The site.config.json default export
 */
export function initializeTheme(config) {
    const {theme, profile, ui, seo} = config
    const root = document.documentElement

    // ═══════════════════════════════════════════════════════════════════════════
    // STEP 1: Apply Theme Preset (Layout variables)
    // ═══════════════════════════════════════════════════════════════════════════
    const presetName = ui?.themePreset || 'default'
    const preset = getPreset(presetName)

    // Apply all preset CSS variables
    Object.entries(preset).forEach(([key, value]) => {
        // Skip non-CSS properties (name, label)
        if (key.startsWith('--')) {
            root.style.setProperty(key, value)
        }
    })

    // Add preset name as data attribute for CSS targeting
    root.dataset.preset = presetName

    console.log('🎨 Preset applied:', presetName)

    // ═══════════════════════════════════════════════════════════════════════════
    // STEP 2: Apply User Colors (Override preset colors)
    // ═══════════════════════════════════════════════════════════════════════════
    // Set color CSS variables (as RGB values for Tailwind alpha support)
    root.style.setProperty('--color-primary', hexToRgb(theme.primaryColor))
    root.style.setProperty('--color-secondary', hexToRgb(theme.secondaryColor))
    root.style.setProperty('--color-background', hexToRgb(theme.backgroundColor))
    root.style.setProperty('--color-text', hexToRgb(theme.textColor))
    root.style.setProperty('--color-muted', hexToRgb(theme.mutedColor))

    // Generate color shades for hover states, etc.
    root.style.setProperty('--color-primary-light', lighten(theme.primaryColor, 15))
    root.style.setProperty('--color-primary-dark', darken(theme.primaryColor, 10))
    root.style.setProperty('--color-secondary-light', lighten(theme.secondaryColor, 15))
    root.style.setProperty('--color-background-alt', darken(theme.backgroundColor, 3))

    // ═══════════════════════════════════════════════════════════════════════════
    // STEP 3: Apply Typography
    // ═══════════════════════════════════════════════════════════════════════════
    // Set font family CSS variables
    root.style.setProperty('--font-body', `'${theme.fontFamily}', sans-serif`)
    root.style.setProperty('--font-heading', `'${theme.headingFont || theme.fontFamily}', serif`)

    // Load Google Fonts
    const fontsToLoad = [theme.fontFamily]
    if (theme.headingFont && theme.headingFont !== theme.fontFamily) {
        fontsToLoad.push(theme.headingFont)
    }
    loadGoogleFonts(fontsToLoad)

    // ═══════════════════════════════════════════════════════════════════════════
    // STEP 4: Apply SEO Meta Tags
    // ═══════════════════════════════════════════════════════════════════════════
    // Set page title from SEO config
    if (seo?.siteTitle) {
        document.title = seo.siteTitle
    }

    // Set meta description
    if (seo?.siteDescription) {
        let metaDesc = document.querySelector('meta[name="description"]')
        if (!metaDesc) {
            metaDesc = document.createElement('meta')
            metaDesc.name = 'description'
            document.head.appendChild(metaDesc)
        }
        metaDesc.content = seo.siteDescription
    }

    console.log('🎨 Theme initialized:', {
        preset: presetName,
        primary: theme.primaryColor,
        font: theme.fontFamily
    })
}

/**
 * Placeholder image generator
 * Returns a data URL for a colored placeholder
 * @param {string} color - Hex color for the placeholder
 * @param {number} width - Width of placeholder
 * @param {number} height - Height of placeholder
 * @returns {string} Data URL for placeholder image
 */
export function getPlaceholderImage(color = '#f5f5f5', width = 400, height = 300) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    // Fill with color
    ctx.fillStyle = color
    ctx.fillRect(0, 0, width, height)

    // Add subtle pattern
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
    getPlaceholderImage
}
