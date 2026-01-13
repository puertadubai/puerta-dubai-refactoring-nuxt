<script setup lang="ts">
definePageMeta({
  middleware: 'admin-auth',
})
</script>

<template>
  <section class="backoffice">
    <header class="backoffice-header">
      <p class="eyebrow">Back Office</p>
      <h1>Welcome</h1>
      <p class="subtitle">Choose a workspace to continue.</p>
    </header>
    <div class="tile-grid">
      <NuxtLink to="/admin/projects" class="tile tile-link">
        <div class="tile-icon" aria-hidden="true">
          <i data-lucide="building-2"></i>
        </div>
        <h2>Real Estate Project Management</h2>
        <p>Track projects, statuses, documents, and teams.</p>
      </NuxtLink>
      <article class="tile">
        <div class="tile-icon" aria-hidden="true">
          <i data-lucide="megaphone"></i>
        </div>
        <h2>Communication Strategy</h2>
        <p>Plan content, campaigns, and channels.</p>
      </article>
      <article class="tile">
        <div class="tile-icon" aria-hidden="true">
          <i data-lucide="palette"></i>
        </div>
        <h2>Visual Identity</h2>
        <p>Creative assets, guidelines, and brand systems.</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.backoffice {
  padding: 140px 8vw 90px;
  background: linear-gradient(180deg, #fbf7f1 0%, #ffffff 55%, #f1f1f1 100%);
  min-height: 70vh;
  overflow: hidden;
}

.backoffice-header {
  max-width: 720px;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 12px;
  color: #a38b68;
  margin: 0 0 12px;
}

h1 {
  font-size: clamp(32px, 4vw, 46px);
  line-height: 1.1;
  margin: 0 0 8px;
}

.subtitle {
  margin: 0;
  color: #6c6156;
}

.tile-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.tile {
  padding: 28px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 16px 32px rgba(37, 30, 20, 0.12);
  border: 1px solid rgba(181, 138, 82, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: grid;
  gap: 14px;
  align-content: start;
  color: inherit;
}

.tile-icon {
  width: 72px;
  height: 72px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(15, 15, 15, 0.15);
  display: grid;
  place-items: center;
}

.tile-icon :deep(svg) {
  width: 36px;
  height: 36px;
  stroke: #111111;
}

.tile h2 {
  margin: 0 0 8px;
  font-size: 20px;
}

.tile p {
  margin: 0;
  color: #5e5248;
}

.tile:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(37, 30, 20, 0.18);
}

.tile-link {
  text-decoration: none;
}
</style>
