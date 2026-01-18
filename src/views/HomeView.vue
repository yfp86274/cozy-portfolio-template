<script setup>
import {computed, onMounted, ref} from 'vue'
import {RouterLink} from 'vue-router'
import {usePortfolio} from '@/composables/usePortfolio'
import {useConfig} from '@/composables/useConfig'
import {getPlaceholderImage} from '@/utils/theme'

const {worksWithCovers, getOtherWorks} = usePortfolio()
const {ui, content, profile, theme, getGridClass, getAspectClass, isEnabled} = useConfig()

// Hero image handling with fallback
const heroImageError = ref(false)
const isLoaded = ref(false)
const heroImageModules = import.meta.glob('@/assets/hero.{png,jpg,jpeg,webp}', {eager: true, import: 'default'})
const heroImageUrl = Object.values(heroImageModules)[0] || null

// Get other works for the "Other Works" section
const otherWorks = computed(() => getOtherWorks('', 2))

// Get grid and aspect classes
const gridClass = getGridClass()
const aspectClass = getAspectClass()

// Generate placeholder for missing images
const placeholderBg = computed(() => getPlaceholderImage(theme.backgroundColor, 400, 300))

// Hero image with fallback to placeholder
const heroImage = computed(() => {
  if (heroImageError.value || !heroImageUrl) {
    return placeholderBg.value
  }
  return heroImageUrl
})

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

// Trigger load animation
onMounted(() => {
  requestAnimationFrame(() => {
    isLoaded.value = true
  })
})
</script>

<template>
  <main>
    <!-- ═══════════════════════════════════════════════════════════════════════
         HERO SECTION - Split Layout (heroStyle: 'split')
         ═══════════════════════════════════════════════════════════════════════ -->
    <section
        v-if="ui.heroStyle === 'split'"
        class="relative min-h-[100svh] flex items-center pt-20 md:pt-0"
    >
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

          <!-- Hero Image -->
          <div class="order-1 lg:order-2">
            <div
                class="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-square bg-background-alt overflow-hidden rounded-lg"
                :class="{ 'card-appear': isLoaded }"
            >
              <img
                  :src="heroImage"
                  alt="Portfolio Hero"
                  class="w-full h-full object-cover"
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

    <!-- ═══════════════════════════════════════════════════════════════════════
         HERO SECTION - Centered Layout (heroStyle: 'centered')
         ═══════════════════════════════════════════════════════════════════════ -->
    <section
        v-else-if="ui.heroStyle === 'centered'"
        class="relative min-h-[100svh] flex items-center justify-center pt-20 md:pt-24 pb-8"
    >
      <div class="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <div
            class="relative w-full bg-background-alt flex items-center justify-center rounded-lg overflow-hidden"
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
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         HERO SECTION - Minimal Layout (heroStyle: 'minimal')
         ═══════════════════════════════════════════════════════════════════════ -->
    <section
        v-else
        class="pt-28 sm:pt-32 md:pt-40 pb-12 md:pb-16 lg:pb-24"
    >
      <div class="content-container">
        <div class="max-w-3xl">
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
              class="text-muted text-base md:text-lg leading-relaxed text-pretty"
              :class="{ 'animate-slide-up-delay-2': isLoaded }"
          >
            {{ content.heroSubtitle }}
          </p>
        </div>
      </div>
    </section>

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
            <div :class="['relative bg-background-alt overflow-hidden mb-3 md:mb-4 rounded-lg', aspectClass]">
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
            <div class="relative aspect-[16/9] bg-background overflow-hidden mb-3 md:mb-4 rounded-lg">
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
