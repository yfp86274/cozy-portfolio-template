/**
 * Configuration Composable
 *
 * Provides reactive access to site.config.js across all components.
 * This is the central point for reading configuration values.
 */

import {reactive, readonly} from 'vue'
import siteConfig from '@/site.config.js'

// Create a reactive copy of the config
const config = reactive({...siteConfig})

// Supported social platforms (order matters for display)
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

/**
 * Composable to access site configuration
 * @returns {object} Readonly config object and helper methods
 */
export function useConfig() {
    /**
     * Get profile information
     */
    const profile = readonly(config.profile)

    /**
     * Get theme settings
     */
    const theme = readonly(config.theme)

    /**
     * Get UI settings
     */
    const ui = readonly(config.ui)

    /**
     * Get content strings
     */
    const content = readonly(config.content)

    /**
     * Get SEO settings
     */
    const seo = readonly(config.seo)

    /**
     * Get a nested config value by path
     * @param {string} path - Dot-notation path (e.g., 'profile.name')
     * @param {any} fallback - Fallback value if path not found
     * @returns {any} The config value
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
     * Check if a feature is enabled
     * @param {string} feature - Feature name from ui config
     * @returns {boolean}
     */
    const isEnabled = (feature) => {
        return !!config.ui[feature]
    }

    /**
     * Get social links that have values (in display order)
     * @returns {Array} Array of { name, url } objects
     */
    const getSocialLinks = () => {
        const social = config.profile.social || {}

        // Return links in predefined order, filtering empty ones
        return SUPPORTED_SOCIALS
            .filter(name => social[name] && social[name].trim() !== '')
            .map(name => ({name, url: social[name]}))
    }

    /**
     * Get grid columns class based on config
     * @returns {string} Tailwind grid class
     */
    const getGridClass = () => {
        const cols = config.ui.gridColumns || 3
        const gridMap = {
            2: 'md:grid-cols-2',
            3: 'md:grid-cols-2 lg:grid-cols-3',
            4: 'md:grid-cols-2 lg:grid-cols-4'
        }
        return gridMap[cols] || gridMap[3]
    }

    /**
     * Get aspect ratio class based on config
     * @returns {string} Tailwind aspect ratio class
     */
    const getAspectClass = () => {
        const ratio = config.ui.thumbnailRatio || '4/3'
        const ratioMap = {
            '4/3': 'aspect-[4/3]',
            '3/2': 'aspect-[3/2]',
            '16/9': 'aspect-[16/9]',
            '1/1': 'aspect-square'
        }
        return ratioMap[ratio] || ratioMap['4/3']
    }

    /**
     * Get the hero style setting
     * @returns {string} 'split' | 'centered' | 'minimal'
     */
    const getHeroStyle = () => {
        return config.ui.heroStyle || 'split'
    }

    return {
        // Full config sections (readonly)
        config: readonly(config),
        profile,
        theme,
        ui,
        content,
        seo,

        // Helper methods
        get,
        isEnabled,
        getSocialLinks,
        getGridClass,
        getAspectClass,
        getHeroStyle
    }
}

// Export the raw config for theme initialization
export {siteConfig}

export default useConfig
