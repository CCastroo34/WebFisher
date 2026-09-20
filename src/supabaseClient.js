import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // No exponemos valores, solo advertimos en consola de desarrollo.
  console.warn('[Supabase] Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY en el entorno.');
}

export const supabase = createClient(url ?? '', anonKey ?? '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
