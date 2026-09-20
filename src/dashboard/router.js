import { getLang } from '../i18n/i18n.js';

const TABS = ['overview', 'fishdex', 'gallery', 'ranking', 'settings'];

let currentTab = 'overview';
const renderers = {};

export function registerTab(id, renderFn) {
  renderers[id] = renderFn;
}

export function getCurrentTab() { return currentTab; }

function tabFromHash() {
  const hash = window.location.hash.replace('#', '');
  return TABS.includes(hash) ? hash : 'overview';
}

export async function renderTab(id) {
  currentTab = TABS.includes(id) ? id : 'overview';
  window.location.hash = currentTab;

  document.querySelectorAll('.wf-tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === currentTab);
    btn.setAttribute('aria-selected', btn.dataset.tab === currentTab ? 'true' : 'false');
  });

  const outlet = document.getElementById('dash-outlet');
  const loadingText = getLang() === 'es' ? 'Cargando…' : 'Loading…';
  outlet.innerHTML = `<div class="wf-loading"><span class="wf-spinner"></span><span>${loadingText}</span></div>`;

  const renderFn = renderers[currentTab];
  if (renderFn) {
    await renderFn(outlet);
  }
}

export function initRouter() {
  document.querySelectorAll('.wf-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => renderTab(btn.dataset.tab));
  });
  window.addEventListener('hashchange', () => renderTab(tabFromHash()));
  renderTab(tabFromHash());
}
