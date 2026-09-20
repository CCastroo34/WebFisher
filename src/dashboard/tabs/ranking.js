import { LEADERBOARD_USERNAMES, AVATARS, FISH } from '../data.js';
import { getLang } from '../../i18n/i18n.js';
import { escapeHtml } from '../../utils/sanitize.js';

const MEDALS = { 1: '🥇', 2: '🥈', 3: '🥉' };

// El ranking real todavía no existe en el backend: se genera una vez por
// sesión un Top 50 temporal con datos aleatorios para poblar la UI.
let cachedLeaderboard = null;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateLeaderboard() {
  if (cachedLeaderboard) return cachedLeaderboard;

  const usedCatches = new Set();
  const entries = LEADERBOARD_USERNAMES.map((name) => {
    let catches;
    do {
      catches = randomInt(38, 940);
    } while (usedCatches.has(catches));
    usedCatches.add(catches);

    return {
      name,
      avatar: AVATARS[randomInt(0, AVATARS.length - 1)],
      favoriteFishId: FISH[randomInt(0, FISH.length - 1)].id,
      catches
    };
  });

  entries.sort((a, b) => b.catches - a.catches);
  cachedLeaderboard = entries.map((entry, i) => ({ ...entry, rank: i + 1 }));
  return cachedLeaderboard;
}

export function renderRanking(outlet) {
  const lang = getLang();
  const leaderboard = generateLeaderboard();

  outlet.innerHTML = `
    <div class="dash-card wf-ranking-card">
      <div class="wf-fishdex-head">
        <h3 class="dash-card-title">🏆 ${lang === 'es' ? 'Ranking en vivo — Top 50' : 'Live Ranking — Top 50'}</h3>
        <span class="wf-fishdex-progress">${lang === 'es' ? 'Datos de muestra' : 'Sample data'}</span>
      </div>
      <div class="wf-leaderboard-head">
        <span>${lang === 'es' ? 'Puesto' : 'Rank'}</span>
        <span></span>
        <span>${lang === 'es' ? 'Jugador' : 'Player'}</span>
        <span>${lang === 'es' ? 'Favorito' : 'Favorite'}</span>
        <span>${lang === 'es' ? 'Capturas' : 'Catches'}</span>
      </div>
      <div class="wf-leaderboard">
        ${leaderboard.map((p) => {
          const fish = FISH.find((f) => f.id === p.favoriteFishId);
          const fishName = fish ? (lang === 'es' ? fish.name_es : fish.name_en) : '—';
          return `
            <div class="wf-rank-row ${p.rank <= 3 ? 'podium' : ''}">
              <span class="wf-rank-pos">${MEDALS[p.rank] || `#${p.rank}`}</span>
              <span class="wf-rank-avatar">${p.avatar.emoji}</span>
              <span class="wf-rank-name">${escapeHtml(p.name)}</span>
              <span class="wf-rank-fav">${escapeHtml(fishName)}</span>
              <span class="wf-rank-catches">${p.catches.toLocaleString(lang === 'es' ? 'es-MX' : 'en-US')} ${lang === 'es' ? 'capturas' : 'catches'}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
