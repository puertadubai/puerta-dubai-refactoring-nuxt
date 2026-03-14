export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const SUPPORTED_LANGS = ['en', 'fr', 'es', 'pt'] as const
  const DEFAULT_LANG = 'en'
  const STORAGE_KEY = 'site_lang'
  const GOOGLE_DIV_ID = 'google_translate_element'
  const LANG_SELECT_ID = 'language'
  const RESET_FLAG = 'site_lang:english_reset'

  let pendingLang: string | null = null
  let loadingTimer: number | null = null

  const sanitizeLang = (value: string | null) =>
    SUPPORTED_LANGS.includes((value || '') as (typeof SUPPORTED_LANGS)[number])
      ? value || DEFAULT_LANG
      : DEFAULT_LANG

  const getSavedLang = () => sanitizeLang(localStorage.getItem(STORAGE_KEY))

  const setSavedLang = (lang: string) => {
    localStorage.setItem(STORAGE_KEY, sanitizeLang(lang))
  }

  const setSelectValue = (lang: string, attempts = 8) => {
    const select = document.getElementById(LANG_SELECT_ID) as HTMLSelectElement | null
    if (!select) {
      if (attempts > 0) {
        window.setTimeout(() => setSelectValue(lang, attempts - 1), 120)
      }
      return
    }
    select.value = sanitizeLang(lang)
  }

  const setLoading = (isLoading: boolean) => {
    const select = document.getElementById(LANG_SELECT_ID)
    const container = select?.closest('.lang-select')
    if (!container) return
    container.classList.toggle('is-loading', isLoading)
  }

  const getGoogTransCookie = () => {
    const match = document.cookie.match(/(?:^|; )googtrans=([^;]+)/)
    return match ? decodeURIComponent(match[1]) : null
  }

  const clearGoogTransCookie = () => {
    const expires = 'Thu, 01 Jan 1970 00:00:00 GMT'
    const hostname = window.location.hostname
    const domains = Array.from(new Set([hostname, `.${hostname}`]))

    for (const domain of domains) {
      document.cookie = `googtrans=; expires=${expires}; path=/`
      document.cookie = `googtrans=; expires=${expires}; path=/; domain=${domain}`
    }
  }

  const isLangApplied = (lang: string) => {
    const htmlLang = document.documentElement.lang
    if (htmlLang && htmlLang.startsWith(lang)) return true
    const cookie = getGoogTransCookie()
    return Boolean(cookie && cookie.endsWith(`/${lang}`))
  }

  const waitForLangApplied = (lang: string) => {
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

  const applyGoogleLanguage = (lang: string) => {
    const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo')

    if (!combo) {
      pendingLang = lang
      window.setTimeout(() => applyGoogleLanguage(lang), 400)
      return
    }

    setLoading(true)
    combo.value = lang
    combo.dispatchEvent(new Event('change'))
    waitForLangApplied(lang)
  }

  const enforceEnglish = (forceReload = false) => {
    pendingLang = null
    clearGoogTransCookie()
    document.documentElement.lang = DEFAULT_LANG
    document.documentElement.removeAttribute('translate')
    setSelectValue(DEFAULT_LANG)
    setLoading(false)

    if (!forceReload) {
      sessionStorage.removeItem(RESET_FLAG)
      return
    }

    if (sessionStorage.getItem(RESET_FLAG) === '1') {
      sessionStorage.removeItem(RESET_FLAG)
      return
    }

    sessionStorage.setItem(RESET_FLAG, '1')
    window.location.reload()
  }

  const syncLanguage = (lang: string, options?: { allowReload?: boolean }) => {
    const nextLang = sanitizeLang(lang)
    setSavedLang(nextLang)
    setSelectValue(nextLang)

    if (nextLang === DEFAULT_LANG) {
      const cookie = getGoogTransCookie()
      const shouldReload =
        options?.allowReload !== false &&
        Boolean(cookie && !cookie.endsWith(`/${DEFAULT_LANG}`))
      enforceEnglish(shouldReload)
      return
    }

    sessionStorage.removeItem(RESET_FLAG)
    applyGoogleLanguage(nextLang)
  }

  const removeLegacyRouteLangKeys = () => {
    const keysToDelete: string[] = []
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i)
      if (key?.startsWith('site_lang:')) keysToDelete.push(key)
    }
    keysToDelete.forEach((key) => localStorage.removeItem(key))
  }

  ;(window as typeof window & { googleTranslateElementInit?: () => void }).googleTranslateElementInit = () => {
    // @ts-ignore
    new google.translate.TranslateElement(
      {
        pageLanguage: DEFAULT_LANG,
        includedLanguages: SUPPORTED_LANGS.join(','),
        autoDisplay: false
      },
      GOOGLE_DIV_ID
    )

    const initialLang = getSavedLang()
    if (initialLang === DEFAULT_LANG) {
      enforceEnglish(false)
      return
    }

    applyGoogleLanguage(initialLang)
  }

  removeLegacyRouteLangKeys()
  const initialLang = getSavedLang()
  setSelectValue(initialLang)

  document.addEventListener('change', (event) => {
    const target = event.target as HTMLElement | null
    if (!target || target.id !== LANG_SELECT_ID) return
    const select = target as HTMLSelectElement
    syncLanguage(select.value)
  })

  if (!document.getElementById(GOOGLE_DIV_ID)) {
    const div = document.createElement('div')
    div.id = GOOGLE_DIV_ID
    div.style.display = 'none'
    document.body.appendChild(div)
  }

  const script = document.createElement('script')
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  document.head.appendChild(script)

  if (initialLang === DEFAULT_LANG) {
    enforceEnglish(false)
  }

  try {
    const router = useRouter()
    router.afterEach(() => {
      syncLanguage(getSavedLang(), { allowReload: false })
    })
  } catch {
    // no-op: router not available
  }
})
