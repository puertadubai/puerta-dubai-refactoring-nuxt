<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#imports'

type Crumb = {
  label: string
  to?: string
}

const route = useRoute()

const labelFromSegment = (segment: string) => {
  if (!segment) return ''
  const cleaned = segment.replace(/-/g, ' ')
  return cleaned.replace(/\b\w/g, (char) => char.toUpperCase())
}

const crumbs = computed<Crumb[]>(() => {
  const base: Crumb[] = [{ label: 'Admin', to: '/admin' }]
  const path = route.path.replace(/\/+$/, '')
  const segments = path.split('/').filter(Boolean)
  if (segments.length <= 1) return base

  let built = ''
  segments.slice(1).forEach((segment, index, list) => {
    built += `/${segment}`
    let label = labelFromSegment(segment)

    if (segment === 'projects' && list[index + 1]) {
      const nextSegment = list[index + 1]
      label = 'Projects'
      base.push({ label, to: `/admin${built}` })

      if (nextSegment === 'new') {
        base.push({ label: 'New', to: undefined })
      } else {
        base.push({ label: 'Edit', to: undefined })
      }
      return
    }

    base.push({
      label,
      to: index === list.length - 1 ? undefined : `/admin${built}`
    })
  })

  return base
})
</script>

<template>
  <nav class="admin-breadcrumbs" aria-label="Admin breadcrumb">
    <template v-for="(crumb, index) in crumbs" :key="`${crumb.label}-${index}`">
      <NuxtLink v-if="crumb.to" :to="crumb.to" class="crumb-link">
        {{ crumb.label }}
      </NuxtLink>
      <span v-else class="crumb-current">{{ crumb.label }}</span>
      <span v-if="index < crumbs.length - 1" class="crumb-sep">/</span>
    </template>
  </nav>
</template>

<style scoped>

.admin-breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  color: #3a2f25;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
nav.admin-breadcrumbs {
  position: relative;
  height: auto;
  background: transparent;
  border-bottom: 1px solid #e7e6e1;
  padding-bottom: 5px;
}

.crumb-link {
  color: inherit;
  text-decoration: none;
  opacity: 0.75;
}

.crumb-link:hover {
  opacity: 1;
}

.crumb-current {
  opacity: 1;
}

.crumb-sep {
  opacity: 0.4;
}
</style>
