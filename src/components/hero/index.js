/**
 * Hero Components Index
 *
 * Export all hero layout components for dynamic loading
 */

export {default as HeroSplit} from './HeroSplit.vue'
export {default as HeroCentered} from './HeroCentered.vue'
export {default as HeroMinimal} from './HeroMinimal.vue'

/**
 * Hero component mapping for dynamic resolution
 */
export const heroComponents = {
    split: () => import('./HeroSplit.vue'),
    centered: () => import('./HeroCentered.vue'),
    minimal: () => import('./HeroMinimal.vue'),
}

/**
 * Get hero component by style name
 * @param {string} style - Hero style name ('split', 'centered', 'minimal')
 * @returns {Promise} Dynamic import promise
 */
export function getHeroComponent(style) {
    return heroComponents[style] || heroComponents.split
}
