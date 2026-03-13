<template>
  <header
    id="hero"
    class="hero dark-bg"
    ref="root"
  >
    <!-- pattern / grain / overlay historique -->
    <div id="videopattern"></div>

    <!-- vidéo -->
    <video
      class="hero-video"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
    >
      <source src="/video/bg3.mp4" type="video/mp4" />
    </video>

    <div class="hero-overlay" aria-hidden="true"></div>

    <!-- contenu -->
    <div class="hero-content reveal">
      <h1 class="hero-title">
        <template v-for="(token, index) in heroTokens" :key="`${token.text}-${index}`">
          <span
            v-if="token.type === 'space'"
            class="hero-space"
            aria-hidden="true"
          >&nbsp;</span>
          <strong v-else-if="token.type === 'strong'" class="hero-word">
            <span
              v-for="(letter, letterIndex) in token.text.split('')"
              :key="`${token.text}-${letterIndex}`"
              class="hero-letter"
            >{{ letter }}</span>
          </strong>
          <span v-else class="hero-word">
            <span
              v-for="(letter, letterIndex) in token.text.split('')"
              :key="`${token.text}-${letterIndex}`"
              class="hero-letter"
            >{{ letter }}</span>
          </span>
        </template>
      </h1>

      <button class="btn leadForm">
        Get Early Access
      </button>

      <!-- indicateur scroll -->
      <div class="scroll-indicator"></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initHeroAnimation } from '~/composables/animations/home/hero'

const root = ref<HTMLElement | null>(null)
const heroTokens = [
  { type: 'word', text: 'Invest' },
  { type: 'space', text: ' ' },
  { type: 'word', text: 'in' },
  { type: 'space', text: ' ' },
  { type: 'word', text: 'the' },
  { type: 'space', text: ' ' },
  { type: 'strong', text: 'vision' },
  { type: 'space', text: ' ' },
  { type: 'word', text: 'of' },
  { type: 'space', text: ' ' },
  { type: 'word', text: 'UAE' }
] as const

onMounted(() => {
  if (!root.value) return
  initHeroAnimation(root.value)
})
</script>
