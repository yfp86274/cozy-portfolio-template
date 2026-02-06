<div align="center">

# 🧶 手作人專屬作品集網站模板

### Handcrafter Portfolio Template

**by 夜喵酷叮 | Night Cat Coding**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with Vue](https://img.shields.io/badge/Made%20with-Vue%203-4FC08D.svg)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)

[中文](#-中文說明) | [English](#-english-documentation)

</div>

---

# 中文說明

> **專為完全不懂代碼的你設計**
>
> 只要會「拖拉上傳圖片」和「複製貼上」，就能擁有專業的作品集網站。
>
> 適合：編織愛好者、廚師、陶藝家、攝影師、插畫家、花藝師...所有熱愛創作的人！

---

## ✨ 為什麼選擇這個模板？

| 💪 特點          | 📝 說明                    |
|----------------|--------------------------|
| 🎯 **極致容錯**    | 就算少打一個逗號，系統也會自動幫你補上，不會報錯 |
| 🎨 **選職業換風格**  | 告訴網站你是誰，它會自動變成最適合你的樣子    |
| 📱 **響應式設計**   | 手機、平板、電腦都完美顯示，不用煩惱排版     |
| 💰 **完全免費**    | 使用 GitHub Pages 託管，永久免費  |
| 🖼️ **智能圖片處理** | 只要把照片放進文件夾，網站自動幫你選封面、排版  |
| 🌐 **SEO 優化**  | 內建搜尋引擎優化，讓更多人找到你         |
| ⚡ **極速載入**     | 自動圖片壓縮優化，載入快如閃電          |

---

## 🚀 三步驟建立你的網站

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│             │      │             │      │             │
│   1. Fork   │ ──▶ │   2. 設定    │ ──▶ │  3. 完成！   │
│   複製專案   │      │  改幾個字    │      │   傳照片    │
│             │      │             │      │             │
└─────────────┘      └─────────────┘      └─────────────┘
```

---

### 步驟 1️⃣ Fork（複製）這個專案

1. 確保你已經登入 GitHub 帳號
2. 點擊本頁面右上角的 **Fork** 按鈕
3. 等待幾秒鐘，你就擁有自己的網站倉庫了！

**GitHub 安全機制默認會關閉自動化功能，你需要手動開啟：**

1. 進入你剛 Fork 好的倉庫，點擊上方的 **Actions** 分頁。
2. 你會看到一個警告，請點擊綠色按鈕：
   **"I understand my workflows, go ahead and enable them"**
3. 接下來進入 **Settings** → **Pages**。
4. 在 **Source** 選擇 `GitHub Actions`。

> ⚠️ **注意**：此時網站**還不會**馬上上線，請繼續完成下面的步驟，當你修改並儲存設定後，網站才會開始第一次建立。

---

### 步驟 2️⃣ 修改你的網站設定

**只需要改幾個字，就能讓網站變成你自己的！**

1. 在你的 GitHub 倉庫頁面，**按鍵盤上的 `.` 鍵**（就是句點）
2. 等幾秒，會打開一個網頁版編輯器
3. 在左側文件列表找到 `site.config.json` 並點開
4. **全選**（`Ctrl+A` 或 Mac 的 `Cmd+A`）
5. **貼上**下面的模板（`Ctrl+V` 或 Mac 的 `Cmd+V`），然後填入你自己的資料：

```json
{
   "profile": {
      "name": "你的名字",
      "role": "你的職業頭銜，例如：編織藝術家",
      "profession": "knitter",
      "email": "你的email@example.com",
      "bio": "簡單介紹你自己，例如：用雙手編織溫暖，用色彩點綴生活",
      "social": {
         "instagram": "",
         "etsy": ""
      }
   },
   "seo": {
      "siteTitle": "你的名字 | 作品集"
   }
}
```

6. 把上面 `"你的名字"`、`"你的職業頭銜"` 等內容改成你自己的資料
7. 把 `"profession"` 的值改成下面表格中最適合你的代碼（重要！這決定了網站風格）
8. 社群連結不用的留空 `""`，用的填完整網址
9. **儲存**（`Ctrl+S` 或 Mac 的 `Cmd+S`）
10. 左側會出現變更標記，點擊「Source Control」圖示（分支圖案）
11. 輸入提交訊息（例如：「更新設定」）然後點擊打勾 ✓

#### 🎭 選擇你的 profession 代碼（複製對應的英文代碼）：

| 🍳 餐飲         | 🧶 手作              | 🎨 藝術             | 🌸 其他           |
|---------------|--------------------|-------------------|-----------------|
| `chef` 廚師     | `knitter` 編織       | `artist` 藝術家      | `florist` 花藝    |
| `baker` 烘焙師   | `potter` 陶藝        | `illustrator` 插畫  | `gardener` 園藝   |
| `barista` 咖啡師 | `jeweler` 珠寶       | `photographer` 攝影 | `therapist` 治療師 |
|               | `leatherworker` 皮革 | `designer` 設計師    | `yoga` 瑜伽老師     |
|               | `woodworker` 木工    | `architect` 建築師   | `teacher` 老師    |
|               |                    | `interior` 室內設計   | `writer` 作家     |
|               |                    | `musician` 音樂人    |                 |

> 💡 **不知道怎麼改？** 最簡單的方式：只改 `name`（你的名字）和 `profession`（職業代碼），其他留著不動也完全沒問題！

#### 📝 備用方法：直接在 GitHub 編輯（不用按 `.` 鍵）

1. 在倉庫中找到 `site.config.json`，點擊它
2. 點擊右上角鉛筆圖示 ✏️ 進入編輯
3. 全選並貼上上面的模板，改成你的資料
4. 點擊綠色的「Commit changes」按鈕儲存

> 🪄 **進階提示**：網站上線後，你還可以使用「設定精靈」做更細緻的調整。打開 `https://你的用戶名.github.io/你的倉庫名/config-maker.html`
> ，用表單方式生成設定，不用手動打字！

---

### 步驟 3️⃣ 上傳你的照片

按 `.` 鍵打開網頁編輯器後，你可以拖拉上傳照片。

#### 🖼️ A. 更換首頁大圖 (Hero Image)

1. 準備一張直式或橫式的照片。
2. **將檔名改為 `hero`**（例如 `hero.jpg`, `hero.png` 或 `hero.webp`）。
3. 在左側文件樹找到 `src` → `assets` 資料夾。
4. 將你的 `hero.jpg` 拖進去。
5. 如果裡面原本有範例圖片，直接覆蓋即可。

#### 📂 B. 上傳作品集 (Portfolio)

1. 在左側文件樹找到 `src` → `assets` → `works` 資料夾。
   *(如果看到一個 `.gitkeep` 文件，請忽略它，那是為了確保資料夾存在用的)*
2. **右鍵點擊 `works`** → **New Folder**（新建資料夾）。
3. 命名你的作品，例如：`01_冬日圍巾`。
4. **直接把該作品的照片拖進去！**

#### 文件夾命名規則：

```
src/assets/works/
│
├── 01_深夜專案/               ← 數字開頭，會排在最前面
│   ├── cover.jpg             ← 命名為 cover 的會當封面
│   ├── 細節照片1.jpg          ← 其他照片會在詳情頁顯示
│   ├── 細節照片2.jpg
│   └── readme.md             ← 可選：作品描述文字
│
├── 02_貓咪主題網站/           ← 02 會排在 01 後面
│   ├── 主圖.jpg              ← 沒有 cover？系統自動選第一張當封面
│   └── 製作過程.jpg
│
└── 開源模板/                  ← 不加數字也可以！會按字母排序
    └── photo.jpg
```

#### 📝 命名小技巧：

| 你這樣命名                   | 網站顯示               | 排序位置      |
|-------------------------|--------------------|-----------|
| `01_Portfolio_Template` | Portfolio Template | 第 1 位     |
| `02_手作網站`               | 手作網站               | 第 2 位     |
| `10_新專案`                | 新專案                | 第 10 位    |
| `Side_Project`          | Side Project       | 按字母排在數字後面 |

> **💡 作品序號顯示說明**：
> - 有數字前綴的作品（如 `01_作品名`）會在網站上顯示序號「001」
> - 沒有數字前綴的作品（如 `Side_Project`）不會顯示序號，只顯示作品名稱
> - 系統會自動將有序號的作品排在前面，沒有序號的按字母順序排在後面

#### 📷 支援的圖片格式：
- ✅ `.jpg` / `.jpeg`
- ✅ `.png`
- ✅ `.webp`（推薦，檔案小品質好）
- ✅ `.gif`
- ✅ `.svg`

#### 📄 添加作品描述：

在作品資料夾中創建 `readme.md` 文件，直接寫文字：

```markdown
這是一個為手作人打造的作品集模板。

特點：

- 零代碼建站
- 自動風格適配
- 響應式設計

開發時間：約 2 週
技術棧：Vue 3 + Vite + Tailwind CSS
```

---

### 🎉 完成！

1. 確保所有變更都已儲存並提交
2. 回到 GitHub 倉庫 → **Actions** 頁面
3. 等待綠色勾勾 ✓ 出現（約 1-2 分鐘）
4. 打開你的網站：`https://你的用戶名.github.io/你的倉庫名/`

**恭喜！你的作品集網站上線了！** 🎊

---

## 🎨 職業風格一覽

選擇你的職業，網站會自動套用最適合的配色、字體和排版風格：

### 🍳 餐飲類

| 代碼        | 名稱      | 風格特色                         |
|-----------|---------|------------------------------|
| `chef`    | 廚師/料理人  | 米其林風格：純白背景、黑色文字、極簡高對比、優雅襯線字體 |
| `baker`   | 烘焙師/甜點師 | 奶油溫暖色調、超大圓角（像馬卡龍）、可愛圓潤       |
| `barista` | 咖啡師     | 咖啡棕色系、沉穩專業、現代工業感             |

### 🧶 手作類

| 代碼              | 名稱       | 風格特色                   |
|-----------------|----------|------------------------|
| `knitter`       | 編織創作者    | 羊毛白背景、手寫風標題字體、溫暖有機、大圓角 |
| `potter`        | 陶藝家      | 大地色系、窯燒質感、圓潤如陶器、緩慢優雅動畫 |
| `jeweler`       | 珠寶/飾品設計師 | 深夜藍配金色、奢華精緻、銳利切割感、發光效果 |
| `leatherworker` | 皮革工藝師    | 深棕皮革色、職人手感、硬朗線條        |
| `woodworker`    | 木工/木藝師   | 胡桃木色系、自然溫潤、寬幅展示        |

### 🎨 藝術類

| 代碼             | 名稱  | 風格特色                       |
|----------------|-----|----------------------------|
| `artist`       | 藝術家 | 純黑白高對比、螢光橘紅點綴、大膽前衛、銳利邊框    |
| `illustrator`  | 插畫家 | 靛藍紫配珊瑚橘、活潑可愛、圓潤卡通風         |
| `photographer` | 攝影師 | 暗房黑白色調、無邊框設計、純粹俐落、3:2 攝影比例 |
| `designer`     | 設計師 | 科技藍配薄荷綠、現代感、16:9 寬幅展示      |

### 🌸 自然/花藝類

| 代碼         | 名稱  | 風格特色                    |
|------------|-----|-------------------------|
| `florist`  | 花藝師 | 玫瑰粉色系、花瓣白背景、柔美浪漫、垂直花束比例 |
| `gardener` | 園藝師 | 森林綠色系、新芽清新感、有機曲線        |

### 💚 療癒/教育類

| 代碼          | 名稱       | 風格特色                   |
|-------------|----------|------------------------|
| `therapist` | 治療師/諮商師  | 鼠尾草綠、極慢平靜動畫、藥丸形圓角、放鬆氛圍 |
| `yoga`      | 瑜伽老師     | 藕粉色調、棉麻白背景、冥想般的緩慢過渡    |
| `teacher`   | 老師/講師    | 學院藍色系、知性專業、清晰易讀        |
| `writer`    | 作家/文字工作者 | 書頁黃背景、墨水棕、書卷氣質、經典襯線字體  |

### 🏛️ 空間/建築類

| 代碼          | 名稱    | 風格特色                     |
|-------------|-------|--------------------------|
| `architect` | 建築師   | 純黑白、絕對銳利邊角、最快動畫、結構感      |
| `interior`  | 室內設計師 | 奶茶色調、亞麻白背景、優雅對比          |
| `musician`  | 音樂人   | 電吉他紅點綴、快節奏動畫、專輯封面 1:1 比例 |

---

## ❓ 常見問題 FAQ

### 🔄 Fork 之後網站沒有馬上出現？

這是正常的！GitHub Actions 需要一次「觸發」才會開始工作。
當你完成 **步驟 2（修改設定並提交）** 後，GitHub 就會檢測到變更，並開始自動幫你建立網站。請去 Actions 頁面查看進度。

### ❌ JSON 格式錯誤？

**別擔心！這個模板有自動修復功能。**

常見的錯誤會自動修正：

- ✅ 多餘的逗號：`{ "name": "夜喵", }` → 自動移除
- ✅ 單引號：`{ 'name': '夜喵' }` → 自動轉換成雙引號
- ✅ 沒有引號的 Key：`{ name: "夜喵" }` → 自動加上引號

如果還是有問題，可以等網站上線後使用設定精靈重新生成一份！

### 🖼️ 圖片沒有顯示？

1. 確認是支援的格式：`.jpg`、`.png`、`.webp`、`.gif`
2. 檔名避免特殊符號（`#`、`%`、`&` 等）
3. 檔名可以用中文、英文、數字
4. 確認圖片放在 `src/assets/works/作品名稱/` 下面

### 🎨 想自訂顏色？

設定精靈會根據職業自動選好配色，但你也可以在 `site.config.json` 中手動覆蓋：

```json
{
  "profile": {
     "name": "夜喵酷叮",
     "profession": "designer"
  },
  "theme": {
     "primaryColor": "#6366f1",
     "backgroundColor": "#0f0f23",
     "textColor": "#e0e0e0"
  }
}
```

### 📱 如何在手機上查看？

直接用手機瀏覽器打開你的網站網址即可！網站會自動適應手機螢幕。

### 🔒 如何綁定自己的網域？

1. 購買一個網域（如 Namecheap、GoDaddy）
2. 在 GitHub 倉庫 → **Settings** → **Pages** → **Custom domain**
3. 輸入你的網域
4. 在網域商那邊設定 DNS 指向 GitHub

---

## 📖 進階設定

想要更多自訂選項？請參考 [CONFIG_GUIDE.md](./CONFIG_GUIDE.md) 完整設定指南。

---

## 🆘 需要幫助？

- 📖 **詳細設定指南**：[CONFIG_GUIDE.md](./CONFIG_GUIDE.md)
- 🐛 **遇到問題**：[發起 Issue](../../issues)
- 💡 **功能建議**：歡迎提交 Issue 或 PR！

---

## ☕ 支持作者

如果這個模板對你有幫助，歡迎請我喝杯咖啡！

<div align="center">

### 微信讚賞 | WeChat Reward

<img src="https://imgur.com/a9SbNBB.png" alt="微信讚賞碼" width="200">

### PayPal

<img src="https://imgur.com/zQN3TCe.png" alt="PayPal" width="200">

**感謝你的支持！你的鼓勵是我持續更新的動力 💪**

</div>

---

---

# English Documentation

> **Designed for people who don't know how to code**
>
> If you can drag-and-drop files and copy-paste, you can have a professional portfolio website.
>
> Perfect for: Knitters, chefs, potters, photographers, illustrators, florists... all creative professionals!

---

## ✨ Why Choose This Template?

| 💪 Feature                    | 📝 Description                                                                   |
|-------------------------------|----------------------------------------------------------------------------------|
| 🎯 **Error-Tolerant**         | Even if you miss a comma, the system will auto-fix it                            |
| 🎨 **Identity-Based Styling** | Tell the website who you are, it automatically becomes the perfect style for you |
| 📱 **Responsive Design**      | Looks perfect on phones, tablets, and desktops                                   |
| 💰 **Completely Free**        | Hosted on GitHub Pages, free forever                                             |
| 🖼️ **Smart Image Handling**  | Just put photos in folders, the website auto-selects covers and layouts          |
| 🌐 **SEO Optimized**          | Built-in search engine optimization                                              |
| ⚡ **Lightning Fast**          | Auto image compression and optimization                                          |

---

## 🚀 Three Steps to Build Your Website

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│             │      │             │      │             │
│   1. Fork   │ ──▶ │  2. Config   │ ──▶ │   3. Done!  │
│   Copy Repo │      │ Change a few│      │ Upload pics │
│             │      │   words     │      │             │
└─────────────┘      └─────────────┘      └─────────────┘
```

---

### Step 1️⃣ Fork This Repository

1. Make sure you're logged into GitHub
2. Click the **Fork** button at the top right of this page
3. Wait a few seconds, and you'll have your own copy!

**GitHub disables automation by default for security. You must enable it:**

1. Go to the **Actions** tab in your new repository.
2. Click the green button: **"I understand my workflows, go ahead and enable them"**.
3. Go to **Settings** → **Pages**.
4. Under **Source**, select `GitHub Actions`.

> ⚠️ **Note**: Your site is **not live yet**. Proceed to the next step. The first build will trigger only after you
> modify and save the config file.

---

### Step 2️⃣ Edit Your Website Settings

**Just change a few words to make the website yours!**

1. On your GitHub repository page, **press the `.` key** on your keyboard
2. Wait a few seconds for the web-based editor to open
3. Find `site.config.json` in the left file list and click to open
4. **Select All** (`Ctrl+A` or `Cmd+A` on Mac)
5. **Paste** the template below (`Ctrl+V` or `Cmd+V` on Mac), then fill in your info:

```json
{
   "profile": {
      "name": "Your Name",
      "role": "Your Title, e.g., Fiber Artist",
      "profession": "knitter",
      "email": "your@email.com",
      "bio": "A short intro about yourself",
      "social": {
         "instagram": "",
         "etsy": ""
      }
   },
   "seo": {
      "siteTitle": "Your Name | Portfolio"
   }
}
```

6. Replace `"Your Name"`, `"Your Title"` etc. with your own information
7. Change the `"profession"` value to the code that best matches you from the table below (important! this determines
   your website's style)
8. Leave unused social links as empty `""`, fill in full URLs for ones you use
9. **Save** (`Ctrl+S` or `Cmd+S` on Mac)
10. Click the "Source Control" icon (branch symbol) on the left
11. Enter a commit message (e.g., "Update config") and click the checkmark ✓

#### 🎭 Choose Your Profession Code (copy the English code):

| 🍳 Food           | 🧶 Handcraft            | 🎨 Art                      | 🌸 Others             |
|-------------------|-------------------------|-----------------------------|-----------------------|
| `chef` Chef       | `knitter` Knitter       | `artist` Artist             | `florist` Florist     |
| `baker` Baker     | `potter` Potter         | `illustrator` Illustrator   | `gardener` Gardener   |
| `barista` Barista | `jeweler` Jeweler       | `photographer` Photographer | `therapist` Therapist |
|                   | `leatherworker` Leather | `designer` Designer         | `yoga` Yoga           |
|                   | `woodworker` Woodwork   | `architect` Architect       | `teacher` Teacher     |
|                   |                         | `interior` Interior         | `writer` Writer       |
|                   |                         | `musician` Musician         |                       |

> 💡 **Not sure what to change?** The simplest way: just change `name` (your name) and `profession` (profession code).
> Leave everything else as-is and it works perfectly!

#### 📝 Alternative: Edit Directly on GitHub (no `.` key needed)

1. Find `site.config.json` in the repository and click it
2. Click the pencil icon ✏️ at the top right to edit
3. Select all and paste the template above, then fill in your info
4. Click the green "Commit changes" button to save

> 🪄 **Advanced Tip**: After your site is live, you can also use the "Config Wizard" for finer adjustments. Open
`https://yourusername.github.io/repo-name/config-maker.html` to generate settings with a form — no manual typing needed!

---

### Step 3️⃣ Upload Your Photos

While in the web editor (press `.`):

#### 🖼️ A. Change Hero Image (Main Cover)

1. Prepare your best photo.
2. **Rename it to `hero`** (e.g., `hero.jpg`, `hero.png`, or `hero.webp`).
3. Find the `src` → `assets` folder.
4. Drag and drop your file there.

#### 📂 B. Upload Portfolio Works

1. Find `src` → `assets` → `works` folder.
   *(Ignore the `.gitkeep` file if you see one)*
2. **Right-click `works`** → **New Folder**.
3. Name it, e.g., `01_Winter_Scarf`.
4. **Drag and drop project photos inside.**

#### Folder Naming Rules:

```
src/assets/works/
│
├── 01_Portfolio_Template/    ← Numbers first = sorted first
│   ├── cover.jpg             ← Named "cover" = used as thumbnail
│   ├── detail1.jpg           ← Other images show on detail page
│   ├── detail2.jpg
│   └── readme.md             ← Optional: work description
│
├── 02_Cat_Theme_Website/     ← 02 comes after 01
│   ├── main.jpg              ← No cover? System picks first image
│   └── process.jpg
│
└── Open_Source_Template/     ← No number = alphabetical order
    └── photo.jpg
```

#### 📝 Naming Tips:

| You Name It Like This   | Website Shows      | Sort Position                |
|-------------------------|--------------------|------------------------------|
| `01_Portfolio_Template` | Portfolio Template | Position 1                   |
| `02_Handmade_Website`   | Handmade Website   | Position 2                   |
| `10_New_Project`        | New Project        | Position 10                  |
| `Side_Project`          | Side Project       | Alphabetically after numbers |

> **💡 Work Number Display Note**:
> - Works with number prefix (like `01_WorkName`) will show sequence number "001" on the website
> - Works without number prefix (like `Side_Project`) won't show sequence number, only the work name
> - System automatically sorts numbered works first, non-numbered works alphabetically after

#### 📷 Supported Image Formats:
- ✅ `.jpg` / `.jpeg`
- ✅ `.png`
- ✅ `.webp` (recommended - small size, great quality)
- ✅ `.gif`
- ✅ `.svg`

#### 📄 Adding Work Descriptions:

Create a `readme.md` file in your work folder:

```markdown
A portfolio template crafted for creative professionals.

Features:

- Zero-code website building
- Auto style adaptation
- Responsive design

Development time: ~2 weeks
Tech stack: Vue 3 + Vite + Tailwind CSS
```

---

### 🎉 Done!

1. Make sure all changes are saved and committed
2. Go to your GitHub repo → **Actions** tab
3. Wait for the green checkmark ✓ (about 1-2 minutes)
4. Visit your website: `https://yourusername.github.io/repo-name/`

**Congratulations! Your portfolio is live!** 🎊

---

## 🎨 Profession Styles Overview

Choose your profession, and the website auto-applies the best colors, fonts, and layout:

### 🍳 Food & Beverage

| Code      | Name              | Style                                                                |
|-----------|-------------------|----------------------------------------------------------------------|
| `chef`    | Chef              | Michelin style: pure white, black text, high contrast, elegant serif |
| `baker`   | Baker/Pastry Chef | Warm cream colors, extra-large rounded corners (like macarons)       |
| `barista` | Barista           | Coffee brown tones, professional, modern industrial                  |

### 🧶 Handcraft

| Code            | Name                 | Style                                                          |
|-----------------|----------------------|----------------------------------------------------------------|
| `knitter`       | Knitter/Fiber Artist | Wool white background, handwritten headings, warm organic feel |
| `potter`        | Potter/Ceramicist    | Earth tones, kiln-fired texture, round like pottery            |
| `jeweler`       | Jewelry Designer     | Midnight blue with gold, luxurious, sharp cut, glow effects    |
| `leatherworker` | Leather Craftsman    | Deep leather brown, artisan feel, rugged lines                 |
| `woodworker`    | Woodworker           | Walnut tones, natural warmth, wide display                     |

### 🎨 Art & Design

| Code           | Name         | Style                                                    |
|----------------|--------------|----------------------------------------------------------|
| `artist`       | Artist       | Pure black & white, neon orange accent, bold avant-garde |
| `illustrator`  | Illustrator  | Indigo purple with coral, playful cute, cartoon rounded  |
| `photographer` | Photographer | Darkroom black & white, borderless, clean 3:2 ratio      |
| `designer`     | Designer     | Tech blue with mint green, modern, 16:9 widescreen       |

### 🌸 Nature & Floral

| Code       | Name     | Style                                                       |
|------------|----------|-------------------------------------------------------------|
| `florist`  | Florist  | Rose pink, petal white background, romantic, vertical ratio |
| `gardener` | Gardener | Forest green, fresh sprout feeling, organic curves          |

### 💚 Wellness & Education

| Code        | Name                | Style                                                    |
|-------------|---------------------|----------------------------------------------------------|
| `therapist` | Therapist/Counselor | Sage green, super slow animations, pill-shaped corners   |
| `yoga`      | Yoga Instructor     | Dusty pink, linen white, meditative slow transitions     |
| `teacher`   | Teacher/Instructor  | Academic blue, intellectual professional, clear readable |
| `writer`    | Writer              | Book page yellow, ink brown, scholarly serif fonts       |

### 🏛️ Architecture & Space

| Code        | Name              | Style                                                            |
|-------------|-------------------|------------------------------------------------------------------|
| `architect` | Architect         | Pure black & white, absolutely sharp corners, fastest animations |
| `interior`  | Interior Designer | Milk tea tones, linen white, elegant contrast                    |
| `musician`  | Musician          | Electric guitar red accent, fast-paced, 1:1 album cover ratio    |

---

## ❓ FAQ

### 🔄 Site didn't appear after Forking?

Normal! GitHub Actions needs a "push" event to start. Once you complete **Step 2 (Commit Config)**, the build will start
automatically.

### ❌ JSON Format Errors?

**Don't worry! This template has auto-fix functionality.**

Common errors are automatically corrected:

- ✅ Trailing commas: `{ "name": "NightCat", }` → auto-removed
- ✅ Single quotes: `{ 'name': 'NightCat' }` → auto-converted to double quotes
- ✅ Unquoted keys: `{ name: "NightCat" }` → auto-quoted

If issues persist, after your site is live, use the Config Wizard to regenerate!

### 🖼️ Images Not Showing?

1. Use supported formats: `.jpg`, `.png`, `.webp`, `.gif`
2. Avoid special characters in filenames (`#`, `%`, `&`, etc.)
3. Chinese, English, and numbers in filenames are fine
4. Make sure images are in `src/assets/works/work-name/`

### 🎨 Want Custom Colors?

The Config Wizard auto-selects colors based on profession, but you can override in `site.config.json`:

```json
{
  "profile": {
     "name": "Night Cat Coding",
     "profession": "designer"
  },
  "theme": {
     "primaryColor": "#6366f1",
     "backgroundColor": "#0f0f23",
     "textColor": "#e0e0e0"
  }
}
```

### 📱 How to View on Mobile?

Just open your website URL in your phone's browser! The site automatically adapts to mobile screens.

### 🔒 How to Bind Your Own Domain?

1. Purchase a domain (from Namecheap, GoDaddy, etc.)
2. Go to your GitHub repo → **Settings** → **Pages** → **Custom domain**
3. Enter your domain
4. Configure DNS at your domain registrar to point to GitHub

---

## 📖 Advanced Configuration

Want more customization options? See the complete guide: [CONFIG_GUIDE.md](./CONFIG_GUIDE.md)

---

## 🆘 Need Help?

- 📖 **Full Configuration Guide**: [CONFIG_GUIDE.md](./CONFIG_GUIDE.md)
- 🐛 **Found a Bug**: [Open an Issue](../../issues)
- 💡 **Feature Requests**: Issues and PRs welcome!

---

## ☕ Support the Author

If this template helped you, consider buying me a coffee!

<div align="center">

### WeChat Reward | 微信讚賞

<img src="https://imgur.com/a9SbNBB.png" alt="WeChat Reward QR Code" width="200">

### PayPal

<img src="https://imgur.com/zQN3TCe.png" alt="PayPal QR Code" width="200">

**Thank you for your support! Your encouragement keeps me updating 💪**

</div>

---

<div align="center">

## 📜 License

MIT License © 2026 [夜喵酷叮 | Night Cat Coding](https://github.com/NightCatCoding)

Made with ❤️ for creative professionals who don't code

**Let your work shine ✨**

---

### 🌟 Star This Repo

If you find this template useful, please give it a ⭐ star!

It helps more people discover this project.

</div>
