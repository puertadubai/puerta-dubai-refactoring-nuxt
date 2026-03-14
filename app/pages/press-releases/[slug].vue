<script setup lang="ts">
import { computed } from 'vue'
import { usePressImage } from '~/composables/usePressImage'
import PressReleaseCard from '~/components/press/PressReleaseCard.vue'

type PressReleaseSummary = {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
  category: string
  author: string
  createdAt: string | null
}

type PressReleaseDetail = PressReleaseSummary & {
  content: string
}

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: articleData, pending } = await useFetch<PressReleaseDetail | null>(
  () => `/api/press-releases/${slug.value}`
)
const { data: allArticlesData } = await useFetch<PressReleaseSummary[]>('/api/press-releases')

const article = computed(() => articleData.value)
const relatedArticles = computed(() =>
  (allArticlesData.value ?? [])
    .filter((item) => item.slug !== slug.value)
    .slice(0, 3)
)

const { getPressImageUrl } = usePressImage()

const heroImage = computed(() => getPressImageUrl(article.value?.coverImage, 'hero'))

const formatDate = (value?: string | null) => {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(value))
}

useHead(() => {
  if (!article.value) {
    return {
      title: 'Article | Puerta Dubai'
    }
  }

  return {
    title: `${article.value.title} | Puerta Dubai`,
    meta: [
      {
        name: 'description',
        content: article.value.excerpt
      }
    ]
  }
})
</script>

<template>
  <div v-if="article" class="press-article-page">
    <header class="press-hero">
      <img v-if="heroImage" :src="heroImage" :alt="article.title" class="press-hero-image" />
      <div class="press-hero-overlay"></div>
      <div class="press-hero-content">
        <p class="eyebrow">Blog</p>
        <h1>{{ article.title }}</h1>
      </div>
    </header>

    <section class="press-article-shell">
      <div class="press-content-column">
        <p v-if="article.excerpt" class="press-excerpt">{{ article.excerpt }}</p>
        <div class="press-content" v-html="article.content"></div>
      </div>

      <aside class="press-sidebar">
        <div class="press-meta-card">
          <div class="meta-block">
            <span class="meta-label">Date</span>
            <strong>{{ formatDate(article.createdAt) }}</strong>
          </div>
          <div class="meta-block">
            <span class="meta-label">Category</span>
            <strong>{{ article.category || 'General' }}</strong>
          </div>
          <div class="meta-block">
            <span class="meta-label">Author</span>
            <strong>{{ article.author || 'Puerta Dubai' }}</strong>
          </div>
        </div>
      </aside>
    </section>

    <section v-if="relatedArticles.length" class="related-section">
      <div class="related-shell">
        <h2>Related Articles</h2>
        <div class="related-grid">
          <PressReleaseCard
            v-for="relatedArticle in relatedArticles"
            :key="relatedArticle.id"
            :article="relatedArticle"
          />
        </div>
      </div>
    </section>
  </div>

  <section v-else class="press-state">
    <div class="press-state-shell">
      <h1>{{ pending ? 'Loading article...' : 'Article not found' }}</h1>
      <p v-if="!pending">The requested article is unavailable.</p>
    </div>
  </section>
</template>

<style scoped>
.press-article-page {
  background: #302d2d;
}

.press-hero {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  background: #302d2d;
}

.press-hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.press-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(48, 45, 45, 0.15) 0%, rgba(48, 45, 45, 0.88) 100%);
}

.press-hero-content {
  position: relative;
  z-index: 1;
  width: min(1100px, calc(100% - 16vw));
  padding: calc(var(--site-header-offset, 210px) + 24px) 0 72px;
  color: #ffffff;
}

.eyebrow {
  margin: 0 0 10px;
  color: #dcc6b8;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.press-hero-content h1 {
  margin: 0;
  max-width: 900px;
  overflow-wrap: anywhere;
  word-break: break-word;
  text-wrap: balance;
}

.press-article-shell {
  max-width: 1260px;
  margin: 0 auto;
  padding: 84px 8vw 100px;
  display: grid;
  gap: 48px;
  grid-template-columns: minmax(0, 1.7fr) minmax(240px, 0.7fr);
  align-items: start;
}

.press-excerpt {
  margin: 0 0 28px;
  font-size: clamp(18px, 1.7vw, 24px);
  line-height: 1.5;
  color: rgba(247, 243, 238, 0.86);
}

.press-content {
  color: #f7f3ee;
}

.press-content :deep(h2),
.press-content :deep(h3),
.press-content :deep(p),
.press-content :deep(ul),
.press-content :deep(ol) {
  margin-top: 0;
}

.press-content :deep(h2) {
  margin-bottom: 20px;
  text-align: left;
  font-size: clamp(28px, 2.4vw, 40px);
  color: #ffffff;
}

.press-content :deep(h3) {
  margin: 34px 0 14px;
  font-size: clamp(20px, 1.8vw, 28px);
  color: #f7f3ee;
}

.press-content :deep(p),
.press-content :deep(li) {
  font-size: 17px;
  line-height: 1.85;
  color: rgba(247, 243, 238, 0.8);
}

.press-content :deep(ul),
.press-content :deep(ol) {
  padding-left: 20px;
  margin-bottom: 20px;
}

.press-sidebar {
  position: relative;
}

.press-meta-card {
  position: sticky;
  top: 120px;
  background: #383434;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 28px;
  display: grid;
  gap: 20px;
}

.meta-block {
  display: grid;
  gap: 6px;
}

.meta-label {
  color: #dcc6b8;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.meta-block strong {
  font-size: 16px;
  line-height: 1.4;
  color: #ffffff;
}

.related-section {
  padding: 0 8vw 110px;
  background: #302d2d;
}

.related-shell {
  max-width: 1260px;
  margin: 0 auto;
}

.related-shell h2 {
  margin-bottom: 28px;
  text-align: left;
  color: #ffffff;
}

.related-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.press-state {
  min-height: 70vh;
  display: grid;
  place-items: center;
  padding: 140px 24px 80px;
  background: #302d2d;
  color: #ffffff;
}

.press-state-shell {
  text-align: center;
}

.press-state-shell p {
  color: rgba(247, 243, 238, 0.78);
}

@media (max-width: 980px) {
  .press-article-shell {
    grid-template-columns: 1fr;
  }

  .press-meta-card {
    position: static;
  }

  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .press-hero {
    min-height: 62vh;
  }

  .press-hero-content {
    width: min(100%, calc(100% - 48px));
    padding-top: calc(var(--site-header-offset, 124px) + 36px);
    padding-bottom: 48px;
  }

  .eyebrow {
    margin-bottom: 8px;
    font-size: 11px;
  }

  .press-hero-content h1 {
    max-width: min(100%, 7.2em);
    font-size: clamp(38px, 11.5vw, 66px);
    line-height: 0.9;
    letter-spacing: -0.03em;
  }

  .press-article-shell {
    padding-top: 64px;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
