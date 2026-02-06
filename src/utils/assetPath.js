/**
 * 🔗 Asset Path Utility - 資源路徑處理工具
 *
 * 處理 public 資料夾中的靜態資源路徑
 * 自動處理 GitHub Pages 等部署環境的 base URL
 */

/**
 * 解析資源路徑
 * - 網路 URL（http:// 或 https://）直接返回
 * - 本地路徑會自動加上 BASE_URL
 *
 * @param {string} path - 資源路徑（如 '/images/avatar.jpg' 或 'https://example.com/img.jpg'）
 * @returns {string|null} 處理後的完整路徑
 *
 * @example
 * // 網路圖片直接返回
 * resolveAssetPath('https://i.imgur.com/example.jpg')
 * // => 'https://i.imgur.com/example.jpg'
 *
 * @example
 * // 本地圖片加上 BASE_URL
 * // 假設 BASE_URL = '/my-repo/'
 * resolveAssetPath('/images/avatar.jpg')
 * // => '/my-repo/images/avatar.jpg'
 *
 * @example
 * // 自動補上開頭的 /
 * resolveAssetPath('images/avatar.jpg')
 * // => '/my-repo/images/avatar.jpg'
 */
export function resolveAssetPath(path) {
    // 空值檢查
    if (!path || typeof path !== 'string') {
        return null
    }

    const trimmedPath = path.trim()
    if (!trimmedPath) {
        return null
    }

    // 如果是完整 URL（http:// 或 https://）直接返回
    if (trimmedPath.startsWith('http://') || trimmedPath.startsWith('https://')) {
        return trimmedPath
    }

    // 獲取 BASE_URL（Vite 在構建時會注入）
    // 開發環境通常是 '/'，GitHub Pages 部署時是 '/repo-name/'
    const baseUrl = import.meta.env.BASE_URL || '/'

    // 確保路徑以 / 開頭
    const normalizedPath = trimmedPath.startsWith('/') ? trimmedPath : `/${trimmedPath}`

    // 組合 BASE_URL 和路徑
    // 避免雙斜線：如果 baseUrl 以 / 結尾且 path 以 / 開頭
    if (baseUrl.endsWith('/') && normalizedPath.startsWith('/')) {
        return baseUrl + normalizedPath.slice(1)
    }

    return baseUrl + normalizedPath
}

/**
 * 檢查是否為網路 URL
 * @param {string} path - 路徑
 * @returns {boolean}
 */
export function isExternalUrl(path) {
    if (!path || typeof path !== 'string') return false
    const trimmed = path.trim()
    return trimmed.startsWith('http://') || trimmed.startsWith('https://')
}

/**
 * 檢查是否為本地路徑
 * @param {string} path - 路徑
 * @returns {boolean}
 */
export function isLocalPath(path) {
    if (!path || typeof path !== 'string') return false
    return !isExternalUrl(path)
}

export default {
    resolveAssetPath,
    isExternalUrl,
    isLocalPath,
}
