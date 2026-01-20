<![CDATA[<div align="center">

# 🎨 網站設定完整指南

### Complete Configuration Guide

**by 夜喵酷叮 | Night Cat Coding**

[中文](#-中文指南) | [English](#-english-guide)

</div>

---

# 🇹🇼 中文指南

歡迎！這份指南會幫助你完全自訂你的作品集網站。

你需要編輯的唯一文件是根目錄下的 `site.config.json`。

> **💡 小提示**：大多數情況下，使用 [設定精靈](./public/config-maker.html) 就足夠了！
> 這份指南是給想要進階自訂的用戶。

---

## 📋 快速開始

1. 打開 `site.config.json`（建議使用 VS Code，有自動完成功能）
2. 修改你想改的值
3. 儲存文件
4. 等待 GitHub Actions 完成建置
5. 重新整理瀏覽器查看更新

---

## 📁 設定結構總覽

```json
{
  "profile": { ... },     // 👤 個人資料（必填）
  "theme": { ... },       // 🎨 主題顏色（可選，有預設值）
  "ui": { ... },          // 🖼️ 介面設定（可選）
  "content": { ... },     // 📝 文案內容（可選）
  "seo": { ... }          // 🔍 SEO 設定（建議填寫）
}
```

---

## 👤 Profile - 個人資料

這是**最重要**的區塊，包含你的基本資訊。

### 基本欄位

| 欄位 | 說明 | 範例 |
|------|------|------|
| `name` | 你的名字或品牌名 | `"Emma Woolcraft"` |
| `role` | 你的職業/頭銜 | `"編織藝術家"` |
| `profession` | 職業代碼（決定網站風格）⭐ | `"knitter"` |
| `email` | 聯絡 Email | `"hello@example.com"` |
| `bio` | 簡短自我介紹 | `"用雙手編織溫暖與故事"` |
| `avatar` | 頭像圖片路徑 | `"/images/avatar.jpg"` |

### ⭐ profession 職業代碼

這是**最重要的設定**！選對職業，網站會自動變成最適合你的風格。

#### 🍳 餐飲類
| 代碼 | 職業 | 風格特色 |
|------|------|---------|
| `chef` | 廚師/料理人 | 米其林極簡、高對比黑白、優雅襯線字體 |
| `baker` | 烘焙師/甜點師 | 奶油暖色調、超大圓角、溫馨可愛 |
| `barista` | 咖啡師 | 咖啡棕色系、沉穩專業、工業現代 |

#### 🧶 手作類
| 代碼 | 職業 | 風格特色 |
|------|------|---------|
| `knitter` | 編織創作者 | 羊毛白背景、手寫風標題、溫暖有機 |
| `potter` | 陶藝家 | 大地色系、窯燒質感、圓潤緩慢 |
| `jeweler` | 珠寶設計師 | 深夜藍配金、奢華銳利、發光效果 |
| `leatherworker` | 皮革工藝師 | 深棕皮革色、職人硬朗、精工線條 |
| `woodworker` | 木工/木藝師 | 胡桃木色、自然溫潤、寬幅展示 |

#### 🎨 藝術類
| 代碼 | 職業 | 風格特色 |
|------|------|---------|
| `artist` | 藝術家 | 純黑白配螢光橘、大膽前衛、銳利畫框 |
| `illustrator` | 插畫家 | 靛藍紫配珊瑚、活潑卡通、圓潤可愛 |
| `photographer` | 攝影師 | 暗房黑白、無邊框純粹、3:2 經典比例 |
| `designer` | 設計師 | 科技藍配薄荷綠、現代俐落、16:9 寬幅 |

#### 🌸 自然/花藝類
| 代碼 | 職業 | 風格特色 |
|------|------|---------|
| `florist` | 花藝師 | 玫瑰粉配花瓣白、浪漫柔美、垂直比例 |
| `gardener` | 園藝師 | 森林綠系、清新自然、有機曲線 |

#### 💚 療癒/教育類
| 代碼 | 職業 | 風格特色 |
|------|------|---------|
| `therapist` | 治療師/諮商師 | 鼠尾草綠、極慢動畫、藥丸圓角、平靜 |
| `yoga` | 瑜伽老師 | 藕粉配棉麻白、冥想緩慢、寧靜 |
| `teacher` | 老師/講師 | 學院藍、知性專業、清晰友善 |
| `writer` | 作家/文字工作者 | 書頁黃配墨水棕、書卷優雅、經典襯線 |

#### 🏛️ 空間/表演類
| 代碼 | 職業 | 風格特色 |
|------|------|---------|
| `architect` | 建築師 | 純黑白、絕對銳利、最快動畫、結構精準 |
| `interior` | 室內設計師 | 奶茶亞麻色、優雅簡約、生活質感 |
| `musician` | 音樂人 | 黑配電吉他紅、快節奏動感、1:1 專輯封面 |

### 社群連結

在 `social` 物件中添加你的社群網址，留空或不填則不顯示：

```json
"social": {
  "instagram": "https://instagram.com/yourname",
  "pinterest": "https://pinterest.com/yourname",
  "etsy": "https://yourshop.etsy.com",
  "youtube": "https://youtube.com/@yourname",
  "tiktok": "https://tiktok.com/@yourname",
  "twitter": "",
  "linkedin": "",
  "behance": "",
  "dribbble": ""
}
```

**支援的平台**：Instagram、Pinterest、Etsy、YouTube、TikTok、Twitter/X、LinkedIn、Behance、Dribbble

### 完整範例

```json
"profile": {
  "name": "Emma Woolcraft",
  "role": "編織藝術家 & 纖維創作者",
  "profession": "knitter",
  "email": "hello@emmawoolcraft.com",
  "bio": "用雙手編織溫暖與故事，每一針都是對生活的熱愛。",
  "avatar": "/images/avatar.jpg",
  "social": {
    "instagram": "https://instagram.com/emmawoolcraft",
    "etsy": "https://emmawoolcraft.etsy.com",
    "pinterest": "https://pinterest.com/emmawoolcraft"
  }
}
```

---

## 🎨 Theme - 主題設定

> **💡 大多數情況下不需要設定這個區塊！**
> 選對 `profession` 後，系統會自動套用最適合的配色。
> 這個區塊是給想要「覆蓋」預設值的進階用戶。

### 顏色設定

所有顏色必須是 **十六進位格式**，以 `#` 開頭。

| 欄位 | 說明 | 預設值 |
|------|------|--------|
| `primaryColor` | 主要品牌色 | 根據職業自動設定 |
| `secondaryColor` | 次要/強調色 | 根據職業自動設定 |
| `backgroundColor` | 頁面背景色 | 根據職業自動設定 |
| `textColor` | 主要文字顏色 | 根據職業自動設定 |
| `mutedColor` | 次要文字顏色 | 根據職業自動設定 |

### 字體設定

字體從 [Google Fonts](https://fonts.google.com) 載入。

| 欄位 | 說明 | 範例 |
|------|------|------|
| `fontFamily` | 內文字體 | `"Noto Sans TC"`、`"Inter"`、`"Lora"` |
| `headingFont` | 標題字體 | `"Playfair Display"`、`"Amatic SC"` |

### 配色範例

#### 🌿 大地暖色系

```json
"theme": {
  "primaryColor": "#8B4513",
  "secondaryColor": "#A0522D",
  "backgroundColor": "#FDF5E6",
  "textColor": "#3D2914",
  "mutedColor": "#8B7355"
}
```

#### 🌊 現代極簡系

```json
"theme": {
  "primaryColor": "#2C3E50",
  "secondaryColor": "#3498DB",
  "backgroundColor": "#FFFFFF",
  "textColor": "#2C3E50",
  "mutedColor": "#7F8C8D"
}
```

#### 🌸 柔美粉彩系

```json
"theme": {
  "primaryColor": "#D4A5A5",
  "secondaryColor": "#FFCACA",
  "backgroundColor": "#FFF5F5",
  "textColor": "#5D4E60",
  "mutedColor": "#9A8F97"
}
```

**💡 找配色工具**：
- [Coolors.co](https://coolors.co) - 隨機配色生成器
- [Adobe Color](https://color.adobe.com) - 專業配色工具
- [Happy Hues](https://www.happyhues.co) - 實際應用範例

---

## 🖼️ UI - 介面設定

控制網站的版面配置和顯示選項。

### 🎭 風格預設 (themePreset)

這個設定會改變整體「視覺性格」——圓角、陰影、邊框等。

| 值 | 適合誰 | 視覺效果 |
|----|---------| ---------|
| `"default"` | 編織、烘焙、手作人 | 圓角、柔和陰影、溫暖有機 |
| `"minimal"` | 廚師、建築師、攝影師 | 銳利邊角、無陰影、專業乾淨 |
| `"soft"` | 治療師、瑜伽、藝術家 | 超大圓角、極柔陰影、溫和親切 |
| `"bold"` | 音樂人、設計師、新創 | 略微圓角、戲劇性陰影、強烈衝擊 |

> **💡 小提示**：`profession` 會自動選擇最適合的 `themePreset`，通常不需要手動設定。

### Hero 區塊樣式

```json
"heroStyle": "split"    // 左圖右文
"heroStyle": "centered" // 置中排列
"heroStyle": "minimal"  // 極簡只有作品格
```

### 顯示/隱藏區塊

| 欄位 | 說明 | 預設 |
|------|------|------|
| `showFooter` | 顯示頁尾 | `true` |
| `showSocialLinks` | 顯示社群圖示 | `true` |
| `showOtherWorks` | 顯示「其他作品」區塊 | `true` |
| `showBackToTop` | 手機顯示「回到頂部」按鈕 | `true` |

### 作品格線設定

| 欄位 | 選項 | 說明 |
|------|------|------|
| `gridColumns` | `2`、`3`、`4` | 桌面版的欄數 |
| `thumbnailRatio` | `"4/3"`、`"3/2"`、`"16/9"`、`"1/1"`、`"4/5"` | 縮圖比例 |

### 導航列樣式

| 值 | 說明 |
|----|------|
| `"default"` | 標準文字導航 |
| `"minimal"` | 極簡風格 |

### 頁面區塊順序 (layout)

自訂首頁顯示哪些區塊、以什麼順序：

```json
"layout": ["Hero", "Works", "OtherWorks"]           // 預設
"layout": ["Hero", "About", "Works", "Contact"]     // 加入關於和聯絡
"layout": ["Works"]                                  // 只顯示作品
```

**可用區塊**：`Hero`、`Works`、`OtherWorks`、`About`、`Contact`、`Gallery`、`Testimonials`

### 完整範例

```json
"ui": {
  "themePreset": "default",
  "heroStyle": "split",
  "gridColumns": 3,
  "thumbnailRatio": "4/3",
  "navStyle": "default",
  "showFooter": true,
  "showSocialLinks": true,
  "showOtherWorks": true,
  "layout": ["Hero", "Works", "OtherWorks"]
}
```

---

## 📝 Content - 文案內容

自訂網站上的所有文字。

| 欄位 | 出現位置 | 預設值 |
|------|---------|--------|
| `heroTitle` | 首頁主標題 | 根據職業自動生成 |
| `heroSubtitle` | 首頁副標題 | 根據職業自動生成 |
| `heroButtonText` | 首頁按鈕文字 | `"瀏覽作品"` |
| `worksTitle` | 作品區標題 | `"我的作品"` |
| `otherWorksTitle` | 其他作品區標題 | `"更多作品"` |
| `footerText` | 頁尾文字 | 自動生成 |
| `notFoundTitle` | 404 頁面標題 | 根據職業自動生成（有趣的） |
| `notFoundMessage` | 404 頁面訊息 | 根據職業自動生成 |
| `notFoundButtonText` | 404 頁面按鈕 | `"回到首頁"` |

### 範例

```json
"content": {
  "heroTitle": "用雙手編織故事",
  "heroSubtitle": "每一針都是對生活的熱愛",
  "heroButtonText": "探索作品",
  "worksTitle": "精選創作",
  "otherWorksTitle": "更多作品",
  "footerText": "© 2024 Emma Woolcraft"
}
```

---

## 🔍 SEO - 搜尋引擎優化

讓搜尋引擎更容易找到你的網站。

| 欄位 | 說明 | 建議 |
|------|------|------|
| `siteTitle` | 瀏覽器標籤標題 | `"你的名字 | 你的職業"` |
| `siteDescription` | Meta 描述 | 控制在 160 字元內 |
| `keywords` | 搜尋關鍵字 | 用逗號分隔 |
| `ogImage` | 社群分享預覽圖 | 建議 1200x630 像素 |

### 範例

```json
"seo": {
  "siteTitle": "Emma Woolcraft | 編織藝術家",
  "siteDescription": "手工編織藝術家 Emma 的作品集。專注於永續纖維藝術，為你的生活編織溫暖。",
  "keywords": "編織, 纖維藝術, 手作, 羊毛, 圍巾, 永續時尚",
  "ogImage": "/images/og-image.jpg"
}
```

---

## 📷 添加圖片

### 路徑規則

1. 圖片放在 `public/images/` 資料夾
2. 路徑從 `/images/` 開始

```json
"avatar": "/images/avatar.jpg",
"ogImage": "/images/og-image.jpg"
```

### 支援格式

- ✅ `.jpg` / `.jpeg` - 照片首選
- ✅ `.png` - 需要透明背景時使用
- ✅ `.webp` - 檔案小品質好，**推薦**
- ✅ `.gif` - 動態圖片
- ✅ `.svg` - 向量圖，Logo 首選

### 圖片尺寸建議

| 用途 | 建議尺寸 |
|------|---------|
| 頭像 | 400x400 像素 |
| 作品照片 | 1200x900 像素（4:3 比例） |
| OG 社群預覽圖 | 1200x630 像素 |

---

## ✅ 驗證與錯誤修復

### 自動修復功能

這個模板有內建的「容錯機制」，會自動修復常見的 JSON 錯誤：

- ✅ 尾隨逗號：`{ "name": "小美", }` → 自動移除
- ✅ 單引號：`{ 'name': '小美' }` → 自動轉成雙引號
- ✅ 無引號的 Key：`{ name: "小美" }` → 自動加引號

### 手動驗證

如果你使用 VS Code：
- 安裝 JSON 擴充功能
- 會自動顯示語法錯誤

線上驗證工具：
- [JSONLint](https://jsonlint.com/) - JSON 格式檢查

---

## 🆘 疑難排解

### 顏色沒有改變？

- 確保顏色以 `#` 開頭
- 使用 6 位數十六進位：`#8B4513`（不是 `#8B4`）

### 字體沒有載入？

- 到 [Google Fonts](https://fonts.google.com) 確認字體名稱
- 大小寫要完全一樣：`"Playfair Display"`（不是 `"playfair display"`）

### 變更沒有出現？

1. 確保檔案已儲存
2. 確保已 Commit 到 GitHub
3. 檢查 GitHub Actions 是否完成
4. 強制重新整理瀏覽器：`Ctrl+Shift+R`（Mac 是 `Cmd+Shift+R`）

### JSON 語法錯誤？

- 所有 Key 要用雙引號：`"name"`（不是 `name`）
- 最後一個項目後面不要逗號
- 用 [JSONLint](https://jsonlint.com/) 檢查

---

## 📚 完整設定範例

```json
{
  "profile": {
    "name": "Emma Woolcraft",
    "role": "編織藝術家 & 纖維創作者",
    "profession": "knitter",
    "email": "hello@emmawoolcraft.com",
    "bio": "用雙手編織溫暖與故事，每一針都是對生活的熱愛。",
    "avatar": "/images/avatar.jpg",
    "social": {
      "instagram": "https://instagram.com/emmawoolcraft",
      "etsy": "https://emmawoolcraft.etsy.com",
      "pinterest": "https://pinterest.com/emmawoolcraft"
    }
  },
  "theme": {
    "primaryColor": "#a0785a",
    "backgroundColor": "#fdf6ec"
  },
  "ui": {
    "heroStyle": "split",
    "gridColumns": 3,
    "thumbnailRatio": "4/3",
    "showOtherWorks": true
  },
  "content": {
    "heroTitle": "用雙手編織故事",
    "heroSubtitle": "每一針都是對生活的熱愛",
    "heroButtonText": "探索作品"
  },
  "seo": {
    "siteTitle": "Emma Woolcraft | 編織藝術家",
    "siteDescription": "手工編織藝術家 Emma 的作品集網站。",
    "keywords": "編織, 纖維藝術, 手作, 羊毛"
  }
}
```

---

## 🔗 實用資源

- **配色工具**：[Coolors.co](https://coolors.co)、[Adobe Color](https://color.adobe.com)
- **字體選擇**：[Google Fonts](https://fonts.google.com)
- **JSON 驗證**：[JSONLint](https://jsonlint.com/)
- **色碼選擇器**：[HTML Color Codes](https://htmlcolorcodes.com/)
- **圖片壓縮**：[TinyPNG](https://tinypng.com/)

---

---

# 🇺🇸 English Guide

Welcome! This guide will help you fully customize your portfolio website.

The only file you need to edit is `site.config.json` in the root directory.

> **💡 Tip**: For most users, the [Config Wizard](./public/config-maker.html) is sufficient!
> This guide is for advanced customization.

---

## 📋 Quick Start

1. Open `site.config.json` (VS Code recommended for auto-complete)
2. Modify the values you want to change
3. Save the file
4. Wait for GitHub Actions to build
5. Refresh your browser to see updates

---

## 📁 Configuration Structure Overview

```json
{
  "profile": { ... },     // 👤 Personal Info (required)
  "theme": { ... },       // 🎨 Theme Colors (optional, has defaults)
  "ui": { ... },          // 🖼️ UI Settings (optional)
  "content": { ... },     // 📝 Text Content (optional)
  "seo": { ... }          // 🔍 SEO Settings (recommended)
}
```

---

## 👤 Profile - Personal Information

This is the **most important** section containing your basic info.

### Basic Fields

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Your name or brand name | `"Emma Woolcraft"` |
| `role` | Your profession/title | `"Fiber Artist"` |
| `profession` | Profession code (determines website style) ⭐ | `"knitter"` |
| `email` | Contact email | `"hello@example.com"` |
| `bio` | Short bio | `"Weaving warmth and stories with my hands"` |
| `avatar` | Avatar image path | `"/images/avatar.jpg"` |

### ⭐ Profession Codes

This is the **most important setting**! Choose the right profession, and the website automatically becomes the perfect style for you.

#### 🍳 Food & Beverage
| Code | Profession | Style |
|------|-----------|-------|
| `chef` | Chef | Michelin minimal, high contrast B&W, elegant serif |
| `baker` | Baker/Pastry Chef | Warm cream tones, extra-large rounded corners |
| `barista` | Barista | Coffee brown, professional, modern industrial |

#### 🧶 Handcraft
| Code | Profession | Style |
|------|-----------|-------|
| `knitter` | Knitter/Fiber Artist | Wool white background, handwritten headings, warm organic |
| `potter` | Potter/Ceramicist | Earth tones, kiln-fired texture, round & slow |
| `jeweler` | Jewelry Designer | Midnight blue & gold, luxurious sharp, glow effects |
| `leatherworker` | Leather Craftsman | Deep leather brown, artisan rugged |
| `woodworker` | Woodworker | Walnut tones, natural warmth, wide display |

#### 🎨 Art & Design
| Code | Profession | Style |
|------|-----------|-------|
| `artist` | Artist | Pure B&W with neon orange, bold avant-garde |
| `illustrator` | Illustrator | Indigo purple & coral, playful cartoon |
| `photographer` | Photographer | Darkroom B&W, borderless, 3:2 classic ratio |
| `designer` | Designer | Tech blue & mint, modern, 16:9 widescreen |

#### 🌸 Nature & Floral
| Code | Profession | Style |
|------|-----------|-------|
| `florist` | Florist | Rose pink, petal white, romantic vertical |
| `gardener` | Gardener | Forest green, fresh natural, organic curves |

#### 💚 Wellness & Education
| Code | Profession | Style |
|------|-----------|-------|
| `therapist` | Therapist/Counselor | Sage green, super slow animations, calm |
| `yoga` | Yoga Instructor | Dusty pink, meditative slow transitions |
| `teacher` | Teacher/Instructor | Academic blue, intellectual professional |
| `writer` | Writer | Book page yellow, ink brown, scholarly serif |

#### 🏛️ Architecture & Performance
| Code | Profession | Style |
|------|-----------|-------|
| `architect` | Architect | Pure B&W, absolutely sharp, fastest animations |
| `interior` | Interior Designer | Milk tea tones, elegant minimal |
| `musician` | Musician | Black with electric red, fast-paced, 1:1 album ratio |

### Social Links

Add your social URLs in the `social` object. Leave empty or omit if not needed:

```json
"social": {
  "instagram": "https://instagram.com/yourname",
  "pinterest": "https://pinterest.com/yourname",
  "etsy": "https://yourshop.etsy.com",
  "youtube": "https://youtube.com/@yourname",
  "tiktok": "https://tiktok.com/@yourname",
  "twitter": "",
  "linkedin": "",
  "behance": "",
  "dribbble": ""
}
```

**Supported platforms**: Instagram, Pinterest, Etsy, YouTube, TikTok, Twitter/X, LinkedIn, Behance, Dribbble

### Complete Example

```json
"profile": {
  "name": "Emma Woolcraft",
  "role": "Fiber Artist & Knitting Designer",
  "profession": "knitter",
  "email": "hello@emmawoolcraft.com",
  "bio": "Weaving warmth and stories with every stitch.",
  "avatar": "/images/avatar.jpg",
  "social": {
    "instagram": "https://instagram.com/emmawoolcraft",
    "etsy": "https://emmawoolcraft.etsy.com",
    "pinterest": "https://pinterest.com/emmawoolcraft"
  }
}
```

---

## 🎨 Theme - Theme Settings

> **💡 In most cases, you don't need to set this section!**
> After choosing the right `profession`, the system auto-applies the best colors.
> This section is for advanced users who want to "override" defaults.

### Color Settings

All colors must be in **hex format** starting with `#`.

| Field | Description | Default |
|-------|-------------|---------|
| `primaryColor` | Main brand color | Auto-set by profession |
| `secondaryColor` | Secondary/accent color | Auto-set by profession |
| `backgroundColor` | Page background | Auto-set by profession |
| `textColor` | Main text color | Auto-set by profession |
| `mutedColor` | Secondary text color | Auto-set by profession |

### Font Settings

Fonts are loaded from [Google Fonts](https://fonts.google.com).

| Field | Description | Examples |
|-------|-------------|----------|
| `fontFamily` | Body font | `"Inter"`, `"Lora"`, `"Poppins"` |
| `headingFont` | Heading font | `"Playfair Display"`, `"Amatic SC"` |

### Color Scheme Examples

#### 🌿 Earthy Warm

```json
"theme": {
  "primaryColor": "#8B4513",
  "secondaryColor": "#A0522D",
  "backgroundColor": "#FDF5E6",
  "textColor": "#3D2914",
  "mutedColor": "#8B7355"
}
```

#### 🌊 Modern Minimal

```json
"theme": {
  "primaryColor": "#2C3E50",
  "secondaryColor": "#3498DB",
  "backgroundColor": "#FFFFFF",
  "textColor": "#2C3E50",
  "mutedColor": "#7F8C8D"
}
```

#### 🌸 Soft Pastel

```json
"theme": {
  "primaryColor": "#D4A5A5",
  "secondaryColor": "#FFCACA",
  "backgroundColor": "#FFF5F5",
  "textColor": "#5D4E60",
  "mutedColor": "#9A8F97"
}
```

**💡 Color Tools**:
- [Coolors.co](https://coolors.co) - Random palette generator
- [Adobe Color](https://color.adobe.com) - Professional color tool
- [Happy Hues](https://www.happyhues.co) - Real-world examples

---

## 🖼️ UI - Interface Settings

Control layout and display options.

### 🎭 Theme Preset (themePreset)

Changes overall "visual personality" - corners, shadows, borders.

| Value | Best For | Visual Effect |
|-------|----------|---------------|
| `"default"` | Knitters, bakers, crafters | Rounded, soft shadows, warm organic |
| `"minimal"` | Chefs, architects, photographers | Sharp edges, no shadows, professional |
| `"soft"` | Therapists, yoga, artists | Extra rounded, very soft shadows, gentle |
| `"bold"` | Musicians, designers, startups | Slight rounding, dramatic shadows, strong |

> **💡 Tip**: `profession` auto-selects the best `themePreset`, usually no need to set manually.

### Hero Section Style

```json
"heroStyle": "split"    // Image left, text right
"heroStyle": "centered" // Centered layout
"heroStyle": "minimal"  // Just the works grid
```

### Show/Hide Sections

| Field | Description | Default |
|-------|-------------|---------|
| `showFooter` | Show footer | `true` |
| `showSocialLinks` | Show social icons | `true` |
| `showOtherWorks` | Show "Other Works" section | `true` |
| `showBackToTop` | Show "Back to Top" on mobile | `true` |

### Grid Settings

| Field | Options | Description |
|-------|---------|-------------|
| `gridColumns` | `2`, `3`, `4` | Desktop columns |
| `thumbnailRatio` | `"4/3"`, `"3/2"`, `"16/9"`, `"1/1"`, `"4/5"` | Thumbnail aspect ratio |

### Navigation Style

| Value | Description |
|-------|-------------|
| `"default"` | Standard text navigation |
| `"minimal"` | Minimal style |

### Page Section Order (layout)

Customize which sections appear and in what order:

```json
"layout": ["Hero", "Works", "OtherWorks"]           // Default
"layout": ["Hero", "About", "Works", "Contact"]     // With About & Contact
"layout": ["Works"]                                  // Works only
```

**Available sections**: `Hero`, `Works`, `OtherWorks`, `About`, `Contact`, `Gallery`, `Testimonials`

### Complete Example

```json
"ui": {
  "themePreset": "default",
  "heroStyle": "split",
  "gridColumns": 3,
  "thumbnailRatio": "4/3",
  "navStyle": "default",
  "showFooter": true,
  "showSocialLinks": true,
  "showOtherWorks": true,
  "layout": ["Hero", "Works", "OtherWorks"]
}
```

---

## 📝 Content - Text Content

Customize all text on your site.

| Field | Location | Default |
|-------|----------|---------|
| `heroTitle` | Homepage main heading | Auto-generated by profession |
| `heroSubtitle` | Homepage subtitle | Auto-generated by profession |
| `heroButtonText` | Homepage button | `"View Works"` |
| `worksTitle` | Works section title | `"My Works"` |
| `otherWorksTitle` | Other works section title | `"More Works"` |
| `footerText` | Footer text | Auto-generated |
| `notFoundTitle` | 404 page heading | Auto-generated (fun!) |
| `notFoundMessage` | 404 page message | Auto-generated |
| `notFoundButtonText` | 404 page button | `"Back to Home"` |

### Example

```json
"content": {
  "heroTitle": "Weaving Stories by Hand",
  "heroSubtitle": "Every stitch is a love letter to life",
  "heroButtonText": "Explore Works",
  "worksTitle": "Featured Creations",
  "otherWorksTitle": "More Works",
  "footerText": "© 2024 Emma Woolcraft"
}
```

---

## 🔍 SEO - Search Engine Optimization

Help search engines find your site.

| Field | Description | Recommendation |
|-------|-------------|----------------|
| `siteTitle` | Browser tab title | `"Your Name | Your Profession"` |
| `siteDescription` | Meta description | Keep under 160 characters |
| `keywords` | Search keywords | Comma-separated |
| `ogImage` | Social preview image | 1200x630 pixels recommended |

### Example

```json
"seo": {
  "siteTitle": "Emma Woolcraft | Fiber Artist",
  "siteDescription": "Portfolio of fiber artist Emma. Specializing in sustainable textile art, weaving warmth into life.",
  "keywords": "knitting, fiber art, handmade, wool, sustainable fashion",
  "ogImage": "/images/og-image.jpg"
}
```

---

## 📷 Adding Images

### Path Rules

1. Place images in `public/images/` folder
2. Reference with paths starting from `/images/`

```json
"avatar": "/images/avatar.jpg",
"ogImage": "/images/og-image.jpg"
```

### Supported Formats

- ✅ `.jpg` / `.jpeg` - Best for photos
- ✅ `.png` - When transparency needed
- ✅ `.webp` - Small size, great quality, **recommended**
- ✅ `.gif` - Animated images
- ✅ `.svg` - Vector graphics, best for logos

### Recommended Image Sizes

| Use Case | Recommended Size |
|----------|-----------------|
| Avatar | 400x400 pixels |
| Portfolio photos | 1200x900 pixels (4:3 ratio) |
| OG social preview | 1200x630 pixels |

---

## ✅ Validation & Error Fixing

### Auto-Fix Feature

This template has built-in "error tolerance" that auto-fixes common JSON errors:

- ✅ Trailing commas: `{ "name": "Emma", }` → auto-removed
- ✅ Single quotes: `{ 'name': 'Emma' }` → auto-converted to double quotes
- ✅ Unquoted keys: `{ name: "Emma" }` → auto-quoted

### Manual Validation

If using VS Code:
- Install JSON extension
- Will auto-show syntax errors

Online validation:
- [JSONLint](https://jsonlint.com/) - JSON format checker

---

## 🆘 Troubleshooting

### Colors Not Changing?

- Make sure colors start with `#`
- Use 6-digit hex: `#8B4513` (not `#8B4`)

### Fonts Not Loading?

- Check exact font name on [Google Fonts](https://fonts.google.com)
- Case-sensitive: `"Playfair Display"` (not `"playfair display"`)

### Changes Not Appearing?

1. Make sure file is saved
2. Make sure committed to GitHub
3. Check if GitHub Actions completed
4. Hard refresh browser: `Ctrl+Shift+R` (Mac: `Cmd+Shift+R`)

### JSON Syntax Errors?

- All keys need double quotes: `"name"` (not `name`)
- No trailing comma after last item
- Use [JSONLint](https://jsonlint.com/) to check

---

## 📚 Complete Configuration Example

```json
{
  "profile": {
    "name": "Emma Woolcraft",
    "role": "Fiber Artist & Knitting Designer",
    "profession": "knitter",
    "email": "hello@emmawoolcraft.com",
    "bio": "Weaving warmth and stories with every stitch.",
    "avatar": "/images/avatar.jpg",
    "social": {
      "instagram": "https://instagram.com/emmawoolcraft",
      "etsy": "https://emmawoolcraft.etsy.com",
      "pinterest": "https://pinterest.com/emmawoolcraft"
    }
  },
  "theme": {
    "primaryColor": "#a0785a",
    "backgroundColor": "#fdf6ec"
  },
  "ui": {
    "heroStyle": "split",
    "gridColumns": 3,
    "thumbnailRatio": "4/3",
    "showOtherWorks": true
  },
  "content": {
    "heroTitle": "Weaving Stories by Hand",
    "heroSubtitle": "Every stitch is a love letter to life",
    "heroButtonText": "Explore Works"
  },
  "seo": {
    "siteTitle": "Emma Woolcraft | Fiber Artist",
    "siteDescription": "Portfolio of fiber artist Emma Woolcraft.",
    "keywords": "knitting, fiber art, handmade, wool"
  }
}
```

---

## 🔗 Useful Resources

- **Color Tools**: [Coolors.co](https://coolors.co), [Adobe Color](https://color.adobe.com)
- **Fonts**: [Google Fonts](https://fonts.google.com)
- **JSON Validator**: [JSONLint](https://jsonlint.com/)
- **Color Picker**: [HTML Color Codes](https://htmlcolorcodes.com/)
- **Image Compression**: [TinyPNG](https://tinypng.com/)

---

<div align="center">

## ☕ Support the Author | 支持作者

If this template helped you, consider buying me a coffee!

如果這個模板對你有幫助，歡迎請我喝杯咖啡！

### WeChat Reward | 微信讚賞

<img src="https://imgur.com/a9SbNBB.png" alt="WeChat Reward QR Code" width="200">

### PayPal

<img src="https://imgur.com/zQN3TCe.png" alt="PayPal QR Code" width="200">

**Thank you for your support! 感謝你的支持！ 💪**

---

## 📜 License

MIT License © 2024 [夜喵酷叮 | Night Cat Coding](https://github.com/night-cat-coding)

Happy customizing! 🎉

祝你自訂愉快！🎉

</div>
]]>