<script setup>
import { computed } from 'vue'
import { useHead, useRoute } from '#imports'

if (import.meta.client) {
  const script = document.createElement('script')
  script.src = '/js/translations.js'
  script.defer = true
  document.body.appendChild(script)
}

const route = useRoute()

const toSlugClass = (value) =>
  String(value || 'home')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const bodyClass = computed(() => {
  if (route.params && route.params.slug) {
    return `page-${toSlugClass(route.params.slug)}`
  }
  const trimmed = route.path.replace(/\/+$/, '')
  if (!trimmed || trimmed === '') return 'page-home'
  const last = trimmed.split('/').pop() || 'home'
  return `page-${toSlugClass(last)}`
})

useHead(() => ({
  bodyAttrs: {
    class: bodyClass.value
  }
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
