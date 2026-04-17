import { useState, useEffect } from 'react';

// Hook personalizado para manejar el modo oscuro con persistencia
export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Obtener preferencia guardada o preferencia del sistema
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    // Si no hay preferencia guardada, usar preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Aplicar clase al body
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    
    // Guardar preferencia en localStorage
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Escuchar cambios en preferencia del sistema (opcional)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Solo cambiar si no hay preferencia guardada
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return { darkMode, setDarkMode, toggleDarkMode };
};
