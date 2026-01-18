# 🎨 Portfolio Template

**零代碼建立你的專業作品集網站** | Create your portfolio website with zero coding

> 為編織愛好者、廚師、藝術家、手工匠人設計 — 只需上傳圖片和修改文字，就能擁有精美的個人網站。

---

## ✨ 這個模板能做什麼？

- 📱 **完美適應所有設備** — 電腦、平板、手機都好看
- 🎨 **一鍵切換風格** — 提供多種預設風格，適合不同職業
- 📁 **自動生成作品集** — 只需把圖片放進資料夾
- 🌐 **免費託管** — 使用 GitHub Pages，完全免費
- 🔧 **無需寫代碼** — 只需編輯一個配置文件

---

## 🚀 快速開始（4 步驟）

### Step 1: 複製這個模板

1. 點擊頁面上方的綠色 **「Use this template」** 按鈕
2. 選擇 **「Create a new repository」**
3. 輸入你的倉庫名稱（例如：`my-portfolio`）
4. 點擊 **「Create repository」**

<!-- 📸 截圖占位：Use this template 按鈕位置 -->

---

### Step 2: 配置你的網站

**打開網頁編輯器（最簡單的方式！）**

1. 在你的新倉庫頁面，按下鍵盤上的 **`.`** 鍵（英文句號）
2. 等待幾秒鐘，GitHub 網頁編輯器會自動打開
3. 在左側找到 `site.config.json` 文件並點擊

<!-- 📸 截圖占位：按 . 鍵開啟編輯器 -->

**編輯你的資訊：**

找到這些內容並修改成你自己的：

```json
{
   "profile": {
      "name": "你的名字",
      "role": "你的職業（如：編織藝術家）",
      "email": "your@email.com",
      "bio": "簡單介紹自己..."
   }
}
```

**保存變更：**

1. 按下 `Ctrl + S`（Mac 用戶按 `Cmd + S`）
2. 左側會出現一個數字圖標，點擊它
3. 在文字框中輸入說明（如：「更新我的資訊」）
4. 點擊 **「Commit & Push」** ✓

---

### Step 3: 上傳你的作品

**方法一：使用 GitHub 網頁版**

1. 回到你的倉庫主頁
2. 進入 `src` → `assets` → `works` 資料夾
3. 點擊 **「Add file」** → **「Create new file」**
4. 輸入資料夾名稱 + `/` + 文件名（例如：`My Scarf/cover.jpg`）

   > 💡 **命名提示：**
   > - 可以用 `01_作品名稱` 來控制順序
   > - 或直接用 `作品名稱`（系統會自動排序）

5. 點擊 **「Upload files」** 上傳你的圖片

**方法二：拖放上傳**

1. 進入 `src/assets/works/` 資料夾
2. 直接將整個作品資料夾從電腦拖進瀏覽器視窗

**資料夾結構示例：**

```
src/assets/works/
├── 01_Cozy Winter Scarf/
│   ├── cover.jpg          ← 封面圖（會顯示在首頁）
│   ├── detail-1.jpg       ← 詳情頁圖片
│   ├── detail-2.jpg
│   └── readme.md          ← 可選：作品故事/介紹
├── 02_Baby Blanket/
│   └── ...
└── My Latest Work/        ← 不加數字也可以！
    └── ...
```

> 📝 **小技巧：** 在資料夾中創建 `readme.md` 或 `description.txt` 文件，寫下作品的故事，它會自動顯示在詳情頁！

---

### Step 4: 等待網站上線

每次你保存更改後，GitHub 會自動幫你建構網站：

1. 在倉庫頁面點擊 **「Actions」** 標籤
2. 你會看到一個正在運行的任務（🟡 黃色圓點）
3. 等待它變成 ✅ 綠色勾勾（大約 1-2 分鐘）
4. 你的網站已經上線！

**查看你的網站：**

前往 `Settings` → `Pages`，找到你的網站網址：

```
https://你的用戶名.github.io/你的倉庫名/
```

<!-- 📸 截圖占位：Actions 頁面的黃點變綠點 -->

---

## 🎨 風格預設庫

選擇最適合你的風格！在 `site.config.json` 中修改 `themePreset`：

### 🧶 手工藝 / 編織 / 陶藝

```json
{
   "ui": {
      "themePreset": "craft"
   }
}
```

*溫暖的圓角設計，柔和陰影，適合展示手作作品*

其他別名：`default`, `warm`, `cozy`, `knitting`, `pottery`, `handmade`

---

### 👨‍🍳 廚師 / 餐飲 / 美食攝影

```json
{
   "ui": {
      "themePreset": "chef"
   }
}
```

*乾淨的直線邊框，高對比度，讓食物照片更突出*

其他別名：`minimal`, `food`, `restaurant`, `clean`, `professional`

---

### 🎨 藝術家 / 插畫師 / 設計師

```json
{
   "ui": {
      "themePreset": "artist"
   }
}
```

*大膽的視覺風格，強烈陰影，展現創意個性*

其他別名：`bold`, `designer`, `creative`, `illustrator`, `studio`

---

### 💆 療癒 / 健康 / 教育

```json
{
   "ui": {
      "themePreset": "therapist"
   }
}
```

*超圓潤的設計，極柔和的陰影，給人平靜感*

其他別名：`soft`, `wellness`, `gentle`, `calm`, `yoga`

---

## 🎨 自訂顏色

想要完全自訂顏色？修改 `theme` 部分：

```json
{
   "theme": {
      "primaryColor": "#8B4513",
      // 主色（按鈕、標題）
      "backgroundColor": "#FDF5E6",
      // 背景色
      "textColor": "#3D2914",
      // 文字色
      "mutedColor": "#8B7355"
      // 淡色文字
   }
}
```

**🎯 配色推薦：**

| 風格   | primaryColor | backgroundColor | textColor |
|------|--------------|-----------------|-----------|
| 自然溫暖 | `#8B4513`    | `#FDF5E6`       | `#3D2914` |
| 現代簡約 | `#2D2D2D`    | `#FFFFFF`       | `#1A1A1A` |
| 海洋清新 | `#1E6091`    | `#F0F7FA`       | `#0D3B5C` |
| 森林綠意 | `#2D5A27`    | `#F5F9F4`       | `#1A3518` |

> 💡 使用 [Coolors.co](https://coolors.co) 生成配色，或 [Realtime Colors](https://realtimecolors.com) 預覽效果

---

## 🔤 更換字體

```json
{
   "theme": {
      "fontFamily": "Lora",
      // 內文字體
      "headingFont": "Playfair Display"
      // 標題字體
   }
}
```

**推薦字體組合：**

| 風格  | headingFont        | fontFamily  |
|-----|--------------------|-------------|
| 優雅  | `Playfair Display` | `Lora`      |
| 現代  | `Inter`            | `Inter`     |
| 手寫感 | `Dancing Script`   | `Nunito`    |
| 專業  | `Montserrat`       | `Open Sans` |

瀏覽更多字體：[Google Fonts](https://fonts.google.com)

---

## 📁 資料夾命名規則

系統非常寬容，以下命名方式**都有效**：

| 資料夾名稱                | 顯示名稱            | 排序 |
|----------------------|-----------------|----|
| `01_Brand Design`    | Brand Design    | 1  |
| `02_Web Project`     | Web Project     | 2  |
| `My Awesome Work`    | My Awesome Work | 自動 |
| `手工皂系列`              | 手工皂系列           | 自動 |
| `10-Logo-Collection` | Logo Collection | 10 |

---

## ❓ 常見問題

### 網站沒有更新？

- 確認 Actions 已經完成（綠色勾勾）
- 嘗試清除瀏覽器緩存並刷新（Ctrl+Shift+R）

### 圖片沒有顯示？

- 確認圖片格式正確（jpg, png, webp, gif）
- 文件名避免使用特殊字符

### JSON 格式錯誤？

- 最後一項不要加逗號
- 所有文字都要用**雙引號** `"` 包起來
- 使用 [JSONLint](https://jsonlint.com) 檢查

### 如何添加作品描述？

在作品資料夾中創建 `readme.md` 文件，寫下你的故事：

```markdown
這條圍巾是我為冬天特別設計的...

使用了 100% 美麗諾羊毛，柔軟親膚。
```

---

## 🆘 需要幫助？

1. 📖 查看 [CONFIG_GUIDE.md](./CONFIG_GUIDE.md) 了解更多配置選項
2. 🐛 遇到問題？創建 [Issue](../../issues)
3. 💬 有建議？歡迎提交 Pull Request

---

Made with ❤️ for creative professionals who don't code

**讓你的作品發光 ✨**
