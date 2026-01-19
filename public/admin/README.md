# 🎨 Decap CMS 管理後台

這是您網站的「圖形化設定介面」，讓您不用碰程式碼就能修改網站內容！

## 🚀 如何使用？

### 方法一：在 Codespaces 中使用（推薦新手）

1. 在 Codespaces 中，終端機輸入：
   ```bash
   npx decap-server
   ```
2. 打開另一個終端機，輸入：
   ```bash
   npm run dev
   ```
3. 訪問 `http://localhost:5173/admin/` 即可看到管理介面！

### 方法二：部署後使用

1. 首先，您需要設定 Netlify 或其他 OAuth 認證服務
2. 修改 `config.yml` 中的 `repo` 為您的 GitHub 儲存庫
3. 部署網站後，訪問 `https://您的網站/admin/` 即可

## 📋 設定說明

### backend 設定

請將 `config.yml` 中的這行：

```yaml
repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME
```

改成您的 GitHub 用戶名和儲存庫名稱，例如：

```yaml
repo: emmawoolcraft/my-portfolio
```

### 本地測試

在本地開發時，`local_backend: true` 會讓 CMS 直接存取本地檔案，
不需要 GitHub 認證。

## ❓ 常見問題

**Q: 為什麼按下儲存沒反應？**
A: 確認您已經在終端機執行 `npx decap-server`

**Q: 修改後網站沒有更新？**
A: 請重新整理瀏覽器，或確認 `npm run dev` 正在執行

**Q: 如何上傳圖片？**
A: 在對應的圖片欄位點擊「選擇圖片」，可以上傳或選擇現有圖片

## 💡 小提示

- 大部分欄位都可以留空，系統會使用預設值
- 如果設定了「職業風格」，顏色和字體會自動配置！
- 修改後記得按下「發佈」按鈕儲存
