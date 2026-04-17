// ============================================
// VALIDATION TESTS
// ============================================
import { describe, it, expect, beforeEach } from 'vitest';
import { 
  sanitizeText, 
  validateEmail, 
  validatePhone, 
  validateName, 
  validateMessage, 
  validateContactForm,
  RateLimiter,
  detectSuspiciousActivity 
} from '../lib/validation.js';

describe('Validation Library', () => {
  describe('sanitizeText', () => {
    it('should sanitize HTML tags', () => {
      expect(sanitizeText('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    });

    it('should handle null/undefined', () => {
      expect(sanitizeText(null)).toBe('');
      expect(sanitizeText(undefined)).toBe('');
      expect(sanitizeText('')).toBe('');
    });

    it('should trim whitespace', () => {
      expect(sanitizeText('  hello world  ')).toBe('hello world');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('test@domain')).toBe(false);
    });

    it('should handle null/undefined', () => {
      expect(validateEmail(null)).toBe(false);
      expect(validateEmail(undefined)).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('should validate phone numbers', () => {
      expect(validatePhone('+5491112345678')).toBe(true);
      expect(validatePhone('5491112345678')).toBe(true);
      expect(validatePhone('1112345678')).toBe(true);
      expect(validatePhone('(11) 1234-5678')).toBe(true);
    });

    it('should reject invalid phones', () => {
      expect(validatePhone('123')).toBe(false);
      expect(validatePhone('abc')).toBe(false);
      expect(validatePhone('')).toBe(false);
    });
  });

  describe('validateName', () => {
    it('should validate correct names', () => {
      expect(validateName('Juan Pérez')).toBe(true);
      expect(validateName('María García')).toBe(true);
      expect(validateName('José')).toBe(true);
    });

    it('should reject invalid names', () => {
      expect(validateName('123')).toBe(false);
      expect(validateName('Juan123')).toBe(false);
      expect(validateName('')).toBe(false);
      expect(validateName('a')).toBe(false); // Too short
    });
  });

  describe('validateMessage', () => {
    it('should validate correct messages', () => {
      expect(validateMessage('Este es un mensaje válido')).toBe(true);
      expect(validateMessage('a'.repeat(100))).toBe(true);
    });

    it('should reject invalid messages', () => {
      expect(validateMessage('')).toBe(false);
      expect(validateMessage('corto')).toBe(false); // Too short
      expect(validateMessage('a'.repeat(1001))).toBe(false); // Too long
    });
  });

  describe('validateContactForm', () => {
    it('should validate complete correct form', () => {
      const formData = {
        name: 'Juan Pérez',
        phone: '+5491112345678',
        email: 'juan@example.com',
        service: 'Consulta general',
        message: 'Este es un mensaje de prueba válido'
      };

      const result = validateContactForm(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should reject form with errors', () => {
      const formData = {
        name: '',
        phone: '123',
        email: 'invalid',
        service: '',
        message: 'corto'
      };

      const result = validateContactForm(formData);
      expect(result.isValid).toBe(false);
      expect(Object.keys(result.errors)).toContain('name');
      expect(Object.keys(result.errors)).toContain('phone');
      expect(Object.keys(result.errors)).toContain('service');
      expect(Object.keys(result.errors)).toContain('message');
    });

    it('should sanitize form data', () => {
      const formData = {
        name: 'Juan<script>alert("xss")</script>',
        phone: '+54 9 11 1234-5678',
        email: ' JUAN@EXAMPLE.COM ',
        service: 'Consulta <b>general</b>',
        message: 'Mensaje con <em>formato</em>'
      };

      const result = validateContactForm(formData);
      expect(result.sanitized.name).toBe('Juan&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
      expect(result.sanitized.phone).toBe('5491112345678');
      expect(result.sanitized.email).toBe('JUAN@EXAMPLE.COM');
    });
  });

  describe('RateLimiter', () => {
    let rateLimiter;

    beforeEach(() => {
      rateLimiter = new RateLimiter(3, 1000); // 3 intentos en 1 segundo
    });

    it('should allow attempts within limit', () => {
      expect(rateLimiter.isBlocked('user1')).toBe(false);
      rateLimiter.recordAttempt('user1');
      expect(rateLimiter.isBlocked('user1')).toBe(false);
      rateLimiter.recordAttempt('user1');
      expect(rateLimiter.isBlocked('user1')).toBe(false);
    });

    it('should block when limit exceeded', () => {
      rateLimiter.recordAttempt('user1');
      rateLimiter.recordAttempt('user1');
      rateLimiter.recordAttempt('user1');
      expect(rateLimiter.isBlocked('user1')).toBe(true);
    });

    it('should reset after window expires', async () => {
      rateLimiter.recordAttempt('user1');
      rateLimiter.recordAttempt('user1');
      rateLimiter.recordAttempt('user1');
      
      // Wait for window to expire
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      expect(rateLimiter.isBlocked('user1')).toBe(false);
    });

    it('should handle different users independently', () => {
      rateLimiter.recordAttempt('user1');
      rateLimiter.recordAttempt('user1');
      rateLimiter.recordAttempt('user1');
      
      expect(rateLimiter.isBlocked('user1')).toBe(true);
      expect(rateLimiter.isBlocked('user2')).toBe(false);
    });
  });

  describe('detectSuspiciousActivity', () => {
    it('should detect test keywords', () => {
      const formData = { message: 'This is a test message' };
      const result = detectSuspiciousActivity(formData, 'test-agent', '127.0.0.1');
      
      expect(result.isSuspicious).toBe(true);
      expect(result.reasons).toContain('test_keyword');
    });

    it('should detect repeated characters', () => {
      const formData = { message: 'aaaaaaaaaa' };
      const result = detectSuspiciousActivity(formData, 'test-agent', '127.0.0.1');
      
      expect(result.isSuspicious).toBe(true);
      expect(result.reasons).toContain('repeated_chars');
    });

    it('should detect links in message', () => {
      const formData = { message: 'Check out https://example.com' };
      const result = detectSuspiciousActivity(formData, 'test-agent', '127.0.0.1');
      
      expect(result.isSuspicious).toBe(true);
      expect(result.reasons).toContain('contains_links');
    });

    it('should allow clean data', () => {
      const formData = {
        name: 'Juan Pérez',
        message: 'Necesito información sobre sus servicios'
      };
      const result = detectSuspiciousActivity(formData, 'test-agent', '127.0.0.1');
      
      expect(result.isSuspicious).toBe(false);
      expect(result.reasons).toHaveLength(0);
    });
  });
});
