<template>
  <button
    id="backToTop"
    ref="btn"
    class="back-to-top"
    @click="scrollToTop"
    aria-label="Back to top"
  >
    <span class="back-to-top-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M12 18V6M12 6L6.75 11.25M12 6L17.25 11.25"
          stroke="currentColor"
          stroke-width="3.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 18V6M12 6L6.75 11.25M12 6L17.25 11.25"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
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
