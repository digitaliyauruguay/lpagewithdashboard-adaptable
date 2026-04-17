// ============================================
// AUTHENTICATION SERVICE (Simple)
// ============================================
// Sistema simple de autenticación con credenciales
// en el preset. Para v2 migrar a DB.
// ============================================

import { config } from '../config/activePreset.js';

const AUTH_KEY = 'landing_auth_token';

/**
 * Login con credenciales del preset
 */
export function login(username, password) {
  const { admin } = config;

  if (username === admin.username && password === admin.password) {
    // Crear token simple (timestamp + hash)
    const token = btoa(`${username}:${Date.now()}`);
    
    // Guardar en localStorage
    localStorage.setItem(AUTH_KEY, token);
    localStorage.setItem('landing_auth_user', username);

    console.log('✅ Login exitoso:', username);
    return { success: true, user: username };
  }

  console.warn('❌ Login fallido');
  return { success: false, error: 'Credenciales incorrectas' };
}

/**
 * Logout
 */
export function logout() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem('landing_auth_user');
  console.log('👋 Logout exitoso');
}

/**
 * Verificar si el usuario está autenticado
 */
export function isAuthenticated() {
  const token = localStorage.getItem(AUTH_KEY);
  return !!token;
}

/**
 * Obtener usuario actual
 */
export function getCurrentUser() {
  if (!isAuthenticated()) return null;
  return localStorage.getItem('landing_auth_user');
}

/**
 * Middleware de autenticación para proteger rutas
 */
export function requireAuth() {
  if (!isAuthenticated()) {
    return false;
  }
  return true;
}

export default {
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
  requireAuth,
};
