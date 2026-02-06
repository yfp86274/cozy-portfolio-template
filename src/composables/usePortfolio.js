/**
 * 🗂️ Portfolio Composable - 極致容錯版本 v3.0
 *
 * 設計理念：用戶只會「整理文件夾」和「放圖片」
 * 系統必須對任何命名方式都極度寬容！
 *
 * ✨ 極致容錯特性：
 * 1. 支援任意命名方式：
 *    - 帶序號：「01_My Project」「1-項目名」「001 作品」
 *    - 純文字：「我的圍巾」「Cozy Sweater」
 *    - 混合：「01_手工皂系列」
 *
 * 2. 智能封面圖邏輯：
 *    - 優先找 cover.* (png/jpg/webp)
 *    - 次優先找檔名包含 cover 的圖片
 *    - 最終回退：自動抓取文件夾內第一張圖片
 *
 * 3. 智能排序：
 *    - 有序號：按序號排序
 *    - 無序號：按字母順序
 *    - 混合：有序號的優先，無序號的按字母排在後面
 *
 * 4. 完美容錯：
 *    - 自動忽略 .DS_Store、Thumbs.db 等系統文件
 *    - 自動忽略非圖片格式（mp4, pdf, docx 等）
 *    - 空文件夾不會導致報錯
 *    - 重複的封面圖會自動選擇最佳的
 *
 * 🎯 支援的圖片格式：png, jpg, jpeg, webp, gif, svg
 */

import {computed, ref} from 'vue'

// ═══════════════════════════════════════════════════════════════════════════
// 📁 使用 Vite 的 import.meta.glob 動態讀取 works 目錄
// ═══════════════════════════════════════════════════════════════════════════

// 圖片文件（包含 SVG 用於占位符）
const workImages = import.meta.glob('@/assets/works/**/*.{png,jpg,jpeg,webp,gif,svg,PNG,JPG,JPEG,WEBP,GIF,SVG}', {
    eager: true,
    import: 'default'
})

// 文字描述文件（readme.md 或 description.txt）
const workDescriptions = import.meta.glob('@/assets/works/**/*.{md,txt,MD,TXT}', {
    eager: true,
    query: '?raw',
    import: 'default'
})

// ═══════════════════════════════════════════════════════════════════════════
// 🛡️ 容錯常量
// ═══════════════════════════════════════════════════════════════════════════

/** 需要忽略的系統文件 */
const IGNORED_FILES = new Set([
    '.ds_store',
    'thumbs.db',
    'desktop.ini',
    '.gitkeep',
    '.gitignore',
    'readme.md',
    'description.txt',
    'description.md',
    'readme.txt',
])

/** 支援的圖片副檔名 */
const SUPPORTED_IMAGE_EXTENSIONS = new Set([
    'png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'
])

/** 封面圖優先級關鍵字（按優先級排序） */
const COVER_PRIORITY_KEYWORDS = [
    /^cover\.(png|jpg|jpeg|webp|gif|svg)$/i,           // 精確匹配 cover.*
    /^cover[-_]?\d*\.(png|jpg|jpeg|webp|gif|svg)$/i,   // cover1.jpg, cover-1.jpg
    /cover/i,                                           // 任何包含 cover 的檔名
    /^main\.(png|jpg|jpeg|webp|gif|svg)$/i,            // main.*
    /^thumbnail\.(png|jpg|jpeg|webp|gif|svg)$/i,       // thumbnail.*
    /^thumb\.(png|jpg|jpeg|webp|gif|svg)$/i,           // thumb.*
]

// ═══════════════════════════════════════════════════════════════════════════
// 🔧 輔助函數
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 檢查文件是否為支援的圖片格式
 * @param {string} fileName - 文件名
 * @returns {boolean}
 */
function isImageFile(fileName) {
    if (!fileName) return false
    const lowerName = fileName.toLowerCase()

    // 排除系統文件
    if (IGNORED_FILES.has(lowerName)) return false

    // 檢查副檔名
    const ext = lowerName.split('.').pop()
    return SUPPORTED_IMAGE_EXTENSIONS.has(ext)
}

/**
 * 計算檔名的封面優先級分數（分數越低越優先）
 * @param {string} fileName - 文件名
 * @returns {number} 優先級分數（0 = 最高優先）
 */
function getCoverPriority(fileName) {
    const lowerName = fileName.toLowerCase()

    for (let i = 0; i < COVER_PRIORITY_KEYWORDS.length; i++) {
        if (COVER_PRIORITY_KEYWORDS[i].test(lowerName)) {
            return i
        }
    }

    return Infinity // 非封面圖
}

/**
 * 解析文件夾名稱，支援各種格式
 *
 * 支援格式：
 * - "01_Project Name" → order: "001", name: "Project Name"
 * - "1-My Work" → order: "001", name: "My Work"
 * - "001 手工皂" → order: "001", name: "手工皂"
 * - "My Scarf" → order: "zzz...", name: "My Scarf"（無序號，排在最後按字母排序）
 *
 * @param {string} folderName - 文件夾名稱
 * @param {number} fallbackOrder - 無序號時的回退順序值
 * @returns {{order: string, name: string, hasNumber: boolean}}
 */
function parseFolderName(folderName, fallbackOrder = 999) {
    // 嘗試匹配：數字前綴 + 可選分隔符 + 名稱
    // 支援: "01_Name", "1-Name", "001 Name", "10.Name"
    const matchWithNumber = folderName.match(/^(\d+)[\s._\-]*(.*)$/)

    if (matchWithNumber) {
        const [, orderNum, namePart] = matchWithNumber
        // 補零確保排序正確（1 → "001", 10 → "010", 100 → "100"）
        const paddedOrder = orderNum.padStart(3, '0')
        // 清理名稱中的分隔符
        const name = namePart
            ? namePart.replace(/^[\s._\-]+|[\s._\-]+$/g, '').replace(/[_\-]+/g, ' ').trim()
            : folderName
        return {
            order: paddedOrder,
            displayOrder: paddedOrder, // 對外顯示的序號
            name: name || folderName,
            hasNumber: true
        }
    }

    // 無數字前綴 - 使用 "zzz" 前綴確保排在有數字的後面
    // 然後按字母順序排序
    const displayName = folderName.replace(/[_\-]+/g, ' ').trim()
    return {
        order: `zzz_${displayName.toLowerCase()}`, // zzz 前綴確保排在數字之後（僅用於內部排序，不顯示）
        displayOrder: '', // 對外顯示的序號為空（無數字的作品不顯示序號）
        name: displayName || folderName,
        hasNumber: false
    }
}

/**
 * 尋找並讀取作品的描述文件
 * 支援：readme.md, description.txt, description.md, readme.txt
 *
 * @param {string} folderName - 作品文件夾名稱
 * @returns {string|null} 描述內容
 */
function findDescription(folderName) {
    // 優先順序
    const priorities = ['readme.md', 'description.txt', 'description.md', 'readme.txt']
    const folderLower = folderName.toLowerCase()

    for (const fileName of priorities) {
        for (const path in workDescriptions) {
            const pathLower = path.toLowerCase()
            // 檢查路徑是否包含該文件夾，且以該檔名結尾
            if (pathLower.includes(`/${folderLower}/`) && pathLower.endsWith(fileName)) {
                const content = workDescriptions[path]
                return cleanDescriptionContent(content)
            }
        }
    }

    return null
}

/**
 * 清理描述內容
 * - 移除 YAML front matter
 * - 移除 HTML 註釋
 * - 移除多餘空白
 *
 * @param {string} content - 原始內容
 * @returns {string|null}
 */
function cleanDescriptionContent(content) {
    if (!content || typeof content !== 'string') return null

    let cleaned = content

    // 移除 YAML front matter (--- ... ---)
    cleaned = cleaned.replace(/^---[\s\S]*?---\n*/m, '')

    // 移除 HTML 註釋
    cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '')

    // 修剪空白
    cleaned = cleaned.trim()

    return cleaned || null
}

/**
 * 從圖片列表中選擇最佳封面圖
 * @param {Array<{name: string, url: string, isSvg: boolean}>} images - 圖片列表
 * @returns {{url: string, isSvg: boolean}|null}
 */
function selectBestCover(images) {
    if (!images || images.length === 0) return null

    // 按封面優先級排序
    const sorted = [...images].sort((a, b) => {
        const priorityA = getCoverPriority(a.name)
        const priorityB = getCoverPriority(b.name)

        if (priorityA !== priorityB) {
            return priorityA - priorityB
        }

        // 優先級相同時，按檔名字母順序
        return a.name.localeCompare(b.name, undefined, {numeric: true})
    })

    return sorted[0] || null
}

// ═══════════════════════════════════════════════════════════════════════════
// 📦 主要解析邏輯
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 解析 works 文件夾結構，返回整理好的作品數據
 * @returns {Array<Object>} 作品列表
 */
function parseWorks() {
    const works = {}

    // 遍歷所有圖片文件
    for (const path in workImages) {
        // 從路徑提取文件夾名和文件名
        // 路徑格式: /src/assets/works/01_ProjectName/image.png
        const matches = path.match(/\/works\/([^/]+)\/([^/]+)$/)

        if (!matches) continue

        const [, folderName, fileName] = matches

        // 跳過非圖片文件
        if (!isImageFile(fileName)) continue

        // 初始化作品資料
        if (!works[folderName]) {
            const {order, displayOrder, name, hasNumber} = parseFolderName(folderName)
            const description = findDescription(folderName)

            works[folderName] = {
                slug: folderName,
                order: order,
                displayOrder: displayOrder || '', // 對外顯示的序號（無數字作品為空字串）
                name: name,
                hasNumber: hasNumber,
                description: description,
                cover: null,
                coverIsSvg: false,
                coverBg: null,
                images: [],
                _allImages: [] // 暫存所有圖片，用於選擇封面
            }
        }

        const imageUrl = workImages[path]
        const lowerFileName = fileName.toLowerCase()
        const isSvg = lowerFileName.endsWith('.svg')

        // 儲存所有圖片
        works[folderName]._allImages.push({
            name: fileName,
            url: imageUrl,
            isSvg: isSvg,
            priority: getCoverPriority(fileName)
        })
    }

    // 處理每個作品：選擇封面、整理圖片列表
    Object.values(works).forEach(work => {
        // 按優先級和檔名排序所有圖片
        work._allImages.sort((a, b) => {
            if (a.priority !== b.priority) {
                return a.priority - b.priority
            }
            return a.name.localeCompare(b.name, undefined, {numeric: true})
        })

        // 選擇封面圖
        const bestCover = work._allImages.find(img => img.priority !== Infinity) || work._allImages[0]

        if (bestCover) {
            work.cover = bestCover.url
            work.coverIsSvg = bestCover.isSvg

            // 如果封面是 SVG，嘗試找配對的背景圖
            if (bestCover.isSvg) {
                const baseName = bestCover.name.substring(0, bestCover.name.lastIndexOf('.'))
                const twinBg = work._allImages.find(img =>
                    !img.isSvg && img.name.toLowerCase().startsWith(baseName.toLowerCase() + '.')
                )
                if (twinBg) {
                    work.coverBg = twinBg.url
                }
            }
        }

        // 整理詳情頁圖片列表（排除封面）
        work.images = work._allImages
            .filter(img => img.url !== work.cover)
            .map(img => ({
                name: img.name,
                url: img.url,
                isSvg: img.isSvg
            }))

        // 清理暫存數據
        delete work._allImages
    })

    // 排序並返回
    return Object.values(works)
        .filter(work => work.cover !== null) // 過濾掉沒有圖片的空文件夾
        .sort((a, b) => {
            // 有序號的排在前面
            if (a.hasNumber && !b.hasNumber) return -1
            if (!a.hasNumber && b.hasNumber) return 1

            // 同類型按 order 排序
            return a.order.localeCompare(b.order, undefined, {numeric: true})
        })
}

// ═══════════════════════════════════════════════════════════════════════════
// 📦 Composable 導出
// ═══════════════════════════════════════════════════════════════════════════

export function usePortfolio() {
    /** 所有作品（響應式） */
    const allWorks = ref(parseWorks())

    /**
     * 有封面的作品列表（用於導航和網格展示）
     */
    const worksWithCovers = computed(() => {
        return allWorks.value.filter(work => work.cover !== null)
    })

    /**
     * 導航項目列表
     */
    const navItems = computed(() => {
        return worksWithCovers.value.map(work => ({
            order: work.order,
            slug: work.slug,
            name: work.name
        }))
    })

    /**
     * 根據 slug 獲取特定作品
     * @param {string} slug - 作品的 slug（文件夾名稱）
     * @returns {Object|null}
     */
    const getWorkBySlug = (slug) => {
        if (!slug) return null
        return allWorks.value.find(work => work.slug === slug) || null
    }

    /**
     * 獲取作品的詳情圖片（不包含封面）
     * @param {string} slug - 作品的 slug
     * @returns {Array<{name: string, url: string, isSvg: boolean}>}
     */
    const getWorkImages = (slug) => {
        const work = getWorkBySlug(slug)
        if (!work) return []

        // 按檔名排序
        return [...work.images].sort((a, b) =>
            a.name.localeCompare(b.name, undefined, {numeric: true})
        )
    }

    /**
     * 獲取其他作品（排除當前作品）
     * @param {string} currentSlug - 當前作品的 slug
     * @param {number} limit - 限制數量
     * @returns {Array<Object>}
     */
    const getOtherWorks = (currentSlug, limit = 3) => {
        return worksWithCovers.value
            .filter(work => work.slug !== currentSlug)
            .slice(0, limit)
    }

    /**
     * 獲取下一個作品
     * @param {string} currentSlug - 當前作品的 slug
     * @returns {Object|null}
     */
    const getNextWork = (currentSlug) => {
        const currentIndex = worksWithCovers.value.findIndex(w => w.slug === currentSlug)
        if (currentIndex === -1 || currentIndex >= worksWithCovers.value.length - 1) {
            return worksWithCovers.value[0] || null // 循環到第一個
        }
        return worksWithCovers.value[currentIndex + 1]
    }

    /**
     * 獲取上一個作品
     * @param {string} currentSlug - 當前作品的 slug
     * @returns {Object|null}
     */
    const getPrevWork = (currentSlug) => {
        const currentIndex = worksWithCovers.value.findIndex(w => w.slug === currentSlug)
        if (currentIndex === -1 || currentIndex === 0) {
            return worksWithCovers.value[worksWithCovers.value.length - 1] || null // 循環到最後一個
        }
        return worksWithCovers.value[currentIndex - 1]
    }

    /**
     * 檢查圖片 URL 是否有效
     * @param {string} url - 圖片 URL
     * @returns {Promise<boolean>}
     */
    const isImageValid = async (url) => {
        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => resolve(true)
            img.onerror = () => resolve(false)
            img.src = url
        })
    }

    /**
     * 獲取作品數量
     * @returns {number}
     */
    const getWorksCount = () => worksWithCovers.value.length

    /**
     * 檢查是否有作品
     * @returns {boolean}
     */
    const hasWorks = () => worksWithCovers.value.length > 0

    return {
        // 響應式數據
        allWorks,
        worksWithCovers,
        navItems,

        // 查詢方法
        getWorkBySlug,
        getWorkImages,
        getOtherWorks,
        getNextWork,
        getPrevWork,

        // 工具方法
        isImageValid,
        getWorksCount,
        hasWorks,
    }
}

export default usePortfolio
