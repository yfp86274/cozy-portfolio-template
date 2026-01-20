/**
 * Profession Map - 職業風格映射系統 v2.0
 *
 * 🪄 魔法功能：讓用戶只需填寫職業，就能自動套用最適合的視覺風格。
 *
 * v2.0 更新：大幅增強各職業間的視覺區別度
 * - 色彩方案：每個類別使用完全不同的色調
 * - 字體組合：更極端的搭配差異
 * - UI 配置：圓角從銳利到圓潤、動畫從沉穩到活潑
 * - 佈局：不同的格線、比例、Hero 樣式
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

/** 預設 UI 配置 */
export const DEFAULT_UI_CONFIG = {
    thumbnailRatio: '4:3',
    borderRadius: 'medium',
    animationSpeed: 1,
    cardStyle: 'default',       // 'default' | 'minimal' | 'bordered' | 'elevated'
    hoverEffect: 'lift',        // 'lift' | 'glow' | 'scale' | 'none'
}

/** 預設情感化文案 */
export const DEFAULT_COPYWRITING = {
    notFoundTitle: '找不到頁面',
    notFoundMessage: '您要找的頁面似乎不存在',
    notFoundEmoji: '🔍',
    loadingText: '載入中...',
    errorTitle: '出了點問題',
    errorMessage: '請稍後再試',
}

/** 圓角映射 */
export const BORDER_RADIUS_MAP = {
    none: '0px',
    small: '4px',
    medium: '8px',
    large: '16px',
    xl: '24px',
    pill: '9999px',
}

// ═══════════════════════════════════════════════════════════════════════════
// 職業定義 - 大幅增強區別度版本
// ═══════════════════════════════════════════════════════════════════════════

export const professionMap = {
    // ═══════════════════════════════════════════════════════════════════════════
    // 🍳 餐飲類 - 米其林風格：極簡、留白、高對比
    // ═══════════════════════════════════════════════════════════════════════════
    chef: {
        label: '廚師 / 料理人',
        emoji: '🍳',
        category: 'food',
        preset: 'minimal',
        fonts: {
            body: 'Inter',
            heading: 'Cormorant Garamond',  // 優雅襯線體
        },
        colors: {
            primaryColor: '#0a0a0a',         // 純黑
            secondaryColor: '#c9a87c',       // 香檳金
            backgroundColor: '#fafafa',      // 幾乎純白
            textColor: '#0a0a0a',
            mutedColor: '#757575',
        },
        heroStyle: 'minimal',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 2,                      // 大圖展示
        thumbnailRatio: '3/2',
        navStyle: 'minimal',
        uiConfig: {
            thumbnailRatio: '1:1',
            borderRadius: 'none',            // 銳利邊角，專業感
            animationSpeed: 0.7,             // 緩慢優雅
            cardStyle: 'minimal',
            hoverEffect: 'none',
        },
        copywriting: {
            notFoundTitle: '這道菜還沒準備好',
            notFoundMessage: '請回到首頁，探索我們的拿手好菜。',
            notFoundEmoji: '🍽️',
            loadingText: '精心烹調中...',
        },
    },

    baker: {
        label: '烘焙師 / 甜點師',
        emoji: '🧁',
        category: 'food',
        preset: 'soft',
        fonts: {
            body: 'Quicksand',               // 圓潤可愛
            heading: 'Playfair Display',     // 優雅對比
        },
        colors: {
            primaryColor: '#d4a373',         // 焦糖色
            secondaryColor: '#faedcd',       // 奶油黃
            backgroundColor: '#fefae0',      // 溫暖米白
            textColor: '#6c584c',            // 巧克力棕
            mutedColor: '#a98467',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '1/1',
        navStyle: 'default',
        uiConfig: {
            thumbnailRatio: '1:1',
            borderRadius: 'xl',              // 超大圓角，像馬卡龍
            animationSpeed: 0.8,
            cardStyle: 'elevated',
            hoverEffect: 'lift',
        },
        copywriting: {
            notFoundTitle: '蛋糕還在烤箱裡',
            notFoundMessage: '這個頁面還沒出爐呢！先去看看其他甜蜜的作品吧～',
            notFoundEmoji: '🎂',
            loadingText: '烘焙中，香味四溢...',
        },
    },

    barista: {
        label: '咖啡師',
        emoji: '☕',
        category: 'food',
        preset: 'minimal',
        fonts: {
            body: 'IBM Plex Sans',           // 現代工業感
            heading: 'Libre Baskerville',    // 經典襯線
        },
        colors: {
            primaryColor: '#2c1810',         // 深咖啡
            secondaryColor: '#8b5a2b',       // 拿鐵棕
            backgroundColor: '#f5f1eb',      // 咖啡奶泡色
            textColor: '#2c1810',
            mutedColor: '#6b5344',
        },
        heroStyle: 'minimal',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '4/3',
        navStyle: 'minimal',
        uiConfig: {
            thumbnailRatio: '4:3',
            borderRadius: 'small',
            animationSpeed: 0.85,
            cardStyle: 'minimal',
            hoverEffect: 'scale',
        },
        copywriting: {
            notFoundTitle: '這杯咖啡賣完了',
            notFoundMessage: '來首頁點杯別的吧！',
            notFoundEmoji: '☕',
            loadingText: '萃取中...',
        },
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 🧶 手作類 - 溫暖有機：大地色系、手感質地
    // ═══════════════════════════════════════════════════════════════════════════
    knitter: {
        label: '編織創作者',
        emoji: '🧶',
        category: 'craft',
        preset: 'default',
        fonts: {
            body: 'Lora',                    // 溫暖襯線
            heading: 'Amatic SC',            // 手寫風格！
        },
        colors: {
            primaryColor: '#a0785a',         // 駝色
            secondaryColor: '#d4b896',       // 亞麻色
            backgroundColor: '#fdf6ec',      // 羊毛白
            textColor: '#5c4033',            // 深棕
            mutedColor: '#8b7355',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '4/5',               // 垂直比例
        navStyle: 'default',
        uiConfig: {
            thumbnailRatio: '4:5',
            borderRadius: 'large',
            animationSpeed: 0.6,             // 很慢，像織毛衣
            cardStyle: 'default',
            hoverEffect: 'lift',
        },
        copywriting: {
            notFoundTitle: '線頭斷了',
            notFoundMessage: '回首頁重新開始編織吧～',
            notFoundEmoji: '🧶',
            loadingText: '一針一線編織中...',
        },
    },

    potter: {
        label: '陶藝家',
        emoji: '🏺',
        category: 'craft',
        preset: 'default',
        fonts: {
            body: 'Nunito',
            heading: 'EB Garamond',          // 古典優雅
        },
        colors: {
            primaryColor: '#8d6e63',         // 陶土色
            secondaryColor: '#bcaaa4',       // 釉色
            backgroundColor: '#efebe9',      // 生坯白
            textColor: '#4e342e',            // 窯燒棕
            mutedColor: '#8d6e63',
        },
        heroStyle: 'centered',               // 置中展示
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '1/1',
        navStyle: 'default',
        uiConfig: {
            thumbnailRatio: '1:1',
            borderRadius: 'pill',            // 圓潤如陶器
            animationSpeed: 0.5,             // 極慢，如轆轤
            cardStyle: 'default',
            hoverEffect: 'glow',
        },
        copywriting: {
            notFoundTitle: '這件作品還在窯裡',
            notFoundMessage: '請回到首頁欣賞已完成的作品！',
            notFoundEmoji: '🏺',
            loadingText: '塑形中...',
        },
    },

    jeweler: {
        label: '珠寶 / 飾品設計師',
        emoji: '💍',
        category: 'craft',
        preset: 'soft',
        fonts: {
            body: 'Raleway',                 // 纖細優雅
            heading: 'Cinzel',               // 羅馬碑文風
        },
        colors: {
            primaryColor: '#1a1a2e',         // 深夜藍
            secondaryColor: '#c9b037',       // 純金色
            backgroundColor: '#fafafa',      // 絲絨白
            textColor: '#1a1a2e',
            mutedColor: '#6c6c6c',
        },
        heroStyle: 'centered',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 4,                      // 小圖密集展示
        thumbnailRatio: '1/1',
        navStyle: 'minimal',
        uiConfig: {
            thumbnailRatio: '1:1',
            borderRadius: 'none',            // 銳利如切割
            animationSpeed: 1.2,             // 快速閃爍
            cardStyle: 'bordered',
            hoverEffect: 'glow',             // 發光效果
        },
        copywriting: {
            notFoundTitle: '這顆寶石遺失了',
            notFoundMessage: '回首頁探索其他璀璨作品。',
            notFoundEmoji: '💎',
            loadingText: '拋光中...',
        },
    },

    leatherworker: {
        label: '皮革工藝師',
        emoji: '👜',
        category: 'craft',
        preset: 'default',
        fonts: {
            body: 'Source Serif Pro',
            heading: 'Oswald',               // 硬朗無襯線
        },
        colors: {
            primaryColor: '#3d2914',         // 深棕皮革
            secondaryColor: '#8b5a2b',       // 植鞣棕
            backgroundColor: '#f5f0e8',      // 皮革原色
            textColor: '#2d1f12',
            mutedColor: '#7a6552',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 2,
        thumbnailRatio: '4/3',
        navStyle: 'default',
        uiConfig: {
            thumbnailRatio: '4:3',
            borderRadius: 'small',           // 小圓角，精工
            animationSpeed: 0.9,
            cardStyle: 'bordered',
            hoverEffect: 'lift',
        },
        copywriting: {
            notFoundTitle: '這塊皮革還在裁切',
            notFoundMessage: '回首頁看看已完成的精品。',
            notFoundEmoji: '🧵',
            loadingText: '手工縫製中...',
        },
    },

    woodworker: {
        label: '木工 / 木藝師',
        emoji: '🪵',
        category: 'craft',
        preset: 'default',
        fonts: {
            body: 'Merriweather',
            heading: 'Josefin Sans',         // 幾何現代
        },
        colors: {
            primaryColor: '#5d4037',         // 胡桃木
            secondaryColor: '#a1887f',       // 橡木色
            backgroundColor: '#faf8f5',      // 木屑白
            textColor: '#3e2723',
            mutedColor: '#8d6e63',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 2,
        thumbnailRatio: '16/9',              // 寬幅展示家具
        navStyle: 'default',
        uiConfig: {
            thumbnailRatio: '16:9',
            borderRadius: 'small',
            animationSpeed: 0.75,
            cardStyle: 'default',
            hoverEffect: 'scale',
        },
        copywriting: {
            notFoundTitle: '這塊木頭還在雕刻',
            notFoundMessage: '回首頁欣賞完成的作品。',
            notFoundEmoji: '🪚',
            loadingText: '打磨中...',
        },
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 🎨 藝術類 - 大膽前衛：高對比、強烈個性
    // ═══════════════════════════════════════════════════════════════════════════
    artist: {
        label: '藝術家',
        emoji: '🎨',
        category: 'art',
        preset: 'bold',
        fonts: {
            body: 'Space Grotesk',           // 前衛幾何
            heading: 'Bebas Neue',           // 強烈標題
        },
        colors: {
            primaryColor: '#000000',         // 純黑
            secondaryColor: '#ff3d00',       // 螢光橘紅
            backgroundColor: '#ffffff',      // 純白
            textColor: '#000000',
            mutedColor: '#757575',
        },
        heroStyle: 'minimal',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 2,
        thumbnailRatio: '4/3',
        navStyle: 'minimal',
        uiConfig: {
            thumbnailRatio: '4:3',
            borderRadius: 'none',            // 銳利畫框
            animationSpeed: 1.4,             // 快速俐落
            cardStyle: 'minimal',
            hoverEffect: 'none',
        },
        copywriting: {
            notFoundTitle: '作品創作中',
            notFoundMessage: '回首頁探索已展出的作品。',
            notFoundEmoji: '🖼️',
            loadingText: '靈感湧現中...',
        },
    },

    illustrator: {
        label: '插畫家',
        emoji: '✏️',
        category: 'art',
        preset: 'bold',
        fonts: {
            body: 'Nunito',                  // 圓潤友善
            heading: 'Righteous',            // 復古卡通
        },
        colors: {
            primaryColor: '#5c6bc0',         // 靛藍紫
            secondaryColor: '#ffab91',       // 珊瑚橘
            backgroundColor: '#fafafa',
            textColor: '#37474f',
            mutedColor: '#78909c',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '1/1',
        navStyle: 'default',
        uiConfig: {
            thumbnailRatio: '1:1',
            borderRadius: 'large',           // 圓潤可愛
            animationSpeed: 1.2,
            cardStyle: 'elevated',
            hoverEffect: 'scale',
        },
        copywriting: {
            notFoundTitle: '這張圖還在繪製',
            notFoundMessage: '先去看看其他插畫吧！',
            notFoundEmoji: '✏️',
            loadingText: '描繪中...',
        },
    },

    photographer: {
        label: '攝影師',
        emoji: '📷',
        category: 'art',
        preset: 'minimal',
        fonts: {
            body: 'Work Sans',
            heading: 'Montserrat',           // 現代幾何
        },
        colors: {
            primaryColor: '#212121',         // 暗房黑
            secondaryColor: '#424242',
            backgroundColor: '#fafafa',
            textColor: '#212121',
            mutedColor: '#9e9e9e',
        },
        heroStyle: 'minimal',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '3/2',               // 經典攝影比例
        navStyle: 'minimal',
        uiConfig: {
            thumbnailRatio: '3:2',
            borderRadius: 'none',            // 無邊框，純粹
            animationSpeed: 1.0,
            cardStyle: 'minimal',
            hoverEffect: 'scale',
        },
        copywriting: {
            notFoundTitle: '曝光不足',
            notFoundMessage: '回首頁瀏覽其他攝影作品。',
            notFoundEmoji: '📸',
            loadingText: '對焦中...',
        },
    },

    designer: {
        label: '設計師',
        emoji: '🎯',
        category: 'art',
        preset: 'bold',
        fonts: {
            body: 'Inter',
            heading: 'Syne',                 // 實驗性
        },
        colors: {
            primaryColor: '#0066ff',         // 科技藍
            secondaryColor: '#00d4aa',       // 薄荷綠
            backgroundColor: '#f0f4f8',      // 冷灰藍
            textColor: '#1a202c',
            mutedColor: '#718096',
        },
        heroStyle: 'centered',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '16/9',
        navStyle: 'minimal',
        uiConfig: {
            thumbnailRatio: '16:9',
            borderRadius: 'medium',
            animationSpeed: 1.3,             // 俐落
            cardStyle: 'elevated',
            hoverEffect: 'lift',
        },
        copywriting: {
            notFoundTitle: '設計稿遺失',
            notFoundMessage: '回首頁看看其他設計作品。',
            notFoundEmoji: '🎨',
            loadingText: '渲染中...',
        },
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 🌸 花藝 / 自然類 - 柔美浪漫：粉彩、有機曲線
    // ═══════════════════════════════════════════════════════════════════════════
    florist: {
        label: '花藝師',
        emoji: '🌸',
        category: 'nature',
        preset: 'soft',
        fonts: {
            body: 'Karla',
            heading: 'Cormorant Garamond',   // 優雅襯線
        },
        colors: {
            primaryColor: '#c48b9f',         // 玫瑰粉
            secondaryColor: '#e8d5b7',       // 花蕊黃
            backgroundColor: '#fdf8f5',      // 花瓣白
            textColor: '#5d4e60',            // 紫灰
            mutedColor: '#9a8f97',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '4/5',               // 垂直花束
        navStyle: 'default',
        uiConfig: {
            thumbnailRatio: '4:5',
            borderRadius: 'xl',              // 超大圓角
            animationSpeed: 0.6,             // 優雅緩慢
            cardStyle: 'default',
            hoverEffect: 'glow',
        },
        copywriting: {
            notFoundTitle: '花朵還在含苞',
            notFoundMessage: '回首頁欣賞盛開的花藝作品。',
            notFoundEmoji: '🌷',
            loadingText: '花朵綻放中...',
        },
    },

    gardener: {
        label: '園藝師',
        emoji: '🌿',
        category: 'nature',
        preset: 'soft',
        fonts: {
            body: 'Nunito Sans',
            heading: 'Abril Fatface',        // 有機曲線
        },
        colors: {
            primaryColor: '#2d6a4f',         // 森林綠
            secondaryColor: '#95d5b2',       // 嫩葉綠
            backgroundColor: '#f1faee',      // 新芽白
            textColor: '#1b4332',            // 深綠
            mutedColor: '#52796f',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 3,
        thumbnailRatio: '4/3',
        navStyle: 'default',
        uiConfig: {
            thumbnailRatio: '4:3',
            borderRadius: 'large',
            animationSpeed: 0.65,
            cardStyle: 'default',
            hoverEffect: 'lift',
        },
        copywriting: {
            notFoundTitle: '種子還在發芽',
            notFoundMessage: '回首頁看看已經茂盛的花園。',
            notFoundEmoji: '🌱',
            loadingText: '澆水施肥中...',
        },
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 💆 療癒 / 服務類 - 平靜放鬆：莫蘭迪色、極慢動畫
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
            primaryColor: '#5f7161',         // 鼠尾草綠
            secondaryColor: '#a7c4a0',       // 薄荷綠
            backgroundColor: '#f5f7f4',      // 薄霧白
            textColor: '#3d4a3f',
            mutedColor: '#7d8a7e',
        },
        heroStyle: 'centered',
        layout: ['Hero', 'About', 'Works', 'Contact'],
        gridColumns: 2,
        thumbnailRatio: '16/9',
        navStyle: 'default',
        uiConfig: {
            thumbnailRatio: '16:9',
            borderRadius: 'pill',            // 藥丸形，溫柔
            animationSpeed: 0.45,            // 極慢，平靜
            cardStyle: 'default',
            hoverEffect: 'glow',
        },
        copywriting: {
            notFoundTitle: '這裡是安全的空間',
            notFoundMessage: '讓我們回到首頁，繼續這段旅程。',
            notFoundEmoji: '🌿',
            loadingText: '深呼吸，放鬆...',
        },
    },

    yoga: {
        label: '瑜伽老師',
        emoji: '🧘',
        category: 'wellness',
        preset: 'soft',
        fonts: {
            body: 'Lato',
            heading: 'Cormorant',            // 流動優雅
        },
        colors: {
            primaryColor: '#9d8189',         // 藕粉
            secondaryColor: '#d8c3a5',       // 沙色
            backgroundColor: '#f8f4f0',      // 棉麻白
            textColor: '#4a4a4a',
            mutedColor: '#8a857e',
        },
        heroStyle: 'centered',
        layout: ['Hero', 'About', 'Works', 'Contact'],
        gridColumns: 2,
        thumbnailRatio: '3/2',
        navStyle: 'default',
        uiConfig: {
            thumbnailRatio: '3:2',
            borderRadius: 'xl',
            animationSpeed: 0.4,             // 最慢，冥想
            cardStyle: 'minimal',
            hoverEffect: 'none',
        },
        copywriting: {
            notFoundTitle: '呼吸，然後放下',
            notFoundMessage: '從首頁重新開始。',
            notFoundEmoji: '🕊️',
            loadingText: '吸氣...吐氣...',
        },
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 🏠 建築 / 空間類 - 專業結構：黑白灰、銳利線條
    // ═══════════════════════════════════════════════════════════════════════════
    architect: {
        label: '建築師',
        emoji: '🏛️',
        category: 'space',
        preset: 'minimal',
        fonts: {
            body: 'Inter',
            heading: 'Archivo Black',        // 粗黑幾何
        },
        colors: {
            primaryColor: '#1a1a1a',
            secondaryColor: '#333333',
            backgroundColor: '#ffffff',
            textColor: '#1a1a1a',
            mutedColor: '#666666',
        },
        heroStyle: 'minimal',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 2,
        thumbnailRatio: '16/9',
        navStyle: 'minimal',
        uiConfig: {
            thumbnailRatio: '16:9',
            borderRadius: 'none',            // 絕對銳利
            animationSpeed: 1.5,             // 最快，精準
            cardStyle: 'minimal',
            hoverEffect: 'none',
        },
        copywriting: {
            notFoundTitle: '藍圖遺失',
            notFoundMessage: '回首頁探索已完工的建築作品。',
            notFoundEmoji: '📐',
            loadingText: '結構計算中...',
        },
    },

    interior: {
        label: '室內設計師',
        emoji: '🛋️',
        category: 'space',
        preset: 'minimal',
        fonts: {
            body: 'DM Sans',
            heading: 'Playfair Display',     // 優雅對比
        },
        colors: {
            primaryColor: '#4a4a4a',
            secondaryColor: '#b8a99a',       // 奶茶色
            backgroundColor: '#f8f6f3',      // 亞麻白
            textColor: '#2d2d2d',
            mutedColor: '#8a8a8a',
        },
        heroStyle: 'split',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 2,
        thumbnailRatio: '4/3',
        navStyle: 'default',
        uiConfig: {
            thumbnailRatio: '4:3',
            borderRadius: 'small',
            animationSpeed: 1.1,
            cardStyle: 'bordered',
            hoverEffect: 'lift',
        },
        copywriting: {
            notFoundTitle: '空間還在規劃',
            notFoundMessage: '回首頁看看已經佈置好的空間。',
            notFoundEmoji: '🏠',
            loadingText: '空間規劃中...',
        },
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 🎵 音樂 / 表演類 - 動感活力：高對比、快速動畫
    // ═══════════════════════════════════════════════════════════════════════════
    musician: {
        label: '音樂人',
        emoji: '🎵',
        category: 'performance',
        preset: 'bold',
        fonts: {
            body: 'Rubik',
            heading: 'Anton',                // 超粗黑
        },
        colors: {
            primaryColor: '#1a1a1a',
            secondaryColor: '#ff1744',       // 電吉他紅
            backgroundColor: '#fafafa',
            textColor: '#1a1a1a',
            mutedColor: '#757575',
        },
        heroStyle: 'centered',
        layout: ['Hero', 'Works', 'OtherWorks'],
        gridColumns: 2,
        thumbnailRatio: '1/1',               // 專輯封面
        navStyle: 'minimal',
        uiConfig: {
            thumbnailRatio: '1:1',
            borderRadius: 'small',
            animationSpeed: 1.5,             // 快節奏
            cardStyle: 'elevated',
            hoverEffect: 'scale',
        },
        copywriting: {
            notFoundTitle: '這首歌還在錄製',
            notFoundMessage: '回首頁聆聽其他已發行的作品！',
            notFoundEmoji: '🎸',
            loadingText: '調音中...',
        },
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 📝 文字 / 教育類 - 知性沉穩：書卷氣、慢速
    // ═══════════════════════════════════════════════════════════════════════════
    writer: {
        label: '作家 / 文字工作者',
        emoji: '📝',
        category: 'writing',
        preset: 'soft',
        fonts: {
            body: 'Crimson Text',            // 書籍襯線
            heading: 'Playfair Display',
        },
        colors: {
            primaryColor: '#3d3d3d',
            secondaryColor: '#8b7355',       // 墨水棕
            backgroundColor: '#fffef8',      // 書頁黃
            textColor: '#2d2d2d',
            mutedColor: '#6b6b6b',
        },
        heroStyle: 'centered',
        layout: ['Hero', 'About', 'Works'],
        gridColumns: 2,
        thumbnailRatio: '3/2',
        navStyle: 'default',
        uiConfig: {
            thumbnailRatio: '3:2',
            borderRadius: 'small',
            animationSpeed: 0.7,
            cardStyle: 'bordered',
            hoverEffect: 'lift',
        },
        copywriting: {
            notFoundTitle: '這一頁還是空白',
            notFoundMessage: '回首頁閱讀已發表的作品。',
            notFoundEmoji: '📖',
            loadingText: '文字編織中...',
        },
    },

    teacher: {
        label: '老師 / 講師',
        emoji: '📚',
        category: 'education',
        preset: 'soft',
        fonts: {
            body: 'Nunito',                  // 友善易讀
            heading: 'Poppins',              // 現代清晰
        },
        colors: {
            primaryColor: '#3949ab',         // 學院藍
            secondaryColor: '#7986cb',
            backgroundColor: '#f5f7ff',      // 淺藍白
            textColor: '#1a237e',
            mutedColor: '#7986cb',
        },
        heroStyle: 'split',
        layout: ['Hero', 'About', 'Works', 'Contact'],
        gridColumns: 3,
        thumbnailRatio: '16/9',
        navStyle: 'default',
        uiConfig: {
            thumbnailRatio: '16:9',
            borderRadius: 'medium',
            animationSpeed: 1.0,
            cardStyle: 'elevated',
            hoverEffect: 'lift',
        },
        copywriting: {
            notFoundTitle: '這堂課還沒開始',
            notFoundMessage: '回首頁看看其他精彩的課程。',
            notFoundEmoji: '🎓',
            loadingText: '備課中...',
        },
    },
}

// ═══════════════════════════════════════════════════════════════════════════
// 輔助函數
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 過濾空值
 */
function filterEmptyValues(obj) {
    if (!obj || typeof obj !== 'object') return {}
    return Object.fromEntries(
        Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && v !== '')
    )
}

/**
 * 取得職業設定
 */
export function getProfessionConfig(profession) {
    if (!profession) return null
    const normalized = profession.toLowerCase().trim()
    return professionMap[normalized] || null
}

/**
 * 取得所有可用的職業列表
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
 * 取得職業的 UI 配置
 */
export function getUiConfig(profession, userUiConfig = {}) {
    const professionConfig = getProfessionConfig(profession)
    const defaults = {...DEFAULT_UI_CONFIG}
    const professionDefaults = professionConfig?.uiConfig || {}
    return {
        ...defaults,
        ...professionDefaults,
        ...filterEmptyValues(userUiConfig),
    }
}

/**
 * 取得職業的情感化文案
 */
export function getCopywriting(profession, userCopywriting = {}) {
    const professionConfig = getProfessionConfig(profession)
    const defaults = {...DEFAULT_COPYWRITING}
    const professionDefaults = professionConfig?.copywriting || {}
    if (professionConfig?.emoji && !professionDefaults.notFoundEmoji) {
        professionDefaults.notFoundEmoji = professionConfig.emoji
    }
    return {
        ...defaults,
        ...professionDefaults,
        ...filterEmptyValues(userCopywriting),
    }
}

/**
 * 取得圓角的 CSS 值
 */
export function getBorderRadiusValue(borderRadius) {
    return BORDER_RADIUS_MAP[borderRadius] || BORDER_RADIUS_MAP.medium
}

/**
 * 取得動畫持續時間
 */
export function getAnimationDuration(animationSpeed = 1, baseDuration = 300) {
    return Math.round(baseDuration / animationSpeed)
}

/**
 * 將縮圖比例轉換為 CSS aspect-ratio 值
 */
export function getThumbnailAspectRatio(ratio) {
    if (!ratio) return '4/3'
    return ratio.replace(':', '/')
}

/**
 * 合併職業預設和用戶設定
 */
export function mergeWithProfessionDefaults(profession, userConfig) {
    const professionConfig = getProfessionConfig(profession)
    if (!professionConfig) {
        return userConfig
    }

    const merged = JSON.parse(JSON.stringify(userConfig))

    // 合併 theme
    const userTheme = userConfig.theme || {}
    merged.theme = {
        fontFamily: userTheme.fontFamily || professionConfig.fonts?.body || DEFAULT_FONTS.body,
        headingFont: userTheme.headingFont || professionConfig.fonts?.heading || DEFAULT_FONTS.heading,
        primaryColor: userTheme.primaryColor || professionConfig.colors?.primaryColor || DEFAULT_COLORS.primaryColor,
        secondaryColor: userTheme.secondaryColor || professionConfig.colors?.secondaryColor || DEFAULT_COLORS.secondaryColor,
        backgroundColor: userTheme.backgroundColor || professionConfig.colors?.backgroundColor || DEFAULT_COLORS.backgroundColor,
        textColor: userTheme.textColor || professionConfig.colors?.textColor || DEFAULT_COLORS.textColor,
        mutedColor: userTheme.mutedColor || professionConfig.colors?.mutedColor || DEFAULT_COLORS.mutedColor,
    }

    // 合併 ui
    const userUi = userConfig.ui || {}
    merged.ui = {
        ...userUi,
        themePreset: userUi.themePreset || professionConfig.preset || 'default',
        heroStyle: userUi.heroStyle || professionConfig.heroStyle || 'split',
        gridColumns: userUi.gridColumns || professionConfig.gridColumns || 3,
        thumbnailRatio: userUi.thumbnailRatio || professionConfig.thumbnailRatio || '4/3',
        navStyle: userUi.navStyle || professionConfig.navStyle || 'default',
        layout: userUi.layout || professionConfig.layout || DEFAULT_LAYOUT,
    }

    // 合併 uiConfig
    merged.uiConfig = getUiConfig(profession, userConfig.uiConfig)

    // 合併 copywriting
    merged.copywriting = getCopywriting(profession, userConfig.copywriting)

    // 保留其他配置
    merged.profile = userConfig.profile || {}
    merged.content = userConfig.content || {}
    merged.seo = userConfig.seo || {}

    return merged
}
