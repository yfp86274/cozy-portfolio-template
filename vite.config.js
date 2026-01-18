import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'node:url'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    // GitHub Pages 部署時需要設置 base 路徑
    // 如果部署到 https://<USERNAME>.github.io/<REPO>/，則設置為 '/<REPO>/'
    // 如果部署到 https://<USERNAME>.github.io/，則設置為 '/'
    base: process.env.NODE_ENV === 'production' ? '/independent_website_template/' : '/',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        // 優化構建輸出
        rollupOptions: {
            output: {
                manualChunks: {
                    'vue-vendor': ['vue', 'vue-router']
                }
            }
        }
    }
})
