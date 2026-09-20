import { supabase } from '../supabaseClient.js';
import { isValidEmail, isValidPassword, sanitizeInput } from '../utils/sanitize.js';

export async function registerUser({ email, password, username }) {
  email = sanitizeInput(email);
  username = sanitizeInput(username);

  if (!isValidEmail(email)) throw new Error('Correo electrónico no válido.');
  if (!isValidPassword(password)) throw new Error('La contraseña debe tener 8+ caracteres, con letras y números.');
  if (username.length < 3) throw new Error('El nombre de usuario debe tener al menos 3 caracteres.');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } }
  });
  if (error) throw error;
  return data;
}

export async function loginUser({ email, password }) {
  email = sanitizeInput(email);
  if (!isValidEmail(email)) throw new Error('Correo electrónico no válido.');
  if (!password) throw new Error('Ingresa tu contraseña.');

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((_event, session) => callback(session?.user ?? null));
}
