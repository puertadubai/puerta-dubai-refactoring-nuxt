<template>
  <div class="legal-page">
    <div class="container">
      <div class="logo">
        <img src="/img/logo.png" alt="Puerta Dubai Logo" />
      </div>

      <h1>Legal Notice</h1>

      <p>
        <strong>Website owner</strong><br />
        Name: Dayan Candamil.<br />
        Address: <em>Villa 93, 4A Street,<br />
        Jumeirah 1,<br />
        Dubai, United Arab Emirates</em><br />
        Email:
        <a href="mailto:contact@puertadubai.com">contact@puertadubai.com</a>
      </p>

      <p>
        <strong>Website</strong><br />
        Domain: puerta-dubai.com<br />
        Purpose: Real estate information, services, and project presentation
        related to Dubai.
      </p>

      <p>
        <strong>Hosting provider</strong><br />
        IONOS Cloud Ltd.<br />
        <a href="https://www.ionos.com" target="_blank" rel="noopener">
          https://www.ionos.com
        </a><br />
        The website is hosted on IONOS servers located in the European Union.
      </p>

      <p>
        <strong>Intellectual property</strong><br />
        All content on this website (texts, images, videos, and design) is
        protected by intellectual property laws. Any reproduction or use without
        authorization is prohibited.
      </p>

      <p>
        <strong>Data protection</strong><br />
        Contact forms collect basic information (name, email, and message) solely
        for communication purposes.<br />
        No data is shared with third parties.<br /><br />
        Users may request access, correction, or deletion of their personal data
        by contacting:<br />
        <a href="mailto:contact@puertadubai.com">contact@puertadubai.com</a>
      </p>

      <p>
        <strong>Responsibility</strong><br />
        The website owner is responsible for the accuracy of published
        information but cannot be held liable for external links or third-party
        content.
      </p>

      <p>
        <strong>Contact</strong><br />
        For any legal request, please write to:<br />
        <a href="mailto:contact@puertadubai.com">contact@puertadubai.com</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  title: 'Legal Notice – Puerta Dubai'
})
</script>

<style scoped>
.legal-page {
  font-family: "Inter", Arial, sans-serif;
  margin: 0;
  padding: 40px 20px;
  background: #f9f9f9;
  color: #222;
  line-height: 1.6;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(48, 45, 45, 0.08);
}

.logo {
  text-align: center;
  margin-bottom: 30px;
  filter: invert(1);
}

.logo img {
  width: 180px;
  max-width: 50%;
}

h1 {
  font-size: 32px;
  margin-bottom: 25px;
  text-align: center;
  font-weight: 700;
}

strong {
  font-weight: 600;
}

a {
  color: #302d2d;
  text-decoration: underline;
}

@media (max-width: 600px) {
  .container {
    padding: 25px 20px;
  }

  h1 {
    font-size: 26px;
  }

  .logo img {
    width: 140px;
  }
}
</style>
