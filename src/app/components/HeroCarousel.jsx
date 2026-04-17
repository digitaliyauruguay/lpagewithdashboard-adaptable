// ============================================
// HERO CON CAROUSEL DE IMÁGENES
// ============================================
// Carousel premium con animaciones optimizadas según dispositivo

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import { config } from '../../config/activePreset.js';
import { trackCTAClick } from '../../lib/analytics.js';
import { useDeviceDetection, getAnimationConfig } from '../../lib/deviceDetection.js';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Mapeo de imágenes por preset (ya fetched de Unsplash)
const HERO_IMAGES = {
  veterinaria: [
    'https://images.unsplash.com/photo-1770836037793-95bdbf190f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjBleGFtaW5pbmclMjBkb2d8ZW58MXx8fHwxNzc2MzI5NDc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1621371236495-1520d8dc72a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcHVwcHklMjB2ZXRlcmluYXJ5JTIwY2xpbmljfGVufDF8fHx8MTc3NjMwMjkxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1733783489145-f3d3ee7a9ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNhdCUyMHZldGVyaW5hcmlhbnxlbnwxfHx8fDE3NzYzODM0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1690306815542-3c0e7b85e996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwc3VyZ2VyeSUyMGVxdWlwbWVudCUyMG1vZGVybnxlbnwxfHx8fDE3NzYzODM0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  ],
  peluqueria: [
    'https://images.unsplash.com/photo-1759134155377-4207d89b39ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoYWlyJTIwc2Fsb24lMjBpbnRlcmlvciUyMGx1eHVyeXxlbnwxfHx8fDE3NzYzNjY1Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1583919976579-9ec4a0051fe6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJlYXV0aWZ1bCUyMGhhaXIlMjBzYWxvbnxlbnwxfHx8fDE3NzYzODM0OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1761931403671-d020a14928d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyc3R5bGlzdCUyMGN1dHRpbmclMjBoYWlyJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjI5NTk4NXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1554519880-ffe46861d570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwY29sb3IlMjBiYWxheWFnZSUyMHNhbG9ufGVufDF8fHx8MTc3NjM4MzQ5MXww&ixlib=rb-4.1.0&q=80&w=1080',
  ],
};

export function HeroCarousel() {
  const deviceType = useDeviceDetection();
  const animConfig = getAnimationConfig(deviceType);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToContact = () => {
    trackCTAClick('Hero Primary CTA', 'Hero');
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    trackCTAClick('Hero Secondary CTA', 'Hero');
    const element = document.getElementById('servicios');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Obtener imágenes según el preset
  const heroImages = HERO_IMAGES[config.industry] || HERO_IMAGES.veterinaria;

  // Configuración del carousel - más simple en mobile
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: deviceType.isMobile ? 500 : 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: !deviceType.isMobile, // Fade solo en desktop
    cssEase: deviceType.isMobile ? 'ease-in-out' : 'cubic-bezier(0.6, 0.2, 0.1, 1)',
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    arrows: false,
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Pattern - solo en desktop */}
      {!deviceType.isMobile && (
        <div className="absolute inset-0 -z-10 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${config.theme.primary} 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            {...animConfig}
            className="space-y-8 z-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white shadow-md border"
              style={{ borderColor: config.theme.primary + '30' }}
            >
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: config.theme.primary }}
              />
              <span 
                className="text-sm font-semibold"
                style={{ color: config.theme.primary }}
              >
                Atención profesional
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight"
            >
              {config.hero.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg sm:text-xl text-gray-600 leading-relaxed"
            >
              {config.hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={deviceType.isDesktop ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="flex items-center justify-center space-x-2 px-8 py-4 rounded-lg text-white font-semibold shadow-xl hover:shadow-2xl transition-all group"
                style={{
                  backgroundColor: config.theme.primary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = config.theme.primaryHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = config.theme.primary;
                }}
              >
                <span>{config.hero.ctaText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={deviceType.isDesktop ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToServices}
                className="flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-semibold border-2 transition-all hover:bg-gray-50"
                style={{
                  borderColor: config.theme.primary,
                  color: config.theme.primary,
                }}
              >
                <span>{config.hero.ctaSecondary}</span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center space-x-8 pt-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold text-sm"
                    style={{ backgroundColor: config.theme.primary }}
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-4 h-4"
                      style={{ fill: config.theme.accent }}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Calificación 5.0 - +200 reseñas
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Carousel */}
          <motion.div
            initial={{ opacity: 0, x: deviceType.isMobile ? 0 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: deviceType.isMobile ? 0.5 : 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Slider {...sliderSettings}>
                {heroImages.map((image, index) => (
                  <div key={index} className="outline-none">
                    <ImageWithFallback
                      src={image}
                      alt={`${config.businessName} - Imagen ${index + 1}`}
                      className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
                    />
                  </div>
                ))}
              </Slider>
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Horarios</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900">{config.schedule.weekdays}</p>
                  </div>
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: config.theme.primary + '20' }}
                  >
                    <svg 
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      style={{ stroke: config.theme.primary }}
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Slide Counter */}
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                {currentSlide + 1} / {heroImages.length}
              </div>
            </div>

            {/* Decorative Elements - solo desktop */}
            {!deviceType.isMobile && animConfig.enableComplexTransforms && (
              <>
                <div 
                  className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-3xl opacity-30"
                  style={{ backgroundColor: config.theme.primary }}
                />
                <div 
                  className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full blur-3xl opacity-20"
                  style={{ backgroundColor: config.theme.secondary }}
                />
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroCarousel;
