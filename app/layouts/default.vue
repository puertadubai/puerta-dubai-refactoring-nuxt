<template>
  <div id="app-layout">
    <!-- PRELOADER GLOBAL -->
    <Preloader />

    <!-- HEADER / NAV -->
    <MainHeader />
    <SideMenu />

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
  </div>
</template>

<script setup lang="ts">
import Preloader from '~/components/layout/Preloader.vue'
import MainHeader from '~/components/layout/MainHeader.vue'
import SideMenu from '~/components/layout/SideMenu.vue'
import ScrollProgress from '~/components/layout/ScrollProgress.vue'
import CustomCursor from '~/components/layout/CustomCursor.vue'
import BackToTop from '~/components/layout/BackToTop.vue'
import MainFooter from '~/components/layout/MainFooter.vue'
</script>

<style>
/* Optionnel mais recommandé */
#app-layout {
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
