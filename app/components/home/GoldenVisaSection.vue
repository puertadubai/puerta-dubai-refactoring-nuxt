<template>
  <section
    id="golden-visa"
    ref="root"
    class="golden-visa-section"
  >
    <div class="gv-container">
      <div class="gv-text">
        <p class="gv-eyebrow">Residency Guide</p>
        <h2>
          The UAE Golden Visa<br />
          <span>Interactive Guide</span>
        </h2>

        <p>
          Discover our <strong>free, interactive guide</strong> to the UAE Golden Visa, your
          step-by-step resource to secure long-term residence, understand eligibility, and explore
          investment opportunities in the Emirates.
        </p>

        <p class="golden-visa-highlight">
          Special offer: Receive complimentary Golden Visa processing when purchasing a property above
          <strong>USD 550,000</strong> or depositing <strong>10%</strong> of that value.
        </p>

        <button class="btn" type="button" @click="openGoldenVisaLead">Request Private Access</button>
      </div>

      <div class="gv-image">
        <div class="gv-image-frame">
          <img src="/img/mockup-guide.png" alt="Golden Visa Guide Preview" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { initGoldenVisaAnimation } from '~/composables/animations/home/golden-visa'

const root = ref<HTMLElement | null>(null)
let cleanupAnimation: (() => void) | undefined

const openGoldenVisaLead = () => {
  if (!import.meta.client) return
  window.dispatchEvent(
    new CustomEvent('open-lead-form', {
      detail: {
        context: 'golden-visa'
      }
    })
  )
}

onMounted(() => {
  if (!root.value) return
  cleanupAnimation = initGoldenVisaAnimation(root.value)
})

onBeforeUnmount(() => {
  cleanupAnimation?.()
})
</script>
