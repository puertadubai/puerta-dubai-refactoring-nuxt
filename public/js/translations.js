// ======================================================
// translations.js — Google Translate (SPA safe version)
// ======================================================

(function () {
  const SUPPORTED_LANGS = ["en", "fr", "es", "pt"];
  const SELECTOR_ID = "language";
  const GOOGLE_DIV_ID = "google_translate_element";

  let pendingLang = null;
  let hasAppliedInitialLang = false;
  let isTranslating = false;

  // ============================
  // Google init callback
  // ============================
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: SUPPORTED_LANGS.join(","),
        autoDisplay: false,
      },
      GOOGLE_DIV_ID
    );

    const saved = getSavedLang();
    if (saved && saved !== "en" && !hasAppliedInitialLang) {
      hasAppliedInitialLang = true;
      applyLanguage(saved);
    }
  };

  // ============================
  // DOM Ready
  // ============================
  document.addEventListener("DOMContentLoaded", () => {
    // Hidden container for Google
    if (!document.getElementById(GOOGLE_DIV_ID)) {
      const div = document.createElement("div");
      div.id = GOOGLE_DIV_ID;
      div.style.display = "none";
      document.body.appendChild(div);
    }

    const langSelect = document.getElementById(SELECTOR_ID);
    if (!langSelect) return;

    // Restore saved language
    const saved = getSavedLang();
    if (saved && SUPPORTED_LANGS.includes(saved)) {
      langSelect.value = saved;
    }

    // Change handler
    langSelect.addEventListener("change", (e) => {
      const selected = e.target.value;
      if (!SUPPORTED_LANGS.includes(selected)) return;
      if (isTranslating) return;

      saveLang(selected);
      applyLanguage(selected);
    });

    // Load Google script
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(script);
  });

  // ============================
  // Helpers
  // ============================
  function applyLanguage(lang) {
    const combo = document.querySelector(".goog-te-combo");
    const select = document.getElementById(SELECTOR_ID);

    if (!combo) {
      pendingLang = lang;
      setTimeout(() => applyLanguage(lang), 400);
      return;
    }

    isTranslating = true;
    if (select) select.disabled = true;

    combo.value = lang === "en" ? "en" : lang;
    combo.dispatchEvent(new Event("change"));

    // Unlock after stabilization
    setTimeout(() => {
      isTranslating = false;
      if (select) select.disabled = false;
    }, 1200);
  }

  function saveLang(lang) {
    try {
      localStorage.setItem("site_lang", lang);
    } catch (_) {}
  }

  function getSavedLang() {
    try {
      return localStorage.getItem("site_lang") || "en";
    } catch (_) {
      return "en";
    }
  }
})();
