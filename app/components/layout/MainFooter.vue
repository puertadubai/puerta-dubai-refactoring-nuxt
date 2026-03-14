<template>
  <footer
    ref="root"
    class="main-footer"
  >
    <div class="footer-shell">
      <div class="footer-brand">
        <img
          src="/img/logo.png"
          alt="Puerta Dubai"
          class="footer-logo"
        />
      </div>

      <div class="footer-contact">
        <a
          href="mailto:dayancandamil@gmail.com"
          class="contact-item"
          aria-label="Email dayancandamil@gmail.com"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
            />
            <path
              d="m4.5 7.5 7.5 5.25 7.5-5.25"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Email</span>
        </a>

        <a
          href="tel:+971544402792"
          class="contact-item"
          aria-label="Phone +971 54 440 2792"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6.93 3.6c.35-.35.88-.46 1.34-.27l2.2.9c.5.2.8.72.72 1.25l-.28 2.05c-.05.36.07.72.33.97l1.9 1.9c.25.25.61.37.97.32l2.05-.27c.53-.07 1.05.23 1.25.72l.9 2.2c.2.47.09 1-.27 1.35l-1.28 1.28c-.72.72-1.78 1-2.77.74-2.59-.69-5.05-2.16-7.13-4.24-2.08-2.08-3.55-4.54-4.24-7.13-.26-.99.02-2.05.74-2.77L6.93 3.6Z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Telephone</span>
        </a>

        <a
          href="https://www.facebook.com/profile.php?id=61584098170318"
          class="contact-item"
          aria-label="Facebook"
          target="_blank"
          rel="noopener"
        >
          <i class="fa-brands fa-facebook-f" aria-hidden="true"></i>
          <span>Facebook</span>
        </a>

        <a
          href="https://www.instagram.com/dayancandamilglobal/"
          class="contact-item"
          aria-label="Instagram"
          target="_blank"
          rel="noopener"
        >
          <i class="fa-brands fa-instagram" aria-hidden="true"></i>
          <span>Instagram</span>
        </a>
      </div>
    </div>

    <div class="footer-bottom">
      <a
        class="footer-legal-link"
        href="/legal-notice"
        target="_blank"
      >
        Legal notice
      </a>

      <p class="footer-note">
        © Puerta Dubai {{ currentYear }}. All rights reserved.
      </p>
    </div>
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

<style scoped>
.main-footer {
  background:
    linear-gradient(180deg, #000000 0%, #161414 38%, #302d2d 100%);
  color: #f6f2eb;
  padding: 88px 40px 42px;
  border-top:none;
}

.footer-shell {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 26px;
}

.footer-brand {
  display: flex;
  align-items: center;
}

.footer-logo {
  width: 124px;
  height: auto;
  opacity: 0.95;
  filter: contrast(0.92) brightness(1.08);
}

.footer-contact {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px 18px;
}

.contact-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: rgba(246, 242, 235, 0.9);
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 0.04em;
  transition: color 0.25s ease, transform 0.25s ease;
}

.contact-item svg {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  color: #dcc6b8;
}

.contact-item i {
  width: 17px;
  font-size: 16px;
  color: #dcc6b8;
  text-align: center;
}

.contact-item:hover {
  color: #ffffff;
  transform: translateX(2px);
}

.footer-bottom {
  max-width: 1400px;
  margin: 30px auto 0;
  padding-top: 16px;
  border-top: 1px solid rgba(220, 198, 184, 0.14);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.footer-legal-link {
  color: rgba(246, 242, 235, 0.86);
  text-decoration: none;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.footer-legal-link:hover {
  color: #ffffff;
}

.footer-note {
  margin: 0;
  color: rgba(246, 242, 235, 0.62);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .main-footer {
    padding: 72px 24px 34px;
  }

  .footer-shell {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }

  .footer-contact {
    justify-content: center;
  }

  .footer-bottom {
    margin-top: 24px;
    padding-top: 14px;
    flex-direction: column;
  }
}
</style>
