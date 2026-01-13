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
  min-height: 70vh;
  display: grid;
  place-items: center;
  padding: 140px 24px 80px;
  background: radial-gradient(circle at top, #f6efe6 0%, #ffffff 45%, #f7f7f7 100%);
}

.login-card {
  width: min(440px, 100%);
  padding: 40px;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 20px 45px rgba(31, 26, 22, 0.12);
  text-align: left;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 12px;
  color: #a38b68;
  margin-bottom: 12px;
}

h1 {
  font-size: 32px;
  margin: 0 0 8px;
}

.subtitle {
  margin: 0 0 28px;
  color: #6c6156;
}

.login-form {
  display: grid;
  gap: 16px;
}

.field {
  display: grid;
  gap: 8px;
  font-size: 14px;
  color: #3f3328;
}

.field input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #d9cfc4;
  background: #fffaf4;
  font-size: 15px;
}

.field input:focus {
  outline: 2px solid #b58a52;
  border-color: transparent;
}

.error {
  color: #b23a3a;
  font-size: 13px;
  margin: 0;
}

button {
  border: none;
  padding: 12px 18px;
  border-radius: 999px;
  background: #b58a52;
  color: #fffaf4;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background: #9b733f;
}

@media (max-width: 600px) {
  .login-card {
    padding: 28px;
  }
}
</style>
