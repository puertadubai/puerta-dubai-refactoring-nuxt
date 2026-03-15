<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed, nextTick, reactive } from 'vue'
import { gsap } from 'gsap'
import { useRoute, useRouter } from '#imports'
import { useSideMenu } from '~/composables/useSideMenu'
import { useMenuAnimation } from '~/composables/useMenuAnimation'
import LanguageSelect from '~/components/layout/LanguageSelect.vue'

const { isOpen, close } = useSideMenu()
const route = useRoute()
const router = useRouter()

const menuRef = ref<HTMLElement | null>(null)
const overlayRef = ref<HTMLElement | null>(null)
const navRef = ref<HTMLElement | null>(null)

const indicator = reactive({
  top: 0,
  height: 0,
  opacity: 0
})

let animation: ReturnType<typeof useMenuAnimation> | null = null
let hoverLeaveTimeout: ReturnType<typeof setTimeout> | null = null

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

const getActiveMenuKey = () => {
  if (route.path.startsWith('/admin')) return 'admin-login'
  if (route.path.startsWith('/press-releases')) return 'press-releases'
  if (route.path.startsWith('/services')) return 'services'
  if (route.path.startsWith('/projects')) return 'projects'
  if (route.path === '/' || route.path === '') {
    const hash = route.hash?.replace('#', '')
    if (hash) return hash
    return 'hero'
  }
  return 'hero'
}

const moveIndicatorTo = (el: HTMLElement | null) => {
  if (!navRef.value || !el) {
    indicator.opacity = 0
    return
  }

  const navRect = navRef.value.getBoundingClientRect()
  const itemRect = el.getBoundingClientRect()

  indicator.top = itemRect.top - navRect.top
  indicator.height = itemRect.height
  indicator.opacity = 1
}

const syncIndicator = async () => {
  await nextTick()
  if (!navRef.value || !isOpen.value) return

  const key = getActiveMenuKey()
  const active = navRef.value.querySelector<HTMLElement>(`[data-menu-key="${key}"]`)
  moveIndicatorTo(active)
}

const onLinkEnter = (event: MouseEvent | FocusEvent) => {
  if (hoverLeaveTimeout) {
    clearTimeout(hoverLeaveTimeout)
    hoverLeaveTimeout = null
  }
  const target = event.currentTarget as HTMLElement | null
  moveIndicatorTo(target)
}

const onNavLeave = () => {
  if (hoverLeaveTimeout) clearTimeout(hoverLeaveTimeout)
  hoverLeaveTimeout = setTimeout(() => {
    void syncIndicator()
  }, 180)
}

const onWindowResize = () => {
  if (!isOpen.value) return
  void syncIndicator()
}

const openLeadPopup = () => {
  if (!import.meta.client) return
  window.dispatchEvent(new Event('open-lead-form'))
}

const goTo = (id: string) => {
  close()
  if (!import.meta.client) return

  if (id === 'projects') {
    router.push('/projects')
    return
  }

  if (id === 'services') {
    router.push('/services')
    return
  }

  if (id === 'press-releases') {
    router.push('/press-releases')
    return
  }

  if (id === 'contact') {
    const footer = document.querySelector('.main-footer, .admin-footer') as HTMLElement | null

    if (footer) {
      const header = document.querySelector('.main-header') as HTMLElement | null
      const headerOffset = (header?.offsetHeight || 0) + 20
      const top = footer.getBoundingClientRect().top + window.scrollY - headerOffset
      window.scrollTo({ top, behavior: 'smooth' })
      return
    }

    const bottom = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    )
    window.scrollTo({ top: bottom, behavior: 'smooth' })
    return
  }

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

watch(
  () => [isOpen.value, route.path, route.hash],
  () => {
    void syncIndicator()
  }
)

onMounted(() => {
  if (!import.meta.client) return
  window.addEventListener('resize', onWindowResize, { passive: true })
})

onBeforeUnmount(() => {
  if (hoverLeaveTimeout) clearTimeout(hoverLeaveTimeout)
  window.removeEventListener('resize', onWindowResize)
})
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
        class="menu-close-btn"
        aria-label="Close menu"
        @click="close"
      >
        <span></span>
        <span></span>
      </button>

      <div class="side-nav-wrap">
        <nav ref="navRef" class="side-nav" @mouseleave="onNavLeave">
          <span
            class="menu-indicator"
            :style="{
              transform: `translateY(${indicator.top}px)`,
              height: `${indicator.height}px`,
              opacity: indicator.opacity
            }"
            aria-hidden="true"
          />

          <a
            :href="linkHref('hero')"
            class="menu-link"
            data-menu-key="hero"
            @click.prevent="goTo('hero')"
            @mouseenter="onLinkEnter"
            @focus="onLinkEnter"
          >
          Home
          </a>
        <a
          :href="linkHref('about-puerta')"
          class="menu-link"
          data-menu-key="about-puerta"
          @click.prevent="goTo('about-puerta')"
          @mouseenter="onLinkEnter"
          @focus="onLinkEnter"
        >
          What is Puerta Dubai?
        </a>
        <a
          href="/projects"
          class="menu-link"
          data-menu-key="projects"
          @click.prevent="goTo('projects')"
          @mouseenter="onLinkEnter"
          @focus="onLinkEnter"
        >
          Projects
        </a>
        <a
          :href="linkHref('dayan')"
          class="menu-link"
          data-menu-key="dayan"
          @click.prevent="goTo('dayan')"
          @mouseenter="onLinkEnter"
          @focus="onLinkEnter"
        >
          Founder
        </a>
        <a
          href="/services"
          class="menu-link"
          data-menu-key="services"
          @click.prevent="goTo('services')"
          @mouseenter="onLinkEnter"
          @focus="onLinkEnter"
        >
          Services
        </a>
        <a
          href="/press-releases"
          class="menu-link"
          data-menu-key="press-releases"
          @click.prevent="goTo('press-releases')"
          @mouseenter="onLinkEnter"
          @focus="onLinkEnter"
        >
          Press Releases
        </a>
        <a
          :href="linkHref('golden-visa')"
          class="menu-link"
          data-menu-key="golden-visa"
          @click.prevent="goTo('golden-visa')"
          @mouseenter="onLinkEnter"
          @focus="onLinkEnter"
        >
          Golden Visa
        </a>
        <a
          :href="linkHref('partners-section')"
          class="menu-link"
          data-menu-key="partners-section"
          @click.prevent="goTo('partners-section')"
          @mouseenter="onLinkEnter"
          @focus="onLinkEnter"
        >
          Partners
        </a>
        <a
          :href="linkHref('contact')"
          class="menu-link"
          data-menu-key="contact"
          @click.prevent="goTo('contact')"
          @mouseenter="onLinkEnter"
          @focus="onLinkEnter"
        >
          Contact
        </a>
        <NuxtLink
          to="/admin/login"
          class="menu-link"
          data-menu-key="admin-login"
          @click="close"
          @mouseenter="onLinkEnter"
          @focus="onLinkEnter"
        >
          Connexion
        </NuxtLink>
        </nav>

        <div class="side-menu-language" aria-label="Language selector">
          <p class="side-menu-language-label">Language</p>
          <LanguageSelect select-id="menu-language" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
