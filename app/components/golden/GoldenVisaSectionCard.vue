<script setup lang="ts">
import type { GoldenVisaSection } from '~/data/goldenVisaGuide'
import GoldenVisaDataTable from '~/components/golden/GoldenVisaDataTable.vue'
import GoldenVisaAccordion from '~/components/golden/GoldenVisaAccordion.vue'

defineProps<{
  section: GoldenVisaSection
  index?: number
}>()
</script>

<template>
  <article
    :id="section.id"
    class="gv-card"
    :class="{
      'is-featured': index === 0,
      'is-media-right': section.id === 'what' || section.id === 'legal',
      'is-text-only': !section.image
    }"
  >
    <div v-if="section.image" class="gv-card-media" :style="{ backgroundImage: `url('${section.image}')` }" />

    <div class="gv-card-body">
      <header class="gv-card-header">
        <div class="gv-card-meta">
          <p class="gv-card-id">#{{ section.id }}</p>
          <span v-if="!section.image" class="gv-card-tag gv-card-tag-inline">{{ section.tag }}</span>
        </div>
        <h2>{{ section.title }}</h2>
      </header>

      <p v-if="section.kicker" class="gv-card-kicker">{{ section.kicker }}</p>

      <GoldenVisaDataTable v-if="section.table" :table="section.table" />
      <GoldenVisaAccordion v-if="section.accordions" :items="section.accordions" />
    </div>
  </article>
</template>

<style scoped>
.gv-card {
  display: grid;
  grid-template-columns: minmax(340px, 0.88fr) minmax(0, 1.12fr);
  background:
    linear-gradient(180deg, rgba(39, 35, 35, 0.98) 0%, rgba(20, 18, 18, 0.98) 100%);
  border: 1px solid rgba(220, 198, 184, 0.1);
  overflow: hidden;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.22);
  min-height: 100%;
}

.gv-card.is-featured {
  grid-template-columns: minmax(360px, 0.82fr) minmax(0, 1.18fr);
}

.gv-card.is-media-right .gv-card-media {
  order: 2;
}

.gv-card.is-media-right .gv-card-body {
  order: 1;
}

.gv-card-media {
  min-height: 320px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.gv-card-media::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(16, 15, 15, 0.08), rgba(16, 15, 15, 0.42));
}

.gv-card-tag {
  position: absolute;
  left: 18px;
  bottom: 18px;
  display: inline-flex;
  padding: 7px 12px;
  z-index: 1;
  background: rgba(20, 18, 18, 0.74);
  color: #f7f3ee;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.gv-card-body {
  display: grid;
  gap: 20px;
  padding: 38px 40px 34px;
  align-content: start;
  min-width: 0;
}

.gv-card-header {
  display: grid;
  gap: 10px;
}

.gv-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
}

.gv-card-id {
  margin: 0;
  color: #dcc6b8;
  font-size: 0.76rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.gv-card-header h2 {
  margin: 0;
  color: #fff;
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 0.98;
  text-align: left;
  text-wrap: balance;
}

.gv-card-kicker {
  margin: 0;
  color: rgba(247, 243, 238, 0.78);
  font-size: 1.02rem;
  line-height: 1.68;
  max-width: 62ch;
}

.gv-card.is-text-only {
  grid-template-columns: 1fr;
}

.gv-card.is-text-only .gv-card-body {
  padding: 42px 46px 38px;
}

.gv-card-tag-inline {
  position: static;
  left: auto;
  bottom: auto;
}

@media (max-width: 980px) {
  .gv-card {
    grid-template-columns: 1fr;
  }

  .gv-card.is-featured {
    grid-column: auto;
    grid-template-columns: 1fr;
  }

  .gv-card-media {
    min-height: 240px;
  }
}

@media (max-width: 640px) {
  .gv-card-body {
    padding: 24px 18px 20px;
  }

  .gv-card.is-text-only .gv-card-body {
    padding: 24px 18px 20px;
  }

  .gv-card-media {
    min-height: 210px;
  }

  .gv-card-header h2 {
    font-size: clamp(1.85rem, 9vw, 2.5rem);
  }
}
</style>
