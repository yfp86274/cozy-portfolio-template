#!/usr/bin/env node

/**
 * 🔍 網站配置驗證器
 *
 * 這個腳本會在建置網站前檢查您的 site.config.json 設定檔，
 * 並用親切的方式告訴您哪裡需要修正。
 *
 * 專為不熟悉程式碼的手作人設計 ❤️
 */

import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

// 取得專案根目錄
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

// 終端機顏色設定
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
}

// 收集所有錯誤和警告，用於生成報告
const collectedIssues = {
    errors: [],
    warnings: [],
    suggestions: [],
}

/**
 * 列印訊息到終端機
 */
function print(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`)
}

/**
 * 列印分隔線標題
 */
function printHeader(message) {
    console.log('')
    print('═'.repeat(60), 'cyan')
    print(`  ${message}`, 'bright')
    print('═'.repeat(60), 'cyan')
    console.log('')
}

/**
 * 列印成功訊息
 */
function printSuccess(message) {
    print(`✅ ${message}`, 'green')
}

/**
 * 列印警告訊息
 */
function printWarning(message) {
    print(`💡 ${message}`, 'yellow')
}

/**
 * 列印友善的錯誤訊息
 * @param {string} emoji - 表情符號
 * @param {string} title - 標題
 * @param {string} where - 錯誤位置
 * @param {string} why - 為什麼錯
 * @param {string} howToFix - 怎麼修正
 * @param {string} example - 範例（可選）
 */
function printFriendlyError(emoji, title, where, why, howToFix, example = null) {
    console.log('')
    print('╭' + '─'.repeat(58) + '╮', 'red')
    print(`│  ${emoji} ${title.padEnd(52)}│`, 'red')
    print('├' + '─'.repeat(58) + '┤', 'red')

    // 錯誤位置
    print('│  📍 位置：'.padEnd(60) + '│', 'yellow')
    wrapText(where, 54).forEach((line) => {
        print(`│     ${line.padEnd(53)}│`, 'reset')
    })

    // 為什麼錯
    print('│                                                          │', 'reset')
    print('│  ❓ 原因：'.padEnd(60) + '│', 'yellow')
    wrapText(why, 54).forEach((line) => {
        print(`│     ${line.padEnd(53)}│`, 'reset')
    })

    // 怎麼修正
    print('│                                                          │', 'reset')
    print('│  🔧 解決方法：'.padEnd(60) + '│', 'cyan')
    wrapText(howToFix, 54).forEach((line) => {
        print(`│     ${line.padEnd(53)}│`, 'reset')
    })

    // 範例（如果有的話）
    if (example) {
        print('│                                                          │', 'reset')
        print('│  📝 範例：'.padEnd(60) + '│', 'green')
        wrapText(example, 54).forEach((line) => {
            print(`│     ${line.padEnd(53)}│`, 'green')
        })
    }

    print('╰' + '─'.repeat(58) + '╯', 'red')
    console.log('')

    // 收集錯誤
    collectedIssues.errors.push({
        emoji,
        title,
        where,
        why,
        howToFix,
        example,
    })
}

/**
 * 將長文字換行
 */
function wrapText(text, maxWidth) {
    const words = text.split(' ')
    const lines = []
    let currentLine = ''

    words.forEach((word) => {
        if ((currentLine + ' ' + word).trim().length <= maxWidth) {
            currentLine = (currentLine + ' ' + word).trim()
        } else {
            if (currentLine) lines.push(currentLine)
            currentLine = word
        }
    })
    if (currentLine) lines.push(currentLine)

    return lines.length > 0 ? lines : ['']
}

/**
 * 診斷 JSON 語法錯誤
 */
function diagnoseJsonError(content, error) {
    const errorMessage = error.message

    // 從錯誤訊息中提取位置
    const positionMatch = errorMessage.match(/position\s*(\d+)/i)
    const lineMatch = errorMessage.match(/line\s*(\d+)/i)

    let position = positionMatch ? parseInt(positionMatch[1]) : null
    let line = lineMatch ? parseInt(lineMatch[1]) : null

    // 如果有位置，計算行號
    if (position !== null && line === null) {
        const beforeError = content.substring(0, position)
        line = (beforeError.match(/\n/g) || []).length + 1
    }

    // 取得錯誤前後的內容
    let contextStart = Math.max(0, (position || 0) - 40)
    let contextEnd = Math.min(content.length, (position || 0) + 40)
    let context = content.substring(contextStart, contextEnd)

    // 常見錯誤模式及友善訊息
    const patterns = [
        {
            test: () => content.match(/,\s*[}\]]/g),
            emoji: '🔴',
            title: '哎呀，有一個多餘的逗號！',
            where: `大約在第 ${line || '?'} 行附近`,
            why: '在 JSON 裡面，最後一個項目後面不能有逗號。就像列清單時，最後一項不用加「、」一樣。',
            howToFix: '請找到 } 或 ] 前面的逗號，把它刪掉就好了。',
            example: '正確：{ "name": "小美" }\n錯誤：{ "name": "小美", }',
        },
        {
            test: () => content.includes("'"),
            emoji: '📝',
            title: '引號用錯了喔！',
            where: `檔案中使用了單引號 '`,
            why: 'JSON 只認得雙引號 "，不認得單引號 \'。這是 JSON 的規定。',
            howToFix: '請把所有的單引號 \' 換成雙引號 "',
            example: '正確："name": "小美"\n錯誤：\'name\': \'小美\'',
        },
        {
            test: () => content.match(/:\s*[,}\]]/g),
            emoji: '❓',
            title: '這裡好像少了一個值！',
            where: `大約在第 ${line || '?'} 行，某個冒號後面沒有值`,
            why: '每個設定項目的冒號後面都要有值，不能空著。',
            howToFix: '請在冒號後面填上適當的值。文字要用雙引號包起來，數字直接寫。',
            example: '正確："name": "小美"\n錯誤："name": ',
        },
        {
            test: () => {
                // 檢查是否缺少逗號
                const lines = content.split('\n')
                for (let i = 0; i < lines.length - 1; i++) {
                    const currentLine = lines[i].trim()
                    const nextLine = lines[i + 1].trim()
                    if (
                        currentLine.endsWith('"') &&
                        !currentLine.endsWith('",') &&
                        !currentLine.endsWith('":') &&
                        nextLine.startsWith('"')
                    ) {
                        return true
                    }
                }
                return false
            },
            emoji: '➕',
            title: '這裡好像少了一個逗號！',
            where: `大約在第 ${line || '?'} 行附近`,
            why: 'JSON 裡面，每個項目之間要用逗號隔開（最後一個除外）。',
            howToFix: '請在兩個項目之間加上逗號。',
            example: '正確："name": "小美",\n       "role": "手作人"',
        },
        {
            test: () => {
                const openBraces = (content.match(/{/g) || []).length
                const closeBraces = (content.match(/}/g) || []).length
                return openBraces !== closeBraces
            },
            emoji: '🔲',
            title: '括號好像沒有配對！',
            where: `整個檔案`,
            why: '每個 { 都要有對應的 }，就像每個開始都要有結束。',
            howToFix: '請檢查所有的大括號 { } 是否都有配對。可能是少了一個，或多了一個。',
            example: '正確：{ "profile": { "name": "小美" } }',
        },
    ]

    // 檢查每個模式
    for (const pattern of patterns) {
        if (pattern.test && pattern.test()) {
            return pattern
        }
    }

    // 通用錯誤
    return {
        emoji: '🤔',
        title: 'JSON 格式有點問題',
        where: line ? `大約在第 ${line} 行` : '不確定確切位置',
        why: errorMessage,
        howToFix:
            '建議您可以：\n1. 使用 https://jsonlint.com 這個網站來檢查\n2. 把 site.config.json 的內容貼上去，它會告訴您哪裡有問題',
        example: null,
    }
}

// 有效的職業列表
const VALID_PROFESSIONS = [
    'chef', 'baker', 'barista',
    'knitter', 'potter', 'jeweler', 'leatherworker', 'woodworker',
    'artist', 'illustrator', 'photographer', 'designer',
    'florist', 'gardener',
    'therapist', 'yoga',
    'architect', 'interior',
    'musician',
    'writer', 'teacher'
]

// 有效的區塊名稱
const VALID_SECTIONS = ['Hero', 'Works', 'OtherWorks', 'About', 'Contact', 'Gallery', 'Testimonials']

/**
 * 驗證設定結構
 */
function validateConfigStructure(config) {
    const warnings = []
    const errors = []

    // 必填的頂層欄位
    const requiredSections = {
        profile: '個人資料',
    }

    for (const [field, label] of Object.entries(requiredSections)) {
        if (!config[field]) {
            errors.push({
                emoji: '📋',
                title: `缺少「${label}」區塊`,
                where: `site.config.json 最外層`,
                why: `網站需要「${field}」這個區塊才能正常運作。`,
                howToFix: `請在設定檔中加入 "${field}": { ... } 區塊`,
            })
        }
    }

    // 檢查個人資料
    if (config.profile) {
        if (!config.profile.name || config.profile.name.trim() === '') {
            warnings.push({
                field: 'profile.name',
                message: '您的名字還是空的喔！訪客會想知道這是誰的網站。',
                suggestion: '請填入您的名字或品牌名稱',
            })
        }

        if (!config.profile.email || !isValidEmail(config.profile.email)) {
            warnings.push({
                field: 'profile.email',
                message: 'Email 格式好像不太對',
                suggestion: '請確認 Email 格式正確，例如：hello@example.com',
            })
        }

        // 檢查職業欄位（新功能）
        if (config.profile.profession) {
            const profession = config.profile.profession.toLowerCase().trim()
            if (!VALID_PROFESSIONS.includes(profession)) {
                warnings.push({
                    field: 'profile.profession',
                    message: `「${config.profile.profession}」不是有效的職業選項`,
                    suggestion: `有效的選項有：${VALID_PROFESSIONS.join('、')}。設定職業後，網站會自動套用最適合的風格！`,
                })
            } else {
                // 職業設定正確，給予正面回饋
                print(`✨ 檢測到職業設定：${profession}，將自動套用推薦風格`, 'magenta')
            }
        }

        // 檢查社群連結格式
        if (config.profile.social) {
            const socialPlatforms = ['instagram', 'pinterest', 'etsy', 'youtube', 'tiktok']
            for (const platform of socialPlatforms) {
                const url = config.profile.social[platform]
                if (url && url.trim() !== '' && !isValidUrl(url)) {
                    warnings.push({
                        field: `profile.social.${platform}`,
                        message: `${platform} 的網址格式好像不太對`,
                        suggestion: '網址應該要以 https:// 開頭，例如：https://instagram.com/yourname',
                    })
                }
            }
        }
    }

    // 檢查主題顏色（只有在沒設定職業或有自訂顏色時才檢查）
    if (config.theme) {
        const colorFields = {
            primaryColor: '主要顏色',
            backgroundColor: '背景顏色',
            textColor: '文字顏色',
        }

        for (const [field, label] of Object.entries(colorFields)) {
            const value = config.theme[field]
            if (value && !isValidHexColor(value)) {
                warnings.push({
                    field: `theme.${field}`,
                    message: `「${label}」的色碼格式好像不太對：${value}`,
                    suggestion: '色碼格式應該是 # 加上 6 個字元，例如：#8B4513（咖啡色）',
                })
            }
        }
    }

    // 檢查 UI 預設
    if (config.ui) {
        if (config.ui.themePreset) {
            const validPresets = ['default', 'minimal', 'soft', 'bold']
            if (!validPresets.includes(config.ui.themePreset.toLowerCase())) {
                warnings.push({
                    field: 'ui.themePreset',
                    message: `「${config.ui.themePreset}」不是有效的風格選項`,
                    suggestion: `有效的選項有：${validPresets.join('、')}`,
                })
            }
        }

        // 檢查 layout 配置（新功能）
        if (config.ui.layout) {
            if (!Array.isArray(config.ui.layout)) {
                warnings.push({
                    field: 'ui.layout',
                    message: 'layout 應該是一個陣列',
                    suggestion: '例如：["Hero", "Works", "OtherWorks"]',
                })
            } else {
                const invalidSections = config.ui.layout.filter(s => !VALID_SECTIONS.includes(s))
                if (invalidSections.length > 0) {
                    warnings.push({
                        field: 'ui.layout',
                        message: `以下區塊名稱無效：${invalidSections.join('、')}`,
                        suggestion: `有效的區塊有：${VALID_SECTIONS.join('、')}`,
                    })
                }

                if (config.ui.layout.length === 0) {
                    warnings.push({
                        field: 'ui.layout',
                        message: 'layout 陣列是空的',
                        suggestion: '至少要有一個區塊，例如：["Hero", "Works"]',
                    })
                }
            }
        }
    }

    // 檢查 SEO
    if (config.seo) {
        if (config.seo.siteDescription && config.seo.siteDescription.length > 160) {
            warnings.push({
                field: 'seo.siteDescription',
                message: `網站描述有點太長了（${config.seo.siteDescription.length} 字元）`,
                suggestion: '建議控制在 160 字元以內，Google 才能完整顯示',
            })
        }
    }

    // 如果沒有設定職業，給個提示
    if (!config.profile?.profession) {
        collectedIssues.suggestions.push({
            field: 'profile.profession',
            message: '您可以設定職業來自動套用最適合的網站風格！',
            suggestion: `在 profile 中加入 "profession": "knitter"（或其他職業）`,
        })
    }

    return {warnings, errors}
}

/**
 * 驗證 Email 格式
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * 驗證網址格式
 */
function isValidUrl(url) {
    try {
        new URL(url)
        return true
    } catch {
    return false
    }
}

/**
 * 驗證 Hex 色碼
 */
function isValidHexColor(color) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

/**
 * 生成錯誤報告 Markdown 文件
 */
function generateErrorReport() {
    const hasIssues = collectedIssues.errors.length > 0 ||
        collectedIssues.warnings.length > 0 ||
        collectedIssues.suggestions.length > 0

    if (!hasIssues) {
        // 沒有錯誤，刪除舊的報告檔案（如果存在）
        const reportPath = path.join(projectRoot, 'CONFIG_ERRORS.md')
        if (fs.existsSync(reportPath)) {
            fs.unlinkSync(reportPath)
        }
        return
    }

    let report = `# 🔍 設定檔檢查報告

> 這份報告是自動產生的，幫助您修正 \`site.config.json\` 中的問題。
> 修正完成後，這個檔案會自動消失。

---

`

    // 錯誤區塊
    if (collectedIssues.errors.length > 0) {
        report += `## ❌ 需要修正的錯誤

以下問題會影響網站正常運作，請優先處理：

`
        collectedIssues.errors.forEach((err, index) => {
            report += `### ${index + 1}. ${err.emoji} ${err.title}

| 項目 | 說明 |
|------|------|
| 📍 位置 | ${err.where} |
| ❓ 原因 | ${err.why} |
| 🔧 解決方法 | ${err.howToFix} |
`
            if (err.example) {
                report += `
**範例：**
\`\`\`
${err.example}
\`\`\`
`
            }
            report += '\n---\n\n'
        })
    }

    // 警告區塊
    if (collectedIssues.warnings.length > 0) {
        report += `## ⚠️ 建議改善的地方

這些不是錯誤，但改善後網站會更好：

| 欄位 | 說明 | 建議 |
|------|------|------|
`
        collectedIssues.warnings.forEach((warn) => {
            report += `| \`${warn.field}\` | ${warn.message} | ${warn.suggestion} |\n`
        })
        report += '\n---\n\n'
    }

    // 建議區塊（新功能提示）
    if (collectedIssues.suggestions.length > 0) {
        report += `## 💡 小提示

這些是可以讓您的網站更棒的建議：

| 欄位 | 說明 | 建議 |
|------|------|------|
`
        collectedIssues.suggestions.forEach((sug) => {
            report += `| \`${sug.field}\` | ${sug.message} | ${sug.suggestion} |\n`
        })
        report += '\n---\n\n'
    }

    report += `
## 🆘 需要幫助嗎？

如果您不確定怎麼修正，可以：

1. **使用 JSON 檢查工具**：把 \`site.config.json\` 的內容貼到 [jsonlint.com](https://jsonlint.com)
2. **參考設定指南**：查看專案中的 \`CONFIG_GUIDE.md\`
3. **回報問題**：到 GitHub Issues 詢問

記得修正後重新執行 \`npm run validate\` 來確認問題已解決！

---

## 🪄 職業快速設定

只要在 \`profile.profession\` 設定您的職業，網站就會自動套用最適合的風格！

\`\`\`json
{
  "profile": {
    "name": "您的名字",
    "profession": "knitter"  // 👈 加上這行！
  }
}
\`\`\`

**可用的職業：**
- 🍳 餐飲類：\`chef\`、\`baker\`、\`barista\`
- 🧶 手作類：\`knitter\`、\`potter\`、\`jeweler\`、\`leatherworker\`、\`woodworker\`
- 🎨 藝術類：\`artist\`、\`illustrator\`、\`photographer\`、\`designer\`
- 🌸 花藝類：\`florist\`、\`gardener\`
- 💆 療癒類：\`therapist\`、\`yoga\`
- 🏠 空間類：\`architect\`、\`interior\`
- 🎵 表演類：\`musician\`
- 📝 文字類：\`writer\`、\`teacher\`
`

    // 寫入報告檔案
    const reportPath = path.join(projectRoot, 'CONFIG_ERRORS.md')
    fs.writeFileSync(reportPath, report, 'utf-8')
    print('\n📄 已生成檢查報告：CONFIG_ERRORS.md', 'cyan')
    print('   打開這個檔案可以看到更詳細的說明', 'cyan')
}

/**
 * 取得預設設定
 */
function getDefaultConfig() {
    return {
        profile: {
            name: '您的名字',
            role: '您的專長',
            profession: '',
            email: 'hello@example.com',
            bio: '在這裡介紹您自己...',
            avatar: '/images/avatar.jpg',
            social: {},
        },
        theme: {
            primaryColor: '#6B4423',
            secondaryColor: '#8B6914',
            backgroundColor: '#FFFBF5',
            textColor: '#2D2D2D',
            mutedColor: '#6B6B6B',
            fontFamily: 'Noto Sans TC',
            headingFont: 'Noto Serif TC',
        },
        ui: {
            themePreset: 'default',
            heroStyle: 'split',
            showFooter: true,
            showSocialLinks: true,
            showOtherWorks: true,
            layout: ['Hero', 'Works', 'OtherWorks'],
        },
        content: {
            heroTitle: '歡迎光臨',
            heroSubtitle: '這是我的作品集',
            heroButtonText: '瀏覽作品',
            worksTitle: '我的作品',
            otherWorksTitle: '更多作品',
            aboutTitle: '關於我',
            aboutContent: '',
            contactTitle: '聯絡我',
            contactMessage: '有任何問題或合作提案，歡迎與我聯繫！',
        },
        seo: {
            siteTitle: '我的作品集',
            siteDescription: '一個展示作品的網站',
        },
    }
}

/**
 * 主程式
 */
async function main() {
    printHeader('🔍 正在檢查您的網站設定...')

    const configPath = path.join(projectRoot, 'site.config.json')

    // 檢查設定檔是否存在
    if (!fs.existsSync(configPath)) {
        printFriendlyError(
            '📁',
            '找不到設定檔！',
            '專案根目錄',
            '網站需要 site.config.json 這個檔案來知道要顯示什麼內容。',
            '別擔心！我現在就幫您建立一個預設的設定檔。',
            null
        )

        print('\n📝 正在建立預設設定檔...', 'cyan')
        try {
            fs.writeFileSync(configPath, JSON.stringify(getDefaultConfig(), null, 2), 'utf-8')
            printSuccess('已建立 site.config.json！')
            print('\n👉 下一步：請打開 site.config.json，填入您的資料', 'yellow')
        } catch (e) {
            print('無法建立設定檔：' + e.message, 'red')
            generateErrorReport()
            process.exit(1)
        }
    }

    // 讀取設定檔
    let content
    try {
        content = fs.readFileSync(configPath, 'utf-8')
    } catch (error) {
        printFriendlyError(
            '📖',
            '無法讀取設定檔',
            'site.config.json',
            error.message,
            '請確認檔案存在且沒有被其他程式鎖定。'
        )
        generateErrorReport()
        process.exit(1)
    }

    // 移除 BOM 字元
    if (content.charCodeAt(0) === 0xfeff) {
        content = content.slice(1)
        printWarning('已移除檔案開頭的特殊字元（BOM）')
    }

    // 嘗試解析 JSON
    let config
    try {
        config = JSON.parse(content)
        printSuccess('JSON 格式正確！')
    } catch (error) {
        const diagnosis = diagnoseJsonError(content, error)
        printFriendlyError(
            diagnosis.emoji,
            diagnosis.title,
            diagnosis.where,
            diagnosis.why,
            diagnosis.howToFix,
            diagnosis.example
        )

        // 嘗試使用預設設定繼續
        print('\n🔄 將使用預設設定繼續建置...', 'yellow')
        config = getDefaultConfig()
        printWarning('請記得修正設定檔中的問題！')
    }

    // 驗證結構
    const {warnings, errors} = validateConfigStructure(config)

    // 收集警告
    collectedIssues.warnings = warnings

    // 顯示結構錯誤
    errors.forEach((err) => {
        printFriendlyError(err.emoji, err.title, err.where, err.why, err.howToFix)
    })

    // 顯示警告
    if (warnings.length > 0) {
        console.log('')
        print('💡 一些小建議可以讓您的網站更完美：', 'yellow')
        console.log('')
        warnings.forEach((warn) => {
            print(`   📍 ${warn.field}`, 'cyan')
            print(`      ${warn.message}`, 'yellow')
            print(`      👉 ${warn.suggestion}`, 'reset')
            console.log('')
        })
    }

    // 生成報告
    generateErrorReport()

    // 最終狀態
    console.log('')
    print('─'.repeat(60), 'cyan')

    if (collectedIssues.errors.length === 0 && warnings.length === 0) {
        print('🎉 太棒了！您的設定檔完全沒問題！', 'green')
        print('   網站已經準備好可以上線了！', 'green')
    } else if (collectedIssues.errors.length === 0) {
        print('👍 設定檔基本上沒問題，可以正常運作', 'green')
        print('   但上面的建議如果能改善會更好喔！', 'yellow')
    } else {
        print('⚠️  有一些問題需要處理', 'yellow')
        print('   請打開 CONFIG_ERRORS.md 查看詳細說明', 'yellow')
    }

    print('─'.repeat(60), 'cyan')
    console.log('')

    // 總是以成功退出，不阻擋建置
    // （對不熟悉技術的用戶更友善）
    process.exit(0)
}

// 執行主程式
main().catch((error) => {
    print(`發生意外錯誤：${error.message}`, 'red')
    process.exit(0)
})
