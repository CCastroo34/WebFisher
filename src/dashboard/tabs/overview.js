import { ACHIEVEMENTS, COMMUNITY_DISCORD_URL, AVATARS } from '../data.js';
import { getLang } from '../../i18n/i18n.js';
import { escapeHtml } from '../../utils/sanitize.js';

export function renderOverview(outlet, user) {
  const lang = getLang();
  const username = escapeHtml(user?.user_metadata?.username || user?.email?.split('@')[0] || 'Pescador');
  const avatarId = user?.user_metadata?.avatar || 'cat';
  const avatarEmoji = AVATARS.find((a) => a.id === avatarId)?.emoji || '🐱';
  const unlockedCount = ACHIEVEMENTS.filter((a) => a.unlocked).length;

  outlet.innerHTML = `
    <div class="dash-grid">
      <section class="dash-card wf-profile-card">
        <div class="wf-profile-avatar">${avatarEmoji}</div>
        <div>
          <h2>${username}</h2>
          <p class="wf-muted">${escapeHtml(user?.email || '')}</p>
          <div class="wf-profile-stats">
            <span>🎣 <strong>128</strong> ${lang === 'es' ? 'capturas' : 'catches'}</span>
            <span>🏆 <strong>${unlockedCount}/${ACHIEVEMENTS.length}</strong> ${lang === 'es' ? 'logros' : 'achievements'}</span>
          </div>
        </div>
      </section>

      <section class="dash-card wf-zone-card">
        <h3 class="dash-card-title">🎣 ${lang === 'es' ? 'Zona de Pesca' : 'Fishing Zone'}</h3>
        <p class="wf-muted">${lang === 'es' ? 'Únete a la comunidad y comparte tus capturas en tiempo real.' : 'Join the community and share your catches in real time.'}</p>
        <a class="btn btn-blue" href="${COMMUNITY_DISCORD_URL}" target="_blank" rel="noopener noreferrer">${lang === 'es' ? 'Ir a Discord' : 'Go to Discord'}</a>
      </section>

      <section class="dash-card">
        <h3 class="dash-card-title">🏆 ${lang === 'es' ? 'Logros' : 'Achievements'}</h3>
        <div class="wf-achv-grid">
          ${ACHIEVEMENTS.map((a) => `
            <div class="wf-achv ${a.unlocked ? 'unlocked' : 'locked'}" title="${escapeHtml(lang === 'es' ? a.desc_es : a.desc_en)}">
              <span class="wf-achv-icon">${a.unlocked ? a.icon : '🔒'}</span>
              <span class="wf-achv-name">${escapeHtml(lang === 'es' ? a.name_es : a.name_en)}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="dash-card wf-promo-banner">
        <div>
          <h3>${lang === 'es' ? '¿Aún no descargas el juego?' : "Haven't downloaded the game yet?"}</h3>
          <p class="wf-muted">${lang === 'es' ? 'Juega en tu escritorio para una mejor experiencia.' : 'Play on desktop for the best experience.'}</p>
        </div>
        <a class="btn btn-primary" href="/#descargar">${lang === 'es' ? 'Descargar Gratis' : 'Download Free'}</a>
      </section>
    </div>
  `;
}
