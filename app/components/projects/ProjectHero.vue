<template>
  <section
    ref="root"
    class="project-hero"
  >
    <!-- Background image -->
    <img
      class="hero-bg-img"
      :src="image"
      :alt="title"
    />

    <!-- Overlay -->
    <div class="hero-overlay"></div>

    <!-- Content -->
    <div class="hero-content">
      <h1>{{ title }}</h1>
      <p class="project-location">{{ location }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initProjectHeroAnimation } from '~/composables/animations/projects/hero'

/**
 * ⚠️ TEMPORAIRE
 * Plus tard, ces props viendront de Supabase via le slug
 */
const title = 'IR1DIAN PARK'
const location = 'Jumeirah Village Circle • Dubai'
const image = '/img/projects/ir1dian/2.webp'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value) return
  initProjectHeroAnimation(root.value)
})
</script>
