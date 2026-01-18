<script setup>
/**
 * SectionHero - 首頁主視覺區塊
 *
 * 根據 ui.heroStyle 動態載入不同版型的 Hero 組件
 * 支援：split（左右分割）、centered（置中）、minimal（極簡）
 */

import {computed, defineAsyncComponent, onMounted, ref} from 'vue'
import {useConfig} from '@/composables/useConfig'
import {getPlaceholderImage} from '@/utils/theme'

// ═══════════════════════════════════════════════════════════════════════════
// Hero Components - 動態載入
// ═══════════════════════════════════════════════════════════════════════════
const HeroSplit = defineAsyncComponent(() => import('@/components/hero/HeroSplit.vue'))
const HeroCentered = defineAsyncComponent(() => import('@/components/hero/HeroCentered.vue'))
const HeroMinimal = defineAsyncComponent(() => import('@/components/hero/HeroMinimal.vue'))

// Hero 組件映射
const heroComponentMap = {
  split: HeroSplit,
  centered: HeroCentered,
  minimal: HeroMinimal,
}

// ═══════════════════════════════════════════════════════════════════════════
// Composables & Config
// ═══════════════════════════════════════════════════════════════════════════
const {theme, getHeroStyle} = useConfig()

// ═══════════════════════════════════════════════════════════════════════════
// Hero Image Handling
// ═══════════════════════════════════════════════════════════════════════════
const heroImageError = ref(false)
const isLoaded = ref(false)

// 動態載入 Hero 圖片
const heroImageModules = import.meta.glob('@/assets/hero.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})
const heroImageUrl = Object.values(heroImageModules)[0] || null

// 產生預設佔位圖
const placeholderBg = computed(() =>
    getPlaceholderImage(theme.backgroundColor, 400, 300)
)

// Hero 圖片（帶有備援）
const heroImage = computed(() => {
  if (heroImageError.value || !heroImageUrl) {
    return placeholderBg.value
  }
  return heroImageUrl
})

// 動態 Hero 組件
const currentHeroComponent = computed(() => {
  const style = getHeroStyle()
  return heroComponentMap[style] || heroComponentMap.split
})

// ═══════════════════════════════════════════════════════════════════════════
// Event Handlers
// ═══════════════════════════════════════════════════════════════════════════

// 平滑捲動到作品區
const scrollToWorks = () => {
  const worksSection = document.getElementById('works')
  if (worksSection) {
    worksSection.scrollIntoView({behavior: 'smooth'})
  }
}

// Hero 圖片載入錯誤
const handleHeroError = () => {
  heroImageError.value = true
}

// ═══════════════════════════════════════════════════════════════════════════
// Lifecycle
// ═══════════════════════════════════════════════════════════════════════════
onMounted(() => {
  requestAnimationFrame(() => {
    isLoaded.value = true
  })
})
</script>

<template>
  <component
      :is="currentHeroComponent"
      :hero-image="heroImage"
      :is-loaded="isLoaded"
      @scroll-to-works="scrollToWorks"
      @image-error="handleHeroError"
  />
</template>
