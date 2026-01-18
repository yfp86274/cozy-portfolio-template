<script setup>
/**
 * HeroSplit Component
 *
 * Split layout hero section with image on one side, text on the other.
 * Best for: Showcasing both visual work and personal branding
 */

import {computed} from 'vue'
import {useConfig} from '@/composables/useConfig'
import {getPlaceholderImage} from '@/utils/theme'
import SmartImage from '@/components/ui/SmartImage.vue'

const {content, profile, theme} = useConfig()

// Props from parent
defineProps({
  heroImage: {
    type: String,
    required: true
  },
  isLoaded: {
    type: Boolean,
    default: false
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
  <section class="relative min-h-[100svh] flex items-center pt-20 md:pt-0">
    <div class="content-container w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <!-- Text Content -->
        <div class="order-2 lg:order-1 py-6 md:py-8 lg:py-16">
                    <span
                        class="text-[11px] md:text-xs tracking-[0.25em] uppercase text-muted block mb-3 md:mb-4"
                        :class="{ 'animate-slide-up': isLoaded }"
                    >
                        {{ profile.role }}
                    </span>
          <h1
              class="font-heading text-primary mb-4 md:mb-6 text-balance"
              :class="{ 'animate-slide-up-delay-1': isLoaded }"
          >
            {{ content.heroTitle }}
          </h1>
          <p
              class="text-muted text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg text-pretty"
              :class="{ 'animate-slide-up-delay-2': isLoaded }"
          >
            {{ content.heroSubtitle }}
          </p>
          <div :class="{ 'animate-slide-up-delay-2': isLoaded }">
            <button
                @click="scrollToWorks"
                class="btn-primary"
            >
              {{ content.heroButtonText }}
            </button>
          </div>
        </div>

        <!-- Hero Image (使用 SmartImage 組件) -->
        <div class="order-1 lg:order-2">
          <div
              class="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-square overflow-hidden rounded-theme"
              :class="{ 'card-appear': isLoaded }"
          >
            <SmartImage
                :src="heroImage"
                alt="Portfolio Hero"
                class="w-full h-full object-cover"
                :lazy="false"
                :fade-in-duration="600"
                :placeholder-icon-size="64"
                @error="handleImageError"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator (mobile only) -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 lg:hidden">
      <button
          @click="scrollToWorks"
          class="flex flex-col items-center gap-2 text-muted/50 animate-pulse-soft"
          aria-label="Scroll to works"
      >
        <span class="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </button>
    </div>
  </section>
</template>
