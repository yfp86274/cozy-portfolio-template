/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                        SITE CONFIGURATION                                  ║
 * ║                                                                            ║
 * ║  🎉 Welcome! This is the ONLY file you need to edit!                      ║
 * ║  No coding required - just change the values below.                       ║
 * ║                                                                            ║
 * ║  💡 Tips:                                                                  ║
 * ║  • Save this file after making changes                                    ║
 * ║  • Refresh your browser to see updates                                    ║
 * ║  • Colors must include the # symbol (e.g., #8B4513)                      ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

export default {
    // ═══════════════════════════════════════════════════════════════════════════
    // PROFILE - Your personal information
    // ═══════════════════════════════════════════════════════════════════════════
    profile: {
        name: 'Emma Woolcraft',                    // Your name (appears in header/footer)
        role: 'Fiber Artist & Knitting Designer', // Your profession/title
        email: 'hello@emmawoolcraft.com',         // Contact email
        bio: 'Creating warmth through handcrafted knits and sustainable fiber art.',
        avatar: '/images/avatar.jpg',             // Path to your avatar (place in public/images/)

        // Social links (leave empty string '' if you don't have one)
        social: {
            instagram: 'https://instagram.com/emmawoolcraft',
            pinterest: 'https://pinterest.com/emmawoolcraft',
            etsy: 'https://emmawoolcraft.etsy.com',
            twitter: '',
            linkedin: '',
            youtube: '',
            tiktok: '',
            behance: '',
            dribbble: '',
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // THEME - Colors and typography
    // ═══════════════════════════════════════════════════════════════════════════
    theme: {
        // 🎨 Colors - Use hex codes (pick from https://coolors.co or similar)
        primaryColor: '#8B4513',      // Main brand color (Saddle Brown - warm & earthy)
        secondaryColor: '#A0522D',    // Secondary/accent color (Sienna)
        backgroundColor: '#FDF5E6',   // Page background (Old Lace - warm cream)
        textColor: '#3D2914',         // Main text color (dark brown)
        mutedColor: '#8B7355',        // Muted/secondary text (lighter brown)

        // 🔤 Typography - Choose from Google Fonts (https://fonts.google.com)
        // Popular choices: 'Lora', 'Playfair Display', 'Merriweather', 'Inter', 'Poppins'
        fontFamily: 'Lora',

        // Additional font for headings (optional - leave same as fontFamily if not needed)
        headingFont: 'Playfair Display',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // UI - Layout and display options
    // ═══════════════════════════════════════════════════════════════════════════
    ui: {
        // Hero section style on home page
        // Options: 'split' (image left, text right), 'centered' (centered content), 'minimal' (just works grid)
        heroStyle: 'split',

        // Show/hide sections
        showFooter: true,
        showSocialLinks: true,
        showOtherWorks: true,

        // Navigation style
        // Options: 'default' (text links), 'minimal' (logo only on mobile)
        navStyle: 'default',

        // Work grid columns (on desktop)
        // Options: 2, 3, or 4
        gridColumns: 3,

        // Image aspect ratio for work thumbnails
        // Options: '4/3', '3/2', '16/9', '1/1' (square)
        thumbnailRatio: '4/3',

        // Enable smooth scroll behavior
        smoothScroll: true,

        // Show "back to top" button on mobile
        showBackToTop: true,
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CONTENT - Text content for various sections
    // ═══════════════════════════════════════════════════════════════════════════
    content: {
        // Hero section
        heroTitle: 'Handcrafted with Love',
        heroSubtitle: 'Sustainable fiber art and knitting designs for the modern home',
        heroButtonText: 'View My Work',

        // Section titles
        worksTitle: 'Portfolio',
        otherWorksTitle: 'More Creations',

        // Footer
        footerText: 'Made with yarn and patience',

        // 404 page
        notFoundTitle: 'Page Not Found',
        notFoundMessage: 'The page you\'re looking for doesn\'t exist.',
        notFoundButtonText: 'Go Home',
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // SEO - Search engine optimization (optional but recommended)
    // ═══════════════════════════════════════════════════════════════════════════
    seo: {
        siteTitle: 'Emma Woolcraft | Fiber Artist',
        siteDescription: 'Handcrafted knitting designs and sustainable fiber art by Emma Woolcraft.',
        keywords: 'knitting, fiber art, sustainable fashion, handmade, wool',
        ogImage: '/images/og-image.jpg', // Social media preview image (1200x630px recommended)
    }
}
