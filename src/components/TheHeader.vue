<script setup>
import {computed, nextTick, onMounted, onUnmounted, ref, watch} from 'vue'
import {RouterLink, useRoute} from 'vue-router'
import {usePortfolio} from '@/composables/usePortfolio'
import {useConfig} from '@/composables/useConfig'

const route = useRoute()
const {navItems} = usePortfolio()
const {profile} = useConfig()

const isScrolled = ref(false)
const isSidebarOpen = ref(false)
const sidebarRef = ref(null)

// Throttled scroll handler
let scrollTimeout = null
const handleScroll = () => {
  if (scrollTimeout) return
  scrollTimeout = setTimeout(() => {
    isScrolled.value = window.scrollY > 50
    scrollTimeout = null
  }, 10)
}

const openSidebar = () => {
  isSidebarOpen.value = true
  document.body.style.overflow = 'hidden'
  document.body.style.touchAction = 'none'
  nextTick(() => {
    const firstLink = sidebarRef.value?.querySelector('a')
    if (firstLink) firstLink.focus()
  })
}

const closeSidebar = () => {
  isSidebarOpen.value = false
  document.body.style.overflow = ''
  document.body.style.touchAction = ''
}

const toggleSidebar = () => {
  isSidebarOpen.value ? closeSidebar() : openSidebar()
}

// Close sidebar on route change
watch(() => route.path, () => {
  closeSidebar()
})

// Close on escape key
const handleKeydown = (e) => {
  if (e.key === 'Escape' && isSidebarOpen.value) {
    closeSidebar()
  }
}

// Get first name for logo
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
      isScrolled
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
          @click="closeSidebar"
      >
        {{ firstName }}
      </RouterLink>

      <!-- Right side nav -->
      <div class="flex items-center gap-4 lg:gap-6">
        <!-- Home link (desktop only) -->
        <RouterLink
            to="/"
            class="hidden md:flex nav-link"
            :class="{ 'active': route.path === '/' }"
        >
          Home
        </RouterLink>

        <!-- Projects button — opens sidebar -->
        <button
            class="nav-link group cursor-pointer gap-2"
            :class="{ 'active': isSidebarOpen }"
            @click="toggleSidebar"
            :aria-label="isSidebarOpen ? 'Close projects menu' : 'Open projects menu'"
            :aria-expanded="isSidebarOpen"
            aria-controls="projects-sidebar"
        >
          <span>Projects</span>
          <svg
              class="w-3.5 h-3.5 transition-transform duration-300"
              :class="{ 'rotate-45': isSidebarOpen }"
              style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);"
              fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
        </button>
      </div>
    </nav>
  </header>

  <!-- Sidebar Overlay -->
  <Teleport to="body">
    <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div
          v-if="isSidebarOpen"
          class="fixed inset-0 z-[60]"
          @click.self="closeSidebar"
      >
        <!-- Backdrop -->
        <div
            class="absolute inset-0 bg-text/8"
            style="backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px);"
            @click="closeSidebar"
        ></div>

        <!-- Sidebar Panel (slides from right) -->
        <Transition
            enter-active-class="sidebar-slide-enter-active"
            enter-from-class="sidebar-slide-enter-from"
            enter-to-class="sidebar-slide-enter-to"
            leave-active-class="sidebar-slide-leave-active"
            leave-from-class="sidebar-slide-leave-from"
            leave-to-class="sidebar-slide-leave-to"
            appear
        >
          <aside
              v-if="isSidebarOpen"
              id="projects-sidebar"
              ref="sidebarRef"
              class="absolute top-0 right-0 h-full w-[340px] max-w-[85vw]
                     glass-strong border-l border-primary/[0.06]
                     flex flex-col overflow-hidden"
              @click.stop
          >
            <!-- Sidebar Header -->
            <div class="flex items-center justify-between px-7 pt-7 pb-4">
              <span class="text-[11px] tracking-[0.2em] uppercase text-muted/60 font-medium">
                Portfolio
              </span>
              <button
                  class="w-9 h-9 rounded-full flex items-center justify-center
                         text-muted/60 hover:text-primary hover:bg-primary/5
                         transition-all duration-200 -mr-1"
                  @click="closeSidebar"
                  aria-label="Close menu"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Divider -->
            <div class="h-px bg-primary/[0.06] mx-7"></div>

            <!-- Scrollable Projects List -->
            <div class="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-3 px-4">
              <!-- Home Link (mobile) -->
              <RouterLink
                  to="/"
                  class="sidebar-item md:hidden group flex items-center gap-3 py-3.5 px-3 rounded-xl
                         transition-all duration-200 hover:bg-primary/[0.04]"
                  :class="{ 'bg-primary/[0.06]': route.path === '/' }"
                  @click="closeSidebar"
              >
                <div class="w-8 h-8 rounded-lg bg-primary/[0.06] flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-primary/60" fill="none" stroke="currentColor" stroke-width="1.5"
                       viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                  </svg>
                </div>
                <span class="text-[15px] tracking-wide text-primary font-medium">Home</span>
              </RouterLink>

              <!-- Mobile divider -->
              <div class="md:hidden h-px bg-primary/[0.06] mx-3 my-2"></div>

              <!-- Work Items -->
              <RouterLink
                  v-for="(item, index) in navItems"
                  :key="item.slug"
                  :to="`/work/${item.slug}`"
                  class="sidebar-item group flex items-center gap-3 py-3.5 px-3 rounded-xl
                         transition-all duration-200 hover:bg-primary/[0.04]"
                  :class="{ 'bg-primary/[0.06]': route.params.slug === item.slug }"
                  :style="{ animationDelay: `${(index + 1) * 0.04}s` }"
                  @click="closeSidebar"
              >
                <!-- Cover Thumbnail -->
                <div class="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0
                            ring-1 ring-primary/[0.08] group-hover:ring-primary/[0.15]
                            transition-all duration-200">
                  <img
                      v-if="item.cover"
                      :src="item.cover"
                      :alt="item.name"
                      class="w-full h-full transition-transform duration-300 group-hover:scale-110"
                      :class="item.coverIsSvg ? 'object-contain p-1 bg-primary/[0.03]' : 'object-cover'"
                      loading="lazy"
                  />
                  <div v-else class="w-full h-full bg-primary/[0.04] flex items-center justify-center">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary/25"></span>
                  </div>
                </div>
                <!-- Name -->
                <span class="text-[15px] tracking-wide text-primary/80
                             group-hover:text-primary group-hover:translate-x-0.5
                             transition-all duration-300 truncate"
                      style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);">
                  {{ item.name }}
                </span>
                <!-- Active indicator -->
                <span
                    v-if="route.params.slug === item.slug"
                    class="ml-auto w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0"
                ></span>
              </RouterLink>
            </div>

            <!-- Sidebar Footer — Contact -->
            <div class="border-t border-primary/[0.06] px-7 py-5">
              <a
                  :href="`mailto:${profile.email}`"
                  class="flex items-center gap-3 text-muted hover:text-primary
                         transition-colors duration-200 group"
              >
                <div class="w-9 h-9 rounded-full bg-primary/[0.05] flex items-center justify-center
                            group-hover:bg-primary/[0.1] transition-colors duration-200">
                  <svg class="w-4 h-4 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div class="min-w-0">
                  <span class="text-[10px] tracking-[0.15em] uppercase text-muted/50 block">Contact</span>
                  <span class="text-sm text-primary truncate block">{{ profile.email }}</span>
                </div>
              </a>
            </div>
          </aside>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
