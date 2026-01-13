<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useRoute } from '#imports'
import type { Project } from '~/composables/useProject'

type Crumb = {
  label: string
  to?: string
}

const route = useRoute()
const isHidden = ref(false)

const { data: projectsData } = await useFetch<Project[]>('/api/projects')
const projectTitleBySlug = computed(() => {
  const projects = projectsData.value ?? []
  return new Map(projects.map((project) => [project.slug, project.hero.title]))
})

const labelFromSegment = (segment: string) => {
  if (!segment) return ''
  const cleaned = segment.replace(/-/g, ' ')
  return cleaned.replace(/\b\w/g, (char) => char.toUpperCase())
}

const crumbs = computed<Crumb[]>(() => {
  const base: Crumb[] = [{ label: 'Home', to: '/' }]
  const path = route.path.replace(/\/+$/, '')
  if (!path || path === '') return base

  const segments = path.split('/').filter(Boolean)
  let built = ''

  segments.forEach((segment, index) => {
    built += `/${segment}`
    let label = labelFromSegment(segment)

    if (segments[0] === 'projects' && index === 1) {
      label = projectTitleBySlug.value.get(segment) || label
    }

    base.push({
      label,
      to: index === segments.length - 1 ? undefined : built
    })
  })

  return base
})

const onScroll = () => {
  isHidden.value = window.scrollY > 40
}

onMounted(() => {
  if (!import.meta.client) return
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="breadcrumb-bar" :class="{ 'is-hidden': isHidden }">
    <div class="breadcrumb-inner">
      <div class="breadcrumb" role="navigation" aria-label="Breadcrumb">
        <template v-for="(crumb, index) in crumbs" :key="`${crumb.label}-${index}`">
          <NuxtLink v-if="crumb.to" :to="crumb.to" class="breadcrumb-link">
            {{ crumb.label }}
          </NuxtLink>
          <span v-else class="breadcrumb-current">{{ crumb.label }}</span>
          <span v-if="index < crumbs.length - 1" class="breadcrumb-sep">/</span>
        </template>
      </div>
      <span class="breadcrumb-rule" aria-hidden="true" />
    </div>
  </div>
</template>

<style scoped>
.breadcrumb-bar {
  position: absolute;
  top: 190px;
  z-index: 10;
  background: transparent;
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.breadcrumb-bar.is-hidden {
  opacity: 0;
  transform: translateY(-8px);
  pointer-events: none;
}

.breadcrumb-inner {
  padding: 10px 6vw 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  color: #f2f2f2;
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.breadcrumb-link {
  color: inherit;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.breadcrumb-link:hover {
  opacity: 1;
}

.breadcrumb-current {
  opacity: 1;
}

.breadcrumb-sep {
  opacity: 0.5;
}

.breadcrumb-rule {
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.4), transparent);
  width: 100%;
}

@media (max-width: 900px) {
  .breadcrumb-bar {
    top: 160px;
  }
  .breadcrumb-inner {
    padding: 8px 5vw 12px;
  }
}
</style>
