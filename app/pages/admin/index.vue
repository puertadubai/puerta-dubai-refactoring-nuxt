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
      <NuxtLink to="/admin/leads" class="tile tile-link">
        <div class="tile-icon" aria-hidden="true">
          <i data-lucide="inbox"></i>
        </div>
        <h2>Leads Inbox</h2>
        <p>Review incoming leads and contact details.</p>
      </NuxtLink>
      <NuxtLink to="/admin/projects" class="tile tile-link">
        <div class="tile-icon" aria-hidden="true">
          <i data-lucide="building-2"></i>
        </div>
        <h2>Real Estate Project Management</h2>
        <p>Track projects, statuses, documents, and teams.</p>
      </NuxtLink>
      <NuxtLink to="/admin/visual-identity" class="tile tile-link">
        <div class="tile-icon" aria-hidden="true">
          <i data-lucide="palette"></i>
        </div>
        <h2>Visual Identity</h2>
        <p>Creative assets, guidelines, and brand systems.</p>
      </NuxtLink>
      <NuxtLink to="/admin/press-releases" class="tile tile-link">
        <div class="tile-icon" aria-hidden="true">
          <i data-lucide="newspaper"></i>
        </div>
        <h2>Press Releases</h2>
        <p>Write, publish, and maintain blog and press articles.</p>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.backoffice {
  padding: 70px 8vw 90px;
  background: linear-gradient(180deg, #fbf7f1 0%, #ffffff 55%, #e7e6e1 100%);
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
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

@media (max-width: 980px) {
  .tile-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .tile-grid {
    grid-template-columns: 1fr;
  }
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
  width: 100%;
  height: 102px;
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
