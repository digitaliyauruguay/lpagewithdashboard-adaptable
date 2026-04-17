import { useState, useEffect, useCallback } from 'react';
import { validateContactForm, validateEmail, validatePhone, validateName } from '../lib/validation.js';

/**
 * Hook para validación de formularios en tiempo real
 */
export function useFormValidation(initialValues, validationRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validar un campo específico
  const validateField = useCallback((name, value) => {
    const fieldRules = validationRules[name];
    if (!fieldRules) return '';

    // Validaciones personalizadas
    if (fieldRules.required && (!value || value.trim() === '')) {
      return fieldRules.requiredMessage || 'Este campo es requerido';
    }

    if (fieldRules.minLength && value.length < fieldRules.minLength) {
      return `Mínimo ${fieldRules.minLength} caracteres`;
    }

    if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
      return `Máximo ${fieldRules.maxLength} caracteres`;
    }

    if (fieldRules.email && !validateEmail(value)) {
      return 'Email inválido';
    }

    if (fieldRules.phone && !validatePhone(value)) {
      return 'Teléfono inválido';
    }

    if (fieldRules.name && !validateName(value)) {
      return 'Nombre inválido';
    }

    if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
      return fieldRules.patternMessage || 'Formato inválido';
    }

    if (fieldRules.custom && typeof fieldRules.custom === 'function') {
      const customError = fieldRules.custom(value, values);
      if (customError) return customError;
    }

    return '';
  }, [validationRules, values]);

  // Validar todo el formulario
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules, validateField]);

  // Actualizar valor de un campo
  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  // Manejar cambio de input
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValue(name, type === 'checkbox' ? checked : value);
  }, [setValue]);

  // Manejar blur (campo tocado)
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [values, validateField]);

  // Manejar submit
  const handleSubmit = useCallback(async (onSubmit) => {
    // Marcar todos los campos como tocados
    const allTouched = Object.keys(validationRules).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validar formulario
    const isValid = validateForm();
    
    if (!isValid) {
      return false;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
      return true;
    } catch (error) {
      console.error('Submit error:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validationRules, validateForm]);

  // Resetear formulario
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Estado del formulario
  const isValid = Object.keys(errors).length === 0;
  const isDirty = Object.keys(touched).length > 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    setValue,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validateForm
  };
}

/**
 * Hook específico para formulario de contacto
 */
export function useContactForm() {
  const initialValues = {
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  };

  const validationRules = {
    name: {
      required: true,
      name: true,
      minLength: 2,
      maxLength: 50,
      requiredMessage: 'Nombre es requerido'
    },
    phone: {
      required: true,
      phone: true,
      requiredMessage: 'Teléfono es requerido'
    },
    email: {
      email: true
    },
    service: {
      required: true,
      requiredMessage: 'Debe seleccionar un servicio'
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 1000,
      requiredMessage: 'Mensaje es requerido'
    }
  };

  return useFormValidation(initialValues, validationRules);
}

/**
 * Hook para formulario de login
 */
export function useLoginForm() {
  const initialValues = {
    username: '',
    password: ''
  };

  const validationRules = {
    username: {
      required: true,
      minLength: 3,
      requiredMessage: 'Usuario es requerido'
    },
    password: {
      required: true,
      minLength: 4,
      requiredMessage: 'Contraseña es requerida'
    }
  };

  return useFormValidation(initialValues, validationRules);
}
