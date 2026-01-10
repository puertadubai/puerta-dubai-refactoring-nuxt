<template>
  <section
    ref="root"
    class="project-intro"
  >
    <div class="container">
      <p class="intro-text">
        {{ project.intro }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initProjectIntroAnimation } from '~/composables/animations/projects/intro'
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
  initProjectIntroAnimation(root.value)
})
</script>
