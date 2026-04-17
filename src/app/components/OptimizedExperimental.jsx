import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Menu, X, ArrowRight, Phone, Mail, MapPin, 
  ChevronLeft, ChevronRight, Star, Heart,
  Sparkles, Zap, Camera, Grid3x3
} from 'lucide-react';
import { config } from '../../config/activePreset.js';
import { LazyImage } from '../../components/LazyImage.jsx';

// Navegación minimalista pero disruptiva
const MinimalNav = ({ isOpen, setIsOpen, currentSection }) => {
  const sections = ['inicio', 'servicios', 'galeria', 'contacto'];
  
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo animado */}
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6 }}
            className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>

          {/* Menú desktop minimalista */}
          <nav className="hidden md:flex items-center space-x-8">
            {sections.map((section, index) => (
              <motion.button
                key={section}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
                className={`text-sm font-medium transition-colors ${
                  currentSection === section 
                    ? 'text-purple-600' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.button>
            ))}
          </nav>

          {/* Botón móvil */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Menú móvil deslizante */}
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
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Hero con imagen real y efectos ligeros
const ModernHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
      {/* Imagen de fondo con efecto parallax ligero */}
      <div className="absolute inset-0">
        <LazyImage
          src="https://images.unsplash.com/photo-1557804506-66957127d2d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4gYnVzaW5lc3MlMjBtZWV0aW5nJTIwcm9vbXxlbnwxfHx8fDE3NzYzODI4NTF8MA&ixlib=rb-4.1.0&q=80&w=1920"
          alt="Modern business meeting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-pink-900/50" />
      </div>

      {/* Contenido con animación sutil */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto px-8"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {config.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            {config.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Comenzar Ahora
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full border border-white/30 hover:bg-white/30 transition-all"
            >
              Ver Galería
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-1 h-16 bg-white/50 rounded-full" />
      </motion.div>
    </div>
  );
};

// Galería de imágenes con grid asimétrico
const ImageGallery = () => {
  const galleryRef = useRef(null);
  const isInView = useInView(galleryRef, { once: true });

  const images = [
    {
      src: "https://images.unsplash.com/photo-1557804506-66957127d2d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4gYnVzaW5lc3MlMjBtZWV0aW5nJTIwcm9vbXxlbnwxfHx8fDE3NzYzODI4NTF8MA&ixlib=rb-4.1.0&q=80&w=800",
      alt: "Business meeting",
      category: "corporativo"
    },
    {
      src: "https://images.unsplash.com/photo-1600876099953-563c5bdf4495?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHRlYW0lMjB3b3JraW5nJTIwdG9nZXRoZXJ8ZW58MHx8fHwxNzc2MzgyODUxfDA&ixlib=rb-4.1.0&q=80&w=800",
      alt: "Creative team",
      category: "creativo"
    },
    {
      src: "https://images.unsplash.com/photo-1517245386806-b240a232ba9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwb2ZmaWNlJTIwd2l0aCUyMHBlb3BsZSUyMHdvcmtpbmd8ZW58MHx8fHwxNzc2MzgyODUxfDA&ixlib=rb-4.1.0&q=80&w=800",
      alt: "Technology office",
      category: "tecnología"
    },
    {
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtZWV0aW5nJTIwcm9vbXxlbnwxfHx8fDE3NzYzODI4NTF8MA&ixlib=rb-4.1.0&q=80&w=800",
      alt: "Professional workspace",
      category: "profesional"
    },
    {
      src: "https://images.unsplash.com/photo-1559028012-c72c03c7c000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzdHVkaW8lMjB3aXRoJTIwbGFwdG9wJTIwYW5kJTIwdGFibGV0fGVufDB8fHx8MTc3NjM4Mjg1MXww&ixlib=rb-4.1.0&q=80&w=800",
      alt: "Design studio",
      category: "diseño"
    },
    {
      src: "https://images.unsplash.com/photo-1573497019940-1c28c88abdfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjB0ZWFtJTIwY29sbGFib3JhdGluZyUyMGluJTIwbW9kZXJuJTIwb2ZmaWNlJTIwd2l0aCUyMGxhcHRvcHMlMjBhbmQlMjBtYWMlMjBjb21wdXRlcnN8ZW58MHx8fHwxNzc2MzgyODUxfDA&ixlib=rb-4.1.0&q=80&w=800",
      alt: "Marketing team",
      category: "marketing"
    }
  ];

  return (
    <div id="galeria" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={galleryRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestro Espacio de Trabajo
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Donde la creatividad se encuentra con la innovación
          </p>
        </motion.div>

        {/* Grid asimétrico optimizado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {images.map((image, index) => {
            const isLarge = index === 0 || index === 3;
            const rowSpan = isLarge ? 'row-span-2' : 'row-span-1';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`relative overflow-hidden rounded-2xl ${rowSpan} ${
                  isLarge ? 'md:row-span-2' : ''
                }`}
              >
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay sutil */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end"
                >
                  <div className="p-6">
                    <p className="text-white font-semibold">{image.alt}</p>
                    <p className="text-white/80 text-sm">{image.category}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Botón de acción */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <span className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Ver Más Proyectos
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

// Servicios con cards modernas
const ModernServices = () => {
  const servicesRef = useRef(null);
  const isInView = useInView(servicesRef, { once: true });

  const services = config.services?.slice(0, 3) || [
    { name: "Consultoría Estratégica", description: "Transformamos tu visión en realidad", icon: "Target" },
    { name: "Desarrollo Digital", description: "Soluciones innovadoras para tu negocio", icon: "Zap" },
    { name: "Marketing Creativo", description: "Estrategias que conectan con tu audiencia", icon: "Sparkles" }
  ];

  return (
    <div id="servicios" className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={servicesRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Servicios Innovadores
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.name}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                Explorar <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Contacto minimalista
const ModernContact = () => {
  const contactRef = useRef(null);
  const isInView = useInView(contactRef, { once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  return (
    <div id="contacto" className="py-20 bg-gradient-to-br from-purple-900 to-pink-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={contactRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Hablemos de tu Proyecto
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Transformemos tus ideas en realidad juntos
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 outline-none focus:border-white/60 transition-colors"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Tu email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 outline-none focus:border-white/60 transition-colors"
                />
              </div>
            </div>

            <div>
              <textarea
                placeholder="Cuéntanos sobre tu proyecto..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 outline-none focus:border-white/60 transition-colors resize-none"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Enviar Mensaje
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default function OptimizedExperimental() {
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
      <MinimalNav 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        currentSection={currentSection}
      />
      
      <ModernHero />
      <ModernServices />
      <ImageGallery />
      <ModernContact />
      
      {/* Botón flotante de WhatsApp optimizado */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <a
          href={`https://wa.me/${config.contact.whatsapp?.replace(/\+/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        >
          <Phone className="w-6 h-6 text-white" />
        </a>
      </motion.div>
    </div>
  );
};
