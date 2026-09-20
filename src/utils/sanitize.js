/** Escapa HTML para evitar inyección al insertar texto de usuario en el DOM. */
export function escapeHtml(str = '') {
  return String(str).replace(/[&<>"'`=\/]/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
    "'": '&#39;', '`': '&#96;', '=': '&#61;', '/': '&#47;'
  }[c]));
}
export function isValidEmail(email = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
export function isValidPassword(pw = '') {
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(pw);
}
export function sanitizeInput(str = '') {
  return String(str).trim().slice(0, 500);
}
