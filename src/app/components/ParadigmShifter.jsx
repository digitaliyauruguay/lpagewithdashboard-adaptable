import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring, useMotionValue, useAnimation } from 'framer-motion';
import { 
  Menu, X, ArrowRight, Phone, Mail, MapPin, 
  Star, Heart, Sparkles, Zap, Camera, Grid3x3,
  Loader2, CheckCircle, Send, Calendar, Users,
  TrendingUp, Award, Target, Layers, Shield,
  Rocket, Brain, Cpu, Globe, Infinity
} from 'lucide-react';
import { config } from '../../config/activePreset.js';
import { saveLead } from '../../lib/airtable.js';
import { trackLead } from '../../lib/analytics.js';
import { toast } from 'sonner';

// Hook para efectos de paralaje avanzados
const useParallax = (ref, speed = 0.5) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, speed * 1000]);
  return y;
};

// Componente de partículas flotantes interactivas
const FloatingParticles = ({ count = 20 }) => {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const particles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(particles);
  }, [count]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => {
        const distance = Math.sqrt(
          Math.pow(particle.x - mousePos.x, 2) + 
          Math.pow(particle.y - mousePos.y, 2)
        );
        const influence = Math.max(0, 1 - distance / 30);
        
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 backdrop-blur-sm"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: influence * (mousePos.x - particle.x) * 0.1,
              y: influence * (mousePos.y - particle.y) * 0.1,
              scale: 1 + influence * 0.5,
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20
            }}
          />
        );
      })}
    </div>
  );
};

// Navegación cuántica con efectos morphing
const QuantumNav = ({ isOpen, setIsOpen, currentSection, scrollY }) => {
  const sections = ['inicio', 'servicios', 'galeria', 'testimonios', 'contacto'];
  const navScale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const navOpacity = useTransform(scrollY, [0, 200], [1, 0.95]);

  return (
    <motion.header
      style={{ scale: navScale, opacity: navOpacity }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-purple-100/50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo cuántico */}
          <motion.div
            whileHover={{ 
              rotate: 360, 
              scale: 1.1,
              boxShadow: '0 0 30px rgba(147, 51, 234, 0.5)'
            }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Infinity className="w-7 h-7 text-white" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-50 animate-pulse" />
          </motion.div>

          {/* Desktop navigation con efectos holográficos */}
          <nav className="hidden lg:flex items-center space-x-8">
            {sections.map((section, index) => (
              <motion.button
                key={section}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  textShadow: '0 0 20px rgba(147, 51, 234, 0.5)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
                className={`relative text-sm font-bold transition-all ${
                  currentSection === section 
                    ? 'text-purple-600' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                {currentSection === section && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Mobile quantum button */}
          <motion.button
            whileHover={{ 
              scale: 1.1, 
              rotate: 90,
              boxShadow: '0 0 25px rgba(147, 51, 234, 0.4)'
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <motion.div animate={{ rotate: isOpen ? 45 : 0 }}>
              {isOpen ? <X className="w-6 h-6 text-purple-600" /> : <Menu className="w-6 h-6 text-purple-600" />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu con efectos de onda */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-purple-100/50"
          >
            <div className="px-4 py-6 space-y-3">
              {sections.map((section, index) => (
                <motion.button
                  key={section}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 10,
                    backgroundColor: 'rgba(147, 51, 234, 0.1)'
                  }}
                  onClick={() => {
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-6 py-4 text-gray-700 hover:text-purple-600 rounded-2xl transition-all font-semibold"
                >
                  <span className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: index * 0.5 }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Hero con efectos de realidad aumentada
const AugmentedHero = () => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });
  const parallaxY = useParallax(heroRef, 0.3);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorGlow = useSpring({ x: mousePosition.x, y: mousePosition.y });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const words = config.hero.title.split(' ');

  return (
    <section ref={heroRef} id="inicio" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
      {/* Partículas interactivas */}
      <FloatingParticles count={25} />
      
      {/* Cursor glow effect */}
      <motion.div
        style={{ x: cursorGlow.x, y: cursorGlow.y }}
        className="fixed w-32 h-32 rounded-full bg-purple-500/20 blur-xl pointer-events-none z-50 mix-blend-screen"
      />

      {/* Background morphing */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y: parallaxY }}
          className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-transparent to-pink-900/80"
        />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0"
        />
      </div>

      {/* Contenido con efectos 3D */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 15 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-center max-w-6xl mx-auto px-6"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Título con efectos de palabra por palabra */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-8 leading-tight">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 100, rotateZ: Math.random() * 10 - 5 }}
                animate={isInView ? { opacity: 1, y: 0, rotateZ: 0 } : {}}
                transition={{ 
                  delay: 0.5 + i * 0.15, 
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.1, 
                  color: '#fbbf24',
                  textShadow: '0 0 30px rgba(251, 191, 36, 0.5)'
                }}
                className="inline-block mr-2 sm:mr-4 cursor-pointer"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtítulo con efecto de máquina de escribir */}
          <motion.p
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: '100%' } : {}}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-12 max-w-4xl mx-auto font-light overflow-hidden"
          >
            {config.hero.subtitle}
          </motion.p>

          {/* Botones con efectos holográficos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 2, type: 'spring' }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: '0 20px 40px rgba(251, 191, 36, 0.3)',
                background: 'linear-gradient(45deg, #fbbf24, #f59e0b, #fbbf24)'
              }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-black rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Rocket className="w-6 h-6" />
                Iniciar Revolución
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                borderColor: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-white/10 backdrop-blur-xl text-white font-black rounded-full border-2 border-white/30 hover:border-white transition-all relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Brain className="w-6 h-6" />
                Explorar Futuro
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.button>
          </motion.div>

          {/* Indicadores cuánticos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="flex justify-center gap-4 mt-16"
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.3,
                  ease: 'easeInOut'
                }}
                className="w-2 h-2 bg-white/60 rounded-full"
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Servicios con efectos de transformación
const TransformativeServices = () => {
  const servicesRef = useRef(null);
  const isInView = useInView(servicesRef, { once: true });

  const services = [
    {
      name: "Inteligencia Artificial",
      description: "Sistemas cognitivos que aprenden y evolucionan con tu negocio",
      icon: Brain,
      color: "from-purple-600 to-indigo-600",
      features: ["Machine Learning", "NLP", "Computer Vision"]
    },
    {
      name: "Realidad Aumentada",
      description: "Experiencias inmersivas que fusionan lo digital con lo real",
      icon: Cpu,
      color: "from-blue-600 to-cyan-600",
      features: ["AR Mobile", "WebAR", "Spatial Computing"]
    },
    {
      name: "Blockchain Web3",
      description: "Infraestructura descentralizada para la nueva economía",
      icon: Shield,
      color: "from-green-600 to-emerald-600",
      features: ["Smart Contracts", "DeFi", "NFTs"]
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={servicesRef}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6"
          >
            Tecnologías
            <motion.span
              animate={{ color: ['#9333ea', '#ec4899', '#9333ea'] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="ml-4"
            >
              Disruptivas
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Implementando el futuro hoy mismo con soluciones de vanguardia
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 100, rotateY: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ 
                delay: 0.6 + index * 0.2,
                duration: 0.8,
                type: 'spring'
              }}
              whileHover={{ 
                y: -20, 
                scale: 1.05,
                rotateY: 5,
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)'
              }}
              className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Background morphing */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity`}
              />
              
              {/* Icono flotante */}
              <motion.div
                animate={{ 
                  rotate: [0, 360], 
                  y: [0, -5, 0]
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
                  y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                }}
                className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-3xl flex items-center justify-center mb-8 shadow-2xl relative`}
              >
                <service.icon className="w-10 h-10 text-white" />
                <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse" />
              </motion.div>
              
              <h3 className="text-2xl font-black text-gray-900 mb-4">{service.name}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              {/* Features */}
              <div className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`} />
                    <span className="text-sm text-gray-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  x: 10,
                  color: service.color.includes('purple') ? '#9333ea' : service.color.includes('blue') ? '#2563eb' : '#059669'
                }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 text-gray-900 font-black hover:text-purple-600 transition-colors"
              >
                Explorar <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Galería con efectos de realidad virtual
const VirtualGallery = () => {
  const galleryRef = useRef(null);
  const isInView = useInView(galleryRef, { once: true });
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      title: "Neural Networks",
      category: "AI",
      color: "from-purple-500 to-indigo-500",
      description: "Arquitectura de deep learning optimizada"
    },
    {
      id: 2,
      title: "Quantum Computing",
      category: "Tech",
      color: "from-blue-500 to-cyan-500",
      description: "Procesamiento cuántico revolucionario"
    },
    {
      id: 3,
      title: "Biometric Security",
      category: "Security",
      color: "from-green-500 to-emerald-500",
      description: "Identificación biométrica avanzada"
    },
    {
      id: 4,
      title: "Holographic Display",
      category: "Display",
      color: "from-pink-500 to-rose-500",
      description: "Visualización holográfica 3D"
    },
    {
      id: 5,
      title: "Neural Interface",
      category: "Interface",
      color: "from-yellow-500 to-orange-500",
      description: "Conexión directa cerebro-máquina"
    },
    {
      id: 6,
      title: "Time Crystal",
      category: "Physics",
      color: "from-indigo-500 to-purple-500",
      description: "Estructura temporal no lineal"
    }
  ];

  return (
    <section id="galeria" className="py-24 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={galleryRef}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Galería de
            <motion.span
              animate={{ color: ['#9333ea', '#ec4899', '#9333ea'] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="ml-4"
            >
              Innovación
            </motion.span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora las tecnologías que están redefiniendo nuestro futuro
          </p>
        </motion.div>

        {/* Grid 3D */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, z: -100, rotateY: 15 }}
              animate={isInView ? { opacity: 1, z: 0, rotateY: 0 } : {}}
              transition={{ 
                delay: index * 0.1,
                duration: 0.8,
                type: 'spring'
              }}
              whileHover={{ 
                z: 50, 
                scale: 1.05,
                rotateY: 10,
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)'
              }}
              onClick={() => setSelectedImage(image)}
              className="group relative cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Imagen placeholder con efectos */}
              <div className={`relative h-80 rounded-3xl overflow-hidden bg-gradient-to-br ${image.color} shadow-2xl`}>
                <div className="absolute inset-0 bg-black/20" />
                
                {/* Overlay con información */}
                <motion.div
                  initial={{ y: 100 }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8"
                >
                  <div>
                    <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold mb-3">
                      {image.category}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.description}</p>
                  </div>
                </motion.div>

                {/* Partículas flotantes */}
                <div className="absolute inset-0">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [Math.random() * 100, -Math.random() * 100],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                      className="absolute w-2 h-2 bg-white/30 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de imagen seleccionada */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.8, rotateY: 15 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: -15 }}
              transition={{ type: 'spring' }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-4xl w-full h-96 rounded-3xl overflow-hidden bg-gradient-to-br ${selectedImage.color}`}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="text-center text-white">
                  <h3 className="text-4xl font-black mb-4">{selectedImage.title}</h3>
                  <p className="text-xl mb-2">{selectedImage.category}</p>
                  <p className="text-lg opacity-80">{selectedImage.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Testimonios con efectos de credibilidad
const QuantumTestimonials = () => {
  const testimonialsRef = useRef(null);
  const isInView = useInView(testimonialsRef, { once: true });

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO, TechVision",
      content: "Esta tecnología transformó completamente nuestra operación. El ROI fue del 300% en el primer año.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO, FutureCorp",
      content: "La implementación de IA superó todas nuestras expectativas. Es como tener un equipo adicional trabajando 24/7.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Elena Volkov",
      role: "Director, Innovation Lab",
      content: "Revolutionario. Cambió las reglas del juego en nuestra industria completamente.",
      rating: 5,
      avatar: "EV"
    }
  ];

  return (
    <section id="testimonios" className="py-24 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={testimonialsRef}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Voces del
            <motion.span
              animate={{ color: ['#9333ea', '#ec4899', '#9333ea'] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="ml-4"
            >
              Futuro
            </motion.span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Líderes que ya están transformando sus negocios
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 100, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                delay: index * 0.2,
                duration: 0.8,
                type: 'spring'
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: '0 30px 60px rgba(147, 51, 234, 0.15)'
              }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-purple-100"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1 * i, type: 'spring' }}
                  >
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-8 text-lg leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-black text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contacto con integración real
const QuantumContact = () => {
  const contactRef = useRef(null);
  const isInView = useInView(contactRef, { once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setProgress(0);

    // Simular progreso
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Guardar en Airtable
      const result = await saveLead({
        ...formData,
        source: 'Quantum Landing',
        service: formData.service || 'General Inquiry'
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (result.success) {
        // Trackear en analytics
        trackLead(formData);

        // Mostrar éxito
        toast.success('¡Mensaje enviado con éxito! Nos contactaremos pronto.');
        setIsSubmitted(true);
        setFormData({ name: '', email: '', company: '', service: '', message: '' });
        
        // Reset después de 5 segundos
        setTimeout(() => {
          setIsSubmitted(false);
          setProgress(0);
        }, 5000);
      } else {
        toast.error('Error al enviar. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Error submitting form:', error);
      toast.error('Error de conexión. Por favor, intenta más tarde.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const services = [
    'Inteligencia Artificial',
    'Realidad Aumentada',
    'Blockchain Web3',
    'Consultoría General'
  ];

  return (
    <section id="contacto" className="py-24 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 relative overflow-hidden">
      {/* Partículas de fondo */}
      <FloatingParticles count={15} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          ref={contactRef}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
            Inicia la
            <motion.span
              animate={{ color: ['#fbbf24', '#f59e0b', '#fbbf24'] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="ml-4"
            >
              Transformación
            </motion.span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            El futuro comienza hoy. Hablemos de cómo podemos revolucionar tu negocio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="text-3xl font-black text-white mb-4">¡Conexión Establecida!</h3>
              <p className="text-xl text-white/80 mb-8">Tu mensaje ha sido recibido. Nos pondremos en contacto contigo en las próximas 24 horas.</p>
              
              <div className="flex justify-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white"
                >
                  <Calendar className="w-5 h-5 inline mr-2" />
                  Próximo paso: Revisión
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Progress bar */}
              {isSubmitting && (
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 outline-none focus:border-white/60 focus:bg-white/25 transition-all font-medium"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="Email profesional"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 outline-none focus:border-white/60 focus:bg-white/25 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Empresa (opcional)"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 outline-none focus:border-white/60 focus:bg-white/25 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      required
                      className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 outline-none focus:border-white/60 focus:bg-white/25 transition-all font-medium"
                    >
                      <option value="" className="bg-purple-900">Selecciona un servicio</option>
                      {services.map(service => (
                        <option key={service} value={service} className="bg-purple-900">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <textarea
                      placeholder="Describe tu visión y objetivos..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 outline-none focus:border-white/60 focus:bg-white/25 transition-all resize-none font-medium"
                    />
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -3 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-black rounded-2xl shadow-2xl hover:shadow-yellow-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Procesando Revolución...
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      Iniciar Transformación
                    </>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default function ParadigmShifter() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('inicio');
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'servicios', 'galeria', 'testimonios', 'contacto'];
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
    <div className="min-h-screen bg-gray-50">
      <QuantumNav 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        currentSection={currentSection}
        scrollY={scrollY}
      />
      
      <AugmentedHero />
      <TransformativeServices />
      <VirtualGallery />
      <QuantumTestimonials />
      <QuantumContact />
      
      {/* Botones flotantes cuánticos */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 z-40 flex flex-col gap-4"
      >
        <motion.a
          href={`https://wa.me/${config.contact.whatsapp?.replace(/\+/g, '') || '5491112345678'}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-all"
        >
          <Phone className="w-7 h-7 text-white" />
        </motion.a>

        <motion.button
          whileHover={{ scale: 1.1, rotate: -15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/50 transition-all"
        >
          <Rocket className="w-6 h-6 text-white" />
        </motion.button>
      </motion.div>
    </div>
  );
};
