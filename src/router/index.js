import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DetailView from '@/views/DetailView.vue'

const router = createRouter({
    // 使用 import.meta.env.BASE_URL 來自動獲取 vite.config.js 中設置的 base
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/work/:slug',
            name: 'work-detail',
            component: DetailView,
            props: true
        },
        // 404 頁面重定向到首頁
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth'
            }
        } else {
            return {top: 0, behavior: 'smooth'}
        }
    }
})

export default router
