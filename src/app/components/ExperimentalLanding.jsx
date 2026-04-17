import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, ArrowRight, Phone, Mail, MapPin, 
  ChevronLeft, ChevronRight, Play, Pause, 
  Sparkles, Zap, Target, Layers
} from 'lucide-react';
import { config } from '../../config/activePreset.js';
import { LazyImage } from '../../components/LazyImage.jsx';

// Componentes experimentales
const FloatingNav = ({ isOpen, setIsOpen, currentSection, setCurrentSection }) => {
  const sections = ['inicio', 'servicios', 'testimonios', 'contacto'];
  
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-8 top-1/2 -translate-y-1/2 z-50"
    >
      <div className="relative">
        {/* Botón flotante principal */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-xl bg-opacity-80"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X className="w-8 h-8 text-white" /> : <Menu className="w-8 h-8 text-white" />}
          </motion.div>
        </motion.button>

        {/* Menú flotante expandido */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute left-20 top-0 space-y-4"
            >
              {sections.map((section, index) => (
                <motion.button
                  key={section}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, x: 10 }}
                  onClick={() => {
                    setCurrentSection(section);
                    setIsOpen(false);
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-6 py-3 rounded-full backdrop-blur-xl transition-all ${
                    currentSection === section 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const DiagonalHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900">
      {/* Elementos flotantes animados */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [1, 1.2, 1], 
              rotate: [0, 180, 360],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 2) * 30}%`,
            }}
          />
        ))}
      </div>

      {/* Cursor interactivo */}
      <motion.div
        className="fixed w-8 h-8 rounded-full bg-white/20 backdrop-blur-xl pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Contenido diagonal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 100, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, type: 'spring' }}
          className="text-center max-w-4xl mx-auto px-8"
          style={{ transform: 'rotate(-5deg)' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 leading-tight">
              {config.hero.title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1, type: 'spring' }}
                  className="inline-block mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-2xl md:text-3xl text-white/90 mb-12 font-light"
          >
            {config.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: 'spring' }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full text-lg shadow-2xl hover:shadow-yellow-500/50 transition-all"
            >
              <span className="flex items-center gap-3">
                <Zap className="w-6 h-6" />
                Empezar Ahora
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 border-2 border-white/30 text-white font-bold rounded-full text-lg backdrop-blur-xl hover:bg-white/10 transition-all"
            >
              Ver Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Elemento flotante inferior */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-2 h-16 bg-white/30 rounded-full backdrop-blur-xl" />
      </motion.div>
    </div>
  );
};

const HorizontalScrollSection = ({ children, title }) => {
  const scrollContainer = useRef(null);
  
  const scrollLeft = () => {
    scrollContainer.current?.scrollBy({ left: -400, behavior: 'smooth' });
  };
  
  const scrollRight = () => {
    scrollContainer.current?.scrollBy({ left: 400, behavior: 'smooth' });
  };

  return (
    <div className="relative py-20 bg-gradient-to-b from-transparent to-purple-900/20">
      <div className="max-w-7xl mx-auto px-8">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-5xl font-black text-white mb-12"
        >
          {title}
        </motion.h2>

        <div className="relative">
          {/* Botones de navegación */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Contenedor horizontal */}
          <div
            ref={scrollContainer}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const FloatingServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotate: Math.random() * 10 - 5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: index * 0.1, type: 'spring' }}
      whileHover={{ 
        y: -10, 
        rotate: Math.random() * 4 - 2,
        scale: 1.05
      }}
      className="min-w-[350px] p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 hover:border-white/40 transition-all"
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 mb-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center"
      >
        <Sparkles className="w-8 h-8 text-white" />
      </motion.div>

      <h3 className="text-2xl font-bold text-white mb-4">{service.name}</h3>
      <p className="text-white/80 mb-6">{service.description}</p>
      
      <motion.button
        whileHover={{ scale: 1.05, x: 10 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 text-white font-semibold hover:text-yellow-400 transition-colors"
      >
        Explorar <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

const ExperimentalContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  return (
    <div className="relative py-32 bg-gradient-to-t from-purple-900 to-transparent">
      {/* Elementos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [100, -100, 100],
              rotate: [0, 180, 360],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-white mb-6">
            Hablemos de Magia
          </h2>
          <p className="text-xl text-white/80">
            Transformemos tus ideas en realidad
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.05, x: 10 }}
                className="p-6 bg-white/5 rounded-2xl"
              >
                <input
                  type="text"
                  placeholder="Tu nombre mágico"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent text-white placeholder-white/50 outline-none text-lg"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, x: 10 }}
                className="p-6 bg-white/5 rounded-2xl"
              >
                <input
                  type="email"
                  placeholder="Tu hechizo digital"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent text-white placeholder-white/50 outline-none text-lg"
                />
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white/5 rounded-2xl"
            >
              <textarea
                placeholder="Describe tu visión..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="w-full bg-transparent text-white placeholder-white/50 outline-none text-lg resize-none"
              />
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-8 py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full text-xl shadow-2xl hover:shadow-yellow-500/50 transition-all"
          >
            <span className="flex items-center justify-center gap-3">
              <Target className="w-6 h-6" />
              Enviar Hechizo
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default function ExperimentalLanding() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('inicio');

  return (
    <div className="bg-gradient-to-b from-purple-900 via-pink-900 to-indigo-900 min-h-screen">
      <FloatingNav 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      
      <DiagonalHero />
      
      <HorizontalScrollSection title="Servicios Mágicos">
        {config.services?.slice(0, 4).map((service, index) => (
          <FloatingServiceCard key={service.name} service={service} index={index} />
        ))}
      </HorizontalScrollSection>

      <ExperimentalContact />
      
      {/* Footer flotante */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl"
        >
          <Phone className="w-6 h-6 text-white" />
        </motion.button>
      </motion.div>
    </div>
  );
};
