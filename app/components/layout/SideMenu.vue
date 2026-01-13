<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { gsap } from 'gsap'
import { useRoute, useRouter } from '#imports'
import { useSideMenu } from '~/composables/useSideMenu'
import { useMenuAnimation } from '~/composables/useMenuAnimation'

const { isOpen, close } = useSideMenu()
const route = useRoute()
const router = useRouter()

const menuRef = ref<HTMLElement | null>(null)
const overlayRef = ref<HTMLElement | null>(null)

let animation: ReturnType<typeof useMenuAnimation> | null = null

onMounted(() => {
  if (!menuRef.value || !overlayRef.value) return
  animation = useMenuAnimation(menuRef.value, overlayRef.value)
  if (isOpen.value) animation.open()
  else animation.close()
})

watch(isOpen, (open) => {
  menuRef.value?.classList.toggle('open', open)
  overlayRef.value?.classList.toggle('active', open)
  if (menuRef.value) {
    gsap.killTweensOf(menuRef.value)
    menuRef.value.style.transform = open ? 'translate(0px)' : 'translateX(-100%)'
  }
  if (overlayRef.value) {
    gsap.killTweensOf(overlayRef.value)
    overlayRef.value.style.opacity = open ? '1' : '0'
    overlayRef.value.style.pointerEvents = open ? 'auto' : 'none'
  }
  if (!animation) return
  open ? animation.open() : animation.close()
})

const isHome = computed(() => route.path === '/' || route.path === '')

const linkHref = (id: string) => (isHome.value ? `#${id}` : `/#${id}`)

const goTo = (id: string) => {
  close()
  if (!import.meta.client) return

  if (isHome.value) {
    const target = document.getElementById(id)
    if (target) {
      const header = document.querySelector('.main-header') as HTMLElement | null
      const headerOffset = (header?.offsetHeight || 0) + 20
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset
      window.history.replaceState(null, '', `#${id}`)
      window.scrollTo({ top, behavior: 'smooth' })
      return
    }
    window.location.hash = id
    return
  }

  router.push({ path: '/', hash: `#${id}` })
}
</script>

<template>
  <Teleport to="body">
    <!-- OVERLAY -->
    <div
      ref="overlayRef"
      id="menu-overlay"
      @click="close"
    />

    <!-- SIDE MENU -->
    <div
      ref="menuRef"
      id="side-menu"
    >
      <button
        id="menu-close"
        aria-label="Close menu"
        @click="close"
      >
        ×
      </button>

      <nav class="side-nav">
        <a :href="linkHref('hero')" class="menu-link" @click.prevent="goTo('hero')">
          Home
        </a>
        <a
          :href="linkHref('about-puerta')"
          class="menu-link"
          @click.prevent="goTo('about-puerta')"
        >
          What is Puerta Dubai?
        </a>
        <a
          :href="linkHref('featured-projects')"
          class="menu-link"
          @click.prevent="goTo('featured-projects')"
        >
          Projects
        </a>
        <a
          :href="linkHref('dayan')"
          class="menu-link"
          @click.prevent="goTo('dayan')"
        >
          Founder
        </a>
        <a
          :href="linkHref('services')"
          class="menu-link"
          @click.prevent="goTo('services')"
        >
          Services
        </a>
        <a
          :href="linkHref('golden-visa')"
          class="menu-link"
          @click.prevent="goTo('golden-visa')"
        >
          Golden Visa
        </a>
        <a
          :href="linkHref('partners-section')"
          class="menu-link"
          @click.prevent="goTo('partners-section')"
        >
          Partners
        </a>
        <a
          :href="linkHref('contact')"
          class="menu-link"
          @click.prevent="goTo('contact')"
        >
          Contact
        </a>
        <NuxtLink to="/admin/login" class="menu-link" @click="close">
          Connexion
        </NuxtLink>
      </nav>
    </div>
  </Teleport>
</template>
