import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Menu, X, ArrowRight, Phone, Mail, MapPin, 
  Star, Heart, Sparkles, Zap, Camera, Grid3x3,
  Loader2, CheckCircle
} from 'lucide-react';
import { config } from '../../config/activePreset.js';

// Componente de imagen ultra-optimizado con placeholder
const OptimizedImage = ({ src, alt, className = '', priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!priority) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    } else {
      setIsInView(true);
    }
  }, [priority]);

  // Placeholder SVG optimizado
  const placeholder = (
    <div className={`absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center ${className}`}>
      <div className="w-8 h-8 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && placeholder}
      
      {/* Imagen optimizada */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}
      
      {/* Error fallback */}
      {isError && (
        <div className={`absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center ${className}`}>
          <Camera className="w-8 h-8 text-purple-400" />
        </div>
      )}
    </div>
  );
};

// Skeleton loader para contenido
const SkeletonLoader = ({ className = '' }) => (
  <div className={`animate-pulse bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg ${className}`} />
);

// Navegación ultra-rápida
const UltraNav = ({ isOpen, setIsOpen, currentSection }) => {
  const sections = ['inicio', 'servicios', 'galeria', 'contacto'];
  
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo minimalista */}
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {sections.map((section) => (
              <motion.button
                key={section}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
                className={`text-sm font-semibold transition-all ${
                  currentSection === section 
                    ? 'text-purple-600 border-b-2 border-purple-600' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center"
          >
            <motion.div animate={{ rotate: isOpen ? 45 : 0 }}>
              {isOpen ? <X className="w-5 h-5 text-purple-600" /> : <Menu className="w-5 h-5 text-purple-600" />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">
              {sections.map((section, index) => (
                <motion.button
                  key={section}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-xl transition-all font-medium"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Hero ultra-optimizado con imagen local
const UltraHero = () => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });

  return (
    <section ref={heroRef} id="inicio" className="relative min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
      {/* Imagen de fondo optimizada */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="data:image/svg+xml,%3Csvg width='1920' height='1080' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23933ea;stop-opacity:0.8' /%3E%3Cstop offset='100%25' style='stop-color:%23ec4899;stop-opacity:0.8' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='url(%23grad)' /%3E%3Ccircle cx='960' cy='540' r='200' fill='%23ffffff' opacity='0.1' /%3E%3Ccircle cx='300' cy='200' r='100' fill='%23ffffff' opacity='0.05' /%3E%3Ccircle cx='1600' cy='800' r='150' fill='%23ffffff' opacity='0.05' /%3E%3C/svg%3E"
          alt="Background gradient"
          className="w-full h-full"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 to-pink-900/40" />
      </div>

      {/* Contenido optimizado */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-5xl mx-auto px-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
          >
            {config.hero.title.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="inline-block mr-2 sm:mr-4"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-light"
          >
            {config.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-full shadow-xl hover:shadow-2xl transition-all"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Comenzar Ahora
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-bold rounded-full border-2 border-white/30 hover:bg-white/30 transition-all"
            >
              Ver Proyectos
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-1 h-16 bg-white/60 rounded-full" />
      </motion.div>
    </section>
  );
};

// Galería ultra-optimizada con placeholders
const UltraGallery = () => {
  const galleryRef = useRef(null);
  const isInView = useInView(galleryRef, { once: true });

  // Imágenes optimizadas con SVG placeholders
  const images = [
    {
      src: "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23f3e8ff' /%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23933ea' font-family='Arial' font-size='18'%3EProfessional Workspace%3C/text%3E%3C/svg%3E",
      alt: "Professional Workspace",
      category: "corporativo",
      color: "from-purple-400 to-purple-600"
    },
    {
      src: "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23fce7f3' /%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23ec4899' font-family='Arial' font-size='18'%3ECreative Team%3C/text%3E%3C/svg%3E",
      alt: "Creative Team",
      category: "creativo",
      color: "from-pink-400 to-pink-600"
    },
    {
      src: "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23e0e7ff' /%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236366f1' font-family='Arial' font-size='18'%3ETechnology Office%3C/text%3E%3C/svg%3E",
      alt: "Technology Office",
      category: "tecnología",
      color: "from-blue-400 to-blue-600"
    },
    {
      src: "data:image/svg+xml,%3Csvg width='400' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='600' fill='%23fef3c7' /%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23f59e0b' font-family='Arial' font-size='18'%3EDesign Studio%3C/text%3E%3C/svg%3E",
      alt: "Design Studio",
      category: "diseño",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      src: "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23d1fae5' /%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2310b981' font-family='Arial' font-size='18'%3EMarketing Team%3C/text%3E%3C/svg%3E",
      alt: "Marketing Team",
      category: "marketing",
      color: "from-green-400 to-green-600"
    },
    {
      src: "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23fce7f3' /%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23ec4899' font-family='Arial' font-size='18'%3EInnovation Lab%3C/text%3E%3C/svg%3E",
      alt: "Innovation Lab",
      category: "innovación",
      color: "from-pink-400 to-pink-600"
    }
  ];

  return (
    <section id="galeria" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={galleryRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestro Espacio Creativo
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Donde la innovación se encuentra con el diseño
          </p>
        </motion.div>

        {/* Grid optimizado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {images.map((image, index) => {
            const isLarge = index === 3;
            const rowSpan = isLarge ? 'row-span-2 sm:row-span-2' : 'row-span-1';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all ${rowSpan}`}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full"
                />
                
                {/* Overlay con información */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end"
                >
                  <div className="p-6">
                    <div className={`inline-block px-3 py-1 bg-gradient-to-r ${image.color} text-white text-xs font-semibold rounded-full mb-2`}>
                      {image.category}
                    </div>
                    <h3 className="text-white font-bold text-lg">{image.alt}</h3>
                  </div>
                </motion.div>

                {/* Icono de cámara */}
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all"
          >
            <span className="flex items-center gap-2">
              <Grid3x3 className="w-5 h-5" />
              Explorar Galería Completa
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Servicios ultra-optimizados
const UltraServices = () => {
  const servicesRef = useRef(null);
  const isInView = useInView(servicesRef, { once: true });

  const services = config.services?.slice(0, 3) || [
    { name: "Consultoría Estratégica", description: "Transformamos tu visión en resultados tangibles", icon: "Target" },
    { name: "Desarrollo Digital", description: "Soluciones innovadoras para el crecimiento", icon: "Zap" },
    { name: "Marketing Creativo", description: "Estrategias que conectan y convierten", icon: "Sparkles" }
  ];

  return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={servicesRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Servicios que Transforman
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Soluciones disruptivas para resultados extraordinarios
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-purple-100"
            >
              {/* Icono animado */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{service.name}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                Descubrir más <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contacto ultra-optimizado
const UltraContact = () => {
  const contactRef = useRef(null);
  const isInView = useInView(contactRef, { once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset después de 3 segundos
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-purple-900 to-pink-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={contactRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Creemos Algo Increíble Juntos
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Tu visión + nuestra creatividad = resultados extraordinarios
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/20"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">¡Mensaje Enviado!</h3>
              <p className="text-white/80">Nos pondremos en contacto contigo pronto.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 outline-none focus:border-white/60 focus:bg-white/25 transition-all"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder="Tu email profesional"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 outline-none focus:border-white/60 focus:bg-white/25 transition-all"
                  />
                </div>
              </div>

              <div>
                <textarea
                  placeholder="Cuéntanos sobre tu proyecto y objetivos..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 outline-none focus:border-white/60 focus:bg-white/25 transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -3 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando mensaje...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" />
                    Enviar Mensaje
                  </span>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default function UltraOptimized() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'servicios', 'galeria', 'contacto'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <UltraNav 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        currentSection={currentSection}
      />
      
      <UltraHero />
      <UltraServices />
      <UltraGallery />
      <UltraContact />
      
      {/* Botón flotante optimizado */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <a
          href={`https://wa.me/${config.contact.whatsapp?.replace(/\+/g, '') || '5491112345678'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-all"
        >
          <Phone className="w-6 h-6 text-white" />
        </a>
      </motion.div>
    </div>
  );
};
