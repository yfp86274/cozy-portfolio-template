<script setup>
/**
 * HeroMinimal Component
 *
 * Minimal layout hero section with text only, no image.
 * Best for: Clean portfolios, text-focused presentations, professional services
 */

import {useConfig} from '@/composables/useConfig'

const {content, profile} = useConfig()

// Props from parent
defineProps({
  isLoaded: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <section class="pt-28 sm:pt-32 md:pt-40 pb-12 md:pb-16 lg:pb-24">
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
</template>
