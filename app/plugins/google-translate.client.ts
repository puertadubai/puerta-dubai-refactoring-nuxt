export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const SUPPORTED_LANGS = ['en', 'fr', 'es', 'pt']
  const GOOGLE_DIV_ID = 'google_translate_element'
  const LANG_SELECT_ID = 'language'
  const ROUTE_LANG_PREFIX = 'site_lang:'

  let pendingLang: string | null = null
  let loadingTimer: number | null = null

  const getRouteLangKey = (path: string) => `${ROUTE_LANG_PREFIX}${path}`
  const getCurrentRoutePath = () => {
    try {
      const router = useRouter()
      return router.currentRoute.value.path || '/'
    } catch {
      return window.location.pathname || '/'
    }
  }

  ;(window as any).googleTranslateElementInit = () => {
    // @ts-ignore
    new google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: SUPPORTED_LANGS.join(','),
        autoDisplay: false
      },
      GOOGLE_DIV_ID
    )

    const routeKey = getRouteLangKey(getCurrentRoutePath())
    const savedRouteLang = localStorage.getItem(routeKey)
    const savedGlobalLang = localStorage.getItem('site_lang')
    const saved = savedRouteLang || savedGlobalLang
    if (saved && saved !== 'en') {
      applyLanguage(saved)
    } else if (pendingLang) {
      applyLanguage(pendingLang)
    }
  }

  function setLoading(isLoading: boolean) {
    const select = document.getElementById(LANG_SELECT_ID)
    const container = select?.closest('.lang-select')
    if (!container) return
    container.classList.toggle('is-loading', isLoading)
  }

  function getGoogTransCookie() {
    const match = document.cookie.match(/(?:^|; )googtrans=([^;]+)/)
    return match ? decodeURIComponent(match[1]) : null
  }

  function isLangApplied(lang: string) {
    const htmlLang = document.documentElement.lang
    if (htmlLang && htmlLang.startsWith(lang)) return true
    const cookie = getGoogTransCookie()
    return Boolean(cookie && cookie.endsWith(`/${lang}`))
  }

  function waitForLangApplied(lang: string) {
    if (loadingTimer) window.clearInterval(loadingTimer)
    let tries = 0
    loadingTimer = window.setInterval(() => {
      tries += 1
      if (isLangApplied(lang) || tries >= 20) {
        if (loadingTimer) window.clearInterval(loadingTimer)
        loadingTimer = null
        setLoading(false)
      }
    }, 150)
  }

  function applyLanguage(lang: string) {
    const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo')

    if (!combo) {
      pendingLang = lang
      setTimeout(() => applyLanguage(lang), 400)
      return
    }

    setLoading(true)
    combo.value = lang
    combo.dispatchEvent(new Event('change'))
    waitForLangApplied(lang)
  }

  function setSelectValue(lang: string) {
    const select = document.getElementById(LANG_SELECT_ID) as
      | HTMLSelectElement
      | null
    if (!select) return
    select.value = lang
  }

  document.addEventListener('change', (event) => {
    const target = event.target as HTMLElement | null
    if (!target || target.id !== LANG_SELECT_ID) return
    const select = target as HTMLSelectElement
    const lang = select.value
    localStorage.setItem('site_lang', lang)
    const routeKey = getRouteLangKey(getCurrentRoutePath())
    localStorage.setItem(routeKey, lang)
    applyLanguage(lang)
  })

  // Création du container caché
  if (!document.getElementById(GOOGLE_DIV_ID)) {
    const div = document.createElement('div')
    div.id = GOOGLE_DIV_ID
    div.style.display = 'none'
    document.body.appendChild(div)
  }

  // Chargement du script Google
  const script = document.createElement('script')
  script.src =
    '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  document.head.appendChild(script)

  const initialRouteKey = getRouteLangKey(getCurrentRoutePath())
  const savedRouteLang = localStorage.getItem(initialRouteKey)
  const initialGlobalLang = localStorage.getItem('site_lang')
  const initialLang = savedRouteLang || initialGlobalLang
  if (initialLang) setSelectValue(initialLang)

  try {
    const router = useRouter()
    router.afterEach((to) => {
      const routeKey = getRouteLangKey(to.path || '/')
      const routeLang = localStorage.getItem(routeKey)
      if (routeLang) {
        setSelectValue(routeLang)
        applyLanguage(routeLang)
        return
      }
      const currentGlobalLang = localStorage.getItem('site_lang')
      if (currentGlobalLang) {
        setSelectValue(currentGlobalLang)
        applyLanguage(currentGlobalLang)
      }
    })
  } catch {
    // no-op: router not available
  }
})
