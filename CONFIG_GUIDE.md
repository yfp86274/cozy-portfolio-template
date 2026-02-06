<div align="center">

# 🎨 網站設定完整指南

### Complete Configuration Guide

**by 夜喵酷叮 | Night Cat Coding**

[中文](#-中文指南) | [English](#-english-guide)

</div>

---

# 中文指南

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

| 欄位           | 說明                             | 範例                                                      |
|--------------|--------------------------------|---------------------------------------------------------|
| `name`       | 你的名字或品牌名                       | `"夜喵酷叮"`                                                |
| `role`       | 你的職業/頭銜                        | `"創意開發者 & 開源貢獻者"`                                       |
| `profession` | 職業代碼（決定網站風格）⭐                  | `"designer"`                                            |
| `email`      | 聯絡 Email                       | `"hello@nightcatcoding.com"`                            |
| `bio`        | 簡短自我介紹 ⭐ **會自動顯示在首頁副標題和關於我頁面** | `"用代碼編織創意，讓每個專案都有貓的靈魂"`                                 |
| `avatar`     | 頭像圖片（支援網址或本地路徑）                | `"https://i.imgur.com/xxx.jpg"` 或 `"images/avatar.jpg"` |

> **💡 頭像設定提示**：
> 1. **推薦使用網路圖片**：上傳到 [Imgur](https://imgur.com)、[ImgBB](https://imgbb.com) 等圖床，直接貼網址
> 2. **本地圖片方式**：把圖片放在 `public/images/` 資料夾，路徑填 `images/你的圖片名.jpg`（不需要開頭的 `/`，系統會自動處理）
> 3. 建議尺寸：400x400 像素，支援 jpg/png/webp 格式
> 4. 如果圖片載入失敗，會顯示預設的頭像圖示

> **💡 重要提示**：`bio` 欄位非常重要！如果你沒有設定 `content.heroSubtitle`，系統會自動將 `bio`
> 顯示在首頁副標題位置。這樣你只需要寫一次自我介紹，網站各處都會自動使用。

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
  "github": "https://github.com/night-cat-coding",
  "twitter": "https://twitter.com/nightcatcoding",
  "instagram": "https://instagram.com/nightcatcoding",
  "youtube": "https://youtube.com/@nightcatcoding",
  "behance": "",
  "dribbble": ""
}
```

**支援的平台**：GitHub、Twitter/X、Instagram、Pinterest、Etsy、YouTube、TikTok、LinkedIn、Behance、Dribbble

### 完整範例

```json
"profile": {
  "name": "夜喵酷叮",
  "role": "創意開發者 & 開源貢獻者",
  "profession": "designer",
  "email": "hello@nightcatcoding.com",
  "bio": "用代碼編織創意，讓每個專案都有貓的靈魂 🐱",
"avatar": "images/avatar.jpg",
  "social": {
    "github": "https://github.com/night-cat-coding",
    "twitter": "https://twitter.com/nightcatcoding",
    "instagram": "https://instagram.com/nightcatcoding"
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

#### 🌙 深夜科技風（夜喵風格）

```json
"theme": {
  "primaryColor": "#6366f1",
  "secondaryColor": "#22d3ee",
  "backgroundColor": "#0f0f23",
  "textColor": "#e0e0e0",
  "mutedColor": "#6b7280"
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

### 標題是否顯示在圖片上

```json
"heroShowTitleOnImage": true   // 預設：標題覆蓋在首頁大圖上
"heroShowTitleOnImage": false  // 標題顯示在圖片下方，不遮擋圖片
```

> **💡 適用情境**：如果你的首頁大圖是精心設計的作品或攝影，不想被文字遮擋，可以設為 `false`。

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
  "themePreset": "bold",
  "heroStyle": "split",
  "gridColumns": 3,
  "thumbnailRatio": "16/9",
  "navStyle": "minimal",
  "showFooter": true,
  "showSocialLinks": true,
  "showOtherWorks": true,
  "layout": ["Hero", "Works", "OtherWorks"]
}
```

---

## 📝 Content - 文案內容

自訂網站上的所有文字。

### 🪄 智能回退機制

**好消息！你不需要填寫所有欄位！** 系統會智能地從你的 `profile` 資料自動填補：

| 欄位             | 自動回退來源                          |
|----------------|---------------------------------|
| `heroTitle`    | 如果沒填 → 自動生成 `歡迎來到 [你的名字] 的創作世界` |
| `heroSubtitle` | 如果沒填 → 自動使用 `profile.bio`（自我介紹） |
| `aboutContent` | 如果沒填 → 自動使用 `profile.bio`（自我介紹） |

> **💡 小提示**：這表示你只要在 `profile.bio` 填寫自我介紹，首頁副標題和關於我頁面都會自動顯示這段文字！

### 所有欄位

| 欄位                   | 出現位置     | 預設值                |
|----------------------|----------|--------------------|
| `heroTitle`          | 首頁主標題    | `歡迎來到 [名字] 的創作世界`  |
| `heroSubtitle`       | 首頁副標題    | 自動使用 `profile.bio` |
| `heroButtonText`     | 首頁按鈕文字   | `"瀏覽作品"`           |
| `worksTitle`         | 作品區標題    | `"我的作品"`           |
| `otherWorksTitle`    | 其他作品區標題  | `"更多作品"`           |
| `aboutTitle`         | 關於我區標題   | `"關於我"`            |
| `aboutContent`       | 關於我內容    | 自動使用 `profile.bio` |
| `contactTitle`       | 聯絡我區標題   | `"聯絡我"`            |
| `contactMessage`     | 聯絡我說明文字  | `"有任何問題或合作提案..."`  |
| `contactQrCode`      | 聯絡二維碼圖片  | 留空不顯示              |
| `footerText`         | 頁尾文字     | 自動生成               |
| `notFoundTitle`      | 404 頁面標題 | 根據職業自動生成（有趣的）      |
| `notFoundMessage`    | 404 頁面訊息 | 根據職業自動生成           |
| `notFoundButtonText` | 404 頁面按鈕 | `"回到首頁"`           |

### 聯絡我頁面設定

聯絡我頁面會自動顯示你在 `profile.email` 設定的 Email。你還可以添加：

1. **自訂說明文字**：設定 `contactMessage`
2. **二維碼圖片**：設定 `contactQrCode`（如微信、Line 等）

```json
"content": {
"contactTitle": "與我聯繫",
"contactMessage": "歡迎透過以下方式與我聯繫，我會盡快回覆！",
"contactQrCode": "images/wechat-qrcode.png"
}
```

> **💡 二維碼設定步驟**：
> 1. 準備你的二維碼圖片（建議 200x200 像素）
> 2. 把圖片放在 `public/images/` 資料夾
> 3. 在 `contactQrCode` 填入 `images/你的圖片名.png`（不需要開頭的 `/`）

### 範例

```json
"content": {
  "heroTitle": "用代碼編織創意",
  "heroSubtitle": "讓每個專案都有貓的靈魂 🐱",
  "heroButtonText": "探索專案",
  "worksTitle": "精選作品",
  "otherWorksTitle": "更多專案",
  "footerText": "© 2024 夜喵酷叮 | Night Cat Coding"
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
  "siteTitle": "夜喵酷叮 | 創意開發者",
  "siteDescription": "夜喵酷叮的作品集。專注於開源專案、創意開發，讓代碼也能有溫度。",
  "keywords": "開發者, 設計師, Vue, 開源, 作品集, 模板",
"ogImage": "images/og-image.jpg"
}
```

---

## 📷 添加圖片

### 路徑規則

1. 圖片放在 `public/images/` 資料夾
2. 路徑填寫 `images/` 開頭（不需要開頭的 `/`，系統會自動處理部署路徑）

```json
"avatar": "images/avatar.jpg",
"ogImage": "images/og-image.jpg"
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

- ✅ 尾隨逗號：`{ "name": "夜喵", }` → 自動移除
- ✅ 單引號：`{ 'name': '夜喵' }` → 自動轉成雙引號
- ✅ 無引號的 Key：`{ name: "夜喵" }` → 自動加引號

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
- 使用 6 位數十六進位：`#6366f1`（不是 `#636`）

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
    "name": "夜喵酷叮",
    "role": "創意開發者 & 開源貢獻者",
    "profession": "designer",
    "email": "hello@nightcatcoding.com",
    "bio": "用代碼編織創意，讓每個專案都有貓的靈魂 🐱",
    "avatar": "images/avatar.jpg",
    "social": {
      "github": "https://github.com/night-cat-coding",
      "twitter": "https://twitter.com/nightcatcoding",
      "instagram": "https://instagram.com/nightcatcoding"
    }
  },
  "theme": {
    "primaryColor": "#6366f1",
    "backgroundColor": "#0f0f23"
  },
  "ui": {
    "heroStyle": "split",
    "gridColumns": 3,
    "thumbnailRatio": "16/9",
    "showOtherWorks": true
  },
  "content": {
    "heroTitle": "用代碼編織創意",
    "heroSubtitle": "讓每個專案都有貓的靈魂 🐱",
    "heroButtonText": "探索專案"
  },
  "seo": {
    "siteTitle": "夜喵酷叮 | 創意開發者",
    "siteDescription": "夜喵酷叮的作品集網站。",
    "keywords": "開發者, 設計師, Vue, 開源, 作品集"
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

# English Guide

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

| Field        | Description                                                       | Example                                                             |
|--------------|-------------------------------------------------------------------|---------------------------------------------------------------------|
| `name`       | Your name or brand name                                           | `"Night Cat Coding"`                                                |
| `role`       | Your profession/title                                             | `"Creative Developer & Open Source Contributor"`                    |
| `profession` | Profession code (determines website style) ⭐                      | `"designer"`                                                        |
| `email`      | Contact email                                                     | `"hello@nightcatcoding.com"`                                        |
| `bio`        | Short bio ⭐ **Auto-displays on homepage subtitle and About page** | `"Weaving creativity with code, giving every project a cat's soul"` |
| `avatar`     | Avatar image (URL or local path)                                  | `"https://i.imgur.com/xxx.jpg"` or `"images/avatar.jpg"`            |

> **💡 Avatar Setup Tips**:
> 1. **Recommended: Use online images** - Upload to [Imgur](https://imgur.com), [ImgBB](https://imgbb.com), then paste
     the URL
> 2. **Local images**: Put image in `public/images/` folder, use path `images/yourimage.jpg` (no leading `/` needed,
     system handles it automatically)
> 3. Recommended size: 400x400 pixels, supports jpg/png/webp
> 4. If image fails to load, a default avatar icon will be shown

> **💡 Important**: The `bio` field is very important! If you don't set `content.heroSubtitle`, the system will
> automatically display your `bio` in the homepage subtitle. This way you only need to write your intro once, and the site
> will use it everywhere.

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
  "github": "https://github.com/night-cat-coding",
  "twitter": "https://twitter.com/nightcatcoding",
  "instagram": "https://instagram.com/nightcatcoding",
  "youtube": "https://youtube.com/@nightcatcoding",
  "behance": "",
  "dribbble": ""
}
```

**Supported platforms**: GitHub, Twitter/X, Instagram, Pinterest, Etsy, YouTube, TikTok, LinkedIn, Behance, Dribbble

### Complete Example

```json
"profile": {
  "name": "Night Cat Coding",
  "role": "Creative Developer & Open Source Contributor",
  "profession": "designer",
  "email": "hello@nightcatcoding.com",
  "bio": "Weaving creativity with code, giving every project a cat's soul 🐱",
"avatar": "images/avatar.jpg",
  "social": {
    "github": "https://github.com/night-cat-coding",
    "twitter": "https://twitter.com/nightcatcoding",
    "instagram": "https://instagram.com/nightcatcoding"
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

#### 🌙 Night Tech Style (Night Cat Style)

```json
"theme": {
  "primaryColor": "#6366f1",
  "secondaryColor": "#22d3ee",
  "backgroundColor": "#0f0f23",
  "textColor": "#e0e0e0",
  "mutedColor": "#6b7280"
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

### Show Title on Hero Image

```json
"heroShowTitleOnImage": true   // Default: title overlays the hero image
"heroShowTitleOnImage": false  // Title displays below the image, not covering it
```

> **💡 Use Case**: If your hero image is a carefully designed work or photo that you don't want covered by text, set this
> to `false`.

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
  "themePreset": "bold",
  "heroStyle": "split",
  "gridColumns": 3,
  "thumbnailRatio": "16/9",
  "navStyle": "minimal",
  "showFooter": true,
  "showSocialLinks": true,
  "showOtherWorks": true,
  "layout": ["Hero", "Works", "OtherWorks"]
}
```

---

## 📝 Content - Text Content

Customize all text on your site.

### 🪄 Smart Fallback System

**Good news! You don't need to fill in every field!** The system intelligently fills in from your `profile` data:

| Field          | Auto-Fallback Source                                                |
|----------------|---------------------------------------------------------------------|
| `heroTitle`    | If empty → auto-generates `Welcome to [Your Name]'s Creative World` |
| `heroSubtitle` | If empty → uses `profile.bio` (your bio)                            |
| `aboutContent` | If empty → uses `profile.bio` (your bio)                            |

> **💡 Tip**: This means if you just fill in `profile.bio`, both the homepage subtitle and About page will automatically
> show this text!

### All Fields

| Field                | Location                  | Default                               |
|----------------------|---------------------------|---------------------------------------|
| `heroTitle`          | Homepage main heading     | `Welcome to [Name]'s Creative World`  |
| `heroSubtitle`       | Homepage subtitle         | Auto-uses `profile.bio`               |
| `heroButtonText`     | Homepage button           | `"View Works"`                        |
| `worksTitle`         | Works section title       | `"My Works"`                          |
| `otherWorksTitle`    | Other works section title | `"More Works"`                        |
| `aboutTitle`         | About section title       | `"About Me"`                          |
| `aboutContent`       | About section content     | Auto-uses `profile.bio`               |
| `contactTitle`       | Contact section title     | `"Contact Me"`                        |
| `contactMessage`     | Contact page message      | `"Any questions or collaboration..."` |
| `contactQrCode`      | Contact QR code image     | Leave empty to hide                   |
| `footerText`         | Footer text               | Auto-generated                        |
| `notFoundTitle`      | 404 page heading          | Auto-generated (fun!)                 |
| `notFoundMessage`    | 404 page message          | Auto-generated                        |
| `notFoundButtonText` | 404 page button           | `"Back to Home"`                      |

### Contact Page Settings

The Contact page automatically displays the email from `profile.email`. You can also add:

1. **Custom message text**: Set `contactMessage`
2. **QR code image**: Set `contactQrCode` (for WeChat, Line, etc.)

```json
"content": {
"contactTitle": "Get in Touch",
"contactMessage": "Feel free to reach out through the following channels!",
"contactQrCode": "images/wechat-qrcode.png"
}
```

> **💡 QR Code Setup Steps**:
> 1. Prepare your QR code image (200x200 pixels recommended)
> 2. Put the image in `public/images/` folder
> 3. Set `contactQrCode` to `images/yourimage.png` (no leading `/` needed)

### Example

```json
"content": {
  "heroTitle": "Weaving Creativity with Code",
  "heroSubtitle": "Giving every project a cat's soul 🐱",
  "heroButtonText": "Explore Projects",
  "worksTitle": "Featured Works",
  "otherWorksTitle": "More Projects",
  "footerText": "© 2024 Night Cat Coding"
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
  "siteTitle": "Night Cat Coding | Creative Developer",
  "siteDescription": "Portfolio of Night Cat Coding. Specializing in open source projects and creative development.",
  "keywords": "developer, designer, Vue, open source, portfolio, template",
"ogImage": "images/og-image.jpg"
}
```

---

## 📷 Adding Images

### Path Rules

1. Place images in `public/images/` folder
2. Reference with paths starting from `images/` (no leading `/` needed, system handles deployment paths automatically)

```json
"avatar": "images/avatar.jpg",
"ogImage": "images/og-image.jpg"
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

- ✅ Trailing commas: `{ "name": "NightCat", }` → auto-removed
- ✅ Single quotes: `{ 'name': 'NightCat' }` → auto-converted to double quotes
- ✅ Unquoted keys: `{ name: "NightCat" }` → auto-quoted

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
- Use 6-digit hex: `#6366f1` (not `#636`)

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
    "name": "Night Cat Coding",
    "role": "Creative Developer & Open Source Contributor",
    "profession": "designer",
    "email": "hello@nightcatcoding.com",
    "bio": "Weaving creativity with code, giving every project a cat's soul 🐱",
    "avatar": "images/avatar.jpg",
    "social": {
      "github": "https://github.com/night-cat-coding",
      "twitter": "https://twitter.com/nightcatcoding",
      "instagram": "https://instagram.com/nightcatcoding"
    }
  },
  "theme": {
    "primaryColor": "#6366f1",
    "backgroundColor": "#0f0f23"
  },
  "ui": {
    "heroStyle": "split",
    "gridColumns": 3,
    "thumbnailRatio": "16/9",
    "showOtherWorks": true
  },
  "content": {
    "heroTitle": "Weaving Creativity with Code",
    "heroSubtitle": "Giving every project a cat's soul 🐱",
    "heroButtonText": "Explore Projects"
  },
  "seo": {
    "siteTitle": "Night Cat Coding | Creative Developer",
    "siteDescription": "Portfolio of Night Cat Coding.",
    "keywords": "developer, designer, Vue, open source, portfolio"
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

MIT License © 2026 [夜喵酷叮 | Night Cat Coding](https://github.com/yfp86274)

Happy customizing! 🎉

祝你自訂愉快！🎉

</div>