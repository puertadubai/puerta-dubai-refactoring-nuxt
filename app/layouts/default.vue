<template>
  <div id="app-layout">
    <!-- PRELOADER GLOBAL -->
    <Preloader />

    <!-- HEADER / NAV -->
    <MainHeader />
    <SideMenu />
    <Breadcrumbs />

    <!-- CLIENT ONLY FEATURES -->
    <ClientOnly>
        <ScrollProgress /> 
       <CustomCursor />
      <BackToTop />
    </ClientOnly>

    <!-- PAGE CONTENT -->
    <NuxtPage />

    <!-- FOOTER -->
    <MainFooter />

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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Preloader from '~/components/layout/Preloader.vue'
import MainHeader from '~/components/layout/MainHeader.vue'
import SideMenu from '~/components/layout/SideMenu.vue'
import ScrollProgress from '~/components/layout/ScrollProgress.vue'
import CustomCursor from '~/components/layout/CustomCursor.vue'
import BackToTop from '~/components/layout/BackToTop.vue'
import MainFooter from '~/components/layout/MainFooter.vue'
import LeadForm from '~/components/LeadForm.vue'
import Breadcrumbs from '~/components/layout/Breadcrumbs.vue'

const isLeadOpen = ref(false)

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
</style>
