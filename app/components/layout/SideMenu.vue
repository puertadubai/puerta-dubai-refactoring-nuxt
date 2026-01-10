<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useSideMenu } from '~/composables/useSideMenu'
import { useMenuAnimation } from '~/composables/useMenuAnimation'

const { isOpen, close } = useSideMenu()

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
        <a href="#hero" class="menu-link" @click="close">Home</a>
        <a href="#about-puerta" class="menu-link" @click="close">
          What is Puerta Dubai?
        </a>
        <a href="#featured-projects" class="menu-link" @click="close">
          Projects
        </a>
        <a href="#dayan" class="menu-link" @click="close">
          Founder
        </a>
        <a href="#services" class="menu-link" @click="close">
          Services
        </a>
        <a href="#golden-visa" class="menu-link" @click="close">
          Golden Visa
        </a>
        <a href="#partners-section" class="menu-link" @click="close">
          Partners
        </a>
        <a href="#contact" class="menu-link" @click="close">
          Contact
        </a>
      </nav>
    </div>
  </Teleport>
</template>
