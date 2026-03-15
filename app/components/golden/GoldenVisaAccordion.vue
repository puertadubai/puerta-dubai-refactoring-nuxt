<script setup lang="ts">
import { ref } from 'vue'
import type { GoldenVisaAccordionItem } from '~/data/goldenVisaGuide'

defineProps<{
  items: GoldenVisaAccordionItem[]
}>()

const openIndex = ref(0)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? -1 : index
}
</script>

<template>
  <div class="gv-accordion">
    <article
      v-for="(item, index) in items"
      :key="`${item.title}-${index}`"
      class="gv-accordion-item"
      :class="{ 'is-open': openIndex === index }"
    >
      <button
        type="button"
        class="gv-accordion-trigger"
        :aria-expanded="openIndex === index ? 'true' : 'false'"
        @click="toggle(index)"
      >
        <span class="gv-accordion-copy">
          <span class="gv-accordion-title">{{ item.title }}</span>
          <span v-if="item.hint" class="gv-accordion-hint">{{ item.hint }}</span>
        </span>
        <span class="gv-accordion-icon" aria-hidden="true">+</span>
      </button>

      <div v-if="openIndex === index" class="gv-accordion-panel">
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
</style>
