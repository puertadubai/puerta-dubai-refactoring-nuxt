<script setup lang="ts">
import { computed } from 'vue'
import { usePressImage } from '~/composables/usePressImage'

type PressReleaseCardData = {
  slug: string
  title: string
  excerpt: string
  coverImage: string
}

const props = withDefaults(
  defineProps<{
    article: PressReleaseCardData
  }>(),
  {}
)

const { getPressImageUrl } = usePressImage()

const coverUrl = computed(() => getPressImageUrl(props.article.coverImage, 'card'))
</script>

<template>
  <article class="press-card">
    <NuxtLink :to="`/press-releases/${article.slug}`" class="press-card-media">
      <img v-if="coverUrl" :src="coverUrl" :alt="article.title" loading="lazy" />
      <div v-else class="press-card-fallback" aria-hidden="true"></div>
    </NuxtLink>

    <div class="press-card-body">
      <h3>{{ article.title }}</h3>
      <p>{{ article.excerpt }}</p>
      <NuxtLink :to="`/press-releases/${article.slug}`" class="press-card-link">
        Read Article
      </NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.press-card {
  background: #383434;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: grid;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.press-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.24);
}

.press-card-media {
  display: block;
  overflow: hidden;
  background: #4a4545;
  aspect-ratio: 16 / 9;
}

.press-card img,
.press-card-fallback {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.press-card:hover img {
  transform: scale(1.04);
}

.press-card-body {
  padding: 22px 22px 24px;
  display: grid;
  gap: 12px;
}

.press-card-body h3 {
  margin: 0;
  font-size: clamp(18px, 1.4vw, 24px);
  line-height: 1.15;
  color: #f7f3ee;
}

.press-card-body p {
  margin: 0;
  color: rgba(247, 243, 238, 0.78);
  font-size: 15px;
}

.press-card-link {
  display: inline-flex;
  width: fit-content;
  color: #dcc6b8;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  position: relative;
  padding-bottom: 2px;
}

.press-card-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform-origin: left center;
  transition: transform 0.25s ease;
}

.press-card:hover .press-card-link::after {
  transform: scaleX(0.65);
}
</style>
