<script setup>
/**
 * HomeView
 *
 * Main landing page with dynamic hero component and works grid.
 * Hero style is determined by ui.heroStyle in site.config.json
 */

import {computed, defineAsyncComponent, onMounted, ref} from 'vue'
import {RouterLink} from 'vue-router'
import {usePortfolio} from '@/composables/usePortfolio'
import {useConfig} from '@/composables/useConfig'
import {getPlaceholderImage} from '@/utils/theme'

// ═══════════════════════════════════════════════════════════════════════════
// Hero Components - Dynamically loaded based on config
// ═══════════════════════════════════════════════════════════════════════════
const HeroSplit = defineAsyncComponent(() => import('@/components/hero/HeroSplit.vue'))
const HeroCentered = defineAsyncComponent(() => import('@/components/hero/HeroCentered.vue'))
const HeroMinimal = defineAsyncComponent(() => import('@/components/hero/HeroMinimal.vue'))

// Hero component mapping
const heroComponentMap = {
  split: HeroSplit,
  centered: HeroCentered,
  minimal: HeroMinimal,
}

// ═══════════════════════════════════════════════════════════════════════════
// Composables & Config
// ═══════════════════════════════════════════════════════════════════════════
const {worksWithCovers, getOtherWorks} = usePortfolio()
const {ui, content, profile, theme, getGridClass, getAspectClass, isEnabled, getHeroStyle} = useConfig()

// ═══════════════════════════════════════════════════════════════════════════
// Computed Properties
// ═══════════════════════════════════════════════════════════════════════════

// Dynamic hero component based on config
const currentHeroComponent = computed(() => {
  const style = getHeroStyle()
  return heroComponentMap[style] || heroComponentMap.split
})

// Get other works for the "Other Works" section
const otherWorks = computed(() => getOtherWorks('', 2))

// Get grid and aspect classes
const gridClass = getGridClass()
const aspectClass = getAspectClass()

// Generate placeholder for missing images
const placeholderBg = computed(() => getPlaceholderImage(theme.backgroundColor, 400, 300))

// ═══════════════════════════════════════════════════════════════════════════
// Hero Image Handling
// ═══════════════════════════════════════════════════════════════════════════
const heroImageError = ref(false)
const isLoaded = ref(false)
const heroImageModules = import.meta.glob('@/assets/hero.{png,jpg,jpeg,webp}', {eager: true, import: 'default'})
const heroImageUrl = Object.values(heroImageModules)[0] || null

// Hero image with fallback to placeholder
const heroImage = computed(() => {
  if (heroImageError.value || !heroImageUrl) {
    return placeholderBg.value
  }
  return heroImageUrl
})

// ═══════════════════════════════════════════════════════════════════════════
// Event Handlers
// ═══════════════════════════════════════════════════════════════════════════

// Smooth scroll to works section
const scrollToWorks = () => {
  const worksSection = document.getElementById('works')
  if (worksSection) {
    worksSection.scrollIntoView({behavior: 'smooth'})
  }
}

// Handle image error - use placeholder
const handleImageError = (event) => {
  event.target.src = placeholderBg.value
  event.target.classList.add('placeholder-image')
}

// Handle hero image error
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
  <main>
    <!-- ═══════════════════════════════════════════════════════════════════════
         DYNAMIC HERO SECTION
         ═══════════════════════════════════════════════════════════════════════ -->
    <component
        :is="currentHeroComponent"
        :hero-image="heroImage"
        :is-loaded="isLoaded"
        @scroll-to-works="scrollToWorks"
        @image-error="handleHeroError"
    />

    <!-- ═══════════════════════════════════════════════════════════════════════
         WORKS GRID SECTION
         ═══════════════════════════════════════════════════════════════════════ -->
    <section id="works" class="py-12 md:py-20 lg:py-28">
      <div class="content-container">
        <!-- Section Title -->
        <h2 class="text-[11px] md:text-xs tracking-[0.25em] uppercase text-muted mb-8 md:mb-12 lg:mb-16">
          {{ content.worksTitle }}
        </h2>

        <!-- Works Grid with TransitionGroup for smooth loading -->
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
                            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                        }"
          >
            <!-- Cover Image Container -->
            <div
                :class="['relative bg-background-alt overflow-hidden mb-3 md:mb-4 rounded-theme card-shadow', aspectClass]">
              <img
                  :src="work.coverBg ? work.coverBg : work.cover"
                  :alt="work.name"
                  class="w-full h-full object-cover"
                  loading="lazy"
                  @error="handleImageError"
              />
            </div>

            <!-- Work Info -->
            <div class="space-y-0.5 md:space-y-1">
                            <span class="text-[10px] md:text-xs tracking-[0.15em] text-muted uppercase">
                                {{ work.order }}
                            </span>
              <h3 class="text-[15px] md:text-base lg:text-lg font-normal text-primary
                                       group-hover:text-primary/70 transition-colors duration-300">
                {{ work.name }}
              </h3>
            </div>
          </RouterLink>
        </TransitionGroup>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         OTHER WORKS SECTION
         ═══════════════════════════════════════════════════════════════════════ -->
    <section
        v-if="isEnabled('showOtherWorks') && otherWorks.length > 0"
        class="py-12 md:py-20 lg:py-28 bg-background-alt"
    >
      <div class="content-container">
        <h2 class="text-[11px] md:text-xs tracking-[0.25em] uppercase text-muted mb-8 md:mb-12 lg:mb-16">
          {{ content.otherWorksTitle }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <RouterLink
              v-for="work in otherWorks"
              :key="work.slug"
              :to="`/work/${work.slug}`"
              class="work-card group block"
          >
            <div class="relative aspect-[16/9] bg-background overflow-hidden mb-3 md:mb-4 rounded-theme card-shadow">
              <img
                  :src="work.cover"
                  :alt="work.name"
                  class="w-full h-full object-cover"
                  loading="lazy"
                  @error="handleImageError"
              />
            </div>

            <div class="space-y-0.5 md:space-y-1">
                            <span class="text-[10px] md:text-xs tracking-[0.15em] text-muted uppercase">
                                {{ work.order }}
                            </span>
              <h3 class="text-[15px] md:text-base lg:text-lg font-normal text-primary
                                       group-hover:text-primary/70 transition-colors duration-300">
                {{ work.name }}
              </h3>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>
