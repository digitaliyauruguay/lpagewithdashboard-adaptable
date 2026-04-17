// ============================================
// LAZY LOADING UTILITIES
// ============================================
// Code splitting y lazy loading optimizado

import { lazy } from 'react';

// Lazy loading de componentes pesados
export const LazyDashboard = lazy(() => 
  import('../app/pages/Dashboard').then(module => ({
    default: module.default
  }))
);

export const LazyLogin = lazy(() => 
  import('../app/pages/Login').then(module => ({
    default: module.default
  }))
);

export const LazyContactForm = lazy(() => 
  import('../app/components/ContactForm').then(module => ({
    default: module.default
  }))
);

export const LazyHeroCarousel = lazy(() => 
  import('../app/components/HeroCarousel').then(module => ({
    default: module.default
  }))
);

// Preload estratégico de componentes
export function preloadComponent(componentLoader) {
  return componentLoader();
}

// Preload de componentes críticos
export function preloadCriticalComponents() {
  // Preload dashboard si el usuario está autenticado
  if (localStorage.getItem('landing_auth_token')) {
    preloadComponent(() => import('../app/pages/Dashboard'));
  }
  
  // Preload formulario de contacto cuando el usuario scrollea near contacto
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        preloadComponent(() => import('../app/components/ContactForm'));
        observer.disconnect();
      }
    });
  });
  
  const contactoSection = document.getElementById('contacto');
  if (contactoSection) {
    observer.observe(contactoSection);
  }
}

// Dynamic imports para librerías pesadas
export const loadChartLibrary = () => import('recharts');
export const loadMotionLibrary = () => import('framer-motion');
export const loadDateLibrary = () => import('date-fns');

// Carga condicional de librerías
export async function loadLibraryIfNeeded(condition, loader) {
  if (condition) {
    try {
      const module = await loader();
      return module;
    } catch (error) {
      console.error('Error loading library:', error);
      return null;
    }
  }
  return null;
}
