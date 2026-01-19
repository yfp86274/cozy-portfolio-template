#!/usr/bin/env node

/**
 * 🌟 友善錯誤報告器
 *
 * 這個腳本會將晦澀難懂的建置錯誤翻譯成「人話」，
 * 讓不懂程式的手作人也能理解發生了什麼問題。
 *
 * 特色：
 * - 使用正則表達式捕獲常見錯誤
 * - 輸出帶有 Emoji 的友善訊息
 * - 支援 GitHub Actions Summary 輸出
 * - 完全使用繁體中文
 */

import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

// 取得專案根目錄
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 輸出格式化
// ═══════════════════════════════════════════════════════════════════════════

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`)
}

function logBox(title, content, emoji = '📋') {
    console.log('')
    log('╭' + '─'.repeat(60) + '╮', 'cyan')
    log(`│  ${emoji} ${title.padEnd(55)}│`, 'bright')
    log('├' + '─'.repeat(60) + '┤', 'cyan')

    const lines = content.split('\n')
    for (const line of lines) {
        // 每行最多 56 個字元
        const chunks = line.match(/.{1,56}/g) || ['']
        for (const chunk of chunks) {
            log(`│  ${chunk.padEnd(58)}│`, 'reset')
        }
    }

    log('╰' + '─'.repeat(60) + '╯', 'cyan')
    console.log('')
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔍 錯誤模式定義
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 錯誤模式配置
 * 每個模式包含：
 * - pattern: 正則表達式
 * - emoji: 對應的表情符號
 * - title: 友善的標題
 * - getMessage: 根據匹配結果生成友善訊息的函數
 * - getSuggestion: 生成解決建議的函數
 */
const errorPatterns = [
    // JSON 語法錯誤
    {
        pattern: /SyntaxError:.*JSON.*position\s*(\d+)/i,
        emoji: '📝',
        title: '設定檔格式有誤',
        getMessage: (match) => {
            const position = match[1]
            return `site.config.json 大約在第 ${Math.ceil(position / 50)} 行附近有個小問題`
        },
        getSuggestion: () => `
💡 常見原因：
   • 多了一個逗號（最後一項後面不能有逗號）
   • 用了單引號 ' 而不是雙引號 "
   • 漏了一個括號 { } 或 [ ]

🔧 試試這樣做：
   1. 把 site.config.json 的內容複製到 jsonlint.com
   2. 它會告訴您哪裡出錯
   3. 修正後再重新上傳
`,
    },

    // JSON 解析錯誤（更通用）
    {
        pattern: /Unexpected token.*in JSON/i,
        emoji: '🔤',
        title: '設定檔有不認識的符號',
        getMessage: () => 'site.config.json 裡面有個符號讓電腦看不懂',
        getSuggestion: () => `
💡 常見原因：
   • 有地方用了中文的標點符號（像是「」而不是 ""）
   • 文字內容沒有用雙引號包起來
   • 某處多打了一些符號

🔧 建議檢查：
   1. 所有引號都要用英文的 " 而不是中文的 「」
   2. 冒號要用英文的 : 而不是中文的 ：
`,
    },

    // 圖片載入失敗
    {
        pattern: /(?:ENOENT|404|not found).*(?:\/images\/|\.jpg|\.png|\.webp|\.gif)/i,
        emoji: '🖼️',
        title: '找不到圖片檔案',
        getMessage: (match) => {
            const imagePath = match[0].match(/\/images\/[\w\-.]+\.\w+/)?.[0] || '某個圖片'
            return `網站找不到「${imagePath}」這張圖片`
        },
        getSuggestion: () => `
💡 請確認：
   1. 圖片確實放在 public/images/ 資料夾裡
   2. 檔案名稱完全正確（包括大小寫）
   3. 在 site.config.json 中的路徑是 "/images/檔名.jpg"

🔧 小提醒：
   • 檔案名稱建議用英文，不要有空格
   • 例如：my-photo.jpg ✓
   • 避免：我的照片.jpg ✗
`,
    },

    // 模組找不到
    {
        pattern: /Cannot find module ['"]([^'"]+)['"]/i,
        emoji: '📦',
        title: '少了一些需要的檔案',
        getMessage: (match) => `系統找不到「${match[1]}」這個檔案`,
        getSuggestion: () => `
🔧 試試這樣做：
   1. 在終端機執行：npm install
   2. 如果還是不行，試試：
      rm -rf node_modules
      npm install
   3. 如果問題持續，可能是專案檔案不完整
`,
    },

    // npm install 失敗
    {
        pattern: /npm ERR!.*(?:ERESOLVE|EACCES|ENOENT)/i,
        emoji: '📥',
        title: '安裝套件時遇到問題',
        getMessage: () => '在下載網站需要的工具時遇到了一些困難',
        getSuggestion: () => `
🔧 試試這樣做：
   1. 清除快取：npm cache clean --force
   2. 刪除 node_modules 資料夾
   3. 刪除 package-lock.json 檔案
   4. 重新執行：npm install

💡 如果在 Codespaces 中遇到這問題：
   試著關閉 Codespace 再重新開啟
`,
    },

    // Vite 建置錯誤
    {
        pattern: /\[vite\].*(?:Failed to resolve|Could not resolve)/i,
        emoji: '🔧',
        title: '網站建置時遇到問題',
        getMessage: () => '在準備網站的時候遇到了一些技術問題',
        getSuggestion: () => `
🔧 可能的解決方法：
   1. 確認所有檔案都已儲存
   2. 在終端機執行：npm run validate
   3. 檢查是否有紅色錯誤訊息
   4. 如果錯誤訊息提到特定檔案，檢查該檔案內容
`,
    },

    // Vue 組件錯誤
    {
        pattern: /\[Vue warn\]|Component.*is not a function/i,
        emoji: '🧩',
        title: '網站元件有點問題',
        getMessage: () => '網站的某個部分沒有正確運作',
        getSuggestion: () => `
💡 這通常是程式內部的問題
   如果您沒有修改過 src 資料夾內的檔案，
   請到 GitHub Issues 回報這個問題。

🔧 如果您有修改過程式碼：
   請檢查最近修改的檔案是否有語法錯誤
`,
    },

    // 記憶體不足
    {
        pattern: /JavaScript heap out of memory|ENOMEM/i,
        emoji: '💾',
        title: '電腦記憶體不夠用',
        getMessage: () => '在處理您的網站時，電腦的記憶體不夠用了',
        getSuggestion: () => `
🔧 可能的解決方法：
   1. 關閉其他程式，釋放記憶體
   2. 減少圖片檔案的大小
   3. 如果在 Codespaces 中，試試更高規格的方案

💡 圖片優化建議：
   • 大頭照建議在 500KB 以下
   • 作品圖片建議在 2MB 以下
   • 可以使用 tinypng.com 壓縮圖片
`,
    },

    // Git 相關錯誤
    {
        pattern: /fatal:.*(?:not a git repository|permission denied)/i,
        emoji: '📂',
        title: 'Git 儲存庫有問題',
        getMessage: () => '專案的版本控制系統遇到了問題',
        getSuggestion: () => `
🔧 可能的原因：
   1. 您可能不小心刪除了 .git 資料夾
   2. 權限設定有問題

💡 如果在 Codespaces 中：
   建議重新 Fork 專案，再開一個新的 Codespace
`,
    },

    // 網路連線問題
    {
        pattern: /ENOTFOUND|ETIMEDOUT|EAI_AGAIN|network/i,
        emoji: '🌐',
        title: '網路連線有問題',
        getMessage: () => '無法連接到網路',
        getSuggestion: () => `
🔧 請確認：
   1. 您的網路連線正常
   2. 如果使用公司網路，可能有防火牆限制
   3. 稍等一下再試試

💡 如果問題持續：
   可能是 GitHub 或 npm 伺服器暫時有問題，
   過幾分鐘再試試看。
`,
    },

    // 權限錯誤
    {
        pattern: /EACCES|Permission denied/i,
        emoji: '🔒',
        title: '沒有權限存取某些檔案',
        getMessage: () => '系統沒有權限存取某些檔案或資料夾',
        getSuggestion: () => `
🔧 可能的解決方法：
   1. 不要以系統管理員身份執行
   2. 確認資料夾沒有被設為唯讀
   3. 如果在 Codespaces 中，試著重新開啟

💡 如果是 npm 的權限問題：
   執行：npm cache clean --force
`,
    },

    // 通用建置失敗
    {
        pattern: /Build failed|Error during build/i,
        emoji: '🏗️',
        title: '網站建置失敗',
        getMessage: () => '在準備上線版本時遇到了問題',
        getSuggestion: () => `
🔧 建議檢查步驟：
   1. 執行 npm run validate 檢查設定檔
   2. 查看上方的錯誤訊息，尋找更具體的問題
   3. 確認沒有修改過 src 資料夾內的程式碼

💡 常見原因：
   • site.config.json 格式錯誤
   • 圖片路徑不正確
   • 程式碼有語法錯誤
`,
    },
]

// ═══════════════════════════════════════════════════════════════════════════
// 🔧 錯誤分析函數
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 分析錯誤訊息並返回友善的解釋
 * @param {string} errorOutput - 原始錯誤輸出
 * @returns {object} 分析結果
 */
function analyzeError(errorOutput) {
    if (!errorOutput || typeof errorOutput !== 'string') {
        return null
    }

    const results = []

    // 嘗試匹配每個錯誤模式
    for (const pattern of errorPatterns) {
        const match = errorOutput.match(pattern.pattern)
        if (match) {
            results.push({
                emoji: pattern.emoji,
                title: pattern.title,
                message: pattern.getMessage(match),
                suggestion: pattern.getSuggestion(match),
                originalMatch: match[0],
                priority: errorPatterns.indexOf(pattern), // 越前面優先級越高
            })
        }
    }

    // 按優先級排序
    results.sort((a, b) => a.priority - b.priority)

    return results.length > 0 ? results : null
}

/**
 * 生成 GitHub Actions Summary 格式的報告
 * @param {Array} analyses - 分析結果陣列
 * @returns {string} Markdown 格式的報告
 */
function generateGitHubSummary(analyses) {
    if (!analyses || analyses.length === 0) {
        return null
    }

    let summary = `# 🛠️ 建置問題報告

> 別擔心！以下是我們發現的問題和解決建議。

---

`

    for (const analysis of analyses) {
        summary += `## ${analysis.emoji} ${analysis.title}

**發生什麼事了？**
${analysis.message}

**怎麼解決？**
\`\`\`
${analysis.suggestion.trim()}
\`\`\`

---

`
    }

    summary += `
## 🆘 還是不知道怎麼辦？

1. 📖 查看 \`CONFIG_GUIDE.md\` 設定指南
2. 🔍 執行 \`npm run validate\` 檢查設定檔
3. 💬 到 GitHub Issues 發問，我們會幫助您！

---

*這份報告由友善錯誤報告器自動生成 🤖*
`

    return summary
}

/**
 * 輸出到終端機
 * @param {Array} analyses - 分析結果陣列
 */
function printToTerminal(analyses) {
    if (!analyses || analyses.length === 0) {
        log('\n🤔 無法識別具體的錯誤類型', 'yellow')
        log('   請查看上方的原始錯誤訊息', 'yellow')
        log('   或執行 npm run validate 檢查設定檔\n', 'yellow')
        return
    }

    console.log('')
    log('═'.repeat(62), 'cyan')
    log('  🌟 讓我們來看看發生了什麼問題...', 'bright')
    log('═'.repeat(62), 'cyan')

    for (const analysis of analyses) {
        logBox(analysis.title, `${analysis.message}\n\n${analysis.suggestion.trim()}`, analysis.emoji)
    }

    log('═'.repeat(62), 'cyan')
    log('  💪 別灰心！大部分問題都很容易解決', 'green')
    log('  📖 如果需要更多幫助，請查看 CONFIG_GUIDE.md', 'green')
    log('═'.repeat(62), 'cyan')
    console.log('')
}

// ═══════════════════════════════════════════════════════════════════════════
// 📋 主程式
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
    // 從標準輸入讀取錯誤訊息
    let errorOutput = ''

    // 檢查是否有命令列參數（檔案路徑）
    const args = process.argv.slice(2)

    if (args.includes('--help') || args.includes('-h')) {
        console.log(`
🌟 友善錯誤報告器 - 使用說明

用法：
  npm run build 2>&1 | node scripts/friendly-error-reporter.js
  cat error.log | node scripts/friendly-error-reporter.js
  node scripts/friendly-error-reporter.js < error.log
  node scripts/friendly-error-reporter.js --file error.log

選項：
  --help, -h      顯示此說明
  --file <path>   從檔案讀取錯誤訊息
  --github        同時輸出 GitHub Actions Summary 格式

範例：
  npm run build 2>&1 | node scripts/friendly-error-reporter.js --github
`)
        process.exit(0)
    }

    // 從檔案讀取
    const fileIndex = args.indexOf('--file')
    if (fileIndex !== -1 && args[fileIndex + 1]) {
        const filePath = args[fileIndex + 1]
        try {
            errorOutput = fs.readFileSync(filePath, 'utf-8')
        } catch (e) {
            log(`無法讀取檔案：${filePath}`, 'red')
            process.exit(1)
        }
    } else if (process.stdin.isTTY) {
        // 如果沒有輸入，顯示使用說明
        console.log(`
🌟 友善錯誤報告器

此工具會將建置錯誤翻譯成易懂的說明。

用法：
  npm run build 2>&1 | node scripts/friendly-error-reporter.js

或者執行 node scripts/friendly-error-reporter.js --help 查看更多選項
`)
        process.exit(0)
    } else {
        // 從標準輸入讀取
        const chunks = []
        for await (const chunk of process.stdin) {
            chunks.push(chunk)
        }
        errorOutput = Buffer.concat(chunks).toString('utf-8')
    }

    // 分析錯誤
    const analyses = analyzeError(errorOutput)

    // 輸出到終端機
    printToTerminal(analyses)

    // 如果有 --github 參數，輸出 GitHub Summary
    if (args.includes('--github')) {
        const summary = generateGitHubSummary(analyses)
        if (summary) {
            // 嘗試寫入 GitHub Actions Summary
            const summaryPath = process.env.GITHUB_STEP_SUMMARY
            if (summaryPath) {
                try {
                    fs.appendFileSync(summaryPath, summary)
                    log('✅ 已寫入 GitHub Actions Summary', 'green')
                } catch (e) {
                    log('⚠️  無法寫入 GitHub Summary，輸出到標準輸出', 'yellow')
                    console.log('\n--- GitHub Summary ---\n')
                    console.log(summary)
                }
            } else {
                // 不在 GitHub Actions 環境中，輸出到標準輸出
                console.log('\n--- GitHub Summary (Preview) ---\n')
                console.log(summary)
            }
        }
    }

    // 同時輸出原始錯誤（方便調試）
    if (args.includes('--verbose') || args.includes('-v')) {
        console.log('\n--- 原始錯誤訊息 ---\n')
        console.log(errorOutput)
    }
}

// 執行主程式
main().catch((error) => {
    log(`報告器發生錯誤：${error.message}`, 'red')
    process.exit(1)
})
