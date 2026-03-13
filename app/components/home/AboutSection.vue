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
          <strong>Puerta Dubai</strong> is a next-generation platform shaping how global investors and residents engage with Dubai’s real estate ecosystem.
        </p>

        <p class="about-text">
          It’s more than listings, it’s a curated hub connecting you with verified developers, exclusive off-plan opportunities,
          and tailored legal and financial services.
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
import { ref, onMounted } from 'vue'
import { initAboutAnimation } from '~/composables/animations/home/about'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value) return
  initAboutAnimation(root.value)
})
</script>
