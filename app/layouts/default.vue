<template>
  <div id="app-layout">
    <!-- PRELOADER GLOBAL -->
    <Preloader />

    <!-- HEADER / NAV -->
    <MainHeader v-if="!isAdmin" />
    <SideMenu v-if="!isAdmin" />
    <Breadcrumbs v-if="showBreadcrumbs" />
    <div v-if="isAdmin" class="admin-header">
      <NuxtLink to="/" class="admin-logo-link" aria-label="Puerta Dubai home">
        <img src="/img/logo-black.png" alt="Puerta Dubai" />
      </NuxtLink>
      <AdminBreadcrumbs />
    </div>

    <!-- CLIENT ONLY FEATURES -->
    <ClientOnly>
        <ScrollProgress /> 
       <CustomCursor />
      <BackToTop />
    </ClientOnly>

    <!-- PAGE CONTENT -->
    <NuxtPage />

    <!-- FOOTER -->
    <MainFooter v-if="!isAdmin" />
    <footer v-else class="admin-footer">
      <span>Puerta Dubai Back Office</span>
      <NuxtLink to="/" class="admin-footer-link">Public site</NuxtLink>
    </footer>

    <!-- LEAD FORM MODAL -->
    <div
      class="lead-modal-backdrop"
      :class="{ 'is-open': isLeadOpen }"
      @click.self="closeLead"
    >
      <div class="lead-modal" role="dialog" aria-modal="true">
        <button class="close-btn" type="button" aria-label="Close" @click="closeLead">
          x
        </button>
        <LeadForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute } from '#imports'
import Preloader from '~/components/layout/Preloader.vue'
import MainHeader from '~/components/layout/MainHeader.vue'
import SideMenu from '~/components/layout/SideMenu.vue'
import ScrollProgress from '~/components/layout/ScrollProgress.vue'
import CustomCursor from '~/components/layout/CustomCursor.vue'
import BackToTop from '~/components/layout/BackToTop.vue'
import MainFooter from '~/components/layout/MainFooter.vue'
import LeadForm from '~/components/LeadForm.vue'
import Breadcrumbs from '~/components/layout/Breadcrumbs.vue'
import AdminBreadcrumbs from '~/components/admin/AdminBreadcrumbs.vue'

const isLeadOpen = ref(false)
const route = useRoute()
const isAdmin = computed(() => route.path.startsWith('/admin'))
const showBreadcrumbs = computed(() => !route.path.startsWith('/admin'))

const openLead = () => {
  isLeadOpen.value = true
}

const closeLead = () => {
  isLeadOpen.value = false
}

const onDocumentClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement | null
  if (!target) return
  const trigger = target.closest('.leadForm')
  if (!trigger) return
  event.preventDefault()
  openLead()
}

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeLead()
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<style>
/* Optionnel mais recommandé */
#app-layout {
  min-height: 100vh;
  overflow-x: hidden;
}

.admin-header {
  padding: 20px 6vw 24px;
  display: grid;
  place-items: center;
  gap: 16px;
  background: #f7f3ee;
}

.admin-logo-link img {
  width: 150px;
  max-width: 80vw;
  height: auto;
  display: block;
}

.admin-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 28px 6vw 40px;
  background: #f7f3ee;
  color: #3a2f25;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.admin-footer-link {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 2px;
}

.admin-footer-link:hover {
  opacity: 0.7;
}

@media (max-width: 720px) {
  .admin-header {
    padding-top: 96px;
  }
  .admin-logo-link img {
    width: 150px;
  }
  .admin-footer {
    flex-direction: column;
    text-align: center;
  }
}
</style>
