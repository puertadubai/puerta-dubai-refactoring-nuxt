<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { GoldenVisaAccordionItem } from '~/data/goldenVisaGuide'

defineProps<{
  items: GoldenVisaAccordionItem[]
}>()

const openIndex = ref(0)
const isPrintMode = ref(false)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? -1 : index
}

const enablePrintMode = () => {
  isPrintMode.value = true
}

const disablePrintMode = () => {
  isPrintMode.value = false
}

onMounted(() => {
  if (!import.meta.client) return
  window.addEventListener('beforeprint', enablePrintMode)
  window.addEventListener('afterprint', disablePrintMode)
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  window.removeEventListener('beforeprint', enablePrintMode)
  window.removeEventListener('afterprint', disablePrintMode)
})
</script>

<template>
  <div class="gv-accordion">
    <article
      v-for="(item, index) in items"
      :key="`${item.title}-${index}`"
      class="gv-accordion-item"
      :class="{ 'is-open': openIndex === index || isPrintMode }"
    >
      <button
        type="button"
        class="gv-accordion-trigger"
        :aria-expanded="openIndex === index || isPrintMode ? 'true' : 'false'"
        @click="toggle(index)"
      >
        <span class="gv-accordion-copy">
          <span class="gv-accordion-title">{{ item.title }}</span>
          <span v-if="item.hint" class="gv-accordion-hint">{{ item.hint }}</span>
        </span>
        <span class="gv-accordion-icon" aria-hidden="true">+</span>
      </button>

      <div v-if="openIndex === index || isPrintMode" class="gv-accordion-panel">
        <p>{{ item.body }}</p>
      </div>
    </article>
  </div>
</template>

<style scoped>
.gv-accordion {
  display: grid;
  gap: 10px;
}

.gv-accordion-item {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(18, 18, 18, 0.38);
}

.gv-accordion-trigger {
  width: 100%;
  border: 0;
  background: transparent;
  color: #f7f3ee;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
  padding: 18px 20px;
  text-align: left;
  cursor: pointer;
}

.gv-accordion-copy {
  display: grid;
  gap: 6px;
}

.gv-accordion-title {
  font-size: 1rem;
  letter-spacing: 0.02em;
}

.gv-accordion-hint {
  color: rgba(220, 198, 184, 0.75);
  font-size: 0.82rem;
  letter-spacing: 0.03em;
}

.gv-accordion-icon {
  font-size: 1.4rem;
  line-height: 1;
  color: #dcc6b8;
  transition: transform 0.2s ease;
}

.gv-accordion-item.is-open .gv-accordion-icon {
  transform: rotate(45deg);
}

.gv-accordion-panel {
  padding: 0 20px 20px;
}

.gv-accordion-panel p {
  margin: 0;
  color: rgba(247, 243, 238, 0.82);
  line-height: 1.68;
}

@media print {
  .gv-accordion {
    gap: 0;
  }

  .gv-accordion-item {
    border: 1px solid #000;
    background: transparent;
    break-inside: avoid;
    page-break-inside: avoid;
    margin-bottom: 10pt;
  }

  .gv-accordion-trigger {
    color: #000;
    padding: 10pt 12pt 6pt;
  }

  .gv-accordion-title {
    font-size: 11pt;
    font-weight: 700;
  }

  .gv-accordion-hint {
    color: #444;
    font-size: 9pt;
  }

  .gv-accordion-icon {
    display: none;
  }

  .gv-accordion-panel {
    padding: 0 12pt 10pt;
  }

  .gv-accordion-panel p {
    color: #000;
    font-size: 10pt;
    line-height: 1.45;
  }
}
</style>
