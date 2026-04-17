import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

/**
 * Error Boundary para capturar y manejar errores de React
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.setState({
      error,
      errorInfo,
      errorId
    });

    // Log error para debugging
    console.error('Error Boundary caught an error:', {
      errorId,
      error: error.toString(),
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });

    // En producción, enviar a servicio de monitoreo
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error, errorInfo, errorId);
    }
  }

  reportError = async (error, errorInfo, errorId) => {
    try {
      // Aquí podrías integrar con Sentry, LogRocket, etc.
      await fetch('/api/error-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          errorId,
          message: error.toString(),
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          userAgent: navigator.userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString()
        })
      });
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null, errorId: null });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center"
          >
            {/* Icono de error */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </motion.div>

            {/* Título y mensaje */}
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              ¡Ups! Algo salió mal
            </h1>
            <p className="text-gray-600 mb-6">
              Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado y está trabajando en solucionarlo.
            </p>

            {/* Error ID para referencia */}
            {this.state.errorId && (
              <div className="bg-gray-100 rounded-lg p-3 mb-6">
                <p className="text-xs text-gray-500 mb-1">ID del error:</p>
                <code className="text-xs font-mono text-gray-700">
                  {this.state.errorId}
                </code>
              </div>
            )}

            {/* Botones de acción */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={this.handleRetry}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Intentar nuevamente
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={this.handleGoHome}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Home className="w-4 h-4" />
                Ir al inicio
              </motion.button>
            </div>

            {/* Detalles técnicos (solo en desarrollo) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                  Ver detalles técnicos
                </summary>
                <div className="mt-2 p-3 bg-red-50 rounded-lg">
                  <p className="text-xs font-mono text-red-800 mb-2">
                    {this.state.error.toString()}
                  </p>
                  <pre className="text-xs text-red-600 overflow-auto max-h-32">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </details>
            )}
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook para manejar errores asíncronos
 */
export function useErrorHandler() {
  const [error, setError] = React.useState(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error) => {
    console.error('Async error captured:', error);
    setError(error);
    
    // En producción, reportar el error
    if (process.env.NODE_ENV === 'production') {
      // Lógica de reporte aquí
    }
  }, []);

  // Si hay un error, lanzarlo para que el ErrorBoundary lo capture
  if (error) {
    throw error;
  }

  return { captureError, resetError };
}

/**
 * Componente para mostrar errores de API
 */
export function ApiError({ error, onRetry, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800 mb-1">
            Error de conexión
          </h3>
          <p className="text-sm text-red-600 mb-3">
            {error?.message || 'No se pudo conectar con el servidor. Intenta nuevamente.'}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-sm text-red-700 hover:text-red-800 font-medium flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Reintentar
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Componente para mostrar estados de carga con skeleton
 */
export function LoadingSkeleton({ className = '', children }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 rounded-lg h-full w-full" />
      {children}
    </div>
  );
}
