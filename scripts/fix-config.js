#!/usr/bin/env node

/**
 * 🪄 JSON 自動修復器 (The Auto-Fixer)
 *
 * 設計理念：
 * 「用戶不應該因為少了一個逗號就看到紅字錯誤」
 *
 * 這個腳本會在建置前自動執行，用 json5 寬鬆解析用戶的設定檔，
 * 然後重新寫入標準的 JSON 格式。
 *
 * ✨ 自動修復的問題：
 * - 尾隨逗號 { "name": "小美", } → { "name": "小美" }
 * - 單引號 { 'name': '小美' } → { "name": "小美" }
 * - 無引號的 Key { name: "小美" } → { "name": "小美" }
 * - 多行字串和註解
 *
 * 🎯 目標：讓「我不小心多打了一個逗號」永遠不會導致部署失敗
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
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
}

function print(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`)
}

/**
 * 寬鬆的 JSON5 解析器（內建實現，無需額外依賴）
 *
 * 支援：
 * - 尾隨逗號
 * - 單引號字串
 * - 無引號的物件 Key
 * - 單行註解 // 和多行註解 /* */
*
-十六進位數字
* -多行字串（使用反斜線）
*/

function parseJSON5(input) {
    let pos = 0
    const length = input.length

    // 跳過空白和註解
    function skipWhitespaceAndComments() {
        while (pos < length) {
            const char = input[pos]

            // 空白字元
            if (/\s/.test(char)) {
                pos++
                continue
            }

            // 單行註解 //
            if (char === '/' && input[pos + 1] === '/') {
                pos += 2
                while (pos < length && input[pos] !== '\n') {
                    pos++
                }
                continue
            }

            // 多行註解 /* */
            if (char === '/' && input[pos + 1] === '*') {
                pos += 2
                while (pos < length && !(input[pos] === '*' && input[pos + 1] === '/')) {
                    pos++
                }
                pos += 2
                continue
            }

            break
        }
    }

    // 解析字串（支援單引號和雙引號）
    function parseString() {
        const quote = input[pos]
        if (quote !== '"' && quote !== "'") {
            throw new Error(`Expected string at position ${pos}`)
        }

        pos++
        let result = ''

        while (pos < length) {
            const char = input[pos]

            if (char === quote) {
                pos++
                return result
            }

            if (char === '\\') {
                pos++
                const escaped = input[pos]
                switch (escaped) {
                    case 'n':
                        result += '\n';
                        break
                    case 'r':
                        result += '\r';
                        break
                    case 't':
                        result += '\t';
                        break
                    case '\\':
                        result += '\\';
                        break
                    case '/':
                        result += '/';
                        break
                    case '"':
                        result += '"';
                        break
                    case "'":
                        result += "'";
                        break
                    case 'b':
                        result += '\b';
                        break
                    case 'f':
                        result += '\f';
                        break
                    case 'u':
                        const hex = input.substring(pos + 1, pos + 5)
                        result += String.fromCharCode(parseInt(hex, 16))
                        pos += 4
                        break
                    case '\n':
                        // 多行字串（反斜線後接換行）
                        break
                    default:
                        result += escaped
                }
                pos++
            } else {
                result += char
                pos++
            }
        }

        throw new Error('Unterminated string')
    }

    // 解析無引號的識別符（用於物件 Key）
    function parseIdentifier() {
        const start = pos
        // 識別符可以包含字母、數字、底線、美元符號，也支援中文
        while (pos < length && /[a-zA-Z0-9_$\u4e00-\u9fff]/.test(input[pos])) {
            pos++
        }
        return input.substring(start, pos)
    }

    // 解析數字
    function parseNumber() {
        const start = pos

        // 處理十六進位
        if (input[pos] === '0' && (input[pos + 1] === 'x' || input[pos + 1] === 'X')) {
            pos += 2
            while (pos < length && /[0-9a-fA-F]/.test(input[pos])) {
                pos++
            }
            return parseInt(input.substring(start, pos), 16)
        }

        // 處理正負號
        if (input[pos] === '-' || input[pos] === '+') {
            pos++
        }

        // 整數部分
        while (pos < length && /[0-9]/.test(input[pos])) {
            pos++
        }

        // 小數部分
        if (input[pos] === '.') {
            pos++
            while (pos < length && /[0-9]/.test(input[pos])) {
                pos++
            }
        }

        // 指數部分
        if (input[pos] === 'e' || input[pos] === 'E') {
            pos++
            if (input[pos] === '-' || input[pos] === '+') {
                pos++
            }
            while (pos < length && /[0-9]/.test(input[pos])) {
                pos++
            }
        }

        return parseFloat(input.substring(start, pos))
    }

    // 解析值
    function parseValue() {
        skipWhitespaceAndComments()

        if (pos >= length) {
            throw new Error('Unexpected end of input')
        }

        const char = input[pos]

        // 物件
        if (char === '{') {
            return parseObject()
        }

        // 陣列
        if (char === '[') {
            return parseArray()
        }

        // 字串
        if (char === '"' || char === "'") {
            return parseString()
        }

        // 數字（包含負數）
        if (char === '-' || char === '+' || /[0-9]/.test(char)) {
            return parseNumber()
        }

        // 布林值和 null
        if (input.substring(pos, pos + 4) === 'true') {
            pos += 4
            return true
        }
        if (input.substring(pos, pos + 5) === 'false') {
            pos += 5
            return false
        }
        if (input.substring(pos, pos + 4) === 'null') {
            pos += 4
            return null
        }

        // Infinity 和 NaN（JSON5 支援）
        if (input.substring(pos, pos + 8) === 'Infinity') {
            pos += 8
            return Infinity
        }
        if (input.substring(pos, pos + 9) === '-Infinity') {
            pos += 9
            return -Infinity
        }
        if (input.substring(pos, pos + 3) === 'NaN') {
            pos += 3
            return NaN
        }

        throw new Error(`Unexpected character '${char}' at position ${pos}`)
    }

    // 解析物件
    function parseObject() {
        if (input[pos] !== '{') {
            throw new Error(`Expected '{' at position ${pos}`)
        }
        pos++

        const result = {}

        skipWhitespaceAndComments()

        // 空物件
        if (input[pos] === '}') {
            pos++
            return result
        }

        while (pos < length) {
            skipWhitespaceAndComments()

            // 解析 Key（支援引號字串或無引號識別符）
            let key
            if (input[pos] === '"' || input[pos] === "'") {
                key = parseString()
            } else {
                key = parseIdentifier()
            }

            if (!key) {
                throw new Error(`Expected object key at position ${pos}`)
            }

            skipWhitespaceAndComments()

            // 期待冒號
            if (input[pos] !== ':') {
                throw new Error(`Expected ':' at position ${pos}`)
            }
            pos++

            // 解析值
            const value = parseValue()
            result[key] = value

            skipWhitespaceAndComments()

            // 逗號或結束
            if (input[pos] === ',') {
                pos++
                skipWhitespaceAndComments()
                // 允許尾隨逗號
                if (input[pos] === '}') {
                    pos++
                    return result
                }
            } else if (input[pos] === '}') {
                pos++
                return result
            } else {
                throw new Error(`Expected ',' or '}' at position ${pos}`)
            }
        }

        throw new Error('Unexpected end of object')
    }

    // 解析陣列
    function parseArray() {
        if (input[pos] !== '[') {
            throw new Error(`Expected '[' at position ${pos}`)
        }
        pos++

        const result = []

        skipWhitespaceAndComments()

        // 空陣列
        if (input[pos] === ']') {
            pos++
            return result
        }

        while (pos < length) {
            const value = parseValue()
            result.push(value)

            skipWhitespaceAndComments()

            // 逗號或結束
            if (input[pos] === ',') {
                pos++
                skipWhitespaceAndComments()
                // 允許尾隨逗號
                if (input[pos] === ']') {
                    pos++
                    return result
                }
            } else if (input[pos] === ']') {
                pos++
                return result
            } else {
                throw new Error(`Expected ',' or ']' at position ${pos}`)
            }
        }

        throw new Error('Unexpected end of array')
    }

    // 開始解析
    skipWhitespaceAndComments()
    const result = parseValue()
    skipWhitespaceAndComments()

    if (pos < length) {
        throw new Error(`Unexpected content after JSON at position ${pos}`)
    }

    return result
}

/**
 * 主程式
 */
async function main() {
    print('\n🪄 Auto-Fixer: 正在檢查設定檔...', 'cyan')

    const configPath = path.join(projectRoot, 'site.config.json')

    // 檢查設定檔是否存在
    if (!fs.existsSync(configPath)) {
        print('   ⚠️ 找不到 site.config.json，跳過修復', 'yellow')
        return
    }

    // 讀取設定檔
    let content
    try {
        content = fs.readFileSync(configPath, 'utf-8')
    } catch (error) {
        print(`   ❌ 無法讀取設定檔: ${error.message}`, 'yellow')
        return
    }

    // 移除 BOM
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1)
        print('   🔧 移除了檔案開頭的 BOM 字元', 'magenta')
    }

    // 先嘗試標準 JSON 解析
    try {
        JSON.parse(content)
        print('   ✅ 設定檔格式正確，無需修復', 'green')
        return
    } catch (standardError) {
        // 標準解析失敗，嘗試寬鬆解析
        print('   🔍 發現格式問題，嘗試自動修復...', 'yellow')
    }

    // 使用寬鬆解析器
    let config
    try {
        config = parseJSON5(content)
    } catch (json5Error) {
        print(`   ❌ 無法自動修復: ${json5Error.message}`, 'yellow')
        print('   💡 請使用 Config Maker 重新生成設定', 'cyan')
        return
    }

    // 將修復後的內容寫回（標準 JSON 格式）
    try {
        const fixedContent = JSON.stringify(config, null, 2)
        fs.writeFileSync(configPath, fixedContent, 'utf-8')

        print('   ✅ 已自動修復設定檔！', 'green')
        print('   📝 修復內容：', 'cyan')
        print('      • 移除了尾隨逗號', 'magenta')
        print('      • 標準化了引號格式', 'magenta')
        print('      • 統一了格式縮排', 'magenta')
    } catch (writeError) {
        print(`   ❌ 無法寫入修復後的檔案: ${writeError.message}`, 'yellow')
    }

    print('', 'reset')
}

// 執行主程式
main().catch((error) => {
    print(`❌ 發生意外錯誤: ${error.message}`, 'yellow')
    // 不要因為自動修復失敗而中斷建置
    process.exit(0)
})
