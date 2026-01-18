<script setup>
/**
 * SectionWorks - 作品展示區塊
 *
 * 以格線方式展示主要作品集
 * 支援自訂欄位數和縮圖比例
 * 使用 SmartImage 組件實現職業感知佔位圖和漸進式載入
 */

import {RouterLink} from 'vue-router'
import {usePortfolio} from '@/composables/usePortfolio'
import {useConfig} from '@/composables/useConfig'
import SmartImage from '@/components/ui/SmartImage.vue'

// ═══════════════════════════════════════════════════════════════════════════
// Composables & Config
// ═══════════════════════════════════════════════════════════════════════════
const {worksWithCovers} = usePortfolio()
const {content, getGridClass, getAspectClass} = useConfig()

// ═══════════════════════════════════════════════════════════════════════════
// Computed
// ═══════════════════════════════════════════════════════════════════════════
const gridClass = getGridClass()
const aspectClass = getAspectClass()
</script>

<template>
  <section id="works" class="py-12 md:py-20 lg:py-28">
    <div class="content-container">
      <!-- Section Title -->
      <h2
          class="text-[11px] md:text-xs tracking-[0.25em] uppercase text-muted mb-8 md:mb-12 lg:mb-16"
      >
        {{ content.worksTitle }}
      </h2>

      <!-- Works Grid with TransitionGroup -->
      <TransitionGroup
          tag="div"
          :class="['grid grid-cols-1 gap-6 md:gap-8 lg:gap-10', gridClass]"
          enter-active-class="transition-all duration-500"
          enter-from-class="opacity-0 translate-y-6"
          enter-to-class="opacity-100 translate-y-0"
          move-class="transition-transform duration-500"
      >
        <RouterLink
            v-for="(work, index) in worksWithCovers"
            :key="work.slug"
            :to="`/work/${work.slug}`"
            class="work-card group block"
            :style="{
            transitionDelay: `${index * 0.08}s`,
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }"
        >
          <!-- Cover Image Container (使用 SmartImage 組件) -->
          <div
              :class="[
              'relative overflow-hidden mb-3 md:mb-4 rounded-theme card-shadow',
              aspectClass,
            ]"
          >
            <SmartImage
                :src="work.coverBg ? work.coverBg : work.cover"
                :alt="work.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                :lazy="true"
                :fade-in-duration="400"
                :placeholder-icon-size="40"
            />
          </div>

          <!-- Work Info -->
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
      </TransitionGroup>
    </div>
  </section>
</template>
