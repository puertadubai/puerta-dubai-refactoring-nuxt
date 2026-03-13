<template>
  <section
    id="dayan"
    ref="root"
    class="founder-section"
  >
    <div class="content">
      <h1 class="founder-name">Dayan Candamil</h1>
      <h2 class="founder-role">Founder & Cultural Entrepreneur</h2>

      <p class="founder-text">
        With a background in law and visual merchandising, Dayan Candamil has built
        a career at the crossroads of <strong>art, culture, and business development</strong>.
      </p>

      <p class="founder-text">
        Recognized by international media such as CNN, Vogue, and Harper's Bazaar,
        Dayan continues to expand her entrepreneurial vision in the UAE.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { initFounderAnimation } from '~/composables/animations/home/founder'

const root = ref<HTMLElement | null>(null)
let cleanupAnimation: (() => void) | undefined

onMounted(() => {
  if (!root.value) return
  cleanupAnimation = initFounderAnimation(root.value)
})

onBeforeUnmount(() => {
  cleanupAnimation?.()
})
</script>
