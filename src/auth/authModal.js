import { registerUser, loginUser, onAuthStateChange, logoutUser } from './authService.js';
import { escapeHtml } from '../utils/sanitize.js';

let mode = 'login'; // 'login' | 'register'
let currentUser = null;

function render() {
  let root = document.getElementById('auth-modal-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'auth-modal-root';
    root.className = 'wf-modal-root';
    root.setAttribute('aria-hidden', 'true');
    document.body.appendChild(root);
  }

  root.innerHTML = `
    <div class="wf-modal-backdrop" data-auth-close></div>
    <div class="wf-modal-panel" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div class="wf-modal-header">
        <h2 id="auth-title">${mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
        <button type="button" class="wf-modal-close" data-auth-close aria-label="Cerrar">&times;</button>
      </div>
      <div class="wf-modal-body">
        <div class="wf-tabs">
          <button type="button" class="wf-tab ${mode === 'login' ? 'active' : ''}" data-mode="login">Iniciar sesión</button>
          <button type="button" class="wf-tab ${mode === 'register' ? 'active' : ''}" data-mode="register">Registrarse</button>
        </div>
        <form id="wf-auth-form" novalidate>
          ${mode === 'register' ? `
          <label class="wf-field">
            <span>Nombre de usuario</span>
            <input type="text" name="username" autocomplete="username" minlength="3" maxlength="32" required />
          </label>` : ''}
          <label class="wf-field">
            <span>Correo electrónico</span>
            <input type="email" name="email" autocomplete="email" required />
          </label>
          <label class="wf-field">
            <span>Contraseña</span>
            <input type="password" name="password" autocomplete="${mode === 'login' ? 'current-password' : 'new-password'}" minlength="8" required />
          </label>
          <div class="wf-auth-error" id="wf-auth-error" role="alert" hidden></div>
          <button type="submit" class="btn btn-primary wf-auth-submit" id="wf-auth-submit">
            <span class="wf-auth-spinner" hidden></span>
            <span class="wf-auth-submit-label">${mode === 'login' ? 'Entrar' : 'Crear cuenta'}</span>
          </button>
        </form>
      </div>
    </div>
  `;

  root.querySelectorAll('[data-auth-close]').forEach((el) => el.addEventListener('click', closeAuthModal));
  root.querySelectorAll('[data-mode]').forEach((el) =>
    el.addEventListener('click', () => { mode = el.dataset.mode; render(); })
  );

  const form = document.getElementById('wf-auth-form');
  form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const errorBox = document.getElementById('wf-auth-error');
  const submitBtn = document.getElementById('wf-auth-submit');
  const spinner = submitBtn.querySelector('.wf-auth-spinner');
  const label = submitBtn.querySelector('.wf-auth-submit-label');

  errorBox.hidden = true;
  errorBox.textContent = '';
  submitBtn.disabled = true;
  spinner.hidden = false;
  label.textContent = 'Procesando…';

  const formData = new FormData(form);
  const payload = {
    email: formData.get('email'),
    password: formData.get('password'),
    username: formData.get('username') || ''
  };

  try {
    if (mode === 'login') {
      await loginUser(payload);
      window.location.href = '/dashboard';
      return;
    } else {
      await registerUser(payload);
      errorBox.hidden = false;
      errorBox.classList.add('wf-auth-success');
      errorBox.textContent = 'Cuenta creada. Revisa tu correo para confirmar tu registro.';
      submitBtn.disabled = false;
      spinner.hidden = true;
      label.textContent = 'Crear cuenta';
      return;
    }
    closeAuthModal();
  } catch (err) {
    errorBox.hidden = false;
    errorBox.classList.remove('wf-auth-success');
    errorBox.textContent = escapeHtml(err.message || 'Ocurrió un error. Intenta de nuevo.');
    submitBtn.disabled = false;
    spinner.hidden = true;
    label.textContent = mode === 'login' ? 'Entrar' : 'Crear cuenta';
  }
}

export function openAuthModal(initialMode = 'login') {
  mode = initialMode;
  render();
  const root = document.getElementById('auth-modal-root');
  root.classList.add('open');
  root.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

export function closeAuthModal() {
  const root = document.getElementById('auth-modal-root');
  if (!root) return;
  root.classList.remove('open');
  root.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

export function initAuth(onUserChange) {
  onAuthStateChange((user) => {
    currentUser = user;
    if (onUserChange) onUserChange(user);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAuthModal();
  });

  document.querySelectorAll('[data-auth-open-login]').forEach((btn) =>
    btn.addEventListener('click', () => openAuthModal('login'))
  );
  document.querySelectorAll('[data-auth-open-register]').forEach((btn) =>
    btn.addEventListener('click', () => openAuthModal('register'))
  );
  document.querySelectorAll('[data-auth-logout]').forEach((btn) =>
    btn.addEventListener('click', async () => { await logoutUser(); })
  );
}

export function getCachedUser() { return currentUser; }
