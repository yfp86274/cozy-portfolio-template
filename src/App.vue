<script setup>
import {onMounted} from 'vue'
import {RouterView} from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import {useConfig} from '@/composables/useConfig'
import {initializeTheme} from '@/utils/theme'
import siteConfig from '@/site.config.js'

// Get config for conditional rendering
const {ui} = useConfig()

// Initialize theme on app mount
onMounted(() => {
  // Initialize theme (colors, fonts, SEO)
  initializeTheme(siteConfig)

  // Set OG image if configured
  if (siteConfig.seo?.ogImage) {
    let ogImage = document.querySelector('meta[property="og:image"]')
    if (!ogImage) {
      ogImage = document.createElement('meta')
      ogImage.setAttribute('property', 'og:image')
      document.head.appendChild(ogImage)
    }
    ogImage.content = siteConfig.seo.ogImage
  }

  // Add OG title
  if (siteConfig.seo?.siteTitle) {
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (!ogTitle) {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitle)
    }
    ogTitle.content = siteConfig.seo.siteTitle
  }

  // Add OG description
  if (siteConfig.seo?.siteDescription) {
    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (!ogDesc) {
      ogDesc = document.createElement('meta')
      ogDesc.setAttribute('property', 'og:description')
      document.head.appendChild(ogDesc)
    }
    ogDesc.content = siteConfig.seo.siteDescription
  }
})
</script>

<template>
  <div class="min-h-[100svh] flex flex-col bg-background text-text">
    <TheHeader/>

    <RouterView v-slot="{ Component, route }">
      <Transition
          mode="out-in"
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
      >
        <component
            :is="Component"
            :key="route.path"
            style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);"
        />
      </Transition>
    </RouterView>

    <TheFooter v-if="ui.showFooter"/>
  </div>
</template>