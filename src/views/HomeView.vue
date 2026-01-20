<script setup>
/**
 * HomeView - 首頁
 *
 * 使用動態佈局系統，根據 ui.layout 配置渲染不同的區塊組件。
 * 支援自訂區塊順序，讓用戶可以依需求調整頁面結構。
 *
 * 預設佈局：['Hero', 'Works', 'OtherWorks']
 *
 * 可用區塊：
 * - Hero: 主視覺區塊（標題、副標題、CTA）
 * - Works: 作品展示格線
 * - OtherWorks: 其他作品區塊
 * - About: 關於我（詳細自介）
 * - Contact: 聯絡資訊
 *
 * 使用方式：
 * 在 site.config.json 的 ui.layout 設定區塊順序：
 * "layout": ["Hero", "About", "Works", "Contact"]
 */

import {computed, defineAsyncComponent, markRaw} from 'vue'
import {useConfig} from '@/composables/useConfig'

// ═══════════════════════════════════════════════════════════════════════════
// 動態載入區塊組件
// 使用 defineAsyncComponent 進行懶載入，優化初始載入效能
// ═══════════════════════════════════════════════════════════════════════════

const sectionComponentMap = {
  Hero: markRaw(
      defineAsyncComponent(() => import('@/components/sections/SectionHero.vue'))
  ),
  Works: markRaw(
      defineAsyncComponent(() => import('@/components/sections/SectionWorks.vue'))
  ),
  OtherWorks: markRaw(
      defineAsyncComponent(() =>
          import('@/components/sections/SectionOtherWorks.vue')
      )
  ),
  About: markRaw(
      defineAsyncComponent(() => import('@/components/sections/SectionAbout.vue'))
  ),
  Contact: markRaw(
      defineAsyncComponent(() =>
          import('@/components/sections/SectionContact.vue')
      )
  ),
  // 預留未來擴展
  // Gallery: markRaw(
  //   defineAsyncComponent(() => import('@/components/sections/SectionGallery.vue'))
  // ),
  // Testimonials: markRaw(
  //   defineAsyncComponent(() => import('@/components/sections/SectionTestimonials.vue'))
  // ),
}

// 所有可用的區塊名稱
const AVAILABLE_SECTIONS = Object.keys(sectionComponentMap)

// 預設佈局（當用戶沒有設定 layout 時使用）
const DEFAULT_LAYOUT = ['Hero', 'Works', 'OtherWorks']

// ═══════════════════════════════════════════════════════════════════════════
// Composables
// ═══════════════════════════════════════════════════════════════════════════
const {getLayout, currentProfession, hasProfession} = useConfig()

// ═══════════════════════════════════════════════════════════════════════════
// 動態佈局計算
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 取得有效的佈局配置
 * 過濾掉不存在的區塊，並確保至少有一個區塊
 */
const validatedLayout = computed(() => {
  const layout = getLayout()

  // 如果沒有設定或為空陣列，使用預設佈局
  if (!layout || !Array.isArray(layout) || layout.length === 0) {
    return DEFAULT_LAYOUT
  }

  // 過濾掉不支援的區塊
  const validLayout = layout.filter((sectionName) => {
    const isValid = AVAILABLE_SECTIONS.includes(sectionName)
    if (!isValid && import.meta.env.DEV) {
      console.warn(
          `[HomeView] 未知的區塊名稱: "${sectionName}"，已略過。可用的區塊: ${AVAILABLE_SECTIONS.join(', ')}`
      )
    }
    return isValid
  })

  // 如果過濾後為空，返回預設佈局
  return validLayout.length > 0 ? validLayout : DEFAULT_LAYOUT
})

/**
 * 根據配置生成要渲染的區塊列表
 * 每個區塊包含：
 * - key: 唯一識別碼（用於 Vue 的 key）
 * - name: 區塊名稱
 * - component: Vue 組件
 */
const layoutSections = computed(() => {
  return validatedLayout.value
      .map((sectionName, index) => {
        const component = sectionComponentMap[sectionName]

        if (!component) {
          // 這理論上不應該發生（因為 validatedLayout 已經過濾過）
          return null
        }

        return {
          key: `${sectionName}-${index}`,
          name: sectionName,
          component,
        }
      })
      .filter(Boolean)
})

// ═══════════════════════════════════════════════════════════════════════════
// 開發模式調試資訊
// ═══════════════════════════════════════════════════════════════════════════
if (import.meta.env.DEV) {
  console.log('🏠 HomeView 初始化')
  console.log('📐 Layout:', validatedLayout.value)
  console.log('🧩 可用區塊:', AVAILABLE_SECTIONS)

  if (hasProfession()) {
    console.log('👤 職業:', currentProfession.value.label)
    console.log('🎨 職業預設:', currentProfession.value.config?.preset)
  }
}
</script>

<template>
  <main>
    <!--
      動態佈局渲染
      根據 ui.layout 配置的順序渲染區塊組件
      使用 Suspense 處理非同步組件的載入狀態
    -->
    <Suspense>
      <template #default>
        <template v-for="section in layoutSections" :key="section.key">
          <component :is="section.component"/>
        </template>
      </template>

      <template #fallback>
        <div class="min-h-screen flex items-center justify-center">
          <div class="text-center text-muted">
            <div class="animate-pulse">
              <div class="w-8 h-8 mx-auto mb-4 rounded-full bg-primary/20"></div>
              <p class="text-sm">載入中...</p>
            </div>
          </div>
        </div>
      </template>
    </Suspense>

    <!--
      如果沒有任何區塊（極端情況），顯示提示
      這通常只在配置完全錯誤時才會出現
    -->
    <div
        v-if="layoutSections.length === 0"
        class="min-h-screen flex items-center justify-center"
    >
      <div class="text-center text-muted max-w-md px-6">
        <div class="text-4xl mb-4">🏗️</div>
        <h2 class="text-lg font-medium mb-2">尚未設定頁面佈局</h2>
        <p class="text-sm mb-4">
          請在 site.config.json 的 ui.layout 中設定要顯示的區塊
        </p>
        <div class="text-left bg-background-alt rounded-lg p-4 text-xs font-mono">
          <p class="text-muted mb-2">// 範例設定：</p>
          <p>"ui": {</p>
          <p class="pl-4">"layout": ["Hero", "Works", "OtherWorks"]</p>
          <p>}</p>
        </div>
        <p class="text-xs mt-4 text-muted">
          可用區塊：{{ AVAILABLE_SECTIONS.join('、') }}
        </p>
      </div>
    </div>
  </main>
</template>
