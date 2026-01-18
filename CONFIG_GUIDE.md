# 🎨 Site Configuration Guide

Welcome! This guide will help you customize your portfolio website. The only file you need to edit is `site.config.json`
in the root directory.

> **No coding required** - just change the values and save!

## 📋 Quick Start

1. Open `site.config.json` in any text editor (VS Code recommended for auto-complete)
2. Modify the values you want to change
3. Save the file
4. Refresh your browser to see updates

---

## 📁 Configuration Sections

### 👤 Profile - Your Personal Information

| Field    | Description                          | Example                                        |
|----------|--------------------------------------|------------------------------------------------|
| `name`   | Your name (appears in header/footer) | `"Emma Woolcraft"`                             |
| `role`   | Your profession/title                | `"Fiber Artist & Knitting Designer"`           |
| `email`  | Contact email                        | `"hello@example.com"`                          |
| `bio`    | Short biography or tagline           | `"Creating warmth through handcrafted knits."` |
| `avatar` | Path to your avatar image            | `"/images/avatar.jpg"`                         |

#### Adding Social Links

Add your social media URLs in the `social` object. Leave as empty string `""` if you don't have one:

```json
"social": {
  "instagram": "https://instagram.com/yourname",
  "pinterest": "https://pinterest.com/yourname",
  "etsy": "https://yourshop.etsy.com",
  "twitter": "",
  "linkedin": "",
  "youtube": "",
  "tiktok": "",
  "behance": "",
  "dribbble": ""
}
```

**Supported platforms:** Instagram, Pinterest, Etsy, Twitter/X, LinkedIn, YouTube, TikTok, Behance, Dribbble

---

### 🎨 Theme - Colors and Typography

#### Changing Colors

All colors must be in **hex format** starting with `#`.

| Field             | Description            | Default                    |
|-------------------|------------------------|----------------------------|
| `primaryColor`    | Main brand color       | `"#8B4513"` (Saddle Brown) |
| `secondaryColor`  | Secondary/accent color | `"#A0522D"` (Sienna)       |
| `backgroundColor` | Page background        | `"#FDF5E6"` (Old Lace)     |
| `textColor`       | Main text color        | `"#3D2914"` (Dark Brown)   |
| `mutedColor`      | Secondary text color   | `"#8B7355"` (Light Brown)  |

**💡 Tip:** Use [Coolors.co](https://coolors.co) or [Adobe Color](https://color.adobe.com) to find beautiful color
palettes!

#### Example Color Schemes

**Warm & Earthy:**

```json
"primaryColor": "#8B4513",
"secondaryColor": "#A0522D",
"backgroundColor": "#FDF5E6"
```

**Modern & Minimal:**

```json
"primaryColor": "#2C3E50",
"secondaryColor": "#3498DB",
"backgroundColor": "#FFFFFF"
```

**Soft & Feminine:**

```json
"primaryColor": "#D4A5A5",
"secondaryColor": "#FFCACA",
"backgroundColor": "#FFF5F5"
```

#### Changing Fonts

Fonts are loaded from [Google Fonts](https://fonts.google.com).

| Field         | Description             | Popular Choices                        |
|---------------|-------------------------|----------------------------------------|
| `fontFamily`  | Main body font          | `"Lora"`, `"Inter"`, `"Poppins"`       |
| `headingFont` | Heading font (optional) | `"Playfair Display"`, `"Merriweather"` |

**💡 Tip:** If you don't need a separate heading font, set `headingFont` to the same value as `fontFamily`.

---

### 🖼️ UI - Layout and Display Options

#### 🎭 Theme Presets (NEW!)

The `themePreset` option lets you completely change the visual "personality" of your site with a single setting. This
affects corners, shadows, borders, and overall aesthetics.

| Preset      | Best For                              | Look & Feel                                             |
|-------------|---------------------------------------|---------------------------------------------------------|
| `"default"` | Knitters, bakers, craftspeople        | Rounded corners, soft shadows, warm & organic           |
| `"minimal"` | Chefs, architects, photographers      | Sharp edges, no shadows, clean & professional           |
| `"soft"`    | Therapists, wellness coaches, artists | Extra rounded, very soft shadows, gentle & approachable |
| `"bold"`    | Athletes, musicians, startups         | Slightly rounded, dramatic shadows, strong & impactful  |

**Example - Switching to Minimal Style:**

```json
"ui": {
"themePreset": "minimal",
"heroStyle": "split",
...
}
```

**What changes with each preset:**

- **Border radius**: From sharp (0px) to rounded (16px+)
- **Shadows**: From none to soft to dramatic
- **Borders**: Some presets add line-based aesthetics
- **Button styles**: Pill buttons vs square buttons
- **Transitions**: Snappy vs smooth animations

💡 **Tip**: Try changing just the `themePreset` first - you might be surprised how different your site can look!

#### Hero Section Style

The `heroStyle` option controls how your homepage hero section appears:

| Value        | Description                            |
|--------------|----------------------------------------|
| `"split"`    | Image on left, text on right (default) |
| `"centered"` | Centered content                       |
| `"minimal"`  | Just the works grid, no hero           |

#### Show/Hide Sections

| Field             | What it controls               |
|-------------------|--------------------------------|
| `showFooter`      | Footer visibility              |
| `showSocialLinks` | Social media icons             |
| `showOtherWorks`  | Secondary works section        |
| `showBackToTop`   | "Back to top" button on mobile |

#### Grid Layout

| Field            | Options                             | Description                     |
|------------------|-------------------------------------|---------------------------------|
| `gridColumns`    | `2`, `3`, or `4`                    | Columns in works grid (desktop) |
| `thumbnailRatio` | `"4/3"`, `"3/2"`, `"16/9"`, `"1/1"` | Thumbnail aspect ratio          |

#### Navigation Style

| Value       | Description                    |
|-------------|--------------------------------|
| `"default"` | Standard text navigation links |
| `"minimal"` | Logo only on mobile            |

---

### 📝 Content - Text Content

Customize all the text on your site:

| Field                | Where it appears              |
|----------------------|-------------------------------|
| `heroTitle`          | Main heading on homepage      |
| `heroSubtitle`       | Subtitle below main heading   |
| `heroButtonText`     | Call-to-action button         |
| `worksTitle`         | Portfolio section title       |
| `otherWorksTitle`    | Secondary works section title |
| `footerText`         | Text in the footer            |
| `notFoundTitle`      | 404 page heading              |
| `notFoundMessage`    | 404 page message              |
| `notFoundButtonText` | 404 page button               |

---

### 🔍 SEO - Search Engine Optimization

Help search engines understand your site:

| Field             | Description                | Recommendation              |
|-------------------|----------------------------|-----------------------------|
| `siteTitle`       | Browser tab title          | `"Your Name                 | Your Profession"` |
| `siteDescription` | Meta description           | Keep under 160 characters   |
| `keywords`        | Search keywords            | Comma-separated list        |
| `ogImage`         | Social media preview image | 1200x630 pixels recommended |

---

## 📷 Adding Images

1. Place your images in the `public/images/` folder
2. Reference them with paths starting from `/images/`

```json
"avatar": "/images/avatar.jpg",
"ogImage": "/images/og-image.jpg"
```

**Supported formats:** JPG, PNG, WebP, SVG

---

## ✅ Validation

If you're using VS Code, the configuration file will automatically validate your input and show errors for:

- Invalid color hex codes
- Invalid `heroStyle` values
- Invalid `gridColumns` values
- Invalid `thumbnailRatio` values
- Missing required fields

---

## 🆘 Troubleshooting

### Colors not changing?

- Make sure colors start with `#` (e.g., `#8B4513`)
- Use 6-digit hex codes (e.g., `#8B4513` not `#8B4`)

### Fonts not loading?

- Check the exact font name on [Google Fonts](https://fonts.google.com)
- Names are case-sensitive: `"Playfair Display"` not `"playfair display"`

### Changes not appearing?

- Save the file
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check the browser console for errors

### JSON Syntax Errors?

- All keys must be in double quotes: `"name"` not `name`
- No trailing commas after the last item in arrays/objects
- Use an online [JSON validator](https://jsonlint.com/) to check your file

---

## 📚 Resources

- **Color Palettes:** [Coolors.co](https://coolors.co), [Adobe Color](https://color.adobe.com)
- **Fonts:** [Google Fonts](https://fonts.google.com)
- **JSON Validator:** [JSONLint](https://jsonlint.com/)
- **Hex Color Picker:** [HTML Color Codes](https://htmlcolorcodes.com/)

---

Happy customizing! 🎉
