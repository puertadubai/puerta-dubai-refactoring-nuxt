<template>
  <footer
    ref="root"
    class="main-footer"
  >
    <div class="footer-signature">
      <img
        src="/img/logo-txt-blanc.svg"
        alt="Puerta Dubai"
        class="footer-logo"
      />
    </div>

    <div class="footer-social">
      <a
        href="https://www.facebook.com/profile.php?id=61584098170318"
        aria-label="Facebook"
        target="_blank"
        rel="noopener"
      >
        <i class="fa-brands fa-facebook-f"></i>
      </a>

      <a
        href="https://www.instagram.com/dayancandamilglobal/"
        aria-label="Instagram"
        target="_blank"
        rel="noopener"
      >
        <i class="fa-brands fa-instagram"></i>
      </a>
    </div>

    <a
      class="legalink"
      href="/legal-notice"
      target="_blank"
    >
      Legal notice
    </a>

    <p class="footer-note">
      © Puerta Dubai {{ currentYear }}. All rights reserved.
    </p>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initFooterAnimation } from '~/composables/animations/layout/footer'

const root = ref<HTMLElement | null>(null)
const currentYear = new Date().getFullYear()

onMounted(() => {
  if (!import.meta.client) return
  if (!root.value) return

  initFooterAnimation(root.value)
})
</script>
