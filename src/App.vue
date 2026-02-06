<script setup>
/**
 * App.vue - 應用程式根組件
 *
 * 負責：
 * - 初始化主題（顏色、字體、SEO）
 * - 處理職業映射系統的主題套用
 * - 全域佈局結構
 */

import {onMounted} from 'vue'
import {RouterView} from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import {mergedConfig, useConfig} from '@/composables/useConfig'
import {initializeTheme} from '@/utils/theme'
import {resolveAssetPath} from '@/utils/assetPath'

// 取得配置（用於條件渲染）
const {ui, currentProfession} = useConfig()

// 應用程式掛載時初始化主題
onMounted(() => {
  // 使用合併後的配置初始化主題
  // mergedConfig 已經包含職業預設和用戶設定的合併結果
  initializeTheme(mergedConfig)

  // 設定 OG Image（自動處理 base URL）
  if (mergedConfig.seo?.ogImage) {
    let ogImage = document.querySelector('meta[property="og:image"]')
    if (!ogImage) {
      ogImage = document.createElement('meta')
      ogImage.setAttribute('property', 'og:image')
      document.head.appendChild(ogImage)
    }
    // 使用 resolveAssetPath 處理路徑，支援本地圖片和網路 URL
    const resolvedPath = resolveAssetPath(mergedConfig.seo.ogImage)
    // 對於 OG Image，需要完整的 URL
    if (resolvedPath && !resolvedPath.startsWith('http')) {
      // 本地路徑需要加上當前網域
      ogImage.content = window.location.origin + resolvedPath
    } else {
      ogImage.content = resolvedPath || ''
    }
  }

  // 設定 OG Title
  if (mergedConfig.seo?.siteTitle) {
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (!ogTitle) {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitle)
    }
    ogTitle.content = mergedConfig.seo.siteTitle
  }

  // 設定 OG Description
  if (mergedConfig.seo?.siteDescription) {
    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (!ogDesc) {
      ogDesc = document.createElement('meta')
      ogDesc.setAttribute('property', 'og:description')
      document.head.appendChild(ogDesc)
    }
    ogDesc.content = mergedConfig.seo.siteDescription
  }

  // 開發環境：顯示職業資訊
  if (import.meta.env.DEV && currentProfession.value.code) {
    console.log('👤 Profession applied:', currentProfession.value.label)
  }
})
</script>

<template>
  <div class="min-h-[100svh] flex flex-col bg-background text-text">
    <TheHeader/>

    <RouterView v-slot="{ Component, route }">
      <Transition
          mode="out-in"
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
      >
        <component
            :is="Component"
            :key="route.path"
            style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1)"
        />
      </Transition>
    </RouterView>

    <TheFooter v-if="ui.showFooter"/>
  </div>
</template>
