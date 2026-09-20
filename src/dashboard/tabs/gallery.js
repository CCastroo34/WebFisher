import { GALLERY } from '../data.js';
import { getLang } from '../../i18n/i18n.js';
import { escapeHtml } from '../../utils/sanitize.js';

export function renderGallery(outlet) {
  const lang = getLang();
  outlet.innerHTML = `
    <div class="dash-card">
      <h3 class="dash-card-title">🖼️ ${lang === 'es' ? 'Galería' : 'Gallery'}</h3>
      <div class="wf-gallery-grid">
        ${GALLERY.map((g) => `
          <div class="wf-gallery-item">
            <img src="${g.src}" alt="${escapeHtml(g.alt)}" loading="lazy">
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
