import { escapeHtml } from '../utils/sanitize.js';

export function renderAuthArea(user) {
  const area = document.getElementById('auth-area');
  if (!area) return;

  if (user) {
    const name = escapeHtml(user.user_metadata?.username || user.email);
    area.innerHTML = `
      <a href="/dashboard" class="wf-user-pill">👋 ${name}</a>
      <button type="button" class="btn btn-ghost" data-auth-logout data-es="Cerrar sesión" data-en="Log out">Cerrar sesión</button>
    `;
  } else {
    area.innerHTML = `
      <button type="button" class="btn btn-ghost" data-auth-open-login data-es="Iniciar sesión" data-en="Log in">Iniciar sesión</button>
      <button type="button" class="btn btn-outline" data-auth-open-register data-es="Registrarse" data-en="Sign up">Registrarse</button>
    `;
  }

  // Re-bind listeners dinámicos porque el HTML fue reemplazado.
  area.querySelectorAll('[data-auth-open-login]').forEach((b) =>
    b.addEventListener('click', () => document.dispatchEvent(new CustomEvent('wf-open-login'))));
  area.querySelectorAll('[data-auth-open-register]').forEach((b) =>
    b.addEventListener('click', () => document.dispatchEvent(new CustomEvent('wf-open-register'))));
  area.querySelectorAll('[data-auth-logout]').forEach((b) =>
    b.addEventListener('click', () => document.dispatchEvent(new CustomEvent('wf-logout'))));
}
