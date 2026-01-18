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
 *   - 情感化的 UI 設定和文案
 *
 * 優先級（高到低）：
 * 1. 用戶在 config 中明確設定的值
 * 2. 職業預設值
 * 3. 系統預設值
 *
 * 新增功能：
 * - uiConfig: 控制深層 UI 行為（圖片比例、圓角、動畫速度）
 * - copywriting: 情感化文案（404 頁面、載入中文字）
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
    thumbnailRatio: '4:3',      // 預設縮圖比例
    borderRadius: 'medium',     // 'none' | 'small' | 'medium' | 'large' | 'pill'
    animationSpeed: 1,          // 動畫速度係數 (0.5 = 慢, 1 = 正常, 1.5 = 快)
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

/** 圓角映射 - 將語意化名稱轉換為 CSS 值 */
export const BORDER_RADIUS_MAP = {
    none: '0px',
    small: '4px',
    medium: '8px',
    large: '16px',
    pill: '9999px',
}

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
 * - uiConfig: 深層 UI 配置 { thumbnailRatio, borderRadius, animationSpeed }
 * - copywriting: 情感化文案 { notFoundTitle, notFoundMessage, notFoundEmoji, loadingText }
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
        uiConfig: {
            thumbnailRatio: '1:1',      // 像盤子一樣的圓形比例
            borderRadius: 'large',      // 大圓角，溫潤如瓷器
            animationSpeed: 0.8,        // 稍慢，優雅從容
        },
        copywriting: {
            notFoundTitle: '這道菜還沒準備好',
            notFoundMessage: '哎呀，這個頁面還在備料中，請回到首頁看看我們的拿手好菜！',
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
        uiConfig: {
            thumbnailRatio: '1:1',      // Instagram 風格，展示甜點
            borderRadius: 'large',      // 柔軟圓潤，像麵團
            animationSpeed: 0.9,        // 溫柔緩慢
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
        uiConfig: {
            thumbnailRatio: '4:3',      // 經典比例，展示拉花
            borderRadius: 'medium',     // 中等圓角，如咖啡杯
            animationSpeed: 0.85,       // 從容不迫
        },
        copywriting: {
            notFoundTitle: '這杯咖啡賣完了',
            notFoundMessage: '抱歉，這個頁面像今日特調一樣已經完售。來首頁點杯別的吧！',
            notFoundEmoji: '☕',
            loadingText: '萃取中，請稍候...',
        },
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
        uiConfig: {
            thumbnailRatio: '4:5',      // 垂直比例，展示穿搭
            borderRadius: 'medium',     // 柔和圓角，如毛線球
            animationSpeed: 0.75,       // 慢慢來，像織毛衣
        },
        copywriting: {
            notFoundTitle: '線頭斷了',
            notFoundMessage: '糟糕，這個頁面的線頭找不到了！回首頁重新開始編織吧～',
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
        uiConfig: {
            thumbnailRatio: '1:1',      // 正方形，展示器皿
            borderRadius: 'large',      // 大圓角，如陶器曲線
            animationSpeed: 0.7,        // 緩慢，如轆轤轉動
        },
        copywriting: {
            notFoundTitle: '這件作品還在窯裡',
            notFoundMessage: '這個頁面還在等待燒製，請回到首頁欣賞已完成的作品！',
            notFoundEmoji: '🏺',
            loadingText: '塑形中，泥土正在成形...',
        },
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
        uiConfig: {
            thumbnailRatio: '1:1',      // 正方形，珠寶特寫
            borderRadius: 'small',      // 小圓角，精緻感
            animationSpeed: 1.1,        // 略快，閃爍效果
        },
        copywriting: {
            notFoundTitle: '這顆寶石遺失了',
            notFoundMessage: '這個頁面像顆珍貴的寶石一樣不見了，回首頁探索其他璀璨作品吧！',
            notFoundEmoji: '💎',
            loadingText: '拋光中，即將閃耀...',
        },
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
        uiConfig: {
            thumbnailRatio: '4:3',      // 經典比例，展示皮件細節
            borderRadius: 'small',      // 小圓角，俐落如切割
            animationSpeed: 0.9,        // 沉穩
        },
        copywriting: {
            notFoundTitle: '這塊皮革還在裁切',
            notFoundMessage: '這個頁面的皮革還沒準備好，回首頁看看已完成的精品吧！',
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
        uiConfig: {
            thumbnailRatio: '16:9',     // 寬螢幕比例，展示家具
            borderRadius: 'small',      // 小圓角，木工精準
            animationSpeed: 0.8,        // 穩重
        },
        copywriting: {
            notFoundTitle: '這塊木頭還在雕刻',
            notFoundMessage: '這個頁面的木料還在工作台上，回首頁欣賞完成的作品吧！',
            notFoundEmoji: '🪚',
            loadingText: '打磨中，木屑紛飛...',
        },
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
        uiConfig: {
            thumbnailRatio: '4:3',      // 經典畫框比例
            borderRadius: 'none',       // 無圓角，畫框感
            animationSpeed: 1.2,        // 快速，充滿活力
        },
        copywriting: {
            notFoundTitle: '這幅畫還在創作中',
            notFoundMessage: '藝術需要時間醞釀，這個頁面尚未完成。回首頁探索已展出的作品！',
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
        uiConfig: {
            thumbnailRatio: '1:1',      // 正方形，社群友善
            borderRadius: 'medium',     // 中等圓角，親切感
            animationSpeed: 1.1,        // 活潑
        },
        copywriting: {
            notFoundTitle: '這張圖還在繪製',
            notFoundMessage: '鉛筆還在紙上跳舞，這個頁面尚未完成。先去看看其他插畫吧！',
            notFoundEmoji: '✏️',
            loadingText: '描繪中，線條成形...',
        },
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
        uiConfig: {
            thumbnailRatio: '3:2',      // 經典攝影比例
            borderRadius: 'none',       // 無圓角，專業感
            animationSpeed: 1,          // 標準速度
        },
        copywriting: {
            notFoundTitle: '這張照片曝光不足',
            notFoundMessage: '快門還沒按下，這個頁面尚未捕捉到。回首頁瀏覽其他攝影作品！',
            notFoundEmoji: '📸',
            loadingText: '對焦中，準備捕捉...',
        },
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
        uiConfig: {
            thumbnailRatio: '16:9',     // 螢幕比例，展示 UI
            borderRadius: 'medium',     // 現代圓角
            animationSpeed: 1.15,       // 俐落快速
        },
        copywriting: {
            notFoundTitle: '設計稿遺失了',
            notFoundMessage: '這個頁面的設計稿不小心被刪掉了！回首頁看看其他設計作品吧～',
            notFoundEmoji: '🎨',
            loadingText: '渲染中，像素排列...',
        },
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
        uiConfig: {
            thumbnailRatio: '4:5',      // 垂直比例，展示花束
            borderRadius: 'large',      // 大圓角，柔美花瓣
            animationSpeed: 0.7,        // 優雅緩慢
        },
        copywriting: {
            notFoundTitle: '這束花還在含苞',
            notFoundMessage: '這個頁面的花朵還沒綻放，回首頁欣賞盛開的花藝作品吧！',
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
        uiConfig: {
            thumbnailRatio: '4:3',      // 經典比例，展示庭園
            borderRadius: 'medium',     // 中等圓角，自然感
            animationSpeed: 0.75,       // 緩慢生長
        },
        copywriting: {
            notFoundTitle: '這片園地還在播種',
            notFoundMessage: '種子還在土裡等待發芽，回首頁看看已經茂盛的花園吧！',
            notFoundEmoji: '🌱',
            loadingText: '澆水施肥中，靜待成長...',
        },
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
        uiConfig: {
            thumbnailRatio: '16:9',     // 寬廣舒適
            borderRadius: 'pill',       // 藥丸形狀，溫柔親和
            animationSpeed: 0.6,        // 非常緩慢，平靜
        },
        copywriting: {
            notFoundTitle: '這裡是個安全的空間',
            notFoundMessage: '雖然這個頁面不存在，但沒關係，讓我們回到首頁，繼續這段旅程。',
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
        uiConfig: {
            thumbnailRatio: '3:2',      // 平衡比例
            borderRadius: 'large',      // 大圓角，流動感
            animationSpeed: 0.5,        // 極慢，冥想般
        },
        copywriting: {
            notFoundTitle: '呼吸，然後放下',
            notFoundMessage: '這個頁面已經隨風而去，讓我們回到當下，從首頁重新開始。',
            notFoundEmoji: '🕊️',
            loadingText: '吸氣...吐氣...',
        },
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
        uiConfig: {
            thumbnailRatio: '16:9',     // 寬螢幕，展示建築全景
            borderRadius: 'none',       // 無圓角，直線美學
            animationSpeed: 1.2,        // 俐落精準
        },
        copywriting: {
            notFoundTitle: '這裡的藍圖遺失了',
            notFoundMessage: '這個空間的設計圖還在繪製中，回首頁探索已完工的建築作品！',
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
        uiConfig: {
            thumbnailRatio: '4:3',      // 經典空間比例
            borderRadius: 'small',      // 小圓角，現代感
            animationSpeed: 1,          // 標準速度
        },
        copywriting: {
            notFoundTitle: '這個空間還在規劃',
            notFoundMessage: '這個頁面的家具還沒擺好，回首頁看看已經佈置好的空間吧！',
            notFoundEmoji: '🏠',
            loadingText: '空間規劃中...',
        },
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
        uiConfig: {
            thumbnailRatio: '1:1',      // 專輯封面比例
            borderRadius: 'small',      // 小圓角，唱片感
            animationSpeed: 1.3,        // 快速，節奏感
        },
        copywriting: {
            notFoundTitle: '這首歌還在錄製',
            notFoundMessage: '這個頁面的旋律還沒完成，回首頁聆聽其他已發行的作品！',
            notFoundEmoji: '🎸',
            loadingText: '調音中，準備演出...',
        },
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
        uiConfig: {
            thumbnailRatio: '3:2',      // 書本比例
            borderRadius: 'small',      // 小圓角，書頁感
            animationSpeed: 0.8,        // 沉穩
        },
        copywriting: {
            notFoundTitle: '這一頁還是空白',
            notFoundMessage: '故事還在醞釀，這個頁面的文字尚未落筆。回首頁閱讀已發表的作品！',
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
        uiConfig: {
            thumbnailRatio: '16:9',     // 投影片比例
            borderRadius: 'medium',     // 中等圓角，友善
            animationSpeed: 1,          // 標準速度
        },
        copywriting: {
            notFoundTitle: '這堂課還沒開始',
            notFoundMessage: '教室裡還沒有內容，回首頁看看其他精彩的課程吧！',
            notFoundEmoji: '🎓',
            loadingText: '備課中，知識整理...',
        },
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
 * 取得職業的 UI 配置
 * 優先級：用戶設定 > 職業預設 > 系統預設
 *
 * @param {string} profession - 職業代碼
 * @param {object} userUiConfig - 用戶自訂的 UI 配置
 * @returns {object} 合併後的 UI 配置
 */
export function getUiConfig(profession, userUiConfig = {}) {
    const professionConfig = getProfessionConfig(profession)

    // 系統預設
    const defaults = {...DEFAULT_UI_CONFIG}

    // 職業預設
    const professionDefaults = professionConfig?.uiConfig || {}

    // 合併（用戶設定優先）
    return {
        ...defaults,
        ...professionDefaults,
        ...filterEmptyValues(userUiConfig),
    }
}

/**
 * 取得職業的情感化文案
 * 優先級：用戶設定 > 職業預設 > 系統預設
 *
 * @param {string} profession - 職業代碼
 * @param {object} userCopywriting - 用戶自訂的文案
 * @returns {object} 合併後的文案配置
 */
export function getCopywriting(profession, userCopywriting = {}) {
    const professionConfig = getProfessionConfig(profession)

    // 系統預設
    const defaults = {...DEFAULT_COPYWRITING}

    // 職業預設
    const professionDefaults = professionConfig?.copywriting || {}

    // 如果職業有設定 emoji，也用於 notFoundEmoji
    if (professionConfig?.emoji && !professionDefaults.notFoundEmoji) {
        professionDefaults.notFoundEmoji = professionConfig.emoji
    }

    // 合併（用戶設定優先）
    return {
        ...defaults,
        ...professionDefaults,
        ...filterEmptyValues(userCopywriting),
    }
}

/**
 * 取得圓角的 CSS 值
 * @param {string} borderRadius - 圓角名稱（'none' | 'small' | 'medium' | 'large' | 'pill'）
 * @returns {string} CSS 值
 */
export function getBorderRadiusValue(borderRadius) {
    return BORDER_RADIUS_MAP[borderRadius] || BORDER_RADIUS_MAP.medium
}

/**
 * 取得動畫持續時間
 * 基於動畫速度係數計算
 *
 * @param {number} animationSpeed - 動畫速度係數
 * @param {number} baseDuration - 基礎持續時間（毫秒）
 * @returns {number} 調整後的持續時間（毫秒）
 */
export function getAnimationDuration(animationSpeed = 1, baseDuration = 300) {
    // 速度係數越高，持續時間越短
    return Math.round(baseDuration / animationSpeed)
}

/**
 * 將縮圖比例轉換為 CSS aspect-ratio 值
 * @param {string} ratio - 比例字串（如 '4:3', '16:9', '1:1'）
 * @returns {string} CSS aspect-ratio 值（如 '4/3'）
 */
export function getThumbnailAspectRatio(ratio) {
    if (!ratio) return '4/3'
    return ratio.replace(':', '/')
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
    // 合併 uiConfig（深層 UI 配置）
    // ═══════════════════════════════════════════════════════════════════════════
    const userUiConfig = userConfig.uiConfig || {}

    merged.uiConfig = getUiConfig(profession, userUiConfig)

    // ═══════════════════════════════════════════════════════════════════════════
    // 合併 copywriting（情感化文案）
    // ═══════════════════════════════════════════════════════════════════════════
    const userCopywriting = userConfig.copywriting || {}

    merged.copywriting = getCopywriting(profession, userCopywriting)

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
        uiConfig: config.uiConfig,
        copywriting: config.copywriting,
    }
}

export default {
    professionMap,
    getProfessionConfig,
    getProfessionList,
    getProfessionsByCategory,
    getUiConfig,
    getCopywriting,
    getBorderRadiusValue,
    getAnimationDuration,
    getThumbnailAspectRatio,
    mergeWithProfessionDefaults,
    hasUserOverride,
    getProfessionPreview,
    DEFAULT_UI_CONFIG,
    DEFAULT_COPYWRITING,
    BORDER_RADIUS_MAP,
}
