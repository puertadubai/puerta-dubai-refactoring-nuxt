<template>
  <section
    ref="root"
    class="project-investment"
  >
    <div class="container">
      <h2 class="investment-title">
        {{ project.investment.title }}
      </h2>

      <p class="investment-text">
        {{ project.investment.text }}
      </p>

      <a
        :href="project.investment.ctaLink || '#'"
        class="btn investment-cta"
      >
        {{ project.investment.ctaLabel || 'Book a call' }}
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initProjectInvestmentAnimation } from '~/composables/animations/projects/investment'

/* ======================
   Props
====================== */
defineProps<{
  project: {
    investment: {
      title: string
      text: string
      ctaLabel?: string
      ctaLink?: string
    }
  }
}>()

/* ======================
   GSAP
====================== */
const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value) return
  initProjectInvestmentAnimation(root.value)
})
</script>
