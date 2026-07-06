import { translations } from './js-files/i18n/translations.js';

const STORAGE_KEY = 'lang';
const DEFAULT_LANG = 'en';

export function getCurrentLanguage() {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
}

export function applyLanguage(code) {
  const dict = translations[code] || translations[DEFAULT_LANG];

  document.documentElement.lang = code;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const value = dict[key];
    if (value === undefined) return;
    el.textContent = interpolate(value);
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    const pairs = el.dataset.i18nAttr.split(',');
    pairs.forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      const value = dict[key];
      if (value === undefined) return;
      el.setAttribute(attr, interpolate(value));
    });
  });

  localStorage.setItem(STORAGE_KEY, code);
  markActiveLanguageItem(code);
}

function interpolate(str) {
  return str.replace('{year}', new Date().getFullYear());
}

function markActiveLanguageItem(code) {
  document.querySelectorAll('.language__block-content-item').forEach((item) => {
    const isActive = item.dataset.lang === code;
    item.classList.toggle('disabled', isActive);
    const link = item.querySelector('.language__block-content-link');
    if (link) {
      link.style.pointerEvents = isActive ? 'none' : '';
    }
  });
}

export function initLanguage() {
  applyLanguage(getCurrentLanguage());

  document.querySelectorAll('.language__block-content-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const code = item.dataset.lang;
      if (!code) return;
      applyLanguage(code);
      closeDropdown();
    });
  });
}

function closeDropdown() {
  const checkbox = document.getElementById('button-language-dropdown');
  if (!checkbox) return;
  checkbox.checked = false;
  checkbox.dispatchEvent(new Event('change'));
}
