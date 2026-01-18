/**
 * Configuration Composable
 *
 * 提供對 site.config.json 的響應式存取。
 * 支援職業映射系統 - 根據用戶的職業自動套用最適合的視覺風格。
 *
 * 優先級順序（高到低）：
 * 1. 用戶在 config 中明確設定的值
 * 2. 職業預設值（如果設定了 profession）
 * 3. 系統預設值
 *
 * 向後兼容性：
 * - 如果沒有設定 profession，系統會正常運作
 * - 如果沒有設定 layout，會使用預設佈局 ['Hero', 'Works', 'OtherWorks']
 * - 所有舊版 config 都能正常運作
 *
 * 新增功能：
 * - uiConfig: 深層 UI 配置（圖片比例、圓角、動畫速度）
 * - copywriting: 情感化文案（404 頁面、載入中文字）
 */

import {computed, reactive, readonly} from 'vue'
import siteConfig from '@/../site.config.json'
import {
  DEFAULT_COPYWRITING,
  DEFAULT_UI_CONFIG,
  getAnimationDuration,
  getBorderRadiusValue,
  getProfessionConfig,
  getThumbnailAspectRatio,
  mergeWithProfessionDefaults,
} from '@/utils/professionMap'

// ═══════════════════════════════════════════════════════════════════════════
// 常量定義
// ═══════════════════════════════════════════════════════════════════════════

/** 預設的頁面佈局 */
const DEFAULT_LAYOUT = ['Hero', 'Works', 'OtherWorks']

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
// 配置處理
// ═══════════════════════════════════════════════════════════════════════════

// 取得職業設定
const profession = siteConfig.profile?.profession || null
const professionConfig = getProfessionConfig(profession)

// 合併職業預設和用戶設定
const mergedConfig = profession
    ? mergeWithProfessionDefaults(profession, siteConfig)
    : applyDefaults(siteConfig)

// 創建響應式配置
const config = reactive({...mergedConfig})

/**
 * 為沒有職業設定的 config 套用預設值
 * 確保所有必要的欄位都有值
 */
function applyDefaults(userConfig) {
  const defaults = {
    profile: {
      name: '',
      role: '',
      email: '',
      bio: '',
      avatar: '/images/avatar.jpg',
      social: {},
      ...userConfig.profile,
    },
    theme: {
      primaryColor: '#6B4423',
      secondaryColor: '#8B6914',
      backgroundColor: '#FFFBF5',
      textColor: '#2D2D2D',
      mutedColor: '#6B6B6B',
      fontFamily: 'Inter',
      headingFont: 'Inter',
      ...userConfig.theme,
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
      ...userConfig.ui,
    },
    uiConfig: {
      ...DEFAULT_UI_CONFIG,
      ...userConfig.uiConfig,
    },
    copywriting: {
      ...DEFAULT_COPYWRITING,
      ...userConfig.copywriting,
    },
    content: {
      heroTitle: '',
      heroSubtitle: '',
      heroButtonText: '瀏覽作品',
      worksTitle: '作品集',
      otherWorksTitle: '更多作品',
      aboutTitle: '關於我',
      aboutContent: '',
      contactTitle: '聯絡我',
      contactMessage: '有任何問題或合作提案，歡迎與我聯繫！',
      footerText: '',
      notFoundTitle: '找不到頁面',
      notFoundMessage: '您要找的頁面不存在',
      notFoundButtonText: '回首頁',
      ...userConfig.content,
    },
    seo: {
      siteTitle: '',
      siteDescription: '',
      keywords: '',
      ogImage: '/images/og-image.jpg',
      ...userConfig.seo,
    },
  }

  return defaults
}

// ═══════════════════════════════════════════════════════════════════════════
// Composable 主體
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Composable to access site configuration
 * @returns {object} Readonly config object and helper methods
 */
export function useConfig() {
  /**
   * 取得個人資料
   */
  const profile = readonly(config.profile)

  /**
   * 取得主題設定
   */
  const theme = readonly(config.theme)

  /**
   * 取得 UI 設定
   */
  const ui = readonly(config.ui)

  /**
   * 取得深層 UI 配置（圖片比例、圓角、動畫速度）
   */
  const uiConfig = readonly(config.uiConfig || DEFAULT_UI_CONFIG)

  /**
   * 取得情感化文案
   */
  const copywriting = readonly(config.copywriting || DEFAULT_COPYWRITING)

  /**
   * 取得內容文案
   */
  const content = readonly(config.content)

  /**
   * 取得 SEO 設定
   */
  const seo = readonly(config.seo)

  /**
   * 取得當前職業
   */
  const currentProfession = computed(() => ({
    code: profession,
    config: professionConfig,
    label: professionConfig?.label || null,
    emoji: professionConfig?.emoji || null,
  }))

  /**
   * 根據路徑取得嵌套配置值
   * @param {string} path - 點記法路徑（例如 'profile.name'）
   * @param {any} fallback - 找不到時的回退值
   * @returns {any} 配置值
   */
  const get = (path, fallback = null) => {
    const keys = path.split('.')
    let value = config

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key]
      } else {
        return fallback
      }
    }

    return value ?? fallback
  }

  /**
   * 檢查功能是否啟用
   * @param {string} feature - ui config 中的功能名稱
   * @returns {boolean}
   */
  const isEnabled = (feature) => {
    return !!config.ui[feature]
  }

  /**
   * 取得有值的社群連結（按顯示順序）
   * @returns {Array} { name, url } 物件陣列
   */
  const getSocialLinks = () => {
    const social = config.profile.social || {}

    return SUPPORTED_SOCIALS.filter(
        (name) => social[name] && social[name].trim() !== ''
    ).map((name) => ({name, url: social[name]}))
  }

  /**
   * 取得作品格線的 CSS class
   * @returns {string} Tailwind grid class
   */
  const getGridClass = () => {
    const cols = config.ui.gridColumns || 3
    const gridMap = {
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-2 lg:grid-cols-3',
      4: 'md:grid-cols-2 lg:grid-cols-4',
    }
    return gridMap[cols] || gridMap[3]
  }

  /**
   * 取得縮圖比例的 CSS class
   * @returns {string} Tailwind aspect ratio class
   */
  const getAspectClass = () => {
    const ratio = config.ui.thumbnailRatio || '4/3'
    const ratioMap = {
      '4/3': 'aspect-[4/3]',
      '3/2': 'aspect-[3/2]',
      '16/9': 'aspect-[16/9]',
      '1/1': 'aspect-square',
    }
    return ratioMap[ratio] || ratioMap['4/3']
  }

  /**
   * 取得首頁版型設定
   * @returns {string} 'split' | 'centered' | 'minimal'
   */
  const getHeroStyle = () => {
    return config.ui.heroStyle || 'split'
  }

  /**
   * 取得頁面佈局設定
   * @returns {string[]} 區塊名稱陣列
   */
  const getLayout = () => {
    const layout = config.ui.layout

    // 如果沒有設定或為空陣列，返回預設佈局
    if (!layout || !Array.isArray(layout) || layout.length === 0) {
      return DEFAULT_LAYOUT
    }

    // 過濾掉不支援的區塊
    const validLayout = layout.filter((section) => {
      const isValid = section in AVAILABLE_SECTIONS
      if (!isValid && import.meta.env.DEV) {
        console.warn(`[useConfig] 未知的區塊名稱: "${section}"，已略過`)
      }
      return isValid
    })

    // 如果過濾後為空，返回預設佈局
    return validLayout.length > 0 ? validLayout : DEFAULT_LAYOUT
  }

  /**
   * 取得區塊對應的組件名稱
   * @param {string} section - 區塊名稱
   * @returns {string|null} 組件名稱
   */
  const getSectionComponent = (section) => {
    return AVAILABLE_SECTIONS[section] || null
  }

  /**
   * 檢查是否有設定職業
   * @returns {boolean}
   */
  const hasProfession = () => {
    return !!profession && !!professionConfig
  }

  /**
   * 取得職業預設的主題設定（用於調試）
   * @returns {object|null}
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
   * 取得當前使用的主題預設名稱
   * @returns {string}
   */
  const getThemePreset = () => {
    return config.ui.themePreset || 'default'
  }

  /**
   * 取得導覽列樣式
   * @returns {string} 'default' | 'minimal'
   */
  const getNavStyle = () => {
    return config.ui.navStyle || 'default'
  }

  /**
   * 取得深層 UI 配置的縮圖比例（CSS 格式）
   * @returns {string} 如 '4/3', '16/9', '1/1'
   */
  const getUiThumbnailRatio = () => {
    const ratio = config.uiConfig?.thumbnailRatio || DEFAULT_UI_CONFIG.thumbnailRatio
    return getThumbnailAspectRatio(ratio)
  }

  /**
   * 取得圓角 CSS 值
   * @returns {string} 如 '8px', '16px', '0px'
   */
  const getBorderRadius = () => {
    const borderRadius = config.uiConfig?.borderRadius || DEFAULT_UI_CONFIG.borderRadius
    return getBorderRadiusValue(borderRadius)
  }

  /**
   * 取得動畫速度係數
   * @returns {number}
   */
  const getAnimationSpeed = () => {
    return config.uiConfig?.animationSpeed || DEFAULT_UI_CONFIG.animationSpeed
  }

  /**
   * 計算調整後的動畫持續時間
   * @param {number} baseDuration - 基礎持續時間（毫秒）
   * @returns {number} 調整後的持續時間
   */
  const calcAnimationDuration = (baseDuration = 300) => {
    const speed = getAnimationSpeed()
    return getAnimationDuration(speed, baseDuration)
  }

  /**
   * 取得 404 頁面配置
   * @returns {object} { title, message, emoji, buttonText }
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
   * 取得載入中文字
   * @returns {string}
   */
  const getLoadingText = () => {
    return config.copywriting?.loadingText || DEFAULT_COPYWRITING.loadingText
  }

  return {
    // 完整配置區塊（唯讀）
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

    // 輔助方法
    get,
    isEnabled,
    getSocialLinks,
    getGridClass,
    getAspectClass,
    getHeroStyle,
    getThemePreset,
    getNavStyle,

    // 深層 UI 配置方法
    getUiThumbnailRatio,
    getBorderRadius,
    getAnimationSpeed,
    calcAnimationDuration,

    // 情感化文案方法
    getNotFoundConfig,
    getLoadingText,

    // 佈局相關
    getLayout,
    getSectionComponent,
    availableSections: Object.keys(AVAILABLE_SECTIONS),
    defaultLayout: DEFAULT_LAYOUT,
  }
}

// 導出原始配置（用於主題初始化）
export {siteConfig, mergedConfig}

export default useConfig
