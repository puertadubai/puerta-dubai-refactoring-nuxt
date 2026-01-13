<template>
  <div class="projects-list-page">
    <header class="projects-hero-banner" :class="{ 'is-transitioning': isTransitioning }">
      <div class="projects-hero-bg">
        <div
          class="projects-hero-slide is-active"
          :style="{ backgroundImage: `url(${heroSlides[activeSlide]})` }"
        />
        <div
          class="projects-hero-slide is-next"
          :class="{ 'is-visible': isTransitioning }"
          :style="{ backgroundImage: `url(${heroSlides[nextSlide]})` }"
        />
        <div class="projects-hero-overlay" />
      </div>

      <div class="projects-hero-content">
        <h1>Projects</h1>
        <p>Discover the full Puerta Dubai selection.</p>
      </div>
    </header>

    <section class="projects-map-header">
      <div ref="mapEl" class="projects-map" aria-label="Projects map" />
    </section>

    <section class="projects-list-section">
      <div class="projects-grid">
        <article
          v-for="project in projectCards"
          :key="project.slug"
          :id="`project-card-${project.slug}`"
          class="project-card luxury-project"
          :class="{ 'is-highlighted': project.slug === selectedSlug }"
        >
          <img :src="project.image" :alt="project.title" loading="lazy" />

          <div class="project-info">
            <div class="project-base">
              <h3 class="project-title">{{ project.title }}</h3>
              <h4 class="project-location">{{ project.location }}</h4>
            </div>

            <div class="project-hover">
              <p class="project-price">
                Starting from <span>{{ project.price }}</span>
              </p>
              <NuxtLink :to="`/projects/${project.slug}`" class="btn">
                View project
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue'
import { useHead } from '#imports'
import type { Project } from '~/composables/useProject'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

useHead({
  title: 'Projects | Puerta Dubai'
})

const { data: projectsData } = await useFetch<Project[]>('/api/projects')
const projects = computed(() => projectsData.value ?? [])

const heroSlides = computed(() => {
  const images = projects.value.map((project) => project.hero.image).filter(Boolean)
  return images.filter((image, index, list) => list.indexOf(image) === index)
})

const activeSlide = ref(0)
const isTransitioning = ref(false)
const nextSlide = computed(() =>
  heroSlides.value.length ? (activeSlide.value + 1) % heroSlides.value.length : 0
)
let slideTimer: number | null = null

const transitionDuration = 1400

const startHeroCarousel = () => {
  if (!heroSlides.value.length) return
  if (slideTimer) return
  slideTimer = window.setInterval(() => {
    if (isTransitioning.value) return
    isTransitioning.value = true
    window.setTimeout(() => {
      activeSlide.value = nextSlide.value
      isTransitioning.value = false
    }, transitionDuration)
  }, 5200)
}

const projectCards = computed(() =>
  projects.value.map((project) => {
    const price =
      project.highlights.find(
        (item) => item.label.toLowerCase() === 'starting price'
      )?.value ?? 'On request'

    return {
      slug: project.slug,
      title: project.hero.title,
      location: project.hero.location,
      image: project.hero.image,
      description: project.intro,
      price
    }
  })
)

const mapEl = ref<HTMLElement | null>(null)
let map: import('leaflet').Map | null = null
let markersLayer: import('leaflet').LayerGroup | null = null
const selectedSlug = ref<string | null>(null)
const cacheKey = 'projects_coords_cache'
const coordsCache = new Map<string, { lat: number; lng: number }>()

const scrollToCard = (slug: string) => {
  selectedSlug.value = slug
  const target = document.getElementById(`project-card-${slug}`)
  if (!target) return
  const header = document.querySelector('.main-header') as HTMLElement | null
  const headerOffset = (header?.offsetHeight || 0) + 20
  const rectTop = target.getBoundingClientRect().top + window.scrollY
  const finalPos = rectTop - headerOffset
  window.scrollTo({ top: finalPos, behavior: 'smooth' })
}

const resolveQuery = (project: Project) => {
  if (project.location?.mapQuery) return project.location.mapQuery
  const raw = project.hero.location || project.hero.title
  return raw.replace(/•/g, ',')
}

const geocode = async (query: string) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
        query
      )}`
    )
    const data = await res.json()
    if (Array.isArray(data) && data[0]) {
      return {
        lat: Number.parseFloat(data[0].lat),
        lng: Number.parseFloat(data[0].lon)
      }
    }
  } catch {
    // ignore, fallback handled by caller
  }
  return null
}

const loadCache = () => {
  if (!import.meta.client) return
  try {
    const raw = localStorage.getItem(cacheKey)
    if (!raw) return
    const parsed = JSON.parse(raw) as Record<string, { lat: number; lng: number }>
    Object.entries(parsed).forEach(([slug, coords]) => {
      if (coords?.lat && coords?.lng) coordsCache.set(slug, coords)
    })
  } catch {
    // ignore cache errors
  }
}

const saveCache = () => {
  if (!import.meta.client) return
  try {
    const obj = Object.fromEntries(coordsCache.entries())
    localStorage.setItem(cacheKey, JSON.stringify(obj))
  } catch {
    // ignore cache errors
  }
}

const getCoords = async (project: Project) => {
  if (project.location?.coords) return project.location.coords
  const cached = coordsCache.get(project.slug)
  if (cached) return cached
  const resolved = await geocode(resolveQuery(project))
  if (!resolved) return null
  coordsCache.set(project.slug, resolved)
  saveCache()
  return resolved
}

const initMap = async () => {
  if (!mapEl.value || map || !projects.value.length) return
  const L = await import('leaflet')
  const projectMarkerIcon = L.icon({
    iconUrl: '/img/marker-icon-2x.png',
    iconRetinaUrl: '/img/marker-icon-2x.png',
    shadowUrl: markerShadow,
    iconSize: [32, 52],
    iconAnchor: [16, 52]
  })

  map = L.map(mapEl.value, {
    scrollWheelZoom: false,
    doubleClickZoom: false,
    touchZoom: false,
    keyboard: false,
    boxZoom: false
  })
  map.scrollWheelZoom.disable()

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map)

  markersLayer = L.layerGroup().addTo(map)
  const bounds = L.latLngBounds([])

  for (const project of projects.value) {
    const resolved = await getCoords(project)
    if (!resolved) continue
    const marker = L.marker([resolved.lat, resolved.lng], {
      icon: projectMarkerIcon
    }).addTo(markersLayer)
    marker.bindTooltip(project.hero.title, { direction: 'top', offset: [0, -8] })
    marker.on('click', () => scrollToCard(project.slug))
    bounds.extend([resolved.lat, resolved.lng])
  }

  if (bounds.isValid()) {
    map.fitBounds(bounds, { padding: [60, 60] })
  } else {
    map.setView([25.2048, 55.2708], 11)
  }
}

onMounted(() => {
  if (!import.meta.client) return
  loadCache()
  initMap()
  startHeroCarousel()
})

watch(
  () => projects.value.length,
  (count) => {
    if (!import.meta.client || !count) return
    initMap()
    startHeroCarousel()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  markersLayer?.clearLayers()
  map?.remove()
  map = null
  markersLayer = null
  if (slideTimer) window.clearInterval(slideTimer)
})
</script>

<style scoped>
.projects-list-page {
  background: #fff;
  color: #111;
}

.projects-hero-banner {
  background: #000;
  color: #fff;
  padding: clamp(56px, 10vh, 120px) 6vw;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.projects-hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.projects-hero-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.06);
  filter: saturate(0.9) contrast(1.05);
  opacity: 0;
  transition: opacity 1.4s ease, transform 6s ease, filter 1.4s ease;
  will-change: opacity, transform, filter;
}

.projects-hero-slide.is-active {
  opacity: 1;
  transform: scale(1.02);
  animation: ken-burns 14s ease-in-out both;
}

.projects-hero-slide.is-next.is-visible {
  opacity: 1;
  transform: scale(1.02);
  filter: saturate(0.9) contrast(1.05) blur(6px);
  animation: ken-burns 14s ease-in-out both;
}

.projects-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.65) 0%,
    rgba(0, 0, 0, 0.5) 55%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

.projects-hero-content h1 {
  font-size: clamp(36px, 5vw, 84px);
  letter-spacing: -0.02em;
  margin: 0 0 12px;
}

.projects-hero-content p {
  color: #d8d8d8;
  max-width: 720px;
  margin: 0 auto;
  font-size: clamp(16px, 2vw, 20px);
}

.projects-hero-content {
  position: relative;
  z-index: 1;
  padding-top: clamp(88px, 14vh, 160px);
}

.projects-list-page .luxury-project .project-info,
.projects-list-page .luxury-project .project-info .project-base,
.projects-list-page .luxury-project .project-info .project-hover {
  pointer-events: auto;
}

.projects-list-page .project-hover {
  padding-bottom: 10px;
}

.projects-list-page .project-hover .btn {
  margin-top: 14px;
}

@keyframes ken-burns {
  0% {
    transform: scale(1.04) translate3d(-2%, -1%, 0);
  }
  50% {
    transform: scale(1.06) translate3d(1%, -2%, 0);
  }
  100% {
    transform: scale(1.08) translate3d(2%, 1%, 0);
  }
}

.projects-map-header {
  width: 100%;
}

.projects-map {
  width: 100vw;
  height: clamp(360px, 60vh, 720px);
  margin-left: calc(50% - 50vw);
  filter: grayscale(1) contrast(1.05);
}

.projects-list-section {
  padding: 80px 6vw 120px;
}

.project-card.is-highlighted {
  outline: 2px solid #000;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

@media (max-width: 900px) {
  .projects-list-section {
    padding: 60px 5vw 96px;
  }
}
</style>
