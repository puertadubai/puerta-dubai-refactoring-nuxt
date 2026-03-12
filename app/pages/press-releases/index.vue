<script setup lang="ts">
import { computed } from 'vue'
import PressReleaseCard from '~/components/press/PressReleaseCard.vue'

type PressReleaseSummary = {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
}

const { data: pressData, pending } = await useFetch<PressReleaseSummary[]>('/api/press-releases')
const articles = computed(() => pressData.value ?? [])

useHead({
  title: 'Blog | Puerta Dubai',
  meta: [
    {
      name: 'description',
      content: 'Latest Puerta Dubai news, market updates, and press releases.'
    }
  ]
})
</script>

<template>
  <section class="press-list-page">
    <div class="press-list-shell">
      <header class="press-list-header">
        <p class="eyebrow">PRESS</p>
        <h1>RELEASES</h1>
      </header>

      <div v-if="pending" class="status">Loading articles...</div>

      <div v-else-if="articles.length" class="press-grid">
        <PressReleaseCard
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
      </div>

      <div v-else class="status">No articles available right now.</div>
    </div>
  </section>
</template>

<style scoped>
.press-list-page {
  padding: 210px 8vw 100px;
  background: #302d2d;
}

.press-list-shell {
  max-width: 1260px;
  margin: 0 auto;
}

.press-list-header {
  text-align: center;
  margin-bottom: 44px;
}

.eyebrow {
  margin: 0 0 10px;
  color: #dcc6b8;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.press-list-header h1 {
  margin: 0;
  color: #ffffff;
}

.press-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.status {
  padding: 36px 0;
  text-align: center;
  color: rgba(247, 243, 238, 0.78);
}

@media (max-width: 980px) {
  .press-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .press-list-page {
    padding-top: 170px;
  }

  .press-grid {
    grid-template-columns: 1fr;
  }
}
</style>
