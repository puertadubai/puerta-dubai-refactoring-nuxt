<template>
  <section
    ref="root"
    class="project-investment"
  >
    <div class="container">
      <h2 class="investment-title">Investment Proposition</h2>

      <p class="investment-text">
        With a launch price from AED 772,000 and completion expected in Q2 2027,
        IR1DIAN Park presents an attractive entry point into the JVC market.
        The combination of strong location, modern design and family-oriented
        amenities supports both rental demand and long-term value appreciation —
        making this an excellent option for end-users and investors alike.
      </p>

      <a href="#" class="btn investment-cta">
        Book a call
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initProjectInvestmentAnimation } from '~/composables/animations/projects/investment'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value) return
  initProjectInvestmentAnimation(root.value)
})
</script>
