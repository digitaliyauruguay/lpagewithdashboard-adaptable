// ============================================
// DETECCIÓN DE DISPOSITIVO
// ============================================
// Detecta el tipo de dispositivo para optimizar animaciones

import { useState, useEffect } from 'react';

/**
 * Hook para detectar si es mobile/tablet o desktop
 * Retorna: { isMobile, isTablet, isDesktop }
 */
export const useDeviceDetection = () => {
  const [deviceType, setDeviceType] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      
      // Detectar por ancho y user agent
      const isMobileWidth = width < 768;
      const isTabletWidth = width >= 768 && width < 1024;
      const isMobileDevice = /mobile|android|iphone|ipad|tablet/i.test(userAgent);

      setDeviceType({
        isMobile: isMobileWidth || (isMobileDevice && width < 768),
        isTablet: isTabletWidth && isMobileDevice,
        isDesktop: width >= 1024 && !isMobileDevice,
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return deviceType;
};

/**
 * Configuración de animaciones según dispositivo
 * Si es mobile/tablet, usa animaciones más livianas
 */
export const getAnimationConfig = (deviceType) => {
  const { isMobile, isTablet } = deviceType;
  
  if (isMobile || isTablet) {
    // Animaciones LIGERAS para móviles
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, ease: 'easeOut' },
      // Sin blur, sin scale complejo, sin parallax
      enableParallax: false,
      enableBlur: false,
      enableComplexTransforms: false,
    };
  }

  // Animaciones PREMIUM para desktop
  return {
    initial: { opacity: 0, y: 40, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { 
      duration: 0.6, 
      ease: [0.6, -0.05, 0.01, 0.99],
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
    enableParallax: true,
    enableBlur: true,
    enableComplexTransforms: true,
  };
};

/**
 * Scroll suave multiplataforma
 */
export const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });
  }
};
