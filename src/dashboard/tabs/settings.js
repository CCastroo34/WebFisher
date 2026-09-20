import { AVATARS, FISH } from '../data.js';
import { getLang } from '../../i18n/i18n.js';
import { escapeHtml, sanitizeInput, isValidPassword } from '../../utils/sanitize.js';
import { supabase } from '../../supabaseClient.js';

function setStatus(el, text, ok) {
  el.textContent = text;
  el.className = `form-status ${ok ? 'ok' : 'err'}`;
}

export function renderSettings(outlet, user) {
  const lang = getLang();
  const currentUsername = escapeHtml(user?.user_metadata?.username || '');
  const currentAvatar = user?.user_metadata?.avatar || 'cat';
  const currentFavFish = user?.user_metadata?.favorite_fish || FISH[0].id;

  outlet.innerHTML = `
    <div class="dash-grid">
      <section class="dash-card">
        <h3 class="dash-card-title">👤 ${lang === 'es' ? 'Perfil' : 'Profile'}</h3>
        <form id="settings-profile-form" class="wf-settings-form" novalidate>
          <label class="wf-field">
            <span>${lang === 'es' ? 'Nombre público' : 'Public name'}</span>
            <input type="text" name="username" value="${currentUsername}" minlength="3" maxlength="32" required>
          </label>

          <span class="wf-field-label">${lang === 'es' ? 'Avatar mascota' : 'Pet avatar'}</span>
          <div class="wf-avatar-picker" id="avatar-picker" role="radiogroup">
            ${AVATARS.map((a) => `
              <button type="button" class="wf-avatar-option ${a.id === currentAvatar ? 'selected' : ''}"
                data-avatar="${a.id}" role="radio" aria-checked="${a.id === currentAvatar}"
                title="${escapeHtml(lang === 'es' ? a.label_es : a.label_en)}">
                <span>${a.emoji}</span>
              </button>
            `).join('')}
          </div>
          <input type="hidden" name="avatar" id="avatar-value" value="${currentAvatar}">

          <label class="wf-field">
            <span>${lang === 'es' ? 'Pez favorito' : 'Favorite fish'}</span>
            <select name="favorite_fish">
              ${FISH.map((f) => `<option value="${f.id}" ${f.id === currentFavFish ? 'selected' : ''}>${escapeHtml(lang === 'es' ? f.name_es : f.name_en)}</option>`).join('')}
            </select>
          </label>

          <div class="form-status" id="profile-status" role="status"></div>
          <button type="submit" class="btn btn-primary wf-auth-submit" id="profile-submit">
            <span class="wf-auth-spinner" hidden></span>
            <span>${lang === 'es' ? 'Guardar cambios' : 'Save changes'}</span>
          </button>
        </form>
      </section>

      <section class="dash-card">
        <h3 class="dash-card-title">🔒 ${lang === 'es' ? 'Cambiar contraseña' : 'Change password'}</h3>
        <form id="settings-password-form" class="wf-settings-form" novalidate>
          <label class="wf-field">
            <span>${lang === 'es' ? 'Nueva contraseña' : 'New password'}</span>
            <input type="password" name="password" minlength="8" required autocomplete="new-password">
          </label>
          <label class="wf-field">
            <span>${lang === 'es' ? 'Confirmar contraseña' : 'Confirm password'}</span>
            <input type="password" name="password2" minlength="8" required autocomplete="new-password">
          </label>
          <div class="form-status" id="password-status" role="status"></div>
          <button type="submit" class="btn btn-outline wf-auth-submit" id="password-submit">
            <span class="wf-auth-spinner" hidden></span>
            <span>${lang === 'es' ? 'Actualizar contraseña' : 'Update password'}</span>
          </button>
        </form>
      </section>
    </div>
  `;

  // Selector de avatar
  const avatarValue = document.getElementById('avatar-value');
  document.getElementById('avatar-picker').addEventListener('click', (e) => {
    const btn = e.target.closest('.wf-avatar-option');
    if (!btn) return;
    document.querySelectorAll('.wf-avatar-option').forEach((el) => {
      el.classList.remove('selected');
      el.setAttribute('aria-checked', 'false');
    });
    btn.classList.add('selected');
    btn.setAttribute('aria-checked', 'true');
    avatarValue.value = btn.dataset.avatar;
  });

  // Guardar perfil
  const profileForm = document.getElementById('settings-profile-form');
  profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('profile-status');
    const submitBtn = document.getElementById('profile-submit');
    const spinner = submitBtn.querySelector('.wf-auth-spinner');
    status.className = 'form-status';
    submitBtn.disabled = true;
    spinner.hidden = false;

    const fd = new FormData(profileForm);
    const username = sanitizeInput(fd.get('username'));
    if (username.length < 3) {
      setStatus(status, lang === 'es' ? 'El nombre debe tener al menos 3 caracteres.' : 'Name must be at least 3 characters.', false);
      submitBtn.disabled = false; spinner.hidden = true;
      return;
    }

    const { error } = await supabase.auth.updateUser({
      data: { username, avatar: fd.get('avatar'), favorite_fish: fd.get('favorite_fish') }
    });

    submitBtn.disabled = false;
    spinner.hidden = true;
    if (error) {
      setStatus(status, error.message, false);
    } else {
      setStatus(status, lang === 'es' ? 'Perfil actualizado.' : 'Profile updated.', true);
    }
  });

  // Cambiar contraseña
  const passwordForm = document.getElementById('settings-password-form');
  passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('password-status');
    const submitBtn = document.getElementById('password-submit');
    const spinner = submitBtn.querySelector('.wf-auth-spinner');
    status.className = 'form-status';
    submitBtn.disabled = true;
    spinner.hidden = false;

    const fd = new FormData(passwordForm);
    const password = fd.get('password');
    const password2 = fd.get('password2');

    if (!isValidPassword(password)) {
      setStatus(status, lang === 'es' ? 'La contraseña debe tener 8+ caracteres, con letras y números.' : 'Password must be 8+ characters with letters and numbers.', false);
      submitBtn.disabled = false; spinner.hidden = true;
      return;
    }
    if (password !== password2) {
      setStatus(status, lang === 'es' ? 'Las contraseñas no coinciden.' : 'Passwords do not match.', false);
      submitBtn.disabled = false; spinner.hidden = true;
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });
    submitBtn.disabled = false;
    spinner.hidden = true;
    if (error) {
      setStatus(status, error.message, false);
    } else {
      setStatus(status, lang === 'es' ? 'Contraseña actualizada.' : 'Password updated.', true);
      passwordForm.reset();
    }
  });
}
