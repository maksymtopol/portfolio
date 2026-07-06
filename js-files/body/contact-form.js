import { translations } from '../i18n/translations.js';
import { getCurrentLanguage } from '../i18n/i18n.js';

const ENDPOINT = 'https://api.web3forms.com/submit';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const button = form.querySelector('.contact-form__submit');
  const status = form.querySelector('.contact-form__status');

  const t = (key) => {
    const dict = translations[getCurrentLanguage()] || translations.en;
    return dict[key] || translations.en[key] || '';
  };

  const setStatus = (key, state) => {
    status.textContent = key ? t(key) : '';
    status.classList.remove('is-success', 'is-error');
    if (state) status.classList.add(state);
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // honeypot: bots tick the hidden box, real users never see it
    if (form.botcheck && form.botcheck.checked) return;

    button.disabled = true;
    button.textContent = t('contact.formSending');
    setStatus('');

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await response.json();

      if (data.success) {
        form.reset();
        setStatus('contact.formSuccess', 'is-success');
      } else {
        setStatus('contact.formError', 'is-error');
      }
    } catch (error) {
      setStatus('contact.formError', 'is-error');
    } finally {
      button.disabled = false;
      button.textContent = t('contact.formSend');
    }
  });
}
