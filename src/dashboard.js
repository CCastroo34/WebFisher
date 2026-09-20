import './styles/main.css';
import './styles/dashboard.css';
import { requireSession, watchSession } from './dashboard/authGuard.js';
import { initI18n, toggleLang, getLang } from './i18n/i18n.js';
import { initRouter, registerTab, renderTab, getCurrentTab } from './dashboard/router.js';
import { renderOverview } from './dashboard/tabs/overview.js';
import { renderFishdex } from './dashboard/tabs/fishdex.js';
import { renderRanking } from './dashboard/tabs/ranking.js';
import { renderSettings } from './dashboard/tabs/settings.js';
import { renderGallery } from './dashboard/tabs/gallery.js';
import { logoutUser } from './auth/authService.js';
import { escapeHtml } from './utils/sanitize.js';

let currentUser = null;

async function bootstrap() {
  currentUser = await requireSession();
  if (!currentUser) return; // requireSession ya redirigió a "/"

  watchSession();
  initI18n();

  const nameEl = document.getElementById('dash-username');
  if (nameEl) nameEl.textContent = escapeHtml(currentUser.user_metadata?.username || currentUser.email);

  registerTab('overview', (outlet) => renderOverview(outlet, currentUser));
  registerTab('fishdex', (outlet) => renderFishdex(outlet));
  registerTab('ranking', (outlet) => renderRanking(outlet));
  registerTab('settings', (outlet) => renderSettings(outlet, currentUser));
  registerTab('gallery', (outlet) => renderGallery(outlet));

  initRouter();

  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    toggleLang();
    renderTab(getCurrentTab()); // re-renderiza la pestaña activa en el nuevo idioma
  });

  document.getElementById('dash-logout')?.addEventListener('click', async () => {
    const btn = document.getElementById('dash-logout');
    btn.disabled = true;
    await logoutUser();
    // watchSession() se encarga de la redirección a "/"
  });
}

document.addEventListener('DOMContentLoaded', bootstrap);
