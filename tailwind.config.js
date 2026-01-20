/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // These will be overridden by CSS variables from theme.js
                sans: ['var(--font-body)', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
                heading: ['var(--font-heading)', 'Georgia', 'serif'],
            },
            colors: {
                // Dynamic colors using CSS variables with alpha support
                // Format: rgb(var(--color-name) / <alpha-value>)
                primary: {
                    DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
                    light: 'rgb(var(--color-primary-light) / <alpha-value>)',
                    dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
                },
                secondary: {
                    DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
                    light: 'rgb(var(--color-secondary-light) / <alpha-value>)',
                },
                background: {
                    DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
                    alt: 'rgb(var(--color-background-alt) / <alpha-value>)',
                },
                text: 'rgb(var(--color-text) / <alpha-value>)',
                muted: 'rgb(var(--color-muted) / <alpha-value>)',
                // Keep neutral scale for utility
                neutral: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                }
            },
            // ═══════════════════════════════════════════════════════════════════
            // PRESET-AWARE CONFIGURATIONS
            // These use CSS variables that are set by the preset system
            // ═══════════════════════════════════════════════════════════════════
            borderRadius: {
                'theme-none': 'var(--radius-none)',
                'theme-sm': 'var(--radius-sm)',
                'theme': 'var(--radius-base)',
                'theme-md': 'var(--radius-md)',
                'theme-lg': 'var(--radius-lg)',
                'theme-xl': 'var(--radius-xl)',
                'theme-full': 'var(--radius-full)',
            },
            boxShadow: {
                'theme-sm': 'var(--shadow-sm)',
                'theme': 'var(--shadow-base)',
                'theme-md': 'var(--shadow-md)',
                'theme-lg': 'var(--shadow-lg)',
                'theme-card': 'var(--shadow-card)',
            },
            borderWidth: {
                'theme': 'var(--border-width)',
            },
            transitionDuration: {
                'theme-fast': 'var(--transition-fast)',
                'theme': 'var(--transition-base)',
                'theme-slow': 'var(--transition-slow)',
                '400': '400ms',
                '600': '600ms',
                '700': '700ms',
            },
            letterSpacing: {
                'theme-tight': 'var(--letter-spacing-tight)',
                'theme-normal': 'var(--letter-spacing-normal)',
                'theme-wide': 'var(--letter-spacing-wide)',
                'widest': '0.2em',
                'wider': '0.1em',
            },
            // ═══════════════════════════════════════════════════════════════════
            transitionTimingFunction: {
                'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.6s ease-out forwards',
                'slide-down': 'slideDown 0.4s ease-out forwards',
                'scale-in': 'scaleIn 0.3s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': {opacity: '0'},
                    '100%': {opacity: '1'},
                },
                slideUp: {
                    '0%': {opacity: '0', transform: 'translateY(20px)'},
                    '100%': {opacity: '1', transform: 'translateY(0)'},
                },
                slideDown: {
                    '0%': {opacity: '0', transform: 'translateY(-20px)'},
                    '100%': {opacity: '1', transform: 'translateY(0)'},
                },
                scaleIn: {
                    '0%': {opacity: '0', transform: 'scale(0.95)'},
                    '100%': {opacity: '1', transform: 'scale(1)'},
                },
            },
            // Responsive aspect ratios
            aspectRatio: {
                'work': '4 / 3',
                'hero': '16 / 9',
                'square': '1 / 1',
            },
            // Better spacing for touch targets
            minHeight: {
                'touch': '44px',
            },
            minWidth: {
                'touch': '44px',
            },
        },
    },
    plugins: [],
}
