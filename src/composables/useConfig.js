/**
 * 🛡️ Configuration Composable - 極簡化版本 v3.0
 *
 * 設計理念：用戶只需要填寫「個人資料」和「職業」，
 * 系統會根據職業自動套用最適合的：
 * - 配色方案 (colors)
 * - 字體組合 (fonts)
 * - UI 佈局 (layout, heroStyle, gridColumns)
 * - 風格細節 (borderRadius, animationSpeed)
 * - 情感化文案 (copywriting)
 *
 * ✨ 極簡原則：
 * 1. site.config.json 只需要 profile + seo
 * 2. 所有 UI 細節由 profession 自動決定
 * 3. 即使 JSON 格式錯誤也不會白屏
 * 4. 開發環境下會顯示友善的小助手提示
 */

import {computed, reactive, readonly, ref} from 'vue'
import siteConfigRaw from '@/../site.config.json'
import {
    DEFAULT_COPYWRITING,
    DEFAULT_UI_CONFIG,
    getAnimationDuration,
    getBorderRadiusValue,
    getProfessionConfig,
    getThumbnailAspectRatio,
} from '@/utils/professionMap'

// ═══════════════════════════════════════════════════════════════════════════
// 🛡️ 系統預設值（終極回退）
// ═══════════════════════════════════════════════════════════════════════════

/** 預設字體 */
const DEFAULT_FONTS = {
    body: 'Inter',
    heading: 'Inter',
}

/** 預設顏色 */
const DEFAULT_COLORS = {
    primaryColor: '#6B4423',
    secondaryColor: '#8B6914',
    backgroundColor: '#FFFBF5',
    textColor: '#2D2D2D',
    mutedColor: '#6B6B6B',
}

/** 預設佈局 */
const DEFAULT_LAYOUT = ['Hero', 'Works', 'OtherWorks']

/** 系統預設設定 - 當一切都失敗時使用 */
const SYSTEM_DEFAULTS = {
    profile: {
        name: '我的作品集',
        role: '創作者',
        email: '',
        bio: '歡迎來到我的作品集網站！',
        avatar: '/images/avatar.jpg',
        profession: '',
        social: {
            instagram: '',
            twitter: '',
            pinterest: '',
            linkedin: '',
            youtube: '',
            tiktok: '',
            behance: '',
            dribbble: '',
            etsy: '',
        },
    },
    theme: {
        ...DEFAULT_COLORS,
        fontFamily: DEFAULT_FONTS.body,
        headingFont: DEFAULT_FONTS.heading,
    },
    ui: {
        themePreset: 'default',
        heroStyle: 'split',
        showFooter: true,
        showSocialLinks: true,
        showOtherWorks: true,
        navStyle: 'default',
        gridColumns: 3,
        thumbnailRatio: '4/3',
        smoothScroll: true,
        showBackToTop: true,
        layout: DEFAULT_LAYOUT,
    },
    uiConfig: {...DEFAULT_UI_CONFIG},
    copywriting: {...DEFAULT_COPYWRITING},
    content: {
        heroTitle: '歡迎光臨',
        heroSubtitle: '探索我的創作世界',
        heroButtonText: '瀏覽作品',
        worksTitle: '作品集',
        otherWorksTitle: '更多作品',
        aboutTitle: '關於我',
        aboutContent: '',
        contactTitle: '聯絡我',
        contactMessage: '有任何問題或合作提案，歡迎與我聯繫！',
        footerText: '',
        notFoundTitle: '找不到頁面',
        notFoundMessage: '您要找的頁面似乎不存在',
        notFoundButtonText: '回首頁',
    },
    seo: {
        siteTitle: '我的作品集',
        siteDescription: '',
        keywords: '',
        ogImage: '/images/og-image.jpg',
    },
}

/** 支援的社群平台（順序會影響顯示） */
const SUPPORTED_SOCIALS = [
    'instagram',
    'twitter',
    'pinterest',
    'linkedin',
    'youtube',
    'tiktok',
    'behance',
    'dribbble',
    'etsy',
]

/** 可用的區塊組件映射 */
const AVAILABLE_SECTIONS = {
    Hero: 'SectionHero',
    Works: 'SectionWorks',
    OtherWorks: 'SectionOtherWorks',
    About: 'SectionAbout',
    Contact: 'SectionContact',
    Gallery: 'SectionGallery',
    Testimonials: 'SectionTestimonials',
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔧 輔助函數
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 深度合併物件（支援嵌套物件）
 * @param {Object} target - 目標物件
 * @param {Object} source - 來源物件
 * @returns {Object} 合併後的物件
 */
function deepMerge(target, source) {
    if (!source || typeof source !== 'object') return target
    if (!target || typeof target !== 'object') return source

    const result = {...target}

    for (const key of Object.keys(source)) {
        const sourceValue = source[key]
        const targetValue = target[key]

        // 跳過 null、undefined 和空字串
        if (sourceValue === null || sourceValue === undefined) continue
        if (sourceValue === '' && targetValue !== undefined) continue

        if (
            typeof sourceValue === 'object' &&
            !Array.isArray(sourceValue) &&
            typeof targetValue === 'object' &&
            !Array.isArray(targetValue)
        ) {
            result[key] = deepMerge(targetValue, sourceValue)
        } else {
            result[key] = sourceValue
        }
    }

    return result
}

/**
 * 安全讀取嵌套物件屬性
 * @param {Object} obj - 物件
 * @param {string} path - 路徑（如 'profile.name'）
 * @param {*} fallback - 預設值
 * @returns {*} 屬性值或預設值
 */
function safeGet(obj, path, fallback = null) {
    if (!obj || !path) return fallback
    const keys = path.split('.')
    let value = obj
    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key]
        } else {
            return fallback
        }
    }
    return value ?? fallback
}

// ═══════════════════════════════════════════════════════════════════════════
// 🪄 職業配置自動填補邏輯（核心魔法）
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 根據職業自動生成完整的配置
 * 這是極簡化設計的核心 - 用戶只需填寫 profession，系統自動補齊一切
 *
 * @param {string} profession - 職業代碼（如 'knitter', 'chef', 'photographer'）
 * @returns {Object} 完整的 UI 和主題配置
 */
function generateConfigFromProfession(profession) {
    const professionConfig = getProfessionConfig(profession)

    if (!professionConfig) {
        // 沒有找到職業配置，返回系統預設
        return {
            theme: {...SYSTEM_DEFAULTS.theme},
            ui: {...SYSTEM_DEFAULTS.ui},
            uiConfig: {...SYSTEM_DEFAULTS.uiConfig},
            copywriting: {...SYSTEM_DEFAULTS.copywriting},
            content: {...SYSTEM_DEFAULTS.content},
        }
    }

    // 🎨 根據職業生成主題配置
    const theme = {
        primaryColor: professionConfig.colors?.primaryColor || DEFAULT_COLORS.primaryColor,
        secondaryColor: professionConfig.colors?.secondaryColor || DEFAULT_COLORS.secondaryColor,
        backgroundColor: professionConfig.colors?.backgroundColor || DEFAULT_COLORS.backgroundColor,
        textColor: professionConfig.colors?.textColor || DEFAULT_COLORS.textColor,
        mutedColor: professionConfig.colors?.mutedColor || DEFAULT_COLORS.mutedColor,
        fontFamily: professionConfig.fonts?.body || DEFAULT_FONTS.body,
        headingFont: professionConfig.fonts?.heading || DEFAULT_FONTS.heading,
    }

    // 📐 根據職業生成 UI 配置
    const ui = {
        themePreset: professionConfig.preset || 'default',
        heroStyle: professionConfig.heroStyle || 'split',
        showFooter: true,
        showSocialLinks: true,
        showOtherWorks: true,
        navStyle: professionConfig.navStyle || 'default',
        gridColumns: professionConfig.gridColumns || 3,
        thumbnailRatio: professionConfig.thumbnailRatio || '4/3',
        smoothScroll: true,
        showBackToTop: true,
        layout: professionConfig.layout || DEFAULT_LAYOUT,
    }

    // 🔧 根據職業生成進階 UI 配置
    const uiConfig = {
        ...DEFAULT_UI_CONFIG,
        ...(professionConfig.uiConfig || {}),
    }

    // 💬 根據職業生成情感化文案
    const copywriting = {
        ...DEFAULT_COPYWRITING,
        ...(professionConfig.copywriting || {}),
    }

    // 確保 notFoundEmoji 有值
    if (!copywriting.notFoundEmoji && professionConfig.emoji) {
        copywriting.notFoundEmoji = professionConfig.emoji
    }

    // 📝 根據職業生成預設內容
    const content = {
        ...SYSTEM_DEFAULTS.content,
        notFoundTitle: copywriting.notFoundTitle || SYSTEM_DEFAULTS.content.notFoundTitle,
        notFoundMessage: copywriting.notFoundMessage || SYSTEM_DEFAULTS.content.notFoundMessage,
    }

    return {theme, ui, uiConfig, copywriting, content}
}

// ═══════════════════════════════════════════════════════════════════════════
// 🛡️ 設定載入與處理
// ═══════════════════════════════════════════════════════════════════════════

/** 設定載入狀態 */
const configLoadStatus = ref({
    loaded: true,
    hasErrors: false,
    errors: [],
    warnings: [],
})

// 安全取得原始設定
let siteConfig = {}
try {
    siteConfig = siteConfigRaw || {}
} catch (e) {
    configLoadStatus.value.errors.push({
        type: 'load',
        message: '設定檔載入失敗',
        friendly: '找不到設定檔，使用預設值',
    })
    console.warn('🧶 [useConfig] 設定檔載入失敗，使用預設值')
}

/**
 * 處理設定並回傳合併後的配置
 * @param {Object} userConfig - 用戶的配置（極簡版本只包含 profile 和 seo）
 * @returns {Object} 完整的配置
 */
function processConfig(userConfig) {
    const warnings = []

    // 取得職業代碼
    const profession = safeGet(userConfig, 'profile.profession', null)
    const professionConfig = getProfessionConfig(profession)

    // 🪄 核心魔法：根據職業自動生成所有配置
    const generatedConfig = generateConfigFromProfession(profession)

    // 第一層：系統預設
    let mergedConfig = JSON.parse(JSON.stringify(SYSTEM_DEFAULTS))

    // 第二層：套用職業自動生成的配置
    mergedConfig.theme = {...mergedConfig.theme, ...generatedConfig.theme}
    mergedConfig.ui = {...mergedConfig.ui, ...generatedConfig.ui}
    mergedConfig.uiConfig = {...mergedConfig.uiConfig, ...generatedConfig.uiConfig}
    mergedConfig.copywriting = {...mergedConfig.copywriting, ...generatedConfig.copywriting}
    mergedConfig.content = {...mergedConfig.content, ...generatedConfig.content}

    // 第三層：套用用戶設定（只有 profile 和 seo 會被覆蓋）
    try {
        // Profile
        if (userConfig.profile) {
            mergedConfig.profile = deepMerge(mergedConfig.profile, userConfig.profile)
        }

        // SEO
        if (userConfig.seo) {
            mergedConfig.seo = deepMerge(mergedConfig.seo, userConfig.seo)
        }

        // 如果用戶有自訂 theme，也允許覆蓋（進階用戶）
        if (userConfig.theme) {
            mergedConfig.theme = deepMerge(mergedConfig.theme, userConfig.theme)
        }

        // 如果用戶有自訂 ui，也允許覆蓋（進階用戶）
        if (userConfig.ui) {
            mergedConfig.ui = deepMerge(mergedConfig.ui, userConfig.ui)
        }

        // 如果用戶有自訂 content，也允許覆蓋
        if (userConfig.content) {
            mergedConfig.content = deepMerge(mergedConfig.content, userConfig.content)
        }
    } catch (e) {
        warnings.push({
            field: 'general',
            message: '設定合併時發生問題',
            friendly: '有些設定可能沒有正確套用，但網站還是能正常顯示！',
        })
    }

    // 驗證關鍵欄位
    validateConfig(mergedConfig, warnings)

    return {mergedConfig, warnings, profession, professionConfig}
}

/**
 * 驗證設定並收集警告
 * @param {Object} config - 配置物件
 * @param {Array} warnings - 警告陣列
 */
function validateConfig(config, warnings) {
    // 檢查必要區塊
    const requiredSections = ['profile', 'theme', 'ui', 'content', 'seo']
    for (const section of requiredSections) {
        if (!config[section] || typeof config[section] !== 'object') {
            config[section] = SYSTEM_DEFAULTS[section]
            warnings.push({
                field: section,
                message: `缺少 ${section} 區塊`,
                friendly: `網站設定中少了「${section}」的部分，已經幫您補上預設值囉！`,
            })
        }
    }

    // 檢查顏色格式
    const colorFields = ['primaryColor', 'backgroundColor', 'textColor', 'secondaryColor', 'mutedColor']
    for (const field of colorFields) {
        const color = safeGet(config, `theme.${field}`)
        if (color && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
            config.theme[field] = SYSTEM_DEFAULTS.theme[field]
            warnings.push({
                field: `theme.${field}`,
                message: `顏色格式錯誤：${color}`,
                friendly: `「${field}」的顏色格式（${color}）好像不太對，已經改用預設顏色。`,
            })
        }
    }

    // 檢查 layout
    if (config.ui?.layout) {
        if (!Array.isArray(config.ui.layout)) {
            config.ui.layout = DEFAULT_LAYOUT
        } else {
            const validLayout = config.ui.layout.filter((s) => s in AVAILABLE_SECTIONS)
            if (validLayout.length === 0) {
                config.ui.layout = DEFAULT_LAYOUT
            } else {
                config.ui.layout = validLayout
            }
        }
    }
}

// 執行設定處理
const {mergedConfig, warnings: configWarnings, profession, professionConfig} = processConfig(siteConfig)

// 更新載入狀態
configLoadStatus.value.warnings = configWarnings
configLoadStatus.value.hasErrors = configLoadStatus.value.errors.length > 0

// 創建響應式配置
const config = reactive({...mergedConfig})

// ═══════════════════════════════════════════════════════════════════════════
// 🎈 開發環境小助手
// ═══════════════════════════════════════════════════════════════════════════

function showDevHelper() {
    if (!import.meta.env.DEV) return
    if (configLoadStatus.value.warnings.length === 0 && configLoadStatus.value.errors.length === 0) return
    if (typeof document === 'undefined') return
    if (document.getElementById('config-helper-bubble')) return

    const totalIssues = configLoadStatus.value.errors.length + configLoadStatus.value.warnings.length

    const container = document.createElement('div')
    container.id = 'config-helper-bubble'
    container.innerHTML = `
    <style>
      #config-helper-bubble {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 99999;
        font-family: 'Noto Sans TC', -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .helper-bubble {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 12px 16px;
        border-radius: 20px;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        transition: all 0.3s ease;
      }
      .helper-bubble:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
      }
      .helper-bubble .emoji { font-size: 20px; animation: wave 1s ease-in-out infinite; }
      .helper-bubble .badge {
        background: #ff6b6b;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
      }
      .helper-panel {
        display: none;
        position: absolute;
        bottom: 60px;
        right: 0;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        width: 320px;
        max-height: 400px;
        overflow: hidden;
      }
      .helper-panel.show { display: block; animation: slideUp 0.3s ease; }
      .helper-panel-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 16px;
        font-weight: 600;
      }
      .helper-panel-content {
        padding: 16px;
        max-height: 300px;
        overflow-y: auto;
      }
      .helper-item {
        padding: 12px;
        background: #f8f9fa;
        border-radius: 8px;
        margin-bottom: 8px;
        font-size: 13px;
        line-height: 1.5;
      }
      .helper-item:last-child { margin-bottom: 0; }
      .helper-item-title { font-weight: 600; color: #333; margin-bottom: 4px; }
      .helper-item-message { color: #666; }
      .helper-close {
        position: absolute;
        top: 12px;
        right: 12px;
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
      }
      @keyframes wave {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(20deg); }
        75% { transform: rotate(-20deg); }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
    <div class="helper-bubble" onclick="this.nextElementSibling.classList.toggle('show')">
      <span class="emoji">🧶</span>
      <span>嗨！這裡有些小提示</span>
      <span class="badge">${totalIssues}</span>
    </div>
    <div class="helper-panel">
      <div class="helper-panel-header">
        🌟 設定小幫手
        <button class="helper-close" onclick="this.parentElement.parentElement.classList.remove('show')">×</button>
      </div>
      <div class="helper-panel-content">
        ${configLoadStatus.value.errors.map(e => `
          <div class="helper-item">
            <div class="helper-item-title">❌ 需要處理</div>
            <div class="helper-item-message">${e.friendly || e.message}</div>
          </div>
        `).join('')}
        ${configLoadStatus.value.warnings.map(w => `
          <div class="helper-item">
            <div class="helper-item-title">💡 小提醒</div>
            <div class="helper-item-message">${w.friendly || w.message}</div>
          </div>
        `).join('')}
        <div class="helper-item" style="background: #e8f5e9;">
          <div class="helper-item-title">✨ 別擔心！</div>
          <div class="helper-item-message">網站已經可以正常顯示了！</div>
        </div>
      </div>
    </div>
  `
    document.body.appendChild(container)
}

// 啟動小助手
if (typeof window !== 'undefined') {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => showDevHelper())
    } else {
        setTimeout(showDevHelper, 1000)
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📦 Composable 主體
// ═══════════════════════════════════════════════════════════════════════════

export function useConfig() {
    const profile = readonly(config.profile)
    const theme = readonly(config.theme)
    const ui = readonly(config.ui)
    const uiConfig = readonly(config.uiConfig || DEFAULT_UI_CONFIG)
    const copywriting = readonly(config.copywriting || DEFAULT_COPYWRITING)
    const content = readonly(config.content)
    const seo = readonly(config.seo)

    /** 當前職業資訊 */
    const currentProfession = computed(() => ({
        code: profession,
        config: professionConfig,
        label: professionConfig?.label || null,
        emoji: professionConfig?.emoji || null,
    }))

    /** 載入狀態 */
    const loadStatus = computed(() => configLoadStatus.value)

    /**
     * 安全獲取配置值
     * @param {string} path - 路徑（如 'profile.name'）
     * @param {*} fallback - 預設值
     * @returns {*} 配置值
     */
    const get = (path, fallback = null) => {
        let value = safeGet(config, path)
        if (value === null || value === undefined) {
            value = safeGet(SYSTEM_DEFAULTS, path)
        }
        return value ?? fallback
    }

    /**
     * 檢查功能是否啟用
     * @param {string} feature - 功能名稱
     * @returns {boolean}
     */
    const isEnabled = (feature) => {
        const value = safeGet(config, `ui.${feature}`)
        const defaultTrueFeatures = ['showFooter', 'showSocialLinks', 'smoothScroll', 'showBackToTop']
        if (value === undefined && defaultTrueFeatures.includes(feature)) return true
        return !!value
    }

    /**
     * 獲取有效的社交連結
     * @returns {Array<{name: string, url: string}>}
     */
    const getSocialLinks = () => {
        const social = config.profile?.social || {}
        return SUPPORTED_SOCIALS.filter(
            (name) => social[name] && social[name].trim() !== ''
        ).map((name) => ({name, url: social[name]}))
    }

    /**
     * 獲取網格樣式類別
     * @returns {string}
     */
    const getGridClass = () => {
        const cols = config.ui?.gridColumns || 3
        const gridMap = {
            2: 'md:grid-cols-2',
            3: 'md:grid-cols-2 lg:grid-cols-3',
            4: 'md:grid-cols-2 lg:grid-cols-4',
        }
        return gridMap[cols] || gridMap[3]
    }

    /**
     * 獲取縮圖比例類別
     * @returns {string}
     */
    const getAspectClass = () => {
        const ratio = config.ui?.thumbnailRatio || '4/3'
        const ratioMap = {
            '4/3': 'aspect-[4/3]',
            '3/2': 'aspect-[3/2]',
            '16/9': 'aspect-[16/9]',
            '1/1': 'aspect-square',
            '4/5': 'aspect-[4/5]',
        }
        return ratioMap[ratio] || ratioMap['4/3']
    }

    /**
     * 獲取 Hero 樣式
     * @returns {string}
     */
    const getHeroStyle = () => config.ui?.heroStyle || 'split'

    /**
     * 獲取頁面佈局
     * @returns {Array<string>}
     */
    const getLayout = () => {
        const layout = config.ui?.layout
        if (!layout || !Array.isArray(layout) || layout.length === 0) return DEFAULT_LAYOUT
        const validLayout = layout.filter((section) => section in AVAILABLE_SECTIONS)
        return validLayout.length > 0 ? validLayout : DEFAULT_LAYOUT
    }

    /**
     * 獲取區塊組件名稱
     * @param {string} section - 區塊名稱
     * @returns {string|null}
     */
    const getSectionComponent = (section) => AVAILABLE_SECTIONS[section] || null

    /**
     * 檢查是否有職業設定
     * @returns {boolean}
     */
    const hasProfession = () => !!profession && !!professionConfig

    /**
     * 獲取職業預設配置
     * @returns {Object|null}
     */
    const getProfessionDefaults = () => {
        if (!professionConfig) return null
        return {
            preset: professionConfig.preset,
            fonts: professionConfig.fonts,
            colors: professionConfig.colors,
            heroStyle: professionConfig.heroStyle,
            layout: professionConfig.layout,
            uiConfig: professionConfig.uiConfig,
            copywriting: professionConfig.copywriting,
        }
    }

    /**
     * 獲取主題預設
     * @returns {string}
     */
    const getThemePreset = () => config.ui?.themePreset || 'default'

    /**
     * 獲取導航樣式
     * @returns {string}
     */
    const getNavStyle = () => config.ui?.navStyle || 'default'

    /**
     * 獲取縮圖比例（CSS 格式）
     * @returns {string}
     */
    const getUiThumbnailRatio = () => {
        const ratio = config.uiConfig?.thumbnailRatio || DEFAULT_UI_CONFIG.thumbnailRatio
        return getThumbnailAspectRatio(ratio)
    }

    /**
     * 獲取圓角值
     * @returns {string}
     */
    const getBorderRadius = () => {
        const borderRadius = config.uiConfig?.borderRadius || DEFAULT_UI_CONFIG.borderRadius
        return getBorderRadiusValue(borderRadius)
    }

    /**
     * 獲取動畫速度
     * @returns {number}
     */
    const getAnimationSpeed = () => config.uiConfig?.animationSpeed || DEFAULT_UI_CONFIG.animationSpeed

    /**
     * 計算動畫持續時間
     * @param {number} baseDuration - 基礎時間（毫秒）
     * @returns {number}
     */
    const calcAnimationDuration = (baseDuration = 300) => {
        const speed = getAnimationSpeed()
        return getAnimationDuration(speed, baseDuration)
    }

    /**
     * 獲取 404 頁面配置
     * @returns {Object}
     */
    const getNotFoundConfig = () => {
        const cw = config.copywriting || DEFAULT_COPYWRITING
        return {
            title: cw.notFoundTitle || DEFAULT_COPYWRITING.notFoundTitle,
            message: cw.notFoundMessage || DEFAULT_COPYWRITING.notFoundMessage,
            emoji: cw.notFoundEmoji || professionConfig?.emoji || DEFAULT_COPYWRITING.notFoundEmoji,
            buttonText: config.content?.notFoundButtonText || '回首頁',
        }
    }

    /**
     * 獲取載入文字
     * @returns {string}
     */
    const getLoadingText = () => config.copywriting?.loadingText || DEFAULT_COPYWRITING.loadingText

    return {
        // 響應式配置
        config: readonly(config),
        profile,
        theme,
        ui,
        uiConfig,
        copywriting,
        content,
        seo,

        // 職業相關
        currentProfession,
        hasProfession,
        getProfessionDefaults,

        // 狀態
        loadStatus,

        // 工具方法
        get,
        isEnabled,
        getSocialLinks,
        getGridClass,
        getAspectClass,
        getHeroStyle,
        getThemePreset,
        getNavStyle,
        getUiThumbnailRatio,
        getBorderRadius,
        getAnimationSpeed,
        calcAnimationDuration,
        getNotFoundConfig,
        getLoadingText,
        getLayout,
        getSectionComponent,

        // 常數
        availableSections: Object.keys(AVAILABLE_SECTIONS),
        defaultLayout: DEFAULT_LAYOUT,
    }
}

// 導出供其他模組使用
export {siteConfig, mergedConfig, SYSTEM_DEFAULTS}
export default useConfig
