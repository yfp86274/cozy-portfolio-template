#!/usr/bin/env node

/**
 * 🔍 Configuration Validator
 *
 * This script runs before `vite build` to catch common JSON errors
 * and provide friendly, actionable error messages for non-technical users.
 *
 * It validates site.config.json and helps users fix common mistakes like:
 * - Extra commas
 * - Missing quotes
 * - Missing required fields
 */

import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
}

/**
 * Print a styled message to console
 */
function print(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`)
}

/**
 * Print a styled header
 */
function printHeader(message) {
    console.log('')
    print('═'.repeat(60), 'cyan')
    print(`  ${message}`, 'bright')
    print('═'.repeat(60), 'cyan')
    console.log('')
}

/**
 * Print a success message
 */
function printSuccess(message) {
    print(`✅ ${message}`, 'green')
}

/**
 * Print a warning message
 */
function printWarning(message) {
    print(`⚠️  ${message}`, 'yellow')
}

/**
 * Print an error message with friendly guidance
 */
function printError(title, details, suggestion) {
    console.log('')
    print('╭' + '─'.repeat(58) + '╮', 'red')
    print(`│  ❌ ${title.padEnd(53)}│`, 'red')
    print('├' + '─'.repeat(58) + '┤', 'red')

    // Split details into lines if too long
    const detailLines = details.match(/.{1,54}/g) || [details]
    detailLines.forEach(line => {
        print(`│  ${line.padEnd(56)}│`, 'yellow')
    })

    print('├' + '─'.repeat(58) + '┤', 'red')
    print('│  💡 How to fix:'.padEnd(60) + '│', 'cyan')

    const suggestionLines = suggestion.match(/.{1,54}/g) || [suggestion]
    suggestionLines.forEach(line => {
        print(`│     ${line.padEnd(53)}│`, 'reset')
    })

    print('╰' + '─'.repeat(58) + '╯', 'red')
    console.log('')
}

/**
 * Try to identify the specific JSON syntax error
 */
function diagnoseJsonError(content, error) {
    const errorMessage = error.message

    // Extract position from error message if available
    const positionMatch = errorMessage.match(/position\s*(\d+)/i)
    const lineMatch = errorMessage.match(/line\s*(\d+)/i)
    const columnMatch = errorMessage.match(/column\s*(\d+)/i)

    let position = positionMatch ? parseInt(positionMatch[1]) : null
    let line = lineMatch ? parseInt(lineMatch[1]) : null

    // If we have a position, calculate line number
    if (position !== null && line === null) {
        const beforeError = content.substring(0, position)
        line = (beforeError.match(/\n/g) || []).length + 1
    }

    // Get context around the error
    let contextStart = Math.max(0, (position || 0) - 30)
    let contextEnd = Math.min(content.length, (position || 0) + 30)
    let context = content.substring(contextStart, contextEnd)

    // Common error patterns and friendly messages
    const patterns = [
        {
            regex: /,\s*[}\]]/,
            title: 'Extra Comma Found! 🔴',
            detail: 'There\'s a comma before a closing bracket } or ]',
            suggestion: 'Remove the extra comma. In JSON, the last item in a list or object should NOT have a comma after it.',
            test: () => content.match(/,\s*[}\]]/g)
        },
        {
            regex: /[}\]]\s*[{\[]/,
            title: 'Missing Comma Between Items',
            detail: 'Two items are next to each other without a comma',
            suggestion: 'Add a comma between the items. Every item except the last needs a comma after it.',
            test: () => content.match(/[}\]]\s*[{\[]/g) && !content.match(/[}\]]\s*,\s*[{\[]/g)
        },
        {
            regex: /:\s*[,}\]]/,
            title: 'Missing Value',
            detail: 'A property has a colon but no value after it',
            suggestion: 'Add a value after the colon. For text use "quotes", for numbers just type the number.',
            test: () => content.match(/:\s*[,}\]]/g)
        },
        {
            regex: /[^"]\s*:/,
            title: 'Property Name Without Quotes',
            detail: 'Property names in JSON must be wrapped in double quotes',
            suggestion: 'Wrap the property name in double quotes: "propertyName": value',
            test: () => {
                // Check for unquoted keys (simplified check)
                const unquotedKey = content.match(/[{,]\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g)
                return unquotedKey && !unquotedKey[0].includes('"')
            }
        },
        {
            regex: /'/,
            title: 'Single Quotes Used',
            detail: 'JSON requires double quotes ("), not single quotes (\')',
            suggestion: 'Replace all single quotes with double quotes.',
            test: () => content.includes("'")
        },
    ]

    // Check each pattern
    for (const pattern of patterns) {
        if (pattern.test && pattern.test()) {
            return {
                title: pattern.title,
                detail: pattern.detail + (line ? ` (around line ${line})` : ''),
                suggestion: pattern.suggestion
            }
        }
    }

    // Generic error if no specific pattern matched
    return {
        title: 'JSON Syntax Error',
        detail: `${errorMessage}${line ? ` (line ${line})` : ''}`,
        suggestion: 'Check for missing quotes, extra commas, or mismatched brackets. You can use jsonlint.com to find the exact error.'
    }
}

/**
 * Validate the structure of the config object
 */
function validateConfigStructure(config) {
    const warnings = []
    const errors = []

    // Required top-level fields
    const requiredFields = ['profile', 'theme']
    for (const field of requiredFields) {
        if (!config[field]) {
            errors.push(`Missing required section: "${field}"`)
        }
    }

    // Check profile fields
    if (config.profile) {
        if (!config.profile.name || config.profile.name.trim() === '') {
            warnings.push('Your name is empty in profile.name - visitors won\'t know who you are!')
        }
        if (!config.profile.role || config.profile.role.trim() === '') {
            warnings.push('Your role/profession is empty in profile.role')
        }
    }

    // Check theme fields
    if (config.theme) {
        const colorFields = ['primaryColor', 'backgroundColor', 'textColor']
        for (const field of colorFields) {
            const value = config.theme[field]
            if (value && !isValidColor(value)) {
                warnings.push(`theme.${field} might not be a valid color: "${value}". Colors should be hex codes like "#8B4513"`)
            }
        }
    }

    // Check UI preset
    if (config.ui && config.ui.themePreset) {
        const validPresets = ['default', 'minimal', 'soft', 'bold', 'craft', 'chef', 'artist', 'therapist']
        if (!validPresets.includes(config.ui.themePreset.toLowerCase())) {
            warnings.push(`Unknown theme preset: "${config.ui.themePreset}". Valid options: ${validPresets.join(', ')}`)
        }
    }

    return {warnings, errors}
}

/**
 * Simple color validation
 */
function isValidColor(color) {
    if (!color || typeof color !== 'string') return false
    // Hex color
    if (/^#[0-9A-Fa-f]{3,8}$/.test(color)) return true
    // rgb/rgba
    if (/^rgba?\s*\(/.test(color)) return true
    // Named colors (simplified check)
    if (/^[a-zA-Z]+$/.test(color)) return true
    return false
}

/**
 * Get default config for recovery
 */
function getDefaultConfig() {
    return {
        profile: {
            name: 'Your Name',
            role: 'Your Profession',
            email: 'hello@example.com',
            bio: 'Tell your story here...',
            avatar: '/images/avatar.jpg',
            social: {}
        },
        theme: {
            primaryColor: '#6B4423',
            secondaryColor: '#8B6914',
            backgroundColor: '#FFFBF5',
            textColor: '#2D2D2D',
            mutedColor: '#6B6B6B',
            fontFamily: 'Inter',
            headingFont: 'Inter'
        },
        ui: {
            themePreset: 'default',
            heroStyle: 'split',
            showFooter: true,
            showSocialLinks: true
        },
        content: {
            heroTitle: 'Welcome',
            heroSubtitle: 'This is my portfolio',
            heroButtonText: 'View Work',
            worksTitle: 'My Work',
            otherWorksTitle: 'More Work'
        },
        seo: {
            siteTitle: 'My Portfolio',
            siteDescription: 'A portfolio website'
        }
    }
}

/**
 * Main validation function
 */
async function main() {
    printHeader('🔍 Validating your site configuration...')

    const configPath = path.join(projectRoot, 'site.config.json')

    // Check if config file exists
    if (!fs.existsSync(configPath)) {
        printError(
            'Config File Not Found!',
            'Could not find site.config.json in your project',
            'Create a site.config.json file in your project root. You can copy the example from the template.'
        )

        // Create a default config
        print('\n📝 Creating a default config file for you...', 'cyan')
        try {
            fs.writeFileSync(configPath, JSON.stringify(getDefaultConfig(), null, 2))
            printSuccess('Created site.config.json with default values!')
            printWarning('Please edit site.config.json to add your information.')
        } catch (e) {
            print('Could not create default config: ' + e.message, 'red')
            process.exit(1)
        }
    }

    // Read the config file
    let content
    try {
        content = fs.readFileSync(configPath, 'utf-8')
    } catch (error) {
        printError(
            'Could Not Read Config File',
            error.message,
            'Make sure the file exists and you have permission to read it.'
        )
        process.exit(1)
    }

    // Check for BOM or weird characters
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1) // Remove BOM
        printWarning('Removed BOM character from config file')
    }

    // Try to parse JSON
    let config
    try {
        config = JSON.parse(content)
        printSuccess('JSON syntax is valid!')
    } catch (error) {
        const diagnosis = diagnoseJsonError(content, error)
        printError(diagnosis.title, diagnosis.detail, diagnosis.suggestion)

        // Try to use default config to continue build
        print('\n🔄 Attempting to continue with default configuration...', 'yellow')
        config = getDefaultConfig()
        printWarning('Build will continue with default settings. Please fix your config file!')
    }

    // Validate structure
    const {warnings, errors} = validateConfigStructure(config)

    // Print warnings
    if (warnings.length > 0) {
        console.log('')
        print('⚠️  Some suggestions to improve your config:', 'yellow')
        warnings.forEach(warning => {
            print(`   • ${warning}`, 'yellow')
        })
    }

    // Print errors (but don't fail - we want to be forgiving)
    if (errors.length > 0) {
        console.log('')
        print('❗ Some issues were found:', 'red')
        errors.forEach(err => {
            print(`   • ${err}`, 'red')
        })
        printWarning('The site will still build, but some features may not work correctly.')
    }

    // Final status
    console.log('')
    print('─'.repeat(60), 'cyan')

    if (errors.length === 0 && warnings.length === 0) {
        print('🎉 Perfect! Your configuration looks great!', 'green')
    } else if (errors.length === 0) {
        print('👍 Config is valid! Consider the suggestions above.', 'green')
    } else {
        print('⚠️  Build will continue, but please fix the issues above.', 'yellow')
    }

    print('─'.repeat(60), 'cyan')
    console.log('')

    // Always exit with success to not block the build
    // (We want to be forgiving for non-technical users)
    process.exit(0)
}

// Run the validator
main().catch(error => {
    print(`Unexpected error: ${error.message}`, 'red')
    // Exit with success anyway to not block the build
    process.exit(0)
})
