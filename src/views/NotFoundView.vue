<script setup>
/**
 * NotFoundView - 404 頁面
 *
 * 情感化的 404 頁面，根據職業顯示不同的文案和風格。
 * 這是為了讓使用者在找不到頁面時，也能感受到品牌的溫度。
 *
 * 特色：
 * - 根據職業顯示情感化文案
 * - 使用職業對應的 emoji
 * - 柔和的動畫效果
 * - 響應式設計
 */

import {computed} from 'vue'
import {useRouter} from 'vue-router'
import {useConfig} from '@/composables/useConfig'

const router = useRouter()
const {
  getNotFoundConfig,
  getBorderRadius,
  calcAnimationDuration,
  currentProfession,
  theme,
} = useConfig()

// 取得 404 配置
const notFoundConfig = computed(() => getNotFoundConfig())

// 計算動畫樣式
const animationStyle = computed(() => {
  const duration = calcAnimationDuration(600)
  return {
    '--animation-duration': `${duration}ms`,
    '--border-radius': getBorderRadius(),
  }
})

// 返回首頁
const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div
      class="not-found-page"
      :style="animationStyle"
  >
    <div class="not-found-container">
      <!-- Emoji / Icon -->
      <div class="not-found-emoji animate-bounce-gentle">
        {{ notFoundConfig.emoji }}
      </div>

      <!-- 標題 -->
      <h1 class="not-found-title">
        {{ notFoundConfig.title }}
      </h1>

      <!-- 訊息 -->
      <p class="not-found-message">
        {{ notFoundConfig.message }}
      </p>

      <!-- 返回首頁按鈕 -->
      <button
          class="not-found-button"
          @click="goHome"
      >
        {{ notFoundConfig.buttonText }}
      </button>

      <!-- 裝飾元素 -->
      <div class="decoration-wrapper">
        <div class="decoration decoration-1"></div>
        <div class="decoration decoration-2"></div>
        <div class="decoration decoration-3"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: rgb(var(--color-bg));
  position: relative;
  overflow: hidden;
}

.not-found-container {
  text-align: center;
  max-width: 32rem;
  position: relative;
  z-index: 10;
  animation: fadeInUp var(--animation-duration, 600ms) ease-out;
}

/* Emoji 樣式 */
.not-found-emoji {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 4px 12px rgb(var(--color-text) / 0.1));
}

/* 標題 */
.not-found-title {
  font-family: var(--font-heading, inherit);
  font-size: 2rem;
  font-weight: 600;
  color: rgb(var(--color-text));
  margin-bottom: 1rem;
  letter-spacing: var(--letter-spacing-tight, -0.02em);
}

/* 訊息 */
.not-found-message {
  font-size: 1.125rem;
  color: rgb(var(--color-muted));
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
}

/* 按鈕 */
.not-found-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--button-padding-y, 1rem) var(--button-padding-x, 2rem);
  background-color: rgb(var(--color-primary));
  color: rgb(var(--color-bg));
  font-weight: 500;
  border-radius: var(--border-radius, var(--button-radius, 8px));
  border: none;
  cursor: pointer;
  transition: all var(--transition-base, 300ms) ease;
  box-shadow: var(--shadow-base, 0 4px 12px rgb(var(--color-text) / 0.06));
}

.not-found-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md, 0 8px 24px rgb(var(--color-text) / 0.08));
  opacity: 0.9;
}

.not-found-button:active {
  transform: translateY(0);
}

/* 裝飾元素 */
.decoration-wrapper {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: -1;
}

.decoration {
  position: absolute;
  border-radius: 50%;
  opacity: 0.05;
  background-color: rgb(var(--color-primary));
}

.decoration-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: -100px;
  animation: float 8s ease-in-out infinite;
}

.decoration-2 {
  width: 200px;
  height: 200px;
  bottom: -50px;
  left: -50px;
  animation: float 6s ease-in-out infinite reverse;
}

.decoration-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 4s ease-in-out infinite;
}

/* 動畫 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.05;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.08;
  }
}

.animate-bounce-gentle {
  animation: bounceGentle 2s ease-in-out infinite;
}

@keyframes bounceGentle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 響應式調整 */
@media (max-width: 640px) {
  .not-found-emoji {
    font-size: 4rem;
  }

  .not-found-title {
    font-size: 1.5rem;
  }

  .not-found-message {
    font-size: 1rem;
  }
}
</style>
