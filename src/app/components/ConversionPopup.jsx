import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { config } from '../../config/activePreset.js';
import { trackPopupView, trackWhatsAppClick } from '../../lib/analytics.js';

export function ConversionPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // No mostrar si está deshabilitado
    if (!config.conversionPopup.enabled) return;

    // No mostrar si ya se mostró en esta sesión
    const popupShown = sessionStorage.getItem('popup_shown');
    if (popupShown) return;

    // Mostrar después del delay configurado
    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasShown(true);
      sessionStorage.setItem('popup_shown', 'true');
      trackPopupView();
    }, config.conversionPopup.delay);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCTA = () => {
    trackWhatsAppClick('Conversion Popup');
    
    // Si es WhatsApp, abrir WhatsApp
    if (config.conversionPopup.ctaUrl === 'whatsapp') {
      const whatsappUrl = `https://wa.me/${config.contact.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(config.conversionPopup.message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // URL personalizada
      window.open(config.conversionPopup.ctaUrl, '_blank');
    }
    
    setIsVisible(false);
  };

  if (!config.conversionPopup.enabled || !hasShown) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header with close button */}
              <div className="relative p-6 pb-0">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                {/* Icon/Emoji */}
                <div 
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl"
                  style={{ 
                    backgroundColor: config.theme.primary + '15',
                  }}
                >
                  {config.conversionPopup.title.match(/[\p{Emoji}]/u)?.[0] || '🎉'}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {config.conversionPopup.title.replace(/[\p{Emoji}]/gu, '').trim()}
                </h3>

                {/* Message */}
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {config.conversionPopup.message}
                </p>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCTA}
                  className="w-full px-8 py-4 rounded-lg text-white font-semibold shadow-xl hover:shadow-2xl transition-all"
                  style={{
                    backgroundColor: config.theme.primary,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = config.theme.primaryHover;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = config.theme.primary;
                  }}
                >
                  {config.conversionPopup.ctaText}
                </motion.button>

                {/* Close text */}
                <button
                  onClick={handleClose}
                  className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  No gracias, continuar navegando
                </button>
              </div>

              {/* Decorative element */}
              <div 
                className="h-2"
                style={{
                  background: `linear-gradient(90deg, ${config.theme.primary}, ${config.theme.secondary})`,
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ConversionPopup;
