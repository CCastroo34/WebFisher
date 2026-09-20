let currentLang = localStorage.getItem('wf_lang') || 'es';

export function getLang() { return currentLang; }

export function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('wf_lang', lang);
  document.documentElement.lang = lang;
  applyTranslations();
  document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
}

export function toggleLang() {
  setLang(currentLang === 'es' ? 'en' : 'es');
}

export function applyTranslations(root = document) {
  root.querySelectorAll('[data-es]').forEach((el) => {
    const value = el.getAttribute(`data-${currentLang}`);
    if (value !== null) el.innerHTML = value;
  });
  const label = document.getElementById('lang-label');
  if (label) label.textContent = currentLang.toUpperCase();
}

export function initI18n() {
  document.documentElement.lang = currentLang;
  applyTranslations();
}
