import './styles/main.css';
import { initI18n, toggleLang } from './i18n/i18n.js';
import { initLiveCounters, initFadeIn, initAutoplayFix } from './components/liveCounters.js';
import { initDownloadModal } from './components/downloadModal.js';
import { initAuth, openAuthModal, closeAuthModal, getCachedUser } from './auth/authModal.js';
import { renderAuthArea } from './components/authHeader.js';
import { logoutUser } from './auth/authService.js';
import { isValidEmail, sanitizeInput } from './utils/sanitize.js';

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initAutoplayFix();
  initLiveCounters();
  initFadeIn();
  initDownloadModal();

  document.getElementById('lang-toggle')?.addEventListener('click', toggleLang);

  // Auth: estado + apertura de modal desde el header
  initAuth((user) => renderAuthArea(user));
  renderAuthArea(getCachedUser());

  document.addEventListener('wf-open-login', () => openAuthModal('login'));
  document.addEventListener('wf-open-register', () => openAuthModal('register'));
  document.addEventListener('wf-logout', () => logoutUser());

  // Formulario de contacto (front-end only, sin backend propio expuesto)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('contact-status');
      const email = sanitizeInput(contactForm.email.value);
      const message = sanitizeInput(contactForm.message.value);
      status.className = 'form-status';
      if (!isValidEmail(email) || message.length < 5) {
        status.textContent = 'Revisa tu correo y escribe un mensaje válido.';
        status.classList.add('err');
        return;
      }
      status.textContent = '¡Gracias! Te responderemos pronto a ' + email + '.';
      status.classList.add('ok');
      contactForm.reset();
    });
  }
});
