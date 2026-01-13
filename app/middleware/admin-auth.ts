export default defineNuxtRouteMiddleware(() => {
  if (process.server) return
  const isAuthenticated = sessionStorage.getItem('backoffice-session') === 'authenticated'
  if (!isAuthenticated) {
    return navigateTo('/admin/login')
  }
})
