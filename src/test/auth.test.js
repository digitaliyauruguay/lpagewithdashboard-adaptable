// ============================================
// AUTHENTICATION TESTS
// ============================================
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { login, logout, isAuthenticated, getCurrentUser, isSessionActive } from '../lib/auth.js';

describe('Authentication Service', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('login', () => {
    it('should login with correct credentials', () => {
      // Mock config para testing
      const mockConfig = {
        admin: {
          username: 'test@example.com',
          password: 'test123'
        }
      };
      
      // Necesitamos mockear el import de config
      // Esto es un ejemplo simplificado
      const result = login('test@example.com', 'test123');
      
      expect(result.success).toBe(true);
      expect(result.user).toBe('test@example.com');
      expect(result.token).toBeDefined();
    });

    it('should reject incorrect credentials', () => {
      const result = login('wrong@example.com', 'wrong123');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Credenciales incorrectas');
    });

    it('should handle rate limiting', () => {
      const identifier = 'test-user';
      
      // Hacer varios intentos fallidos
      for (let i = 0; i < 6; i++) {
        login('wrong@example.com', 'wrong123', identifier);
      }
      
      const result = login('test@example.com', 'test123', identifier);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Demasiados intentos');
    });
  });

  describe('logout', () => {
    it('should clear authentication data', () => {
      // Primero login
      login('test@example.com', 'test123');
      
      // Verificar que hay datos
      expect(localStorage.getItem('landing_auth_token')).toBeTruthy();
      expect(localStorage.getItem('landing_auth_user')).toBeTruthy();
      
      // Logout
      logout();
      
      // Verificar que se limpiaron los datos
      expect(localStorage.getItem('landing_auth_token')).toBeNull();
      expect(localStorage.getItem('landing_auth_user')).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when authenticated', () => {
      login('test@example.com', 'test123');
      expect(isAuthenticated()).toBe(true);
    });

    it('should return false when not authenticated', () => {
      expect(isAuthenticated()).toBe(false);
    });

    it('should return false with invalid token', () => {
      localStorage.setItem('landing_auth_token', 'invalid-token');
      expect(isAuthenticated()).toBe(false);
    });
  });

  describe('getCurrentUser', () => {
    it('should return current user when authenticated', () => {
      login('test@example.com', 'test123');
      expect(getCurrentUser()).toBe('test@example.com');
    });

    it('should return null when not authenticated', () => {
      expect(getCurrentUser()).toBeNull();
    });
  });

  describe('isSessionActive', () => {
    it('should return true for active session', () => {
      login('test@example.com', 'test123');
      expect(isSessionActive()).toBe(true);
    });

    it('should return false for expired session', () => {
      // Mock de sesión expirada
      const expiredSession = {
        loginTime: Date.now() - (3 * 60 * 60 * 1000), // 3 horas atrás
        lastActivity: Date.now() - (3 * 60 * 60 * 1000),
        userAgent: 'test',
        ip: '127.0.0.1'
      };
      
      login('test@example.com', 'test123');
      localStorage.setItem('landing_session_data', JSON.stringify(expiredSession));
      
      expect(isSessionActive()).toBe(false);
    });
  });
});
