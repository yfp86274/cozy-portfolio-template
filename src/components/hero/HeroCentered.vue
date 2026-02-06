<script setup>
/**
 * HeroCentered Component
 *
 * Centered layout hero section with large image and overlay text.
 * Best for: Visual portfolios, photography, art showcases
 *
 * 支援兩種模式：
 * - showTitleOnImage: true（預設）- 標題覆蓋在圖片上
 * - showTitleOnImage: false - 標題顯示在圖片下方，不遮擋圖片
 */

import {computed} from 'vue'
import {useConfig} from '@/composables/useConfig'
import {getPlaceholderImage} from '@/utils/theme'

const {content, profile, theme} = useConfig()

// Props from parent
const props = defineProps({
  heroImage: {
    type: String,
    required: true
  },
  isLoaded: {
    type: Boolean,
    default: false
  },
  showTitleOnImage: {
    type: Boolean,
    default: true
  }
})

// Emits
const emit = defineEmits(['scroll-to-works', 'image-error'])

// Generate placeholder for missing images
const placeholderBg = computed(() => getPlaceholderImage(theme.backgroundColor, 400, 300))

// Handle image error
const handleImageError = (event) => {
  emit('image-error', event)
}

// Smooth scroll to works section
const scrollToWorks = () => {
  emit('scroll-to-works')
}
</script>

<template>
  <section class="relative min-h-[100svh] flex items-center justify-center pt-20 md:pt-24 pb-8">
    <div class="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
      <!-- 模式一：標題覆蓋在圖片上（預設） -->
      <template v-if="showTitleOnImage">
        <div
            class="relative w-full bg-background-alt flex items-center justify-center rounded-theme overflow-hidden"
            :class="{ 'card-appear': isLoaded }"
        >
          <!-- Hero Image -->
          <img
              :src="heroImage"
              alt="Portfolio Hero"
              class="w-full h-auto max-h-[calc(100svh-8rem)] object-contain"
              @error="handleImageError"
          />

          <!-- Overlay Gradient for Text Readability - Enhanced for mobile -->
          <div class="absolute inset-0 hero-overlay pointer-events-none"></div>

          <!-- Text Overlay -->
          <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12">
            <span
                class="text-[10px] md:text-xs tracking-[0.25em] uppercase text-muted block mb-2"
                :class="{ 'animate-slide-up': isLoaded }"
            >
              {{ profile.role }}
            </span>
            <h1
                class="font-heading text-primary text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-4 text-balance"
                :class="{ 'animate-slide-up-delay-1': isLoaded }"
            >
              {{ content.heroTitle }}
            </h1>
          </div>

          <!-- View Portfolio Button -->
          <div :class="{ 'animate-slide-up-delay-2': isLoaded }">
            <button
                @click="scrollToWorks"
                class="absolute bottom-4 right-4 md:bottom-8 md:right-8 btn-primary text-[10px] md:text-xs"
            >
              {{ content.heroButtonText }}
            </button>
          </div>
        </div>
      </template>

      <!-- 模式二：標題顯示在圖片下方，不遮擋圖片 -->
      <template v-else>
        <div class="flex flex-col gap-6 md:gap-8">
          <!-- Hero Image（純淨，無覆蓋） -->
          <div
              class="relative w-full bg-background-alt flex items-center justify-center rounded-theme overflow-hidden"
              :class="{ 'card-appear': isLoaded }"
          >
            <img
                :src="heroImage"
                alt="Portfolio Hero"
                class="w-full h-auto max-h-[calc(100svh-16rem)] object-contain"
                @error="handleImageError"
            />
          </div>

          <!-- 標題區域（圖片下方） -->
          <div class="text-center px-4">
            <span
                class="text-[10px] md:text-xs tracking-[0.25em] uppercase text-muted block mb-2"
                :class="{ 'animate-slide-up': isLoaded }"
            >
              {{ profile.role }}
            </span>
            <h1
                class="font-heading text-primary text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-4 text-balance"
                :class="{ 'animate-slide-up-delay-1': isLoaded }"
            >
              {{ content.heroTitle }}
            </h1>
            <p
                v-if="content.heroSubtitle"
                class="text-muted text-sm md:text-base max-w-lg mx-auto mb-6"
                :class="{ 'animate-slide-up-delay-2': isLoaded }"
            >
              {{ content.heroSubtitle }}
            </p>
            <div :class="{ 'animate-slide-up-delay-2': isLoaded }">
              <button
                  @click="scrollToWorks"
                  class="btn-primary text-[10px] md:text-xs"
              >
                {{ content.heroButtonText }}
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
