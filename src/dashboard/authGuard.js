import { supabase } from '../supabaseClient.js';

/**
 * Verifica sesión activa. Si no hay sesión, redirige de inmediato a "/".
 * Devuelve el usuario autenticado cuando la sesión es válida.
 */
export async function requireSession() {
  const { data, error } = await supabase.auth.getSession();
  const session = data?.session;
  if (error || !session) {
    window.location.replace('/');
    return null;
  }
  return session.user;
}

/** Escucha cierres de sesión mientras el dashboard está abierto y redirige. */
export function watchSession() {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || !session) {
      window.location.replace('/');
    }
  });
}
