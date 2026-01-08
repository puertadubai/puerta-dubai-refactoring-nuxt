<template>
  <div>
   <MainHeader />
    <SideMenu />

    <ClientOnly>
      <ScrollProgress />
      <CustomCursor />
      <BackToTop />
    </ClientOnly>

    <NuxtPage />
    <MainFooter />
  </div>
</template>

<script setup>
import MainHeader from '~/components/layout/MainHeader.vue'
import SideMenu from '~/components/layout/SideMenu.vue'
import ScrollProgress from '~/components/layout/ScrollProgress.vue'
import CustomCursor from '~/components/layout/CustomCursor.vue'
import BackToTop from '~/components/layout/BackToTop.vue'
import MainFooter from '~/components/layout/MainFooter.vue'
</script>
