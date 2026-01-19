# 🧶 手作人作品集網站模板

**專為不懂代碼的你設計** — 只需要整理文件夾、填個表單，就能擁有專業的作品集網站。

> 適合編織愛好者、廚師、陶藝家、攝影師、插畫家、花藝師...所有熱愛創作的人！

---

## ✨ 這個模板能做什麼？

- 📱 **任何設備都好看** — 電腦、平板、手機自動適應
- 🎨 **一鍵切換風格** — 選擇你的職業，自動套用最適合的配色
- 📁 **上傳照片就完成** — 把作品照片放進文件夾，網站自動生成
- 🌐 **完全免費** — 使用 GitHub Pages 託管，不花一毛錢
- 🛡️ **怎麼填都不會壞** — 即使設定填錯，網站也會正常顯示

---

## 🚀 傻瓜式操作指南（只要 4 步驟！）

### 步驟 1：Fork 這個項目

1. 點擊頁面右上角的 **Fork** 按鈕
2. 等待幾秒鐘，你就擁有自己的網站倉庫了！

---

### 步驟 2：生成你的設定

1. 打開 `public/config-maker.html` 這個文件
2. 點擊 **Raw** 按鈕，然後右鍵「另存為」到電腦
3. 用瀏覽器打開這個 HTML 文件
4. 填寫你的資料（名字、職業、社交帳號等）
5. 點擊「複製」按鈕

> 💡 **或者直接在 GitHub 上操作：**
> 進入 `https://你的用戶名.github.io/你的倉庫名/config-maker.html`

---

### 步驟 3：更新設定檔

1. 回到你的 GitHub 倉庫
2. 找到根目錄的 `site.config.json` 文件
3. 點擊鉛筆 ✏️ 圖標進行編輯
4. **全選** 原有內容，然後 **貼上** 你剛才複製的設定
5. 滾動到下方，點擊 **Commit changes** 保存

你的設定應該看起來像這樣（很簡單！）：

```json
{
  "profile": {
    "name": "你的名字",
    "role": "你的職業/頭銜",
    "profession": "knitter",
    "email": "hello@example.com",
    "social": {
      "instagram": "https://instagram.com/yourname",
      "etsy": "https://yourshop.etsy.com"
    }
  },
  "seo": {
    "siteTitle": "你的名字 | 作品集",
    "siteDescription": "簡短介紹你的網站"
  }
}
```

---

### 步驟 4：上傳你的作品照片

**方法 A：直接在 GitHub 上傳（最簡單）**

1. 進入 `src` → `assets` → `works` 文件夾
2. 點擊 **Add file** → **Upload files**
3. 創建作品文件夾並上傳照片

**文件夾結構範例：**

```
src/assets/works/
├── 01_我的圍巾/           ← 用數字控制順序
│   ├── cover.jpg          ← 封面圖（首頁顯示）
│   ├── 細節1.jpg          ← 其他圖片（詳情頁顯示）
│   └── 細節2.jpg
├── 02_手工皂系列/
│   └── ...
└── 可愛的貓咪/            ← 不加數字也可以！
    └── 唯一的圖片.jpg     ← 沒有 cover.jpg？自動用第一張！
```

**命名小技巧：**

| 你這樣命名             | 網站顯示為          | 排序        |
|-------------------|----------------|-----------|
| `01_Winter Scarf` | Winter Scarf   | 第 1 位     |
| `02_手工皂`          | 手工皂            | 第 2 位     |
| `My Latest Work`  | My Latest Work | 自動排序（按字母） |

> 💡 **貼心提示：**
> - 系統會自動忽略 `.DS_Store`、`Thumbs.db` 等系統文件
> - 支援的圖片格式：jpg, png, webp, gif
> - 想添加作品描述？在文件夾裡創建 `readme.md` 或 `description.txt`

---

### 完成！等待網站上線

1. 進入倉庫的 **Settings** → **Pages**
2. 在 **Source** 選擇 `GitHub Actions`
3. 每次保存後，等待約 1-2 分鐘
4. 你的網站將在：`https://你的用戶名.github.io/你的倉庫名/`

---

## 🎨 職業風格一覽

選擇你的職業，網站會自動套用最適合的配色和風格！

| 類別         | 可選職業                                                                          |
|------------|-------------------------------------------------------------------------------|
| 🍳 **餐飲**  | `chef`（廚師）、`baker`（烘焙師）、`barista`（咖啡師）                                        |
| 🧶 **手作**  | `knitter`（編織）、`potter`（陶藝）、`jeweler`（珠寶）、`leatherworker`（皮革）、`woodworker`（木工） |
| 🎨 **藝術**  | `artist`（藝術家）、`illustrator`（插畫）、`photographer`（攝影）、`designer`（設計）             |
| 🌸 **自然**  | `florist`（花藝）、`gardener`（園藝）                                                  |
| 💚 **療癒**  | `therapist`（治療師）、`yoga`（瑜伽）、`teacher`（老師）、`writer`（作家）                        |
| 🏛️ **空間** | `architect`（建築）、`interior`（室內設計）、`musician`（音樂）                               |

> 在 `site.config.json` 的 `profession` 欄位填入上表的英文代碼即可！

---

## ❓ 常見問題

### 網站沒有更新？

- 確認 GitHub Actions 已完成（倉庫 → Actions → 綠色勾勾 ✓）
- 清除瀏覽器緩存（Ctrl+Shift+R 或 Cmd+Shift+R）

### 圖片沒有顯示？
- 確認圖片格式正確（jpg, png, webp, gif）
- 檔名避免特殊字符，用英文或中文都可以

### JSON 格式錯誤？

- 每一行結尾都要有逗號（最後一行除外）
- 所有文字用**雙引號** `"` 包起來
- 使用配置生成器可以避免這個問題！

### 如何添加作品描述？

在作品文件夾中創建 `readme.md` 文件：

```markdown
這條圍巾是我為冬天特別設計的...
使用了 100% 美麗諾羊毛，柔軟親膚。
```

---

## 🛠️ 進階設定（可選）

如果你想自訂更多細節，可以在 `site.config.json` 添加這些內容：

```json
{
  "profile": {
    "name": "你的名字",
    "profession": "knitter"
  },
  "theme": {
    "primaryColor": "#8B4513",
    "backgroundColor": "#FDF5E6"
  },
  "ui": {
    "heroStyle": "split",
    "gridColumns": 3
  },
  "seo": {
    "siteTitle": "網站標題"
  }
}
```

> 💡 但大多數情況下，你只需要填 `profile` 和 `seo` 就夠了！

---

## 🆘 需要幫助？

- 📖 查看 [CONFIG_GUIDE.md](./CONFIG_GUIDE.md) 了解所有選項
- 🐛 遇到問題？創建 [Issue](../../issues)
- 💬 想要新功能？歡迎提交建議

---

Made with ❤️ for creative professionals who don't code

**讓你的作品發光 ✨**
