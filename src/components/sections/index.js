/**
 * Section Components Index
 *
 * 匯出所有可用的區塊組件
 * 用於 HomeView 的動態佈局系統
 *
 * 新增區塊步驟：
 * 1. 在此資料夾建立 SectionXxx.vue
 * 2. 在下方加入 export 和 sectionComponents 映射
 * 3. 在 sectionMeta 加入區塊元資料
 * 4. 在 public/schema.json 的 ui.layout.items.enum 加入新區塊名稱
 */

// ═══════════════════════════════════════════════════════════════════════════
// 核心區塊
// ═══════════════════════════════════════════════════════════════════════════
export {default as SectionHero} from './SectionHero.vue'
export {default as SectionWorks} from './SectionWorks.vue'
export {default as SectionOtherWorks} from './SectionOtherWorks.vue'
export {default as SectionAbout} from './SectionAbout.vue'
export {default as SectionContact} from './SectionContact.vue'

// ═══════════════════════════════════════════════════════════════════════════
// 區塊組件映射（用於動態載入）
// ═══════════════════════════════════════════════════════════════════════════
export const sectionComponents = {
    Hero: () => import('./SectionHero.vue'),
    Works: () => import('./SectionWorks.vue'),
    OtherWorks: () => import('./SectionOtherWorks.vue'),
    About: () => import('./SectionAbout.vue'),
    Contact: () => import('./SectionContact.vue'),
    // 預留未來擴展
    // Gallery: () => import('./SectionGallery.vue'),
    // Testimonials: () => import('./SectionTestimonials.vue'),
}

// ═══════════════════════════════════════════════════════════════════════════
// 區塊元資料（用於 UI 顯示和文檔）
// ═══════════════════════════════════════════════════════════════════════════
export const sectionMeta = {
    Hero: {
        name: 'Hero',
        label: '主視覺區塊',
        emoji: '🏠',
        description: '首頁的主要視覺區域，包含標題、副標題和行動按鈕',
        required: false,
        configKeys: ['content.heroTitle', 'content.heroSubtitle', 'content.heroButtonText', 'ui.heroStyle'],
    },
    Works: {
        name: 'Works',
        label: '作品展示',
        emoji: '📁',
        description: '以格線方式展示您的主要作品',
        required: false,
        configKeys: ['content.worksTitle', 'ui.gridColumns', 'ui.thumbnailRatio'],
    },
    OtherWorks: {
        name: 'OtherWorks',
        label: '其他作品',
        emoji: '📂',
        description: '展示次要或額外的作品',
        required: false,
        configKeys: ['content.otherWorksTitle', 'ui.showOtherWorks'],
    },
    About: {
        name: 'About',
        label: '關於我',
        emoji: '👤',
        description: '詳細的自我介紹區塊，包含大頭照和社群連結',
        required: false,
        configKeys: ['content.aboutTitle', 'content.aboutContent', 'profile.bio', 'profile.avatar'],
    },
    Contact: {
        name: 'Contact',
        label: '聯絡資訊',
        emoji: '📞',
        description: '展示聯絡方式，引導訪客與您聯繫',
        required: false,
        configKeys: ['content.contactTitle', 'content.contactMessage', 'profile.email'],
    },
    // 預留未來擴展
    Gallery: {
        name: 'Gallery',
        label: '相簿展示',
        emoji: '🖼️',
        description: '以相簿形式展示圖片（即將推出）',
        required: false,
        configKeys: [],
        comingSoon: true,
    },
    Testimonials: {
        name: 'Testimonials',
        label: '客戶評價',
        emoji: '💬',
        description: '展示客戶的好評與推薦（即將推出）',
        required: false,
        configKeys: [],
        comingSoon: true,
    },
}

// ═══════════════════════════════════════════════════════════════════════════
// 輔助函數
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 取得所有可用的區塊名稱
 * @returns {string[]}
 */
export function getAvailableSections() {
    return Object.keys(sectionComponents)
}

/**
 * 檢查區塊是否可用
 * @param {string} name - 區塊名稱
 * @returns {boolean}
 */
export function isSectionAvailable(name) {
    return name in sectionComponents
}

/**
 * 取得區塊的元資料
 * @param {string} name - 區塊名稱
 * @returns {object|null}
 */
export function getSectionMeta(name) {
    return sectionMeta[name] || null
}

/**
 * 取得所有區塊的元資料列表
 * @param {boolean} includeComingSoon - 是否包含即將推出的區塊
 * @returns {Array}
 */
export function getAllSectionMeta(includeComingSoon = false) {
    return Object.values(sectionMeta).filter(
        (meta) => includeComingSoon || !meta.comingSoon
    )
}

// ═══════════════════════════════════════════════════════════════════════════
// 預設匯出
// ═══════════════════════════════════════════════════════════════════════════
export default {
    SectionHero: () => import('./SectionHero.vue'),
    SectionWorks: () => import('./SectionWorks.vue'),
    SectionOtherWorks: () => import('./SectionOtherWorks.vue'),
    SectionAbout: () => import('./SectionAbout.vue'),
    SectionContact: () => import('./SectionContact.vue'),
}
