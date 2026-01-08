<template>
  <div class="lang-select notranslate">
    <select
      id="language"
      aria-label="Language"
      class="notranslate"
    >
      <option value="en" class="notranslate">EN</option>
      <option value="fr" class="notranslate">FR</option>
      <option value="es" class="notranslate">ES</option>
      <option value="pt" class="notranslate">PT</option>
    </select>
    <span class="lang-loader" aria-hidden="true"></span>
  </div>
</template>

<script setup>
// volontairement vide
// la logique est gérée par translations.js (client only)
</script>
