<script setup>
/**
 * SectionAbout - 關於我區塊
 *
 * 展示創作者的詳細介紹，支援多段落文字
 * 可以包含大頭照和社群連結
 */

import {computed} from 'vue'
import {useConfig} from '@/composables/useConfig'

// ═══════════════════════════════════════════════════════════════════════════
// Composables & Config
// ═══════════════════════════════════════════════════════════════════════════
const {profile, content, isEnabled, getSocialLinks} = useConfig()

// ═══════════════════════════════════════════════════════════════════════════
// Computed
// ═══════════════════════════════════════════════════════════════════════════

// 關於我的內容（支援換行）
const aboutParagraphs = computed(() => {
  const text = content.aboutContent || profile.bio || ''
  // 將 \n\n 或連續換行分割成段落
  return text.split(/\n\n|\r\n\r\n/).filter(p => p.trim())
})

// 是否顯示社群連結
const showSocial = computed(() => {
  return isEnabled('showSocialLinks') && getSocialLinks().length > 0
})

// 社群連結
const socialLinks = computed(() => getSocialLinks())

// 社群圖標映射
const socialIcons = {
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
  twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>`,
  pinterest: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="17" y2="22"/><path d="M5.5 12.5c0-5 4-7 7-7s7 2 7 7-4 7-7 7-4.5-2-4.5-4 1.5-4 4-4 3 1 3 2.5-1 2.5-2.5 2.5-2-.5-2-2c0-2.5 3-4.5 3-7s-2-2.5-3-2.5-4.5 1-4.5 5"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>`,
  tiktok: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>`,
  behance: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6h8.5c2 0 4 1 4 3.5S11.5 13 9.5 13H1V6z"/><path d="M1 13h9c2 0 4 1 4 3.5s-2 3.5-4 3.5H1v-7z"/><path d="M15 8h7"/><path d="M18.5 18c2.5 0 4.5-2 4.5-4.5S21 9 18.5 9 14 11 14 13.5s2 4.5 4.5 4.5z"/></svg>`,
  dribbble: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"/></svg>`,
  etsy: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v18"/><path d="M8 3h9a3 3 0 0 1 0 6H8"/><path d="M8 9h8a3 3 0 0 1 0 6H8"/><path d="M8 15h9a3 3 0 0 1 0 6H8"/></svg>`,
}
</script>

<template>
  <section id="about" class="py-12 md:py-20 lg:py-28 bg-background-alt">
    <div class="content-container">
      <!-- Section Title -->
      <h2
          class="text-[11px] md:text-xs tracking-[0.25em] uppercase text-muted mb-8 md:mb-12 lg:mb-16"
      >
        {{ content.aboutTitle || '關於我' }}
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
        <!-- 左側：大頭照 -->
        <div class="lg:col-span-1">
          <div class="aspect-square rounded-theme overflow-hidden card-shadow">
            <img
                :src="profile.avatar || '/images/avatar.jpg'"
                :alt="profile.name"
                class="w-full h-full object-cover"
                loading="lazy"
            />
          </div>

          <!-- 社群連結 -->
          <div v-if="showSocial" class="mt-6 flex gap-4 justify-center lg:justify-start">
            <a
                v-for="link in socialLinks"
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted hover:text-primary transition-colors duration-300"
                :title="link.name"
                v-html="socialIcons[link.name] || ''"
            />
          </div>
        </div>

        <!-- 右側：介紹文字 -->
        <div class="lg:col-span-2">
          <h3 class="text-2xl md:text-3xl lg:text-4xl font-heading mb-6">
            {{ profile.name }}
          </h3>
          <p class="text-muted text-sm md:text-base mb-8">
            {{ profile.role }}
          </p>

          <div class="prose prose-lg max-w-none">
            <p
                v-for="(paragraph, index) in aboutParagraphs"
                :key="index"
                class="text-base md:text-lg leading-relaxed mb-4 last:mb-0"
            >
              {{ paragraph }}
            </p>

            <!-- 如果沒有內容，顯示預設文字 -->
            <p
                v-if="aboutParagraphs.length === 0"
                class="text-base md:text-lg leading-relaxed text-muted italic"
            >
              在 site.config.json 的 content.aboutContent 填寫您的自我介紹...
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
