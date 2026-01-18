/**
 * Profession Map - 職業風格映射系統
 *
 * 🪄 魔法功能：讓用戶只需填寫職業，就能自動套用最適合的視覺風格。
 * 這是為了讓不懂設計的手作人也能有專業的網站外觀。
 *
 * 使用方式：
 * 用戶在 site.config.json 中設定 profile.profession: "chef"
 * 系統會自動套用：
 *   - 適合的 themePreset (minimal)
 *   - 推薦的字體組合
 *   - 預設的配色方案
 *   - 建議的版面配置
 *
 * 優先級（高到低）：
 * 1. 用戶在 config 中明確設定的值
 * 2. 職業預設值
 * 3. 系統預設值
 */

// ═══════════════════════════════════════════════════════════════════════════
// 預設值常量
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

// ═══════════════════════════════════════════════════════════════════════════
// 職業定義
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 職業定義
 * 每個職業包含：
 * - label: 顯示名稱（中文）
 * - emoji: 圖示
 * - preset: 對應的視覺風格預設
 * - fonts: 推薦字體 { body, heading }
 * - colors: 預設配色方案
 * - heroStyle: 推薦的首頁版型
 * - layout: 推薦的頁面區塊順序
 * - gridColumns: 推薦的作品欄位數
 * - thumbnailRatio: 推薦的縮圖比例
 * - navStyle: 推薦的導覽列樣式
 */
export const professionMap = {
    // ═══════════════════════════════════════════════════════════════════════════
    // 🍳 餐飲類 - 乾淨俐落、專業感
    // ═══════════════════════════════════════════════════════════════════════════
    chef: {
        label: '廚師 / 料理人',
        emoji: '🍳',
        category: 'food',
        preset: 'minimal',
        fonts: {
            body: 'Inter',
            heading: 'Cormorant Garamond',
        },
        colors: {
            primaryColor: '#1a1a1a',
            secondaryColor: '#8b7355',
            backgroundColor: '#fafafa',
            textColor: '#1a1a1a',
            mutedColor: '#6b6b6b',
        },
        heroStyle: 'minimal',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 2,
        thumbnailRatio: '3/2',
        navStyle: 'minimal',
    },

    baker: {
        label: '烘焙師 / 甜點師',
        emoji: '🧁',
        category: 'food',
        preset: 'soft',
        fonts: {
            body: 'Quicksand',
            heading: 'Playfair Display',
        },
        colors: {
            primaryColor: '#c9a87c',
            secondaryColor: '#e8d5c4',
            backgroundColor: '#fffbf7',
            textColor: '#5d4e42',
            mutedColor: '#9c8b7e',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '1/1',
        navStyle: 'default',
    },

    barista: {
        label: '咖啡師',
        emoji: '☕',
        category: 'food',
        preset: 'minimal',
        fonts: {
            body: 'Source Sans Pro',
            heading: 'Libre Baskerville',
        },
        colors: {
            primaryColor: '#3d2914',
            secondaryColor: '#6f4e37',
            backgroundColor: '#f9f6f2',
            textColor: '#2d2d2d',
            mutedColor: '#7a7a7a',
        },
        heroStyle: 'minimal',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '4/3',
        navStyle: 'minimal',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 🧶 手作類 - 溫暖、有機感
    // ═══════════════════════════════════════════════════════════════════════════
    knitter: {
        label: '編織創作者',
        emoji: '🧶',
        category: 'craft',
        preset: 'default',
        fonts: {
            body: 'Lora',
            heading: 'Playfair Display',
        },
        colors: {
            primaryColor: '#8B4513',
            secondaryColor: '#A0522D',
            backgroundColor: '#FDF5E6',
            textColor: '#3D2914',
            mutedColor: '#8B7355',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '4/3',
        navStyle: 'default',
    },

    potter: {
        label: '陶藝家',
        emoji: '🏺',
        category: 'craft',
        preset: 'default',
        fonts: {
            body: 'Nunito',
            heading: 'Cormorant Garamond',
        },
        colors: {
            primaryColor: '#8d6e63',
            secondaryColor: '#a1887f',
            backgroundColor: '#f5f0eb',
            textColor: '#4e342e',
            mutedColor: '#8d6e63',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '1/1',
        navStyle: 'default',
    },

    jeweler: {
        label: '珠寶 / 飾品設計師',
        emoji: '💍',
        category: 'craft',
        preset: 'soft',
        fonts: {
            body: 'Raleway',
            heading: 'Cinzel',
        },
        colors: {
            primaryColor: '#b8860b',
            secondaryColor: '#d4af37',
            backgroundColor: '#fefefe',
            textColor: '#2c2c2c',
            mutedColor: '#888888',
        },
        heroStyle: 'centered',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 4,
        thumbnailRatio: '1/1',
        navStyle: 'default',
    },

    leatherworker: {
        label: '皮革工藝師',
        emoji: '👜',
        category: 'craft',
        preset: 'default',
        fonts: {
            body: 'Merriweather',
            heading: 'Oswald',
        },
        colors: {
            primaryColor: '#5d4037',
            secondaryColor: '#795548',
            backgroundColor: '#efebe9',
            textColor: '#3e2723',
            mutedColor: '#8d6e63',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 2,
        thumbnailRatio: '4/3',
        navStyle: 'default',
    },

    woodworker: {
        label: '木工 / 木藝師',
        emoji: '🪵',
        category: 'craft',
        preset: 'default',
        fonts: {
            body: 'Source Serif Pro',
            heading: 'Josefin Sans',
        },
        colors: {
            primaryColor: '#6d4c41',
            secondaryColor: '#8d6e63',
            backgroundColor: '#faf8f5',
            textColor: '#3e2723',
            mutedColor: '#8d6e63',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 2,
        thumbnailRatio: '16/9',
        navStyle: 'default',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 🎨 藝術類 - 大膽、個性
    // ═══════════════════════════════════════════════════════════════════════════
    artist: {
        label: '藝術家',
        emoji: '🎨',
        category: 'art',
        preset: 'bold',
        fonts: {
            body: 'Space Grotesk',
            heading: 'Bebas Neue',
        },
        colors: {
            primaryColor: '#1a1a1a',
            secondaryColor: '#ff4444',
            backgroundColor: '#ffffff',
            textColor: '#1a1a1a',
            mutedColor: '#666666',
        },
        heroStyle: 'minimal',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 2,
        thumbnailRatio: '4/3',
        navStyle: 'minimal',
    },

    illustrator: {
        label: '插畫家',
        emoji: '✏️',
        category: 'art',
        preset: 'bold',
        fonts: {
            body: 'Poppins',
            heading: 'Righteous',
        },
        colors: {
            primaryColor: '#6366f1',
            secondaryColor: '#a5b4fc',
            backgroundColor: '#fafafa',
            textColor: '#1e1e1e',
            mutedColor: '#71717a',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '1/1',
        navStyle: 'default',
    },

    photographer: {
        label: '攝影師',
        emoji: '📷',
        category: 'art',
        preset: 'minimal',
        fonts: {
            body: 'Work Sans',
            heading: 'Montserrat',
        },
        colors: {
            primaryColor: '#000000',
            secondaryColor: '#333333',
            backgroundColor: '#ffffff',
            textColor: '#1a1a1a',
            mutedColor: '#888888',
        },
        heroStyle: 'minimal',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '3/2',
        navStyle: 'minimal',
    },

    designer: {
        label: '設計師',
        emoji: '🎯',
        category: 'art',
        preset: 'bold',
        fonts: {
            body: 'Inter',
            heading: 'Syne',
        },
        colors: {
            primaryColor: '#0f172a',
            secondaryColor: '#3b82f6',
            backgroundColor: '#f8fafc',
            textColor: '#0f172a',
            mutedColor: '#64748b',
        },
        heroStyle: 'centered',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '16/9',
        navStyle: 'minimal',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 🌸 花藝 / 自然類 - 柔和、自然
    // ═══════════════════════════════════════════════════════════════════════════
    florist: {
        label: '花藝師',
        emoji: '🌸',
        category: 'nature',
        preset: 'soft',
        fonts: {
            body: 'Karla',
            heading: 'Cormorant Garamond',
        },
        colors: {
            primaryColor: '#9d8b7d',
            secondaryColor: '#c4b5a6',
            backgroundColor: '#fdfcfa',
            textColor: '#4a4a4a',
            mutedColor: '#9a9a9a',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '4/3',
        navStyle: 'default',
    },

    gardener: {
        label: '園藝師',
        emoji: '🌿',
        category: 'nature',
        preset: 'soft',
        fonts: {
            body: 'Nunito Sans',
            heading: 'Playfair Display',
        },
        colors: {
            primaryColor: '#4a7c59',
            secondaryColor: '#7cb083',
            backgroundColor: '#f8faf8',
            textColor: '#2d3b30',
            mutedColor: '#6b7d6e',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '4/3',
        navStyle: 'default',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 💆 療癒 / 服務類 - 溫柔、親和
    // ═══════════════════════════════════════════════════════════════════════════
    therapist: {
        label: '治療師 / 諮商師',
        emoji: '💚',
        category: 'wellness',
        preset: 'soft',
        fonts: {
            body: 'Open Sans',
            heading: 'Libre Baskerville',
        },
        colors: {
            primaryColor: '#7c9885',
            secondaryColor: '#a8c5b5',
            backgroundColor: '#fafbfa',
            textColor: '#3d4a41',
            mutedColor: '#7d8a80',
        },
        heroStyle: 'centered',
        layout: ['Hero', 'About', 'Works', 'Contact'],
        gridColumns: 2,
        thumbnailRatio: '16/9',
        navStyle: 'default',
    },

    yoga: {
        label: '瑜伽老師',
        emoji: '🧘',
        category: 'wellness',
        preset: 'soft',
        fonts: {
            body: 'Lato',
            heading: 'Cormorant',
        },
        colors: {
            primaryColor: '#b5a89a',
            secondaryColor: '#d4c8bb',
            backgroundColor: '#fdfdfb',
            textColor: '#4a4540',
            mutedColor: '#8a857e',
        },
        heroStyle: 'centered',
        layout: ['Hero', 'About', 'Works', 'Contact'],
        gridColumns: 2,
        thumbnailRatio: '3/2',
        navStyle: 'default',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 🏠 建築 / 空間類 - 專業、結構感
    // ═══════════════════════════════════════════════════════════════════════════
    architect: {
        label: '建築師',
        emoji: '🏛️',
        category: 'space',
        preset: 'minimal',
        fonts: {
            body: 'Inter',
            heading: 'Archivo',
        },
        colors: {
            primaryColor: '#2c2c2c',
            secondaryColor: '#4a4a4a',
            backgroundColor: '#ffffff',
            textColor: '#1a1a1a',
            mutedColor: '#7a7a7a',
        },
        heroStyle: 'minimal',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 2,
        thumbnailRatio: '16/9',
        navStyle: 'minimal',
    },

    interior: {
        label: '室內設計師',
        emoji: '🛋️',
        category: 'space',
        preset: 'minimal',
        fonts: {
            body: 'DM Sans',
            heading: 'Playfair Display',
        },
        colors: {
            primaryColor: '#5c5c5c',
            secondaryColor: '#a89f91',
            backgroundColor: '#f9f8f6',
            textColor: '#2d2d2d',
            mutedColor: '#8a8a8a',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 2,
        thumbnailRatio: '4/3',
        navStyle: 'default',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 🎵 音樂 / 表演類 - 動感、個性
    // ═══════════════════════════════════════════════════════════════════════════
    musician: {
        label: '音樂人',
        emoji: '🎵',
        category: 'performance',
        preset: 'bold',
        fonts: {
            body: 'Rubik',
            heading: 'Anton',
        },
        colors: {
            primaryColor: '#1a1a1a',
            secondaryColor: '#e63946',
            backgroundColor: '#fefefe',
            textColor: '#1a1a1a',
            mutedColor: '#6b6b6b',
        },
        heroStyle: 'centered',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 2,
        thumbnailRatio: '1/1',
        navStyle: 'minimal',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 📝 文字 / 教育類
    // ═══════════════════════════════════════════════════════════════════════════
    writer: {
        label: '作家 / 文字工作者',
        emoji: '📝',
        category: 'writing',
        preset: 'soft',
        fonts: {
            body: 'Crimson Text',
            heading: 'Playfair Display',
        },
        colors: {
            primaryColor: '#4a4a4a',
            secondaryColor: '#8b7355',
            backgroundColor: '#faf9f7',
            textColor: '#2d2d2d',
            mutedColor: '#7a7a7a',
        },
        heroStyle: 'centered',
        layout: ['Hero', 'About', 'Works'],
        gridColumns: 2,
        thumbnailRatio: '3/2',
        navStyle: 'default',
    },

    teacher: {
        label: '老師 / 講師',
        emoji: '📚',
        category: 'education',
        preset: 'soft',
        fonts: {
            body: 'Nunito',
            heading: 'Poppins',
        },
        colors: {
            primaryColor: '#4361ee',
            secondaryColor: '#7209b7',
            backgroundColor: '#fafbff',
            textColor: '#2b2d42',
            mutedColor: '#8d99ae',
        },
        heroStyle: 'split',
        layout: ['Hero', 'About', 'Works', 'Contact'],
        gridColumns: 3,
        thumbnailRatio: '16/9',
        navStyle: 'default',
    },
}

// ═══════════════════════════════════════════════════════════════════════════
// 輔助函數
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 取得職業設定
 * @param {string} profession - 職業代碼
 * @returns {object|null} 職業設定，如果找不到返回 null
 */
export function getProfessionConfig(profession) {
    if (!profession) return null
    const normalized = profession.toLowerCase().trim()
    return professionMap[normalized] || null
}

/**
 * 取得所有可用的職業列表
 * @returns {Array} 職業列表 [{ value, label, emoji, category, preset }]
 */
export function getProfessionList() {
    return Object.entries(professionMap).map(([value, config]) => ({
        value,
        label: config.label,
        emoji: config.emoji,
        category: config.category,
        preset: config.preset,
    }))
}

/**
 * 依類別分組的職業列表
 * @returns {object} { category: [professions] }
 */
export function getProfessionsByCategory() {
    const categories = {}

    Object.entries(professionMap).forEach(([value, config]) => {
        const category = config.category || 'other'
        if (!categories[category]) {
            categories[category] = []
        }
        categories[category].push({
            value,
            label: config.label,
            emoji: config.emoji,
            preset: config.preset,
        })
    })

    return categories
}

/**
 * 根據職業取得推薦的完整配置
 * 合併職業預設和用戶的自訂設定
 *
 * 優先級：用戶明確設定 > 職業預設 > 系統預設
 *
 * @param {string} profession - 職業代碼
 * @param {object} userConfig - 用戶的 site.config.json
 * @returns {object} 合併後的配置
 */
export function mergeWithProfessionDefaults(profession, userConfig) {
    const professionConfig = getProfessionConfig(profession)

    // 如果沒有職業設定，直接返回用戶配置
    if (!professionConfig) {
        return userConfig
    }

    // 深度合併，用戶設定優先
    const merged = JSON.parse(JSON.stringify(userConfig)) // 深拷貝

    // ═══════════════════════════════════════════════════════════════════════════
    // 合併 theme（字體和顏色）
    // 只有用戶「沒有」設定的值才會使用職業預設
    // ═══════════════════════════════════════════════════════════════════════════
    const userTheme = userConfig.theme || {}

    merged.theme = {
        // 先套用系統預設
        ...DEFAULT_COLORS,
        fontFamily: DEFAULT_FONTS.body,
        headingFont: DEFAULT_FONTS.heading,
        // 再套用職業預設
        ...professionConfig.colors,
        fontFamily: professionConfig.fonts.body,
        headingFont: professionConfig.fonts.heading,
        // 最後用戶的自訂設定覆蓋（過濾掉空值）
        ...filterEmptyValues(userTheme),
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 合併 ui（只有用戶沒設定的才用職業預設）
    // ═══════════════════════════════════════════════════════════════════════════
    const userUi = userConfig.ui || {}

    merged.ui = {
        // 系統預設
        themePreset: 'default',
        heroStyle: 'split',
        gridColumns: 3,
        thumbnailRatio: '4/3',
        navStyle: 'default',
        layout: DEFAULT_LAYOUT,
        showFooter: true,
        showSocialLinks: true,
        showOtherWorks: true,
        smoothScroll: true,
        showBackToTop: true,
        // 職業預設
        themePreset: professionConfig.preset,
        heroStyle: professionConfig.heroStyle,
        gridColumns: professionConfig.gridColumns,
        thumbnailRatio: professionConfig.thumbnailRatio,
        navStyle: professionConfig.navStyle,
        layout: professionConfig.layout,
        // 用戶設定覆蓋
        ...filterEmptyValues(userUi),
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 保留其他區塊（profile, content, seo）
    // ═══════════════════════════════════════════════════════════════════════════
    merged.profile = userConfig.profile || {}
    merged.content = userConfig.content || {}
    merged.seo = userConfig.seo || {}

    return merged
}

/**
 * 過濾掉空值（null, undefined, 空字串）
 * @param {object} obj
 * @returns {object}
 */
function filterEmptyValues(obj) {
    const filtered = {}
    for (const [key, value] of Object.entries(obj)) {
        if (value !== null && value !== undefined && value !== '') {
            filtered[key] = value
        }
    }
    return filtered
}

/**
 * 檢查用戶是否有自訂某個設定
 * 用於判斷是否要套用職業預設
 *
 * @param {object} userConfig - 用戶配置
 * @param {string} path - 設定路徑，如 'theme.primaryColor'
 * @returns {boolean} 是否有自訂
 */
export function hasUserOverride(userConfig, path) {
    const keys = path.split('.')
    let value = userConfig

    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key]
        } else {
            return false
        }
    }

    // 檢查是否為有效值（非空、非預設）
    return value !== undefined && value !== null && value !== ''
}

/**
 * 取得職業的預覽資訊（用於 UI 展示）
 * @param {string} profession - 職業代碼
 * @returns {object|null}
 */
export function getProfessionPreview(profession) {
    const config = getProfessionConfig(profession)
    if (!config) return null

    return {
        label: config.label,
        emoji: config.emoji,
        preset: config.preset,
        primaryColor: config.colors.primaryColor,
        backgroundColor: config.colors.backgroundColor,
        fontFamily: config.fonts.body,
        heroStyle: config.heroStyle,
    }
}

export default {
    professionMap,
    getProfessionConfig,
    getProfessionList,
    getProfessionsByCategory,
    mergeWithProfessionDefaults,
    hasUserOverride,
    getProfessionPreview,
}
