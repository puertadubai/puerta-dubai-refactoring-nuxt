<template>
  <section
    id="golden-visa"
    ref="root"
    class="golden-visa-section"
  >
    <div class="gv-container">
      <div class="gv-text">
        <h2>
          The UAE Golden Visa<br />
          <span>Interactive Guide</span>
        </h2>

        <p>
          Discover our <strong>free, interactive guide</strong> to the UAE Golden Visa.
        </p>

        <button class="btn leadForm">Get Free Access</button>
      </div>

      <div class="gv-image">
        <img src="/img/mockup-guide.png" alt="Golden Visa Guide Preview" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initGoldenVisaAnimation } from '~/composables/animations/home/golden-visa'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value) return
  initGoldenVisaAnimation(root.value)
})
</script>
