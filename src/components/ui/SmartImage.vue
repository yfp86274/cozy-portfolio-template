<script setup>
/**
 * SmartImage Component - 智能圖片組件
 *
 * 🖼️ 功能特點：
 * - 自動 WebP 支援（如果構建環境支援）
 * - 職業感知佔位圖（根據用戶職業顯示對應 SVG）
 * - 漸進式載入與淡入效果
 * - 優雅的錯誤處理
 *
 * 使用方式：
 * <SmartImage src="/images/hero.jpg" alt="Hero" class="w-full h-full object-cover" />
 */

import {computed, onMounted, onUnmounted, ref} from 'vue'
import {useConfig} from '@/composables/useConfig'

// ═══════════════════════════════════════════════════════════════════════════
// Props & Emits
// ═══════════════════════════════════════════════════════════════════════════

const props = defineProps({
  /** 圖片來源 URL */
  src: {
    type: String,
    required: true,
  },
  /** 圖片替代文字 */
  alt: {
    type: String,
    default: '',
  },
  /** 是否啟用懶載入 */
  lazy: {
    type: Boolean,
    default: true,
  },
  /** 淡入動畫持續時間（毫秒） */
  fadeInDuration: {
    type: Number,
    default: 500,
  },
  /** 自訂佔位圖背景色 */
  placeholderBg: {
    type: String,
    default: null,
  },
  /** 自訂佔位圖尺寸 */
  placeholderIconSize: {
    type: [Number, String],
    default: 48,
  },
  /** 強制顯示特定職業的佔位圖 */
  forceProfession: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['load', 'error'])

// ═══════════════════════════════════════════════════════════════════════════
// Composables & State
// ═══════════════════════════════════════════════════════════════════════════

const {currentProfession, theme} = useConfig()

// 圖片載入狀態
const isLoading = ref(true)
const hasError = ref(false)
const isVisible = ref(false)
const imageRef = ref(null)
const containerRef = ref(null)

// Intersection Observer 用於懶載入
let observer = null

// ═══════════════════════════════════════════════════════════════════════════
// 職業 SVG 映射
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 職業對應的 SVG 佔位圖
 * 每個 SVG 都是簡約風格，適合作為載入中/錯誤時的佔位圖
 */
const professionSvgMap = {
  // 🍳 餐飲類
  chef: {
    viewBox: '0 0 64 64',
    paths: `
      <path d="M32 8c-4 0-7.5 2-9.5 5-2.5-1.5-5.5-1.5-8 0-3.5 2.5-4 7-1.5 10.5 1.5 2 3.5 3 6 3v25c0 2.5 2 4.5 4.5 4.5h17c2.5 0 4.5-2 4.5-4.5v-25c2.5 0 4.5-1 6-3 2.5-3.5 2-8-1.5-10.5-2.5-1.5-5.5-1.5-8 0-2-3-5.5-5-9.5-5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="28" y1="30" x2="28" y2="48" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="36" y1="30" x2="36" y2="48" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    `,
    label: '廚師帽',
  },
  baker: {
    viewBox: '0 0 64 64',
    paths: `
      <circle cx="32" cy="32" r="18" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M22 32c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="26" cy="36" r="2" fill="currentColor"/>
      <circle cx="38" cy="36" r="2" fill="currentColor"/>
      <path d="M28 42c2 2 6 2 8 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    `,
    label: '笑臉蛋糕',
  },
  barista: {
    viewBox: '0 0 64 64',
    paths: `
      <path d="M18 20h24v28c0 4-4 8-12 8s-12-4-12-8V20z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M42 24h6c3 0 6 3 6 6s-3 6-6 6h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M24 28c2 4 8 6 12 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="12" x2="22" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="30" y1="10" x2="30" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="38" y1="12" x2="38" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    `,
    label: '咖啡杯',
  },

  // 🧶 手作類
  knitter: {
    viewBox: '0 0 64 64',
    paths: `
      <circle cx="32" cy="32" r="16" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M32 16c0 8-8 12-8 16s8 8 8 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M32 16c0 8 8 12 8 16s-8 8-8 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="20" y1="54" x2="12" y2="58" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="44" y1="54" x2="52" y2="58" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    `,
    label: '毛線球',
  },
  potter: {
    viewBox: '0 0 64 64',
    paths: `
      <path d="M20 48c0-4 5.5-8 12-8s12 4 12 8" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M22 48v-20c0-6 4.5-12 10-12s10 6 10 12v20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="32" cy="48" rx="12" ry="4" fill="none" stroke="currentColor" stroke-width="2"/>
    `,
    label: '陶罐',
  },
  jeweler: {
    viewBox: '0 0 64 64',
    paths: `
      <polygon points="32,12 44,28 40,48 24,48 20,28" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <line x1="20" y1="28" x2="44" y2="28" stroke="currentColor" stroke-width="2"/>
      <line x1="32" y1="12" x2="26" y2="28" stroke="currentColor" stroke-width="2"/>
      <line x1="32" y1="12" x2="38" y2="28" stroke="currentColor" stroke-width="2"/>
      <line x1="26" y1="28" x2="32" y2="48" stroke="currentColor" stroke-width="2"/>
      <line x1="38" y1="28" x2="32" y2="48" stroke="currentColor" stroke-width="2"/>
    `,
    label: '鑽石',
  },
  leatherworker: {
    viewBox: '0 0 64 64',
    paths: `
      <rect x="16" y="20" width="32" height="28" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M24 20v-4c0-2 2-4 8-4s8 2 8 4v4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="32" x2="48" y2="32" stroke="currentColor" stroke-width="2"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
    `,
    label: '皮包',
  },
  woodworker: {
    viewBox: '0 0 64 64',
    paths: `
      <rect x="12" y="24" width="40" height="24" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="20" y1="24" x2="20" y2="48" stroke="currentColor" stroke-width="1.5"/>
      <line x1="28" y1="24" x2="28" y2="48" stroke="currentColor" stroke-width="1.5"/>
      <line x1="36" y1="24" x2="36" y2="48" stroke="currentColor" stroke-width="1.5"/>
      <line x1="44" y1="24" x2="44" y2="48" stroke="currentColor" stroke-width="1.5"/>
      <ellipse cx="32" cy="36" rx="4" ry="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
    `,
    label: '木板',
  },

  // 🎨 藝術類
  artist: {
    viewBox: '0 0 64 64',
    paths: `
      <ellipse cx="32" cy="32" rx="18" ry="14" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="22" cy="28" r="3" fill="currentColor"/>
      <circle cx="28" cy="36" r="2.5" fill="currentColor"/>
      <circle cx="38" cy="28" r="2" fill="currentColor"/>
      <circle cx="40" cy="36" r="2.5" fill="currentColor"/>
      <ellipse cx="44" cy="26" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="2"/>
    `,
    label: '調色盤',
  },
  illustrator: {
    viewBox: '0 0 64 64',
    paths: `
      <path d="M16 48L44 12l4 4-28 36-8 4 4-8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <line x1="40" y1="16" x2="44" y2="20" stroke="currentColor" stroke-width="2"/>
      <line x1="20" y1="44" x2="16" y2="48" stroke="currentColor" stroke-width="2"/>
    `,
    label: '鉛筆',
  },
  photographer: {
    viewBox: '0 0 64 64',
    paths: `
      <rect x="12" y="20" width="40" height="28" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="32" cy="34" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="32" cy="34" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="24" y="14" width="16" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="46" cy="26" r="2" fill="currentColor"/>
    `,
    label: '相機',
  },
  designer: {
    viewBox: '0 0 64 64',
    paths: `
      <rect x="12" y="16" width="40" height="32" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="12" y1="24" x2="52" y2="24" stroke="currentColor" stroke-width="2"/>
      <circle cx="18" cy="20" r="1.5" fill="currentColor"/>
      <circle cx="24" cy="20" r="1.5" fill="currentColor"/>
      <circle cx="30" cy="20" r="1.5" fill="currentColor"/>
      <rect x="18" y="30" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <rect x="34" y="30" width="12" height="5" fill="currentColor" opacity="0.3"/>
      <rect x="34" y="37" width="12" height="5" fill="currentColor" opacity="0.3"/>
    `,
    label: '螢幕',
  },

  // 🌸 花藝 / 自然類
  florist: {
    viewBox: '0 0 64 64',
    paths: `
      <circle cx="32" cy="24" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="24" cy="30" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="40" cy="30" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="26" cy="38" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="38" cy="38" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.5"/>
      <line x1="32" y1="40" x2="32" y2="56" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M28 48c-4-2-6 2-4 4" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <path d="M36 50c4-2 6 2 4 4" fill="none" stroke="currentColor" stroke-width="1.5"/>
    `,
    label: '花朵',
  },
  gardener: {
    viewBox: '0 0 64 64',
    paths: `
      <path d="M32 56V32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M32 32c-8-4-12 4-8 8" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M32 28c8-4 12 4 8 8" fill="none" stroke="currentColor" stroke-width="2"/>
      <ellipse cx="32" cy="16" rx="10" ry="8" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="28" y1="12" x2="28" y2="20" stroke="currentColor" stroke-width="1.5"/>
      <line x1="36" y1="12" x2="36" y2="20" stroke="currentColor" stroke-width="1.5"/>
    `,
    label: '樹葉',
  },

  // 💆 療癒 / 服務類
  therapist: {
    viewBox: '0 0 64 64',
    paths: `
      <path d="M32 52c12 0 18-8 18-18 0-12-8-22-18-22S14 22 14 34c0 10 6 18 18 18z" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M24 30c0-2 1.5-4 4-4s4 2 4 4-1.5 2-4 2-4 0-4-2z" fill="currentColor" opacity="0.5"/>
      <path d="M32 30c0-2 1.5-4 4-4s4 2 4 4-1.5 2-4 2-4 0-4-2z" fill="currentColor" opacity="0.5"/>
      <path d="M26 40c3 4 9 4 12 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    `,
    label: '愛心',
  },
  yoga: {
    viewBox: '0 0 64 64',
    paths: `
      <circle cx="32" cy="16" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M32 22v14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M32 36l-12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M32 36l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M18 30l14 6 14-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `,
    label: '瑜伽',
  },

  // 🏠 建築 / 空間類
  architect: {
    viewBox: '0 0 64 64',
    paths: `
      <polygon points="32,8 52,24 52,52 12,52 12,24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <rect x="26" y="36" width="12" height="16" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="18" y="28" width="8" height="8" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="38" y="28" width="8" height="8" fill="none" stroke="currentColor" stroke-width="2"/>
    `,
    label: '房屋',
  },
  interior: {
    viewBox: '0 0 64 64',
    paths: `
      <rect x="16" y="28" width="32" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M20 48v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M44 48v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M16 36h32" stroke="currentColor" stroke-width="1.5"/>
      <rect x="24" y="12" width="16" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="32" y1="12" x2="32" y2="24" stroke="currentColor" stroke-width="1.5"/>
      <line x1="24" y1="18" x2="40" y2="18" stroke="currentColor" stroke-width="1.5"/>
    `,
    label: '沙發',
  },

  // 🎵 音樂類
  musician: {
    viewBox: '0 0 64 64',
    paths: `
      <ellipse cx="22" cy="48" rx="8" ry="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <ellipse cx="46" cy="44" rx="8" ry="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="30" y1="48" x2="30" y2="16" stroke="currentColor" stroke-width="2"/>
      <line x1="54" y1="44" x2="54" y2="12" stroke="currentColor" stroke-width="2"/>
      <path d="M30 16c0-2 12-6 24-4v8c-12-2-24 2-24 4" fill="none" stroke="currentColor" stroke-width="2"/>
    `,
    label: '音符',
  },

  // 📝 文字 / 教育類
  writer: {
    viewBox: '0 0 64 64',
    paths: `
      <rect x="16" y="12" width="32" height="40" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="22" y1="20" x2="42" y2="20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="28" x2="42" y2="28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="36" x2="36" y2="36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="44" x2="30" y2="44" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    `,
    label: '書本',
  },
  teacher: {
    viewBox: '0 0 64 64',
    paths: `
      <rect x="12" y="16" width="40" height="28" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="12" y1="44" x2="8" y2="52" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="52" y1="44" x2="56" y2="52" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="20" y1="24" x2="44" y2="24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="20" y1="30" x2="40" y2="30" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="20" y1="36" x2="32" y2="36" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    `,
    label: '黑板',
  },
}

// 預設 SVG（愛心/笑臉）
const defaultSvg = {
  viewBox: '0 0 64 64',
  paths: `
    <path d="M32 52c-1.5 0-3-0.5-4-1.5L14 38c-5-5-5-13 0-18s13-5 18 0c5-5 13-5 18 0s5 13 0 18L36 50.5c-1 1-2.5 1.5-4 1.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  `,
  label: '愛心',
}

// ═══════════════════════════════════════════════════════════════════════════
// Computed
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 取得當前職業代碼
 */
const professionCode = computed(() => {
  return props.forceProfession || currentProfession.value?.code || null
})

/**
 * 取得對應的 SVG 配置
 */
const placeholderSvg = computed(() => {
  const code = professionCode.value
  if (code && professionSvgMap[code]) {
    return professionSvgMap[code]
  }
  return defaultSvg
})

/**
 * 佔位圖背景色
 */
const bgColor = computed(() => {
  return props.placeholderBg || theme.backgroundColor || '#f5f5f5'
})

/**
 * 佔位圖圖標顏色（根據背景色計算對比色）
 */
const iconColor = computed(() => {
  return theme.mutedColor || '#9ca3af'
})

/**
 * 圖標尺寸
 */
const iconSize = computed(() => {
  const size = props.placeholderIconSize
  return typeof size === 'number' ? `${size}px` : size
})

/**
 * 淡入動畫樣式
 */
const fadeStyle = computed(() => ({
  transitionDuration: `${props.fadeInDuration}ms`,
}))

/**
 * 圖片實際來源（支援 WebP 自動偵測）
 */
const imageSrc = computed(() => {
  // 如果是外部 URL 或已經是 WebP，直接返回
  if (
      props.src.startsWith('http') ||
      props.src.startsWith('data:') ||
      props.src.endsWith('.webp')
  ) {
    return props.src
  }

  // 在 production 環境中，Vite 可能已經優化為 WebP
  // 這裡保持原始路徑，讓 Vite 處理
  return props.src
})

// ═══════════════════════════════════════════════════════════════════════════
// Methods
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 圖片載入完成處理
 */
const handleLoad = () => {
  isLoading.value = false
  hasError.value = false
  emit('load')
}

/**
 * 圖片載入錯誤處理
 */
const handleError = (event) => {
  isLoading.value = false
  hasError.value = true
  emit('error', event)
}

/**
 * 開始載入圖片
 */
const startLoading = () => {
  isVisible.value = true
}

// ═══════════════════════════════════════════════════════════════════════════
// Lifecycle
// ═══════════════════════════════════════════════════════════════════════════

onMounted(() => {
  if (props.lazy && 'IntersectionObserver' in window) {
    // 使用 Intersection Observer 實現懶載入
    observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startLoading()
              observer?.unobserve(entry.target)
            }
          })
        },
        {
          rootMargin: '50px',
          threshold: 0.01,
        }
    )

    if (containerRef.value) {
      observer.observe(containerRef.value)
    }
  } else {
    // 不支援 Intersection Observer 或禁用懶載入
    startLoading()
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<template>
  <div
      ref="containerRef"
      class="smart-image relative overflow-hidden"
      :style="{ backgroundColor: bgColor }"
  >
    <!-- 佔位圖層（載入中或錯誤時顯示） -->
    <Transition name="placeholder-fade">
      <div
          v-if="isLoading || hasError"
          class="absolute inset-0 flex items-center justify-center"
          :style="{ backgroundColor: bgColor }"
      >
        <!-- 職業感知 SVG 佔位圖 -->
        <svg
            :viewBox="placeholderSvg.viewBox"
            :width="iconSize"
            :height="iconSize"
            :style="{ color: iconColor }"
            class="placeholder-icon transition-transform duration-700"
            :class="{ 'animate-pulse-soft': isLoading, 'opacity-50': hasError }"
            :aria-label="placeholderSvg.label"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <g v-html="placeholderSvg.paths"></g>
        </svg>
      </div>
    </Transition>

    <!-- 實際圖片 -->
    <img
        v-if="isVisible"
        ref="imageRef"
        :src="imageSrc"
        :alt="alt"
        :loading="lazy ? 'lazy' : 'eager'"
        class="smart-image__img w-full h-full transition-opacity ease-out"
        :class="{
        'opacity-0': isLoading || hasError,
        'opacity-100': !isLoading && !hasError,
      }"
        :style="fadeStyle"
        @load="handleLoad"
        @error="handleError"
    />
  </div>
</template>

<style scoped>
.smart-image {
  /* 確保圖片容器有正確的佈局 */
  display: block;
  position: relative;
}

.smart-image__img {
  display: block;
  object-fit: cover;
}

/* 佔位圖淡出動畫 */
.placeholder-fade-enter-active,
.placeholder-fade-leave-active {
  transition: opacity 0.4s ease;
}

.placeholder-fade-enter-from,
.placeholder-fade-leave-to {
  opacity: 0;
}

/* 柔和的脈動動畫 */
.animate-pulse-soft {
  animation: pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-soft {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.98);
  }
}
</style>
