<script setup>
import {computed, onMounted, ref} from 'vue'
import {RouterLink, useRoute} from 'vue-router'
import {usePortfolio} from '@/composables/usePortfolio'
import {useConfig} from '@/composables/useConfig'
import {getPlaceholderImage} from '@/utils/theme'

const route = useRoute()
const {getWorkBySlug, getWorkImages, getOtherWorks, navItems} = usePortfolio()
const {theme, content} = useConfig()

// Page load state
const isLoaded = ref(false)

// Get current work data
const currentWork = computed(() => getWorkBySlug(route.params.slug))
const workImages = computed(() => getWorkImages(route.params.slug))
const otherWorks = computed(() => getOtherWorks(route.params.slug, 3))

// Generate placeholder for missing images
const placeholderBg = computed(() => getPlaceholderImage(theme.backgroundColor, 400, 300))

// Navigation between works
const currentIndex = computed(() => {
  return navItems.value.findIndex(item => item.slug === route.params.slug)
})

const prevWork = computed(() => {
  if (currentIndex.value > 0) {
    return navItems.value[currentIndex.value - 1]
  }
  return null
})

const nextWork = computed(() => {
  if (currentIndex.value < navItems.value.length - 1) {
    return navItems.value[currentIndex.value + 1]
  }
  return null
})

// Handle image error - use placeholder
const handleImageError = (event) => {
  event.target.src = placeholderBg.value
  event.target.classList.add('placeholder-image')
}

// Trigger load animation
onMounted(() => {
  requestAnimationFrame(() => {
    isLoaded.value = true
  })
})
</script>

<template>
  <main class="min-h-screen">
    <!-- Work Not Found -->
    <div v-if="!currentWork" class="pt-28 sm:pt-32 md:pt-40 pb-12 md:pb-16 lg:pb-24">
      <div class="content-container text-center">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-light text-primary mb-4">
          {{ content.notFoundTitle || 'Work Not Found' }}
        </h1>
        <p class="text-muted mb-8 text-sm md:text-base">
          {{ content.notFoundMessage || 'The requested work could not be found.' }}
        </p>
        <RouterLink
            to="/"
            class="btn-primary"
        >
          {{ content.notFoundButtonText || 'Back to Home' }}
        </RouterLink>
      </div>
    </div>

    <!-- Work Detail -->
    <template v-else>
      <!-- Header Section -->
      <section class="pt-28 sm:pt-32 md:pt-40 pb-8 md:pb-12 lg:pb-16">
        <div class="content-container">
          <div class="max-w-3xl">
            <span
                class="text-[10px] md:text-xs tracking-[0.25em] text-muted uppercase block mb-2 md:mb-3"
                :class="{ 'animate-slide-up': isLoaded }"
            >
              {{ currentWork.order }}
            </span>
            <h1
                class="font-heading text-primary leading-tight text-balance"
                :class="{ 'animate-slide-up-delay-1': isLoaded }"
            >
              {{ currentWork.name }}
            </h1>
          </div>
        </div>
      </section>

      <!-- Cover Image -->
      <section v-if="currentWork.cover" class="pb-4 md:pb-6 lg:pb-8">
        <div class="content-container">
          <div
              class="w-full bg-background-alt relative rounded-lg overflow-hidden"
              :class="{ 'card-appear': isLoaded }"
          >
            <img
                v-if="currentWork.coverBg && currentWork.coverIsSvg"
                :src="currentWork.coverBg"
                class="w-full h-auto block z-0"
                alt="cover background"
                @error="handleImageError"
            />

            <iframe
                v-if="currentWork.coverIsSvg"
                :src="currentWork.cover"
                :title="`${currentWork.name} Cover`"
                class="absolute inset-0 w-full h-full border-0 z-10"
                scrolling="no"
            />

            <img
                v-else
                :src="currentWork.cover"
                :alt="`${currentWork.name} Cover`"
                class="w-full h-auto block relative z-20"
                @error="handleImageError"
            />
          </div>
        </div>
      </section>

      <!-- Work Images with TransitionGroup -->
      <section class="pb-12 md:pb-20 lg:pb-28">
        <div class="content-container">
          <TransitionGroup
              tag="div"
              class="space-y-3 md:space-y-5 lg:space-y-6"
              enter-active-class="transition-all duration-500"
              enter-from-class="opacity-0 translate-y-6"
              enter-to-class="opacity-100 translate-y-0"
          >
            <div
                v-for="(image, index) in workImages"
                :key="image.name"
                class="w-full overflow-hidden bg-background-alt rounded-lg"
                :style="{
                transitionDelay: `${index * 0.08}s`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
              }"
            >
              <!-- SVG uses iframe to preserve internal link interactions -->
              <iframe
                  v-if="image.isSvg"
                  :src="image.url"
                  :title="`${currentWork.name} - Image ${index + 1}`"
                  class="w-full border-0"
                  style="aspect-ratio: 4/3; min-height: 300px;"
                  scrolling="no"
              />
              <!-- Other image formats use img tag -->
              <img
                  v-else
                  :src="image.url"
                  :alt="`${currentWork.name} - Image ${index + 1}`"
                  class="w-full h-auto"
                  loading="lazy"
                  @error="handleImageError"
              />
            </div>
          </TransitionGroup>
        </div>
      </section>

      <!-- Work Navigation -->
      <section class="py-8 md:py-12 border-t border-primary/10">
        <div class="content-container">
          <div class="flex items-center justify-between">
            <!-- Previous Work -->
            <div class="flex-1">
              <RouterLink
                  v-if="prevWork"
                  :to="`/work/${prevWork.slug}`"
                  class="group inline-flex items-center gap-2 md:gap-4 text-muted
                       hover:text-primary active:text-primary/70 transition-colors duration-200
                       min-h-[44px] py-2"
              >
                <svg
                    class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
                    style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"/>
                </svg>
                <div>
                  <span class="text-[10px] md:text-xs tracking-[0.15em] uppercase block mb-0.5 md:mb-1">Previous</span>
                  <span class="text-xs md:text-sm hidden sm:block">{{ prevWork.name }}</span>
                </div>
              </RouterLink>
            </div>

            <!-- Back to All Works -->
            <RouterLink
                to="/#works"
                class="hidden md:flex items-center justify-center w-10 h-10 rounded-full
                     bg-primary/5 hover:bg-primary/10 active:bg-primary/15 text-muted hover:text-primary
                     transition-all duration-200"
                aria-label="All Works"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
              </svg>
            </RouterLink>

            <!-- Next Work -->
            <div class="flex-1 text-right">
              <RouterLink
                  v-if="nextWork"
                  :to="`/work/${nextWork.slug}`"
                  class="group inline-flex items-center gap-2 md:gap-4 text-muted
                       hover:text-primary active:text-primary/70 transition-colors duration-200
                       min-h-[44px] py-2"
              >
                <div>
                  <span class="text-[10px] md:text-xs tracking-[0.15em] uppercase block mb-0.5 md:mb-1">Next</span>
                  <span class="text-xs md:text-sm hidden sm:block">{{ nextWork.name }}</span>
                </div>
                <svg
                    class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/>
                </svg>
              </RouterLink>
            </div>
          </div>
        </div>
      </section>

      <!-- More Works Section -->
      <section v-if="otherWorks.length > 0" class="py-12 md:py-20 lg:py-24 bg-background-alt">
        <div class="content-container">
          <h2 class="text-[11px] md:text-xs tracking-[0.25em] uppercase text-muted mb-8 md:mb-12 lg:mb-16">
            {{ content.otherWorksTitle }}
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            <RouterLink
                v-for="work in otherWorks"
                :key="work.slug"
                :to="`/work/${work.slug}`"
                class="work-card group block"
            >
              <div class="relative aspect-[4/3] bg-background overflow-hidden mb-3 md:mb-4 rounded-lg">
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
    </template>
  </main>
</template>
