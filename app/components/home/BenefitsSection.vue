<template>
  <section
    class="benefits zone"
    ref="root"
  >
    <article class="wrap">
      <h2 class="benefits-title">
        Why UAE – Key Advantages
      </h2>

      <div class="cards">
        <div class="card">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
          </svg>
          <h3>Stable Framework</h3>
          <p>Golden Visa, secure investment climate, strong infrastructure.</p>
        </div>

        <div class="card">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 17l6-6 4 4 8-8" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21H3" />
          </svg>
          <h3>Attractive Returns</h3>
          <p>High rental yields, tax efficiency, and global investor confidence.</p>
        </div>

        <div class="card">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />
          </svg>
          <h3>Global Connectivity</h3>
          <p>Hub for business, innovation, and international growth.</p>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initBenefitsAnimation } from '~/composables/animations/home/benefits'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value) return
  initBenefitsAnimation(root.value)
})
</script>

<style scoped>
.benefits {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  color: #fff;
  background: #000;
}

.benefits::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-color: #000;
  background-image:
    linear-gradient(120deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 48%),
    repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.03) 0,
      rgba(255, 255, 255, 0.03) 2px,
      transparent 2px,
      transparent 8px
    ),
    radial-gradient(circle at 16% 18%, rgba(191, 148, 89, 0.18) 0, rgba(191, 148, 89, 0) 42%);
}

.benefits :is(h2, h3, p, svg) {
  color: inherit;
}

.benefits svg {
  stroke: currentColor;
}

.wrap {
  position: relative;
  z-index: 1;
}

.card {
  border: 0;
  background: transparent;
  box-shadow: none;
  padding: 30px 18px;
}
</style>
