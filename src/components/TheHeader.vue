<script setup>
import {computed, nextTick, onMounted, onUnmounted, ref, watch} from 'vue'
import {RouterLink, useRoute} from 'vue-router'
import {usePortfolio} from '@/composables/usePortfolio'
import {useConfig} from '@/composables/useConfig'

const route = useRoute()
const {navItems} = usePortfolio()
const {profile} = useConfig()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const menuRef = ref(null)

// Throttled scroll handler for better performance
let scrollTimeout = null
const handleScroll = () => {
  if (scrollTimeout) return
  scrollTimeout = setTimeout(() => {
    isScrolled.value = window.scrollY > 50
    scrollTimeout = null
  }, 10)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value

  // Prevent body scroll when menu is open
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    // Focus trap - focus first menu item after animation
    nextTick(() => {
      const firstLink = menuRef.value?.querySelector('a')
      if (firstLink) firstLink.focus()
    })
  } else {
    document.body.style.overflow = ''
    document.body.style.touchAction = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
  document.body.style.touchAction = ''
}

// Close menu on route change
watch(() => route.path, () => {
  closeMobileMenu()
})

// Close menu on escape key
const handleKeydown = (e) => {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

// Get first name for mobile logo
const firstName = computed(() => {
  const parts = profile.name.split(' ')
  return parts[0] || profile.name
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, {passive: true})
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
  document.body.style.touchAction = ''
})
</script>

<template>
  <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 safe-area-inset"
      :class="[
      isScrolled || isMobileMenuOpen
        ? 'bg-background/90 backdrop-blur-xl py-3 md:py-4 shadow-sm'
        : 'bg-transparent py-5 md:py-6 lg:py-8'
    ]"
  >
    <nav class="content-container flex items-center justify-between">
      <!-- Logo / Home -->
      <RouterLink
          to="/"
          class="text-sm tracking-[0.15em] uppercase font-medium text-primary
               hover:text-primary/70 transition-all duration-300
               min-h-[44px] flex items-center z-50 relative"
          @click="closeMobileMenu"
      >
        {{ firstName }}
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10">
        <RouterLink
            to="/"
            class="nav-link"
            :class="{ 'active': route.path === '/' }"
        >
          Home
        </RouterLink>

        <RouterLink
            v-for="item in navItems"
            :key="item.slug"
            :to="`/work/${item.slug}`"
            class="nav-link"
            :class="{ 'active': route.params.slug === item.slug }"
        >
          {{ item.name }}
        </RouterLink>
      </div>

      <!-- Mobile Menu Button with Hamburger Animation -->
      <button
          class="md:hidden relative w-12 h-12 flex items-center justify-center -mr-2
               active:bg-primary/5 rounded-lg transition-colors duration-200
               z-50"
          :class="{ 'hamburger-active': isMobileMenuOpen }"
          @click="toggleMobileMenu"
          :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
      >
        <div class="flex flex-col justify-center items-center gap-[6px]">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </div>
      </button>
    </nav>

    <!-- Mobile Menu Overlay with Glassmorphism -->
    <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div
          v-if="isMobileMenuOpen"
          class="md:hidden fixed inset-0 top-0 z-40"
          @click.self="closeMobileMenu"
      >
        <!-- Backdrop with blur -->
        <div
            class="absolute inset-0 bg-text/10"
            style="backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);"
        ></div>

        <!-- Menu Panel -->
        <Transition
            enter-active-class="transition-transform duration-400"
            enter-from-class="-translate-y-full"
            enter-to-class="translate-y-0"
            leave-active-class="transition-transform duration-300"
            leave-from-class="translate-y-0"
            leave-to-class="-translate-y-full"
            appear
        >
          <div
              v-if="isMobileMenuOpen"
              id="mobile-menu"
              ref="menuRef"
              class="relative glass-strong pt-20 pb-10 px-4 min-h-[55vh] safe-area-inset"
              style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);"
          >
            <!-- Subtle bottom edge shadow -->
            <div
                class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>

            <div class="content-container flex flex-col gap-1">
              <!-- Home Link -->
              <RouterLink
                  to="/"
                  class="menu-item-stagger group flex items-center py-4 px-3 -mx-3 rounded-xl
                       active:bg-primary/10 transition-colors duration-200"
                  @click="closeMobileMenu"
              >
                <span class="text-[17px] tracking-wide text-primary font-medium
                             group-hover:translate-x-1 transition-transform duration-300"
                      style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);">
                  Home
                </span>
              </RouterLink>

              <!-- Divider -->
              <div class="h-px bg-primary/10 my-3"></div>

              <!-- Section Label -->
              <span class="menu-item-stagger text-[11px] tracking-[0.2em] uppercase text-muted/60 px-3 mb-2"
                    style="animation-delay: 0.08s;">
                Portfolio
              </span>

              <!-- Work Links with Staggered Animation -->
              <RouterLink
                  v-for="(item, index) in navItems"
                  :key="item.slug"
                  :to="`/work/${item.slug}`"
                  class="menu-item-stagger group flex items-center justify-between py-4 px-3 -mx-3 rounded-xl
                       active:bg-primary/10 transition-colors duration-200"
                  :style="{ animationDelay: `${(index + 3) * 0.03}s` }"
                  @click="closeMobileMenu"
              >
                <span class="text-[17px] tracking-wide text-primary
                             group-hover:translate-x-1 transition-transform duration-300"
                      style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);">
                  {{ item.name }}
                </span>
                <span class="text-[11px] text-muted/50 tracking-widest font-medium">
                  {{ item.order }}
                </span>
              </RouterLink>

              <!-- Contact Section -->
              <div class="mt-8 pt-6 border-t border-primary/10">
                <a
                    :href="`mailto:${profile.email}`"
                    class="menu-item-stagger flex items-center gap-3 py-4 px-3 -mx-3 rounded-xl
                         text-muted active:bg-primary/10 transition-colors duration-200"
                    :style="{ animationDelay: '0.3s' }"
                >
                  <!-- Email Icon -->
                  <div class="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                    <svg class="w-5 h-5 text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <span class="text-[11px] tracking-[0.15em] uppercase text-muted/50 block">Contact</span>
                    <span class="text-sm text-primary">{{ profile.email }}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </header>
</template>
