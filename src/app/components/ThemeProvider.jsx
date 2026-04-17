// ============================================
// THEME PROVIDER
// ============================================
// Aplica el tema del preset activo usando CSS variables

import { useEffect } from 'react';
import { config } from '../../config/activePreset';

export function ThemeProvider({ children }) {
  useEffect(() => {
    // Aplicar variables CSS del tema
    const root = document.documentElement;
    
    root.style.setProperty('--color-primary', config.theme.primary);
    root.style.setProperty('--color-primary-hover', config.theme.primaryHover);
    root.style.setProperty('--color-secondary', config.theme.secondary);
    root.style.setProperty('--color-accent', config.theme.accent);
    root.style.setProperty('--color-dark', config.theme.dark);
    root.style.setProperty('--color-light', config.theme.light);
  }, []);

  return <>{children}</>;
}

export default ThemeProvider;
