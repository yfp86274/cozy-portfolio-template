/**
 * Theme Presets
 *
 * Predefined visual styles that change the overall "personality" of the site.
 * Each preset defines CSS variables for layout, spacing, and decorative elements.
 *
 * Users can switch presets by changing `ui.themePreset` in site.config.json
 */

/**
 * Default preset - Warm & Crafty
 * Perfect for: Knitters, fiber artists, bakers, craftspeople
 * Characteristics: Rounded corners, soft shadows, organic feel
 */
export const defaultPreset = {
    name: 'default',
    label: 'Warm & Crafty',

    // Border radius
    '--radius-none': '0px',
    '--radius-sm': '4px',
    '--radius-base': '8px',
    '--radius-md': '12px',
    '--radius-lg': '16px',
    '--radius-xl': '24px',
    '--radius-full': '9999px',

    // Shadows - soft and warm
    '--shadow-sm': '0 1px 2px rgb(var(--color-text) / 0.04)',
    '--shadow-base': '0 4px 12px rgb(var(--color-text) / 0.06)',
    '--shadow-md': '0 8px 24px rgb(var(--color-text) / 0.08)',
    '--shadow-lg': '0 12px 40px rgb(var(--color-text) / 0.10)',
    '--shadow-card': '0 10px 40px rgb(var(--color-text) / 0.05)',

    // Borders
    '--border-width': '0px',
    '--border-color': 'transparent',

    // Spacing scale multiplier (1 = default)
    '--spacing-scale': '1',

    // Typography adjustments
    '--letter-spacing-tight': '-0.02em',
    '--letter-spacing-normal': '0.01em',
    '--letter-spacing-wide': '0.15em',

    // Transitions
    '--transition-fast': '150ms',
    '--transition-base': '300ms',
    '--transition-slow': '500ms',

    // Card specific
    '--card-padding': '1rem',
    '--card-gap': '1.5rem',

    // Button specific
    '--button-radius': '4px',
    '--button-padding-x': '2rem',
    '--button-padding-y': '1rem',
}

/**
 * Minimal preset - Clean & Professional
 * Perfect for: Chefs, architects, photographers, designers
 * Characteristics: Sharp edges, no shadows, line-based aesthetics
 */
export const minimalPreset = {
    name: 'minimal',
    label: 'Clean & Professional',

    // Border radius - sharp edges
    '--radius-none': '0px',
    '--radius-sm': '0px',
    '--radius-base': '0px',
    '--radius-md': '0px',
    '--radius-lg': '0px',
    '--radius-xl': '0px',
    '--radius-full': '9999px',

    // Shadows - none or very subtle
    '--shadow-sm': 'none',
    '--shadow-base': 'none',
    '--shadow-md': 'none',
    '--shadow-lg': 'none',
    '--shadow-card': 'none',

    // Borders - line-based aesthetics
    '--border-width': '1px',
    '--border-color': 'rgb(var(--color-text) / 0.1)',

    // Spacing scale multiplier
    '--spacing-scale': '1.1',

    // Typography adjustments - tighter, more modern
    '--letter-spacing-tight': '-0.03em',
    '--letter-spacing-normal': '0',
    '--letter-spacing-wide': '0.2em',

    // Transitions - snappier
    '--transition-fast': '100ms',
    '--transition-base': '200ms',
    '--transition-slow': '400ms',

    // Card specific
    '--card-padding': '0',
    '--card-gap': '2rem',

    // Button specific
    '--button-radius': '0px',
    '--button-padding-x': '2.5rem',
    '--button-padding-y': '1.25rem',
}

/**
 * Soft preset - Gentle & Approachable
 * Perfect for: Therapists, wellness coaches, artists, educators
 * Characteristics: Extra rounded, very soft shadows, gentle feel
 */
export const softPreset = {
    name: 'soft',
    label: 'Gentle & Approachable',

    // Border radius - extra rounded
    '--radius-none': '0px',
    '--radius-sm': '8px',
    '--radius-base': '16px',
    '--radius-md': '20px',
    '--radius-lg': '28px',
    '--radius-xl': '36px',
    '--radius-full': '9999px',

    // Shadows - very soft and diffused
    '--shadow-sm': '0 2px 8px rgb(var(--color-text) / 0.03)',
    '--shadow-base': '0 8px 30px rgb(var(--color-text) / 0.04)',
    '--shadow-md': '0 16px 50px rgb(var(--color-text) / 0.05)',
    '--shadow-lg': '0 24px 70px rgb(var(--color-text) / 0.06)',
    '--shadow-card': '0 20px 60px rgb(var(--color-text) / 0.04)',

    // Borders
    '--border-width': '0px',
    '--border-color': 'transparent',

    // Spacing scale multiplier - more breathing room
    '--spacing-scale': '1.15',

    // Typography adjustments
    '--letter-spacing-tight': '-0.01em',
    '--letter-spacing-normal': '0.02em',
    '--letter-spacing-wide': '0.12em',

    // Transitions - smooth and gentle
    '--transition-fast': '200ms',
    '--transition-base': '400ms',
    '--transition-slow': '600ms',

    // Card specific
    '--card-padding': '1.25rem',
    '--card-gap': '1.75rem',

    // Button specific
    '--button-radius': '9999px',
    '--button-padding-x': '2.25rem',
    '--button-padding-y': '1.125rem',
}

/**
 * Bold preset - Strong & Impactful
 * Perfect for: Athletes, musicians, startups, creatives
 * Characteristics: High contrast, dramatic shadows, bold presence
 */
export const boldPreset = {
    name: 'bold',
    label: 'Strong & Impactful',

    // Border radius - slightly rounded
    '--radius-none': '0px',
    '--radius-sm': '2px',
    '--radius-base': '4px',
    '--radius-md': '6px',
    '--radius-lg': '8px',
    '--radius-xl': '12px',
    '--radius-full': '9999px',

    // Shadows - dramatic
    '--shadow-sm': '0 2px 4px rgb(var(--color-text) / 0.1)',
    '--shadow-base': '0 6px 20px rgb(var(--color-text) / 0.15)',
    '--shadow-md': '0 12px 35px rgb(var(--color-text) / 0.2)',
    '--shadow-lg': '0 20px 50px rgb(var(--color-text) / 0.25)',
    '--shadow-card': '0 15px 45px rgb(var(--color-text) / 0.12)',

    // Borders - bold lines
    '--border-width': '2px',
    '--border-color': 'rgb(var(--color-primary))',

    // Spacing scale multiplier
    '--spacing-scale': '1.05',

    // Typography adjustments - tight and impactful
    '--letter-spacing-tight': '-0.04em',
    '--letter-spacing-normal': '-0.01em',
    '--letter-spacing-wide': '0.25em',

    // Transitions - quick and punchy
    '--transition-fast': '100ms',
    '--transition-base': '200ms',
    '--transition-slow': '350ms',

    // Card specific
    '--card-padding': '0.75rem',
    '--card-gap': '1.25rem',

    // Button specific
    '--button-radius': '2px',
    '--button-padding-x': '2rem',
    '--button-padding-y': '1rem',
}

/**
 * All available presets
 */
export const presets = {
    default: defaultPreset,
    minimal: minimalPreset,
    soft: softPreset,
    bold: boldPreset,
}

/**
 * Get a preset by name
 * @param {string} name - Preset name
 * @returns {object} Preset configuration
 */
export function getPreset(name) {
    return presets[name] || presets.default
}

/**
 * Get list of available preset names
 * @returns {string[]} Array of preset names
 */
export function getPresetNames() {
    return Object.keys(presets)
}

/**
 * Get preset metadata for UI display
 * @returns {Array} Array of { name, label } objects
 */
export function getPresetOptions() {
    return Object.values(presets).map(preset => ({
        name: preset.name,
        label: preset.label,
    }))
}

export default presets
