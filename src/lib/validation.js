// ============================================
// VALIDATION & SANITIZATION LIBRARY
// ============================================
// Validaciones robustas y sanitización de inputs

/**
 * Sanitiza texto para prevenir XSS
 */
export function sanitizeText(text) {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Valida email con regex robusto
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email.trim());
}

/**
 * Valida teléfono (formato internacional)
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  
  // Acepta formatos: +5491112345678, 5491112345678, 1112345678
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Valida nombre (solo letras y espacios)
 */
export function validateName(name) {
  if (!name || typeof name !== 'string') return false;
  
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,50}$/;
  return nameRegex.test(name.trim());
}

/**
 * Valida mensaje (longitud y caracteres seguros)
 */
export function validateMessage(message) {
  if (!message || typeof message !== 'string') return false;
  
  const sanitized = sanitizeText(message);
  return sanitized.length >= 10 && sanitized.length <= 1000;
}

/**
 * Validación completa de formulario de contacto
 */
export function validateContactForm(formData) {
  const errors = {};
  
  // Validar nombre
  if (!formData.name || !validateName(formData.name)) {
    errors.name = 'Nombre inválido (solo letras, 2-50 caracteres)';
  }
  
  // Validar teléfono
  if (!formData.phone || !validatePhone(formData.phone)) {
    errors.phone = 'Teléfono inválido';
  }
  
  // Validar email (opcional pero si se proporciona debe ser válido)
  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Email inválido';
  }
  
  // Validar servicio
  if (!formData.service) {
    errors.service = 'Debe seleccionar un servicio';
  }
  
  // Validar mensaje
  if (!formData.message || !validateMessage(formData.message)) {
    errors.message = 'Mensaje inválido (10-1000 caracteres)';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      name: sanitizeText(formData.name),
      phone: formData.phone.replace(/\s/g, '').replace(/[\-\(\)]/g, ''),
      email: formData.email ? formData.email.trim() : '',
      service: sanitizeText(formData.service),
      message: sanitizeText(formData.message),
      source: sanitizeText(formData.source || 'Website')
    }
  };
}

/**
 * Rate limiting simple en memoria
 */
export class RateLimiter {
  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) { // 5 intentos en 15 min
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.attempts = new Map();
  }
  
  isBlocked(identifier) {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Limpiar intentos expirados
    const validAttempts = attempts.filter(time => now - time < this.windowMs);
    this.attempts.set(identifier, validAttempts);
    
    return validAttempts.length >= this.maxAttempts;
  }
  
  recordAttempt(identifier) {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    attempts.push(now);
    this.attempts.set(identifier, attempts);
  }
  
  getRemainingAttempts(identifier) {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    const validAttempts = attempts.filter(time => now - time < this.windowMs);
    return Math.max(0, this.maxAttempts - validAttempts.length);
  }
  
  getResetTime(identifier) {
    const attempts = this.attempts.get(identifier) || [];
    if (attempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...attempts);
    return oldestAttempt + this.windowMs;
  }
}

// Instancia global para rate limiting
export const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // Login
export const contactRateLimiter = new RateLimiter(10, 60 * 1000); // Contacto

/**
 * Detecta patrones sospechosos (bots, spam)
 */
export function detectSuspiciousActivity(formData, userAgent, ip) {
  const suspicious = [];
  
  // Verificar campos vacíos o sospechosos
  if (formData.message && formData.message.toLowerCase().includes('test')) {
    suspicious.push('test_keyword');
  }
  
  // Verificar si todos los campos tienen la misma longitud (posible bot)
  const values = Object.values(formData).filter(v => typeof v === 'string');
  if (values.length > 1 && values.every(v => v.length === values[0].length)) {
    suspicious.push('uniform_lengths');
  }
  
  // Verificar caracteres repetidos
  if (formData.message && formData.message.split('').every(char => char === formData.message[0])) {
    suspicious.push('repeated_chars');
  }
  
  // Verificar links en mensaje (posible spam)
  if (formData.message && /(http[s]?:\/\/|www\.)/.test(formData.message)) {
    suspicious.push('contains_links');
  }
  
  return {
    isSuspicious: suspicious.length > 0,
    reasons: suspicious,
    score: suspicious.length
  };
}
