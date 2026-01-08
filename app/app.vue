<script setup>
if (import.meta.client) {
  const script = document.createElement('script')
  script.src = '/js/translations.js'
  script.defer = true
  document.body.appendChild(script)
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
