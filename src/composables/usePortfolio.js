import {computed, ref} from 'vue'

/**
 * Portfolio Composable
 *
 * Uses Vite's import.meta.glob to dynamically read the works folder structure.
 * Folder naming convention: XX_ProjectName (e.g., 01_BrandDesign)
 * Each folder should contain:
 *   - cover.png (or .jpg/.webp) - Used as thumbnail (optional, will use first image if not present)
 *   - Other images for the detail page
 */

// Eagerly import all images from works directory (including SVG for placeholders)
const workImages = import.meta.glob('@/assets/works/**/*.{png,jpg,jpeg,webp,gif,svg}', {
    eager: true,
    import: 'default'
})

export function usePortfolio() {
    /**
     * Parse the works folder structure and return organized data
     */
    const parseWorks = () => {
        const works = {}

        for (const path in workImages) {
            // Extract folder name from path
            // Path format: /src/assets/works/01_ProjectName/image.png
            const matches = path.match(/\/works\/([^/]+)\/([^/]+)$/)

            if (matches) {
                const [, folderName, fileName] = matches

                if (!works[folderName]) {
                    // Parse folder name: "01_ProjectName" -> { order: "01", name: "ProjectName" }
                    const [order, ...nameParts] = folderName.split('_')
                    works[folderName] = {
                        slug: folderName,
                        order: order,
                        // Name: take part after underscore, convert underscores to spaces
                        name: nameParts.join(' ').replace(/_/g, ' ') || folderName,
                        cover: null,
                        coverIsSvg: false,
                        coverBg: null,
                        images: [],
                        allImages: [] // Store all images for fallback cover
                    }
                }

                const imageUrl = workImages[path]
                const lowerFileName = fileName.toLowerCase()
                const isSvg = lowerFileName.endsWith('.svg')

                // Store all images (including SVG flag)
                works[folderName].allImages.push({
                    name: fileName,
                    url: imageUrl,
                    isSvg: isSvg
                })

                // Check if this is a cover image
                if (lowerFileName.startsWith('cover')) {
                    works[folderName].cover = imageUrl
                    works[folderName].coverIsSvg = isSvg
                } else {
                    works[folderName].images.push({
                        name: fileName,
                        url: imageUrl,
                        isSvg: isSvg
                    })
                }
            }
        }

        // Process each work: if no cover, use first image
        Object.values(works).forEach(work => {
            // Sort all images by name
            work.allImages.sort((a, b) =>
                a.name.localeCompare(b.name, undefined, {numeric: true})
            )

            // If no cover specified, use first image
            if (!work.cover && work.allImages.length > 0) {
                work.cover = work.allImages[0].url
                work.coverIsSvg = work.allImages[0].isSvg
                // Remove the cover from images list
                work.images = work.images.filter(img => img.url !== work.cover)
            }

            // Auto-match background image for SVG covers
            if (work.coverIsSvg) {
                const coverEntry = work.allImages.find(img => img.url === work.cover)

                if (coverEntry) {
                    const baseName = coverEntry.name.substring(0, coverEntry.name.lastIndexOf('.'))

                    // Find matching non-SVG image with same base name
                    const twinBg = work.allImages.find(img =>
                        !img.isSvg && img.name.startsWith(baseName + '.')
                    )

                    if (twinBg) {
                        work.coverBg = twinBg.url
                    }
                }
            }

            // Clean up temporary data
            delete work.allImages
        })

        // Convert to array and sort by order
        return Object.values(works).sort((a, b) => {
            return a.order.localeCompare(b.order, undefined, {numeric: true})
        })
    }

    const allWorks = ref(parseWorks())

    /**
     * Get all works with covers (for navigation and grid)
     */
    const worksWithCovers = computed(() => {
        return allWorks.value.filter(work => work.cover !== null)
    })

    /**
     * Get navigation items (order, slug, and display name)
     */
    const navItems = computed(() => {
        return worksWithCovers.value.map(work => ({
            order: work.order,
            slug: work.slug,
            name: work.name
        }))
    })

    /**
     * Get a specific work by slug
     */
    const getWorkBySlug = (slug) => {
        return allWorks.value.find(work => work.slug === slug) || null
    }

    /**
     * Get detail images for a work (excluding cover)
     */
    const getWorkImages = (slug) => {
        const work = getWorkBySlug(slug)
        if (!work) return []

        // Sort images by name for consistent ordering
        return [...work.images].sort((a, b) =>
            a.name.localeCompare(b.name, undefined, {numeric: true})
        )
    }

    /**
     * Get other works (for "Other Works" section, excluding current)
     */
    const getOtherWorks = (currentSlug, limit = 3) => {
        return worksWithCovers.value
            .filter(work => work.slug !== currentSlug)
            .slice(0, limit)
    }

    /**
     * Check if an image URL is valid
     * @param {string} url - Image URL to check
     * @returns {Promise<boolean>} True if image loads successfully
     */
    const isImageValid = async (url) => {
        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => resolve(true)
            img.onerror = () => resolve(false)
            img.src = url
        })
    }

    return {
        allWorks,
        worksWithCovers,
        navItems,
        getWorkBySlug,
        getWorkImages,
        getOtherWorks,
        isImageValid
    }
}
