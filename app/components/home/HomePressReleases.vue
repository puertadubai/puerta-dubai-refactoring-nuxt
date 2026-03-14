<script setup lang="ts">
import PressReleaseCard from '~/components/press/PressReleaseCard.vue'

type PressReleaseSummary = {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
}

const { data: pressData } = await useFetch<PressReleaseSummary[]>('/api/press-releases')

const articles = computed(() => (pressData.value ?? []).slice(0, 3))
</script>

<template>
  <section v-if="articles.length" class="home-press">
    <div class="home-press-shell">
      <header class="home-press-header">
        <div>
          <p class="eyebrow">Editorial</p>
          <h2>Press Releases</h2>
        </div>
        <NuxtLink to="/press-releases" class="btn">View All</NuxtLink>
      </header>

      <div class="home-press-grid">
        <PressReleaseCard
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-press {
  position: relative;
  padding: 110px 8vw 120px;
  overflow: hidden;
  background: #302d2d;
}

.home-press::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to bottom, rgba(48, 45, 45, 0.76) 0%, rgba(48, 45, 45, 0.36) 100%),
    url('/img/pattern.png');
  background-size: auto, 240px 240px;
  background-position: center, center;
  opacity: 0.55;
  pointer-events: none;
}

.home-press-shell {
  position: relative;
  z-index: 1;
  max-width: 1260px;
  margin: 0 auto;
}

.home-press-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 36px;
}

.eyebrow {
  margin: 0 0 10px;
  color: #dcc6b8;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.home-press-header h2 {
  margin: 0;
  text-align: left;
  color: #ffffff;
}

.home-press-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 980px) {
  .home-press-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .home-press-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .home-press-grid {
    grid-template-columns: 1fr;
  }
}
</style>
