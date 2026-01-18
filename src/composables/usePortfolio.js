import {computed, ref} from 'vue'

/**
 * Portfolio Composable
 *
 * Uses Vite's import.meta.glob to dynamically read the works folder structure.
 *
 * 🎯 FLEXIBLE FOLDER NAMING (for non-technical users):
 *   - With order number: "01_My Project" or "01_MyProject"
 *   - Without order number: "My Awesome Scarf" (auto-assigned order)
 *   - Underscores in name become spaces: "Hand_Made_Scarf" → "Hand Made Scarf"
 *
 * 📁 EACH FOLDER CAN CONTAIN:
 *   - cover.* (png/jpg/webp) - Thumbnail image (optional, auto-picks first image if missing)
 *   - Other images - Shown on detail page
 *   - readme.md OR description.txt - Story/description text (optional)
 */

// Eagerly import all images from works directory (including SVG for placeholders)
const workImages = import.meta.glob('@/assets/works/**/*.{png,jpg,jpeg,webp,gif,svg}', {
    eager: true,
    import: 'default'
})

// Import text files for descriptions (readme.md or description.txt)
const workDescriptions = import.meta.glob('@/assets/works/**/*.{md,txt}', {
    eager: true,
    query: '?raw',
    import: 'default'
})

export function usePortfolio() {
    /**
     * Parse folder name with flexible naming support
     * Supports: "01_ProjectName", "1_Project Name", "My Project" (no number)
     *
     * @param {string} folderName - The folder name to parse
     * @param {number} fallbackOrder - Order to use if no number prefix found
     * @returns {{order: string, name: string}}
     */
    const parseFolderName = (folderName, fallbackOrder = 999) => {
        // Try to match: optional number prefix + optional separator + name
        // Patterns: "01_Name", "1-Name", "01 Name", "Name" (no number)
        const matchWithNumber = folderName.match(/^(\d+)[\s_\-.]*(.*)?$/)

        if (matchWithNumber) {
            const [, orderNum, namePart] = matchWithNumber
            // Pad order number to ensure proper sorting (1 → "001", 10 → "010")
            const paddedOrder = orderNum.padStart(3, '0')
            // Name: use the part after number, or fallback to folder name
            const name = namePart
                ? namePart.replace(/[_\-]+/g, ' ').trim()
                : folderName
            return {order: paddedOrder, name: name || folderName}
        }

        // No number prefix found - use fallback order and full folder name
        // Convert underscores/hyphens to spaces for display
        const displayName = folderName.replace(/[_\-]+/g, ' ').trim()
        return {
            order: String(fallbackOrder).padStart(3, '0'),
            name: displayName || folderName
        }
    }

    /**
     * Find and read description file content
     * Looks for readme.md or description.txt in the work folder
     *
     * @param {string} folderName - The work folder name
     * @returns {string|null} Description content or null
     */
    const findDescription = (folderName) => {
        // Priority: readme.md > description.txt > description.md > readme.txt
        const priorities = ['readme.md', 'description.txt', 'description.md', 'readme.txt']

        for (const fileName of priorities) {
            // Check various path patterns that Vite might use
            const possiblePaths = [
                `/src/assets/works/${folderName}/${fileName}`,
                `@/assets/works/${folderName}/${fileName}`,
            ]

            for (const basePath of possiblePaths) {
                for (const path in workDescriptions) {
                    if (path.toLowerCase().includes(`/${folderName.toLowerCase()}/`) &&
                        path.toLowerCase().endsWith(fileName)) {
                        const content = workDescriptions[path]
                        // Clean up the content - remove markdown front matter if present
                        return cleanDescriptionContent(content)
                    }
                }
            }
        }

        return null
    }

    /**
     * Clean description content - remove front matter, trim whitespace
     * @param {string} content - Raw file content
     * @returns {string} Cleaned content
     */
    const cleanDescriptionContent = (content) => {
        if (!content || typeof content !== 'string') return null

        let cleaned = content

        // Remove YAML front matter (--- ... ---)
        cleaned = cleaned.replace(/^---[\s\S]*?---\n*/m, '')

        // Remove HTML comments
        cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '')

        // Trim whitespace
        cleaned = cleaned.trim()

        return cleaned || null
    }

    /**
     * Parse the works folder structure and return organized data
     * Now with flexible naming and description support!
     */
    const parseWorks = () => {
        const works = {}
        let autoOrderCounter = 900 // Start high for auto-assigned orders

        for (const path in workImages) {
            // Extract folder name from path
            // Path format: /src/assets/works/01_ProjectName/image.png
            const matches = path.match(/\/works\/([^/]+)\/([^/]+)$/)

            if (matches) {
                const [, folderName, fileName] = matches

                if (!works[folderName]) {
                    // Parse folder name with flexible naming support
                    const {order, name} = parseFolderName(folderName, autoOrderCounter++)

                    // Try to find a description file
                    const description = findDescription(folderName)

                    works[folderName] = {
                        slug: folderName,
                        order: order,
                        name: name,
                        description: description, // 🆕 New field for story/description
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

                // 🆕 Enhanced cover detection: "cover" anywhere in filename
                // Matches: cover.jpg, cover-main.png, my-cover.webp, project_cover_1.jpg
                if (lowerFileName.includes('cover')) {
                    // If multiple covers, prefer exact "cover.*" match
                    const isExactCover = lowerFileName.match(/^cover\.[^.]+$/)
                    if (!works[folderName].cover || isExactCover) {
                        works[folderName].cover = imageUrl
                        works[folderName].coverIsSvg = isSvg
                    }
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

            // 🆕 Smart cover fallback: if no cover found, use first non-cover image
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
