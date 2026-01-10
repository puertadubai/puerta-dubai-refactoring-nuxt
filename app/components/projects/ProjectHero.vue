<template>
  <section
    ref="root"
    class="project-hero"
  >
    <!-- Background image -->
    <img
      class="hero-bg-img"
      :src="project.hero.image"
      :alt="project.hero.title"
    />

    <!-- Overlay -->
    <div class="hero-overlay"></div>

    <!-- Content -->
    <div class="hero-content">
<h1>{{ project.hero.title }}</h1>
<p class="project-location">{{ project.hero.location }}</p>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initProjectHeroAnimation } from '~/composables/animations/projects/hero'
import type { Project } from '~/composables/useProject'

/* ======================
   Props
====================== */
defineProps<{
  project: Project
}>()

/* ======================
   GSAP
====================== */
const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value) return
  initProjectHeroAnimation(root.value)
})
</script>
