// ============================================
// ACCESSIBILITY HOOKS
// ============================================
// ARIA labels, keyboard navigation y focus management

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook para manejo de focus en componentes
 */
export function useFocusManagement(initialFocus = null) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const focusableElements = useRef([]);
  const containerRef = useRef(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    
    const selector = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');
    
    return Array.from(containerRef.current.querySelectorAll(selector));
  }, []);

  const focusElement = useCallback((index) => {
    const elements = getFocusableElements();
    if (elements[index]) {
      elements[index].focus();
      setFocusedIndex(index);
    }
  }, [getFocusableElements]);

  const focusFirst = useCallback(() => focusElement(0), [focusElement]);
  const focusLast = useCallback(() => {
    const elements = getFocusableElements();
    focusElement(elements.length - 1);
  }, [focusElement, getFocusableElements]);

  const focusNext = useCallback(() => {
    const elements = getFocusableElements();
    const nextIndex = (focusedIndex + 1) % elements.length;
    focusElement(nextIndex);
  }, [focusedIndex, focusElement, getFocusableElements]);

  const focusPrevious = useCallback(() => {
    const elements = getFocusableElements();
    const prevIndex = focusedIndex === 0 ? elements.length - 1 : focusedIndex - 1;
    focusElement(prevIndex);
  }, [focusedIndex, focusElement, getFocusableElements]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'Tab':
        if (e.shiftKey) {
          e.preventDefault();
          focusPrevious();
        } else {
          e.preventDefault();
          focusNext();
        }
        break;
      case 'Home':
        e.preventDefault();
        focusFirst();
        break;
      case 'End':
        e.preventDefault();
        focusLast();
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        focusNext();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        focusPrevious();
        break;
    }
  }, [focusNext, focusPrevious, focusFirst, focusLast]);

  // Focus inicial
  useEffect(() => {
    if (initialFocus === 'first') {
      focusFirst();
    } else if (typeof initialFocus === 'number') {
      focusElement(initialFocus);
    }
  }, [initialFocus, focusFirst, focusElement]);

  return {
    containerRef,
    focusedIndex,
    focusElement,
    focusFirst,
    focusLast,
    focusNext,
    focusPrevious,
    handleKeyDown,
    getFocusableElements
  };
}

/**
 * Hook para anuncios de screen reader
 */
export function useAnnouncer() {
  const announcerRef = useRef(null);

  const announce = useCallback((message, priority = 'polite') => {
    if (!announcerRef.current) return;
    
    announcerRef.current.textContent = '';
    announcerRef.current.setAttribute('aria-live', priority);
    
    // Forzar repaint
    announcerRef.current.offsetHeight;
    
    announcerRef.current.textContent = message;
  }, []);

  const announcePolite = useCallback((message) => announce(message, 'polite'), [announce]);
  const announceAssertive = useCallback((message) => announce(message, 'assertive'), [announce]);

  return {
    announcerRef,
    announce,
    announcePolite,
    announceAssertive
  };
}

/**
 * Hook para shortcuts de teclado
 */
export function useKeyboardShortcuts(shortcuts) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = [];
      
      if (e.ctrlKey || e.metaKey) key.push('ctrl');
      if (e.shiftKey) key.push('shift');
      if (e.altKey) key.push('alt');
      key.push(e.key.toLowerCase());
      
      const shortcut = key.join('+');
      
      if (shortcuts[shortcut]) {
        e.preventDefault();
        shortcuts[shortcut](e);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

/**
 * Hook para manejo de ARIA labels dinámicas
 */
export function useAria(initialState = {}) {
  const [ariaAttributes, setAriaAttributes] = useState(initialState);

  const updateAria = useCallback((updates) => {
    setAriaAttributes(prev => ({ ...prev, ...updates }));
  }, []);

  const getAriaProps = useCallback((element) => {
    return Object.keys(ariaAttributes)
      .filter(key => key.startsWith(element))
      .reduce((props, key) => {
        const ariaKey = key.replace(element, '').toLowerCase();
        props[`aria-${ariaKey}`] = ariaAttributes[key];
        return props;
      }, {});
  }, [ariaAttributes]);

  return {
    ariaAttributes,
    updateAria,
    getAriaProps
  };
}

/**
 * Hook para detección de preferencias de accesibilidad
 */
export function useAccessibilityPreferences() {
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    highContrast: false,
    prefersDark: false,
    fontSize: 'normal'
  });

  useEffect(() => {
    // Detectar preferencia de movimiento reducido
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reducedMotion = motionQuery.matches;
    
    // Detectar preferencia de alto contraste
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    const highContrast = contrastQuery.matches;
    
    // Detectar preferencia de tema oscuro
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDark = darkQuery.matches;
    
    // Detectar tamaño de fuente preferido
    const fontSize = window.getComputedStyle(document.documentElement)
      .getPropertyValue('font-size').trim();

    setPreferences({
      reducedMotion,
      highContrast,
      prefersDark,
      fontSize
    });

    // Listeners para cambios
    const handleMotionChange = (e) => setPreferences(prev => ({ ...prev, reducedMotion: e.matches }));
    const handleContrastChange = (e) => setPreferences(prev => ({ ...prev, highContrast: e.matches }));
    const handleDarkChange = (e) => setPreferences(prev => ({ ...prev, prefersDark: e.matches }));

    motionQuery.addEventListener('change', handleMotionChange);
    contrastQuery.addEventListener('change', handleContrastChange);
    darkQuery.addEventListener('change', handleDarkChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
      darkQuery.removeEventListener('change', handleDarkChange);
    };
  }, []);

  return preferences;
}

/**
 * Hook para validación de contraste de colores
 */
export function useColorContrast() {
  const calculateContrast = useCallback((color1, color2) => {
    // Convertir hex a RGB
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 0;

    // Calcular luminancia relativa
    const getLuminance = (r, g, b) => {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  }, []);

  const getContrastLevel = useCallback((ratio) => {
    if (ratio >= 7) return 'AAA';
    if (ratio >= 4.5) return 'AA';
    if (ratio >= 3) return 'AA Large';
    return 'Fail';
  }, []);

  return {
    calculateContrast,
    getContrastLevel
  };
}

/**
 * Hook para manejo de skip links
 */
export function useSkipLinks() {
  const [skipLinks, setSkipLinks] = useState([]);

  const addSkipLink = useCallback((href, text) => {
    setSkipLinks(prev => [...prev, { href, text, id: `skip-${Date.now()}` }]);
  }, []);

  const removeSkipLink = useCallback((id) => {
    setSkipLinks(prev => prev.filter(link => link.id !== id));
  }, []);

  return {
    skipLinks,
    addSkipLink,
    removeSkipLink
  };
}
