// app/composables/useSideMenu.ts
import { ref, computed, watch } from 'vue'

/**
 * État global du menu latéral
 * (singleton partagé dans toute l'app)
 */
const _isOpen = ref(false)

export const useSideMenu = () => {
  const isOpen = computed(() => _isOpen.value)

  const open = () => {
    _isOpen.value = true
  }

  const close = () => {
    _isOpen.value = false
  }

  const toggle = () => {
    _isOpen.value = !_isOpen.value
  }

  // 🔒 Lock du scroll body (équivalent core/menu.js)
  if (import.meta.client) {
    watch(_isOpen, (open) => {
      document.body.classList.toggle('menu-open', open)
    })
  }

  return {
    isOpen,
    open,
    close,
    toggle
  }
}
