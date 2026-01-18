<script setup>
/**
 * SectionOtherWorks - 其他作品區塊
 *
 * 展示次要作品，通常使用不同的版面配置
 * 可在 ui.showOtherWorks 中控制是否顯示
 */

import {computed} from 'vue'
import {RouterLink} from 'vue-router'
import {usePortfolio} from '@/composables/usePortfolio'
import {useConfig} from '@/composables/useConfig'
import {getPlaceholderImage} from '@/utils/theme'

// ═══════════════════════════════════════════════════════════════════════════
// Composables & Config
// ═══════════════════════════════════════════════════════════════════════════
const {getOtherWorks} = usePortfolio()
const {content, theme, isEnabled} = useConfig()

// ═══════════════════════════════════════════════════════════════════════════
// Computed
// ═══════════════════════════════════════════════════════════════════════════

// 取得其他作品（最多 2 個）
const otherWorks = computed(() => getOtherWorks('', 2))

// 是否顯示此區塊
const shouldShow = computed(() => {
  return isEnabled('showOtherWorks') && otherWorks.value.length > 0
})

// 預設佔位圖
const placeholderBg = computed(() =>
    getPlaceholderImage(theme.backgroundColor, 400, 300)
)

// ═══════════════════════════════════════════════════════════════════════════
// Event Handlers
// ═══════════════════════════════════════════════════════════════════════════

// 圖片載入錯誤處理
const handleImageError = (event) => {
  event.target.src = placeholderBg.value
  event.target.classList.add('placeholder-image')
}
</script>

<template>
  <section
      v-if="shouldShow"
      class="py-12 md:py-20 lg:py-28 bg-background-alt"
  >
    <div class="content-container">
      <h2
          class="text-[11px] md:text-xs tracking-[0.25em] uppercase text-muted mb-8 md:mb-12 lg:mb-16"
      >
        {{ content.otherWorksTitle }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
        <RouterLink
            v-for="work in otherWorks"
            :key="work.slug"
            :to="`/work/${work.slug}`"
            class="work-card group block"
        >
          <div
              class="relative aspect-[16/9] bg-background overflow-hidden mb-3 md:mb-4 rounded-theme card-shadow"
          >
            <img
                :src="work.cover"
                :alt="work.name"
                class="w-full h-full object-cover"
                loading="lazy"
                @error="handleImageError"
            />
          </div>

          <div class="space-y-0.5 md:space-y-1">
            <span
                class="text-[10px] md:text-xs tracking-[0.15em] text-muted uppercase"
            >
              {{ work.order }}
            </span>
            <h3
                class="text-[15px] md:text-base lg:text-lg font-normal text-primary group-hover:text-primary/70 transition-colors duration-300"
            >
              {{ work.name }}
            </h3>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
