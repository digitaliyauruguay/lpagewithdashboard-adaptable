import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useEffect } from 'react';
import { initAnalytics } from '../lib/analytics';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/ThemeProvider';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  // Inicializar analytics al montar
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </ErrorBoundary>
  );
}