import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(router)

// 處理 GitHub Pages 404 重定向
// 從 sessionStorage 恢復原始路徑
const redirect = sessionStorage.getItem('redirect')
if (redirect) {
    sessionStorage.removeItem('redirect')
    // 使用 router.replace 而不是直接修改 location
    router.isReady().then(() => {
        const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
        const targetPath = redirect.replace(basePath, '') || '/'
        router.replace(targetPath)
    })
}

app.mount('#app')
