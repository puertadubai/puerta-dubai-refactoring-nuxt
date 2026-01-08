<template>
  <div
    ref="root"
    id="preloader"
    class="preloader"
  >
    <div class="loader-content">
      <img
        src="/img/logo-txt-blanc.svg"
        alt="Puerta Dubai"
        class="loader-logo"
      />
      <div class="loader-line"></div>
    </div>

    <div class="loader-overlay top"></div>
    <div class="loader-overlay bottom"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initPreloaderAnimation } from '~/composables/animations/layout/preloader'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value) return

  // exactement comme avant : après le vrai load
  if (document.readyState === 'complete') {
    initPreloaderAnimation(root.value)
  } else {
    window.addEventListener(
      'load',
      () => {
        if (root.value) {
          initPreloaderAnimation(root.value)
        }
      },
      { once: true }
    )
  }
})
</script>
