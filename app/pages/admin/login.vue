<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from '#imports'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const credentials = {
  email: 'dayancandamil@gmail.com',
  password: 'dayandubaivip2026',
}

const redirectIfAuthenticated = () => {
  if (!import.meta.client) return
  const isAuthenticated = sessionStorage.getItem('backoffice-session') === 'authenticated'
  if (isAuthenticated) router.push('/admin')
}

const handleSubmit = () => {
  errorMessage.value = ''
  if (email.value.trim() === credentials.email && password.value === credentials.password) {
    sessionStorage.setItem('backoffice-session', 'authenticated')
    sessionStorage.setItem(
      'backoffice-user',
      JSON.stringify({ email: credentials.email, loggedInAt: new Date().toISOString() })
    )
    router.push('/admin')
    return
  }
  errorMessage.value = 'Identifiants invalides. Réessayez.'
}

onMounted(() => {
  redirectIfAuthenticated()
})
</script>

<template>
  <section class="backoffice-login">
    <NuxtLink to="/" class="login-logo" aria-label="Puerta Dubai home">
      <img src="/img/logo-black.png" alt="Puerta Dubai" />
    </NuxtLink>
    <div class="login-card">
      <p class="eyebrow">Back Office</p>
      <h1>Connexion</h1>
      <p class="subtitle">Accès réservé à l’équipe Puerta Dubai.</p>
      <form class="login-form" @submit.prevent="handleSubmit">
        <label class="field">
          <span>Email</span>
          <input v-model.trim="email" type="email" autocomplete="username" required />
        </label>
        <label class="field">
          <span>Mot de passe</span>
          <input v-model="password" type="password" autocomplete="current-password" required />
        </label>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.backoffice-login {
  min-height: 100vh;
  display: grid;
  place-items: center;
  gap: 8px;
  padding: 48px 24px;
  background-color: #000;
  background-image:
    linear-gradient(120deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 48%),
    repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.025) 0,
      rgba(255, 255, 255, 0.025) 2px,
      transparent 2px,
      transparent 8px
    ),
    radial-gradient(circle at 16% 18%, rgba(191, 148, 89, 0.18) 0, rgba(191, 148, 89, 0) 42%);
}

.login-logo {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  margin-bottom: -2px;
}

.login-logo img {
  width: 100%;
  height: auto;
  display: block;
  filter: invert(1) contrast(0.92) brightness(1.08);
}

.login-card {
  width: min(440px, 100%);
  padding: 40px;
  border-radius: 22px;
  background: linear-gradient(150deg, rgba(20, 20, 20, 0.95) 0%, rgba(8, 8, 8, 0.96) 100%);
  border: 1px solid rgba(220, 198, 184, 0.18);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.52);
  text-align: left;
  color: #f3ede5;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 12px;
  color: #c7a476;
  margin-bottom: 12px;
}

h1 {
  font-size: 32px;
  margin: 0 0 8px;
  color: #fff;
}

.subtitle {
  margin: 0 0 28px;
  color: rgba(255, 255, 255, 0.76);
}

.login-form {
  display: grid;
  gap: 16px;
}

.field {
  display: grid;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.88);
}

.field input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(220, 198, 184, 0.32);
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  font-size: 15px;
}

.field input:focus {
  outline: 2px solid #bf9459;
  border-color: transparent;
}

.error {
  color: #f49696;
  font-size: 13px;
  margin: 0;
}

button {
  border: 1px solid rgba(191, 148, 89, 0.7);
  padding: 12px 18px;
  border-radius: 999px;
  background: linear-gradient(135deg, #bf9459 0%, #9f7742 100%);
  color: #13100d;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
}

button:hover {
  background: linear-gradient(135deg, #cfaa74 0%, #b98b51 100%);
}

@media (max-width: 600px) {
  .backoffice-login {
    padding: 28px 16px;
    gap: 6px;
  }

  .login-logo {
    width: 120px;
  }

  .login-card {
    padding: 26px;
  }
}
</style>
