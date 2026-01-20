import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'node:url'
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // 圖片自動化壓縮優化
        ViteImageOptimizer({
            // 測試模式：設為 true 可以在 dev 環境測試壓縮效果
            test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
            // 包含 public 目錄中的圖片
            includePublic: true,
            // 記錄優化結果
            logStats: true,
            // JPEG 優化設定
            jpeg: {
                quality: 80,        // 80% 品質，平衡大小與清晰度
                progressive: true,  // 漸進式載入
                mozjpeg: true,      // 使用 MozJPEG 編碼器
            },
            // PNG 優化設定
            png: {
                quality: 80,
                compressionLevel: 9,  // 最高壓縮等級
                palette: true,        // 啟用調色盤量化
            },
            // WebP 轉換設定
            webp: {
                quality: 82,          // WebP 品質
                alphaQuality: 85,     // Alpha 通道品質
                lossless: false,      // 使用有損壓縮以獲得更小體積
                nearLossless: true,   // 接近無損的視覺效果
                smartSubsample: true, // 智能色度子採樣
            },
            // GIF 優化設定
            gif: {
                optimizationLevel: 3, // 最高優化等級
            },
            // SVG 優化設定
            svg: {
                multipass: true,      // 多次優化
                plugins: [
                    {
                        name: 'preset-default',
                        params: {
                            overrides: {
                                removeViewBox: false,  // 保留 viewBox
                                removeEmptyAttrs: true,
                                removeMetadata: true,
                                removeComments: true,
                                cleanupIds: true,
                            },
                        },
                    },
                ],
            },
            // AVIF 優化設定（下一代格式）
            avif: {
                quality: 75,
                lossless: false,
                speed: 4,
            },
            // TIFF 優化設定
            tiff: {
                quality: 80,
                compression: 'lzw',
            },
        }),
    ],
    // GitHub Pages 部署時需要設置 base 路徑
    // 如果部署到 https://<USERNAME>.github.io/<REPO>/，則設置為 '/<REPO>/'
    // 如果部署到 https://<USERNAME>.github.io/，則設置為 '/'
    base: process.env.NODE_ENV === 'production' ? '/cozy-portfolio-template/' : '/',
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
