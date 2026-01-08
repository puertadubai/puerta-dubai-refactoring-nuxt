<template>
  <button
    id="backToTop"
    ref="btn"
    class="back-to-top"
    @click="scrollToTop"
    aria-label="Back to top"
  >
    ↑
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const btn = ref<HTMLElement | null>(null)

const toggleVisibility = () => {
  if (!btn.value) return
  if (window.scrollY > 400) {
    btn.value.classList.add('is-visible')
  } else {
    btn.value.classList.remove('is-visible')
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  if (!import.meta.client) return
  window.addEventListener('scroll', toggleVisibility, { passive: true })
  toggleVisibility() // état initial
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', toggleVisibility)
})
</script>
