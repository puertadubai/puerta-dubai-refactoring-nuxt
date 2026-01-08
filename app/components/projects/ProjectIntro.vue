<template>
  <section
    ref="root"
    class="project-intro"
  >
    <div class="container">
      <p class="intro-text">
        IR1DIAN Park is a contemporary residential development in the heart of
        Jumeirah Village Circle, Dubai, offering modern living with an urban design
        and family-friendly amenities. Nestled within a tree-lined and dynamic
        community, the project blends thoughtful architecture, high-quality finishes
        and accessible lifestyle to deliver a home that supports both everyday comfort
        and investment appeal.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initProjectIntroAnimation } from '~/composables/animations/projects/intro'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value) return
  initProjectIntroAnimation(root.value)
})
</script>
