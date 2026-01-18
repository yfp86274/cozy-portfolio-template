# 🎨 Portfolio Template

A beautiful, configuration-driven portfolio template for creative professionals. **No coding required!**

## ✨ Features

- 🎨 **Fully Customizable Colors** - Change your entire color scheme with hex codes
- 📱 **Mobile-First Design** - Looks great on all devices with app-like mobile experience
- 🔤 **Custom Fonts** - Choose from Google Fonts
- 🖼️ **Multiple Hero Layouts** - Split, Centered, or Minimal styles
- 📁 **Automatic Portfolio** - Just drop images in folders

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Customize Your Site

Open `src/site.config.js` and update your information:

```javascript
export default {
    profile: {
        name: 'Your Name',
        role: 'Your Profession',
        email: 'your@email.com',
        // ...
    },
    // ...
}
```

### 3. Add Your Work

Create folders in `src/assets/works/` using this format:

```
src/assets/works/
├── 01_Project_Name/
│   ├── cover.jpg      (thumbnail image)
│   ├── image1.jpg     (detail images)
│   └── image2.png
├── 02_Another_Project/
│   └── ...
```

### 4. Start Development

```bash
npm run dev
```

---

## 🎨 Customization Guide

### Changing Colors

In `src/site.config.js`, find the `theme` section:

```javascript
theme: {
    primaryColor: '#8B4513',      // Main brand color
        secondaryColor
:
    '#A0522D',    // Accent color
        backgroundColor
:
    '#FDF5E6',   // Page background
        textColor
:
    '#3D2914',         // Main text
        mutedColor
:
    '#8B7355',        // Secondary text
}
```

**Color Picker Tools:**

- [Coolors](https://coolors.co) - Generate color palettes
- [Adobe Color](https://color.adobe.com) - Color wheel
- [Realtime Colors](https://realtimecolors.com) - Preview colors on a website

### Changing Fonts

```javascript
theme: {
    fontFamily: 'Lora',           // Body text font
        headingFont
:
    'Playfair Display', // Heading font
}
```

**Popular Font Choices:**

- Elegant: `Playfair Display`, `Cormorant Garamond`, `Libre Baskerville`
- Modern: `Inter`, `Poppins`, `Montserrat`
- Creative: `Lora`, `Merriweather`, `Source Serif Pro`

Browse more at [Google Fonts](https://fonts.google.com)

### Changing Hero Layout

```javascript
ui: {
    heroStyle: 'split',  // Options: 'split', 'centered', 'minimal'
}
```

| Style      | Description                                    |
|------------|------------------------------------------------|
| `split`    | Image on right, text on left (best for photos) |
| `centered` | Full-width image with text overlay             |
| `minimal`  | Just text, no hero image                       |

### Adding Social Links

```javascript
profile: {
    social: {
        instagram: 'https://instagram.com/yourusername',
            pinterest
    :
        'https://pinterest.com/yourusername',
            etsy
    :
        'https://yourshop.etsy.com',
            twitter
    :
        '',  // Leave empty if you don't have one
            linkedin
    :
        '',
    }
}
```

---

## 📁 Project Structure

```
├── src/
│   ├── site.config.js    ← 🎯 EDIT THIS FILE!
│   ├── assets/
│   │   ├── hero.png      ← Your hero image
│   │   └── works/        ← Your portfolio folders
│   ├── components/
│   ├── views/
│   └── ...
├── public/
│   └── images/           ← Additional images
└── ...
```

---

## 🖼️ Adding Portfolio Items

### Folder Naming Convention

Use this format: `XX_Project_Name`

- `XX` = Two-digit number (01, 02, 03...)
- `Project_Name` = Your project title (underscores become spaces)

**Examples:**

- `01_Brand_Identity` → "Brand Identity"
- `02_Web_Design` → "Web Design"
- `03_Logo_Collection` → "Logo Collection"

### Image Types

| File         | Purpose                 |
|--------------|-------------------------|
| `cover.jpg`  | Thumbnail shown in grid |
| Other images | Shown on detail page    |

**Supported formats:** `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.svg`

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

### Deploy to Netlify/Vercel

Just connect your GitHub repo - they'll handle the rest!

---

## 💡 Tips

1. **Image Sizes**: Use images around 1200-2000px wide for best quality
2. **File Names**: Keep them simple (avoid special characters)
3. **Hero Image**: Square or slightly portrait works best for split layout
4. **Colors**: Test your color choices on mobile too!

---

## 🆘 Need Help?

If something isn't working:

1. Make sure all image files are in the correct folders
2. Check that your hex color codes include the `#` symbol
3. Save the config file and refresh your browser

---

Made with ❤️ for creative professionals
