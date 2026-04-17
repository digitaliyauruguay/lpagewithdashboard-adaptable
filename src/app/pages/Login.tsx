import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, Moon, Sun } from 'lucide-react';
import { login, isAuthenticated } from '../../lib/auth';
import { config } from '../../config/activePreset';
import { toast } from 'sonner';
import { useDarkMode } from '../../hooks/useDarkMode.js';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { darkMode, setDarkMode, toggleDarkMode } = useDarkMode();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 800));

    const result = login(formData.username, formData.password);
    
    if (result.success) {
      toast.success('¡Login exitoso!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } else {
      toast.error(result.error || 'Credenciales incorrectas');
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900'
        : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      {/* Back to Home */}
      <Link
        to="/"
        className={`absolute top-6 left-6 flex items-center gap-2 transition-colors ${
          darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <ArrowLeft className="size-4" />
        <span>Volver al sitio</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className={`rounded-2xl shadow-xl p-8 border transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
        }`}>
          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ backgroundColor: config.theme.primary + '20' }}
            >
              <Lock 
                className="size-8"
                style={{ color: config.theme.primary }}
              />
            </motion.div>
            <h1 className={`text-2xl font-bold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Panel de Administración
            </h1>
            <p className={`mt-2 transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {config.businessName}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Usuario
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 size-5 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  id="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className={`w-full pl-11 pr-4 py-3 border rounded-lg outline-none transition-all ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  onFocus={(e) => {
                    e.target.style.borderColor = config.theme.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${config.theme.primary}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = darkMode ? '#4B5563' : '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Contraseña
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 size-5 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-11 pr-12 py-3 border rounded-lg outline-none transition-all ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  onFocus={(e) => {
                    e.target.style.borderColor = config.theme.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${config.theme.primary}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = darkMode ? '#4B5563' : '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                    darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Hint for demo */}
            <div className={`border rounded-lg p-3 transition-colors duration-300 ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <p className={`text-xs text-center transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                &#x1F4A1; <strong>Credenciales de prueba:</strong><br />
                Usuario: <code className={`px-1.5 py-0.5 rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-white'
                }`}>{config.admin.username}</code><br />
                Contraseña: <code className={`px-1.5 py-0.5 rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-white'
                }`}>{config.admin.password}</code>
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: config.theme.primary }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.opacity = '0.9';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              {loading ? 'Ingresando...' : 'Ingresar al Dashboard'}
            </motion.button>
          </form>

          {/* Footer */}
          <p className={`text-center text-sm mt-6 transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            &#x26A0; &#xC1;rea restringida solo para administradores
          </p>
        </div>

        {/* Dark Mode Toggle */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleDarkMode}
          className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
            darkMode 
              ? 'bg-gradient-to-br from-yellow-400 to-orange-500 hover:shadow-yellow-500/50' 
              : 'bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-gray-700/50'
          }`}
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-white" />
          ) : (
            <Moon className="w-5 h-5 text-white" />
          )}
        </motion.button>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`mt-6 backdrop-blur-sm rounded-lg p-4 text-center border transition-colors duration-300 ${
            darkMode 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/50 border-gray-200'
          }`}
        >
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            &#x1F512; Credenciales configuradas en el preset de <strong>{config.industry}</strong>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
