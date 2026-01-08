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

    <!-- contenu -->
    <div class="hero-content reveal">
      <h1 class="hero-title">
        Invest in the <strong>vision</strong> of UAE
      </h1>

      <button class="btn">
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

onMounted(() => {
  if (!root.value) return
  initHeroAnimation(root.value)
})
</script>
