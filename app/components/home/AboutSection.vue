<template>
  <section
    id="about-puerta"
    class="about-section"
    ref="root"
  > 
    <div class="about-container">
      <div class="about-content">
        <h2 class="about-title">
          What is <span>Puerta Dubai</span>?
        </h2>

        <p class="about-text">
          <strong>Puerta Dubai</strong> is a private gateway for global investors entering the UAE market.

        </p>

        <p class="about-text">
We provide direct access to prime real estate opportunities, combined with expert advisory, legal structuring, and execution.

        </p><p class="about-text">
        One platform. Complete access to the UAE.
</p>
        <div class="about-divider"></div>

        <div class="about-cta">
          <button class="btn leadForm">Join the Founding Circle</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { initAboutAnimation } from '~/composables/animations/home/about'

const root = ref<HTMLElement | null>(null)
let cleanupAnimation: (() => void) | undefined

onMounted(() => {
  if (!root.value) return
  cleanupAnimation = initAboutAnimation(root.value)
})

onBeforeUnmount(() => {
  cleanupAnimation?.()
})
</script>
