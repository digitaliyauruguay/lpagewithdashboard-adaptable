// ============================================
// AUTHENTICATION SERVICE (Enhanced)
// ============================================
// Sistema mejorado de autenticación con seguridad,
// rate limiting y validaciones robustas.

import { config } from '../config/activePreset.js';
import { loginRateLimiter } from './validation.js';

const AUTH_KEY = 'landing_auth_token';
const USER_KEY = 'landing_auth_user';
const SESSION_KEY = 'landing_session_data';

/**
 * Genera token JWT-like simple
 */
function generateSecureToken(username) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    username,
    iat: Date.now(),
    exp: Date.now() + (24 * 60 * 60 * 1000), // 24 horas
    jti: Math.random().toString(36).substring(2)
  }));
  const signature = btoa(`${header}.${payload}.${config.admin.password}`);
  return `${header}.${payload}.${signature}`;
}

/**
 * Verifica token JWT-like
 */
function verifyToken(token) {
  try {
    const [header, payload, signature] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    
    // Verificar expiración
    if (decodedPayload.exp < Date.now()) {
      return null;
    }
    
    // Verificar firma
    const expectedSignature = btoa(`${header}.${payload}.${config.admin.password}`);
    if (signature !== expectedSignature) {
      return null;
    }
    
    return decodedPayload;
  } catch (error) {
    console.error('Error verificando token:', error);
    return null;
  }
}

/**
 * Login con credenciales del preset y rate limiting
 */
export function login(username, password, identifier = 'default') {
  // Rate limiting check
  if (loginRateLimiter.isBlocked(identifier)) {
    const resetTime = new Date(loginRateLimiter.getResetTime(identifier));
    const remaining = loginRateLimiter.getRemainingAttempts(identifier);
    
    return { 
      success: false, 
      error: `Demasiados intentos. Intenta nuevamente después de ${resetTime.toLocaleTimeString()}`,
      remainingAttempts: remaining,
      resetTime: resetTime.toISOString()
    };
  }

  // Validar inputs
  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    loginRateLimiter.recordAttempt(identifier);
    return { success: false, error: 'Credenciales inválidas' };
  }

  const { admin } = config;

  // Verificar credenciales
  if (username.trim() === admin.username && password === admin.password) {
    // Crear token seguro
    const token = generateSecureToken(username.trim());
    const sessionData = {
      loginTime: Date.now(),
      lastActivity: Date.now(),
      userAgent: navigator.userAgent,
      ip: 'client' // En producción esto vendría del servidor
    };
    
    // Guardar en localStorage
    localStorage.setItem(AUTH_KEY, token);
    localStorage.setItem(USER_KEY, username.trim());
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));

    console.log('¿ Login exitoso:', username);
    return { success: true, user: username.trim(), token };
  }

  // Registrar intento fallido
  loginRateLimiter.recordAttempt(identifier);
  const remaining = loginRateLimiter.getRemainingAttempts(identifier);
  
  console.warn('¿ Login fallido para:', username);
  return { 
    success: false, 
    error: 'Credenciales incorrectas',
    remainingAttempts: remaining
  };
}

/**
 * Logout mejorado
 */
export function logout() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(SESSION_KEY);
  console.log('¿ Logout exitoso');
}

/**
 * Verificar si el usuario está autenticado con token válido
 */
export function isAuthenticated() {
  const token = localStorage.getItem(AUTH_KEY);
  if (!token) return false;
  
  const tokenData = verifyToken(token);
  if (!tokenData) {
    // Token inválido o expirado, limpiar sesión
    logout();
    return false;
  }
  
  // Actualizar última actividad
  updateLastActivity();
  return true;
}

/**
 * Obtener usuario actual con verificación
 */
export function getCurrentUser() {
  if (!isAuthenticated()) return null;
  
  const token = localStorage.getItem(AUTH_KEY);
  const tokenData = verifyToken(token);
  return tokenData ? tokenData.username : null;
}

/**
 * Actualizar última actividad de la sesión
 */
function updateLastActivity() {
  const sessionData = localStorage.getItem(SESSION_KEY);
  if (sessionData) {
    const data = JSON.parse(sessionData);
    data.lastActivity = Date.now();
    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }
}

/**
 * Obtener información de la sesión
 */
export function getSessionInfo() {
  if (!isAuthenticated()) return null;
  
  const sessionData = localStorage.getItem(SESSION_KEY);
  return sessionData ? JSON.parse(sessionData) : null;
}

/**
 * Verificar si la sesión está activa (no expirada por inactividad)
 */
export function isSessionActive(maxInactivity = 2 * 60 * 60 * 1000) { // 2 horas
  const sessionData = getSessionInfo();
  if (!sessionData) return false;
  
  return (Date.now() - sessionData.lastActivity) < maxInactivity;
}

/**
 * Middleware de autenticación para proteger rutas
 */
export function requireAuth() {
  if (!isAuthenticated() || !isSessionActive()) {
    logout();
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
