import { FISH } from '../data.js';
import { getLang } from '../../i18n/i18n.js';
import { escapeHtml } from '../../utils/sanitize.js';

const UNDISCOVERED_SLOTS = 6;

function fishCardHtml(fish, lang) {
  const name = lang === 'es' ? fish.name_es : fish.name_en;
  const desc = lang === 'es' ? fish.desc_es : fish.desc_en;

  if (!fish.discovered) {
    return `
      <div class="wf-fish-card locked rarity-unknown" data-name="${escapeHtml(name.toLowerCase())}">
        <span class="wf-fish-icon">❔</span>
        <span class="wf-fish-name">???</span>
        <span class="wf-fish-rarity">???</span>
      </div>
    `;
  }

  return `
    <div class="wf-fish-card rarity-${fish.rarity.toLowerCase()}" data-name="${escapeHtml(name.toLowerCase())}">
      <span class="wf-fish-icon">${fish.icon}</span>
      <span class="wf-fish-name">${escapeHtml(name)}</span>
      <span class="wf-fish-rarity">${fish.rarity}</span>
      ${desc ? `<p class="wf-fish-desc">${escapeHtml(desc)}</p>` : ''}
    </div>
  `;
}

function unknownSlotHtml() {
  return `
    <div class="wf-fish-card locked rarity-unknown">
      <span class="wf-fish-icon">❔</span>
      <span class="wf-fish-name">???</span>
      <span class="wf-fish-rarity">???</span>
    </div>
  `;
}

export function renderFishdex(outlet) {
  const lang = getLang();
  const placeholder = lang === 'es' ? 'Buscar pez...' : 'Search fish...';
  const discoveredCount = FISH.filter((f) => f.discovered).length;

  outlet.innerHTML = `
    <div class="dash-card wf-fishdex-card">
      <div class="wf-fishdex-head">
        <h3 class="dash-card-title">🐟 Fishdex</h3>
        <span class="wf-fishdex-progress">${discoveredCount}/${FISH.length} ${lang === 'es' ? 'descubiertos' : 'discovered'}</span>
      </div>
      <div class="wf-search-row">
        <input type="search" id="fishdex-search" class="wf-search-input" placeholder="${placeholder}" aria-label="${placeholder}">
        <span class="wf-fishdex-count" id="fishdex-count"></span>
      </div>
      <div class="wf-fish-grid" id="fishdex-grid">
        ${FISH.map((f) => fishCardHtml(f, lang)).join('')}
        ${Array.from({ length: UNDISCOVERED_SLOTS }).map(unknownSlotHtml).join('')}
      </div>
    </div>
  `;

  const input = document.getElementById('fishdex-search');
  const grid = document.getElementById('fishdex-grid');
  const countEl = document.getElementById('fishdex-count');

  function updateCount() {
    const visible = grid.querySelectorAll('.wf-fish-card:not(.wf-hidden)').length;
    countEl.textContent = `${visible}/${grid.children.length}`;
  }

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    grid.querySelectorAll('.wf-fish-card').forEach((card) => {
      const name = card.dataset.name || '';
      const matches = !query || name.includes(query);
      card.classList.toggle('wf-hidden', !matches);
    });
    updateCount();
  });

  updateCount();
}
