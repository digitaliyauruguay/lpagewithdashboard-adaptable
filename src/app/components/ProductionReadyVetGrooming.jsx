import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  PawPrint, Heart, ArrowRight, Stethoscope, ShieldCheck, Activity, 
  UserCheck, Settings, LogOut, Home, Star, Phone, Mail, MapPin,
  Clock, Calendar, CheckCircle, AlertCircle, Zap, TrendingUp,
  Users, Award, Target, ChevronDown, Menu, X, MessageCircle
} from 'lucide-react';

// Importar sistema de autenticación
import { login, logout, isAuthenticated, getCurrentUser } from '../../lib/auth.js';

// Hook para efectos de scroll avanzados
const useScrollEffects = () => {
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, [0, 1000], [0, 1]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.98]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.95]);
  
  return { scrollYProgress, scale, opacity };
};

// Componente de partículas de fondo
const BackgroundParticles = ({ density = 30 }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const particles = Array.from({ length: density }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5
    }));
    setParticles(particles);
  }, [density]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 backdrop-blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

// Componente de estadísticas animadas
const AnimatedCounter = ({ target, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime = null;
      let animationFrame = null;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        setCount(Math.floor(progress * target));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-bold text-3xl md:text-4xl">
      {count}{suffix}
    </span>
  );
};

export default function ProductionReadyVetGrooming() {
  const [currentSection, setCurrentSection] = useState('inicio');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    petName: '',
    service: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const currentUser = getCurrentUser();
  const { scale, opacity } = useScrollEffects();

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'servicios', 'testimonios', 'contacto'];
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

  // Validación de formulario
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'El nombre es requerido';
    if (!formData.email.trim()) errors.email = 'El email es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Email inválido';
    if (!formData.petName.trim()) errors.petName = 'El nombre de la mascota es requerido';
    if (!formData.service) errors.service = 'Selecciona un servicio';
    if (!formData.message.trim()) errors.message = 'El mensaje es requerido';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simular envío
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', petName: '', service: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Servicios mejorados
  const services = [
    {
      name: "Consultas Médicas",
      description: "Diagnóstico y tratamiento completo para la salud de tu mascota con tecnología avanzada",
      icon: Stethoscope,
      features: ["Diagnóstico preciso", "Tratamiento personalizado", "Seguimiento continuo", "Telemedicina"],
      color: "from-blue-600 to-cyan-600",
      stats: { patients: "2000+", satisfaction: "98%" }
    },
    {
      name: "Vacunación",
      description: "Plan completo de vacunación con certificados oficiales y recordatorios automáticos",
      icon: ShieldCheck,
      features: ["Antirrábica", "Quíntuple", "Sextuple", "Certificados digitales", "Recordatorios"],
      color: "from-green-600 to-emerald-600",
      stats: { vaccines: "5000+", protection: "99%" }
    },
    {
      name: "Cirugías",
      description: "Quirófano equipado con tecnología de punta para cirugías menores y mayores",
      icon: Activity,
      features: ["Castraciones", "Ortopedia", "Soft tissue", "Oftalmología", "UCI post-operatoria"],
      color: "from-purple-600 to-violet-600",
      stats: { surgeries: "800+", success: "99.5%" }
    },
    {
      name: "Laboratorio",
      description: "Análisis clínicos completos con resultados rápidos y precisos",
      icon: Stethoscope,
      features: ["Hemogramas", "Bioquímica", "Orina", "Materia fecal", "Histopatología"],
      color: "from-orange-600 to-red-600",
      stats: { tests: "10000+", accuracy: "99.9%" }
    },
    {
      name: "Emergencias 24/7",
      description: "Atención de urgencias las 24 horas con equipo especializado",
      icon: ShieldCheck,
      features: ["Guardia activa", "Internación", "UCI", "Transporte", "Seguimiento"],
      color: "from-red-600 to-pink-600",
      stats: { emergencies: "1500+", response: "<15min" }
    },
    {
      name: "Peluquería & Spa",
      description: "Servicio premium de estética y bienestar con productos orgánicos",
      icon: Heart,
      features: ["Baño terapéutico", "Corte profesional", "Spa day", "Aromaterapia", "Fotografía"],
      color: "from-pink-600 to-rose-600",
      stats: { treatments: "3000+", rating: "4.9/5" }
    }
  ];

  // Testimonios mejorados
  const testimonials = [
    {
      name: "María González",
      role: "Dueña de Max (Golden Retriever)",
      content: "El equipo veterinario salvó a mi perro de una emergencia grave. Su profesionalismo y dedicación son excepcionales. Max hoy está sano y feliz gracias a ellos.",
      rating: 5,
      avatar: "MG",
      date: "Hace 2 semanas",
      verified: true,
      images: ["golden", "happy"]
    },
    {
      name: "Carlos Rodríguez",
      role: "Dueño de Luna y Sol (Gatos)",
      content: "Atención de primera nivel. Mis gatos reciben el mejor cuidado, desde vacunas hasta chequeos regulares. El trato humano y profesional es inmejorable.",
      rating: 5,
      avatar: "CR",
      date: "Hace 1 mes",
      verified: true,
      images: ["cats", "twins"]
    },
    {
      name: "Ana Martínez",
      role: "Dueña de Rocky (Bulldog)",
      content: "Confío plenamente en ellos para el cuidado de Rocky. La cirugía de cataratas fue un éxito y el seguimiento post-operatorio fue impecable. Totalmente recomendados.",
      rating: 5,
      avatar: "AM",
      date: "Hace 3 semanas",
      verified: true,
      images: ["bulldog", "surgery"]
    },
    {
      name: "Diego Silva",
      role: "Dueño de Bella (Poodle)",
      content: "El servicio de peluquería y spa es espectacular. Bella nunca se vio tan hermosa y relajada. Los productos orgánicos hacen la diferencia.",
      rating: 5,
      avatar: "DS",
      date: "Hace 1 semana",
      verified: true,
      images: ["poodle", "spa"]
    },
    {
      name: "Lucía Pérez",
      role: "Dueña de Thor (Husky)",
      content: "La atención de emergencia 24/7 nos salvó en una situación crítica. Rápida respuesta, diagnóstico preciso y tratamiento efectivo. Gracias por cuidar a Thor.",
      rating: 5,
      avatar: "LP",
      date: "Hace 4 días",
      verified: true,
      images: ["husky", "emergency"]
    },
    {
      name: "Roberto Chen",
      role: "Dueño de Mochi (Gato persa)",
      content: "Excelente servicio de laboratorio con resultados rápidos. El diagnóstico temprano de Mochi hizo posible un tratamiento efectivo. Muy profesionales.",
      rating: 5,
      avatar: "RC",
      date: "Hace 2 meses",
      verified: true,
      images: ["persian", "lab"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Navigation */}
      <motion.header
        style={{ scale, opacity }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-purple-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.05 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all"
              >
                <PawPrint className="w-6 h-6 text-white" />
              </motion.div>
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              >
                VetCare Pro
              </motion.span>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['inicio', 'servicios', 'testimonios', 'contacto'].map((section, index) => (
                <motion.button
                  key={section}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
                  className={`text-sm font-semibold transition-all cursor-pointer relative ${
                    currentSection === section 
                      ? 'text-purple-600' 
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  {currentSection === section && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-purple-600 rounded-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* User menu */}
            <div className="flex items-center gap-3">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-purple-500/25"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm font-medium">{currentUser}</span>
                    <Settings className="w-4 h-4" />
                  </button>
                  
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-purple-100 py-2 z-50"
                      >
                        <a
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors"
                        >
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Settings className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-medium">Dashboard</div>
                            <div className="text-xs text-gray-500">Ver métricas y leads</div>
                          </div>
                        </a>
                        <div className="border-t border-purple-100 my-1" />
                        <button
                          onClick={() => {
                            logout();
                            window.location.href = '/';
                          }}
                          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                            <LogOut className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">Cerrar sesión</div>
                            <div className="text-xs text-gray-500">Salir del sistema</div>
                          </div>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-purple-500/25"
                >
                  <UserCheck className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">Admin</span>
                </a>
              )}

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"
              >
                <motion.div animate={{ rotate: mobileMenuOpen ? 45 : 0 }}>
                  {mobileMenuOpen ? <X className="w-5 h-5 text-purple-600" /> : <Menu className="w-5 h-5 text-purple-600" />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t border-purple-100"
            >
              <div className="px-4 py-4 space-y-2">
                {['inicio', 'servicios', 'testimonios', 'contacto'].map((section, index) => (
                  <motion.button
                    key={section}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-colors font-medium cursor-pointer ${
                      currentSection === section 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'text-gray-700 hover:bg-purple-50'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </motion.button>
                ))}
                
                {currentUser && (
                  <>
                    <div className="border-t border-purple-100 pt-2 mt-2">
                      <a
                        href="/dashboard"
                        className="block w-full text-left px-4 py-3 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                      >
                        Dashboard
                      </a>
                      <button
                        onClick={() => {
                          logout();
                          window.location.href = '/';
                        }}
                        className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
        {/* Background particles */}
        <BackgroundParticles density={25} />
        
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 20%, rgba(236, 72, 153, 0.05) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0"
          />
        </div>

        {/* Contenido */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center max-w-5xl mx-auto px-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-semibold mb-8 border border-purple-200"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <PawPrint className="w-4 h-4" />
                <span>Salud Animal Premium</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
            </motion.div>

            {/* Título animado */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Cuidado Profesional
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                para tu Mascota
              </span>
            </h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Servicios veterinarios de excelencia con tecnología avanzada, 
              <span className="font-semibold text-purple-600"> 15 años de experiencia</span> 
              {" "}y un equipo apasionado por el bienestar animal
            </motion.p>

            {/* Estadísticas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-8 mb-12"
            >
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  <AnimatedCounter target={5000} suffix="+" />
                </div>
                <p className="text-gray-600 mt-2 font-medium">Mascotas Atendidas</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  <AnimatedCounter target={15} suffix="+" />
                </div>
                <p className="text-gray-600 mt-2 font-medium">Años de Experiencia</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  <AnimatedCounter target={98} suffix="%" />
                </div>
                <p className="text-gray-600 mt-2 font-medium">Satisfacción</p>
              </div>
            </motion.div>

            {/* Botones CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -3, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full shadow-xl hover:shadow-purple-500/50 transition-all"
              >
                <span className="flex items-center gap-3">
                  <Heart className="w-5 h-5" />
                  Agendar Cita Ahora
                  <ArrowRight className="w-5 h-5" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -3, borderColor: '#9333ea' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full border-2 border-gray-300 hover:border-purple-600 transition-all shadow-lg"
              >
                <span className="flex items-center gap-3">
                  <Stethoscope className="w-5 h-5" />
                  Ver Servicios
                </span>
              </motion.button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex justify-center mt-16"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-purple-400"
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6"
            >
              <Star className="w-4 h-4 mr-2" />
              Nuestros Servicios Premium
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Atención Integral
              </span>
              {" "}para tu Mejor Amigo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ofrecemos servicios veterinarios completos con tecnología de última generación, 
              personal altamente calificado y un enfoque centrado en el bienestar animal
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 cursor-pointer"
              >
                {/* Header con ícono y stats */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">{service.stats.patients || service.stats.vaccines || service.stats.surgeries || service.stats.tests || service.stats.emergencies || service.stats.treatments}</div>
                    <div className="text-sm text-gray-500">{service.stats.satisfaction || service.stats.protection || service.stats.success || service.stats.accuracy || service.stats.response || service.stats.rating}</div>
                  </div>
                </div>
                
                {/* Contenido */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                {/* Features */}
                <div className="space-y-3 mb-6">
                  {service.features.slice(0, 4).map((feature, i) => (
                    <div key={feature} className="flex items-center gap-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                        className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                      />
                      <span className="text-sm text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-2 text-purple-600 font-bold hover:text-purple-700 transition-colors"
                >
                  Agendar <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6"
            >
              <Heart className="w-4 h-4 mr-2" />
              Historias de Éxito
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Lo que dicen nuestros
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {" "}Clientes Felices
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubre las experiencias de dueños de mascotas que confían en nosotros para el cuidado de sus seres queridos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="flex items-center gap-2 mt-1">
                        {testimonial.verified && (
                          <div className="flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle className="w-3 h-3" />
                            <span>Verificado</span>
                          </div>
                        )}
                        <div className="text-xs text-gray-500">{testimonial.date}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex gap-2">
                    {testimonial.images.map((img, i) => (
                      <div key={i} className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <PawPrint className="w-4 h-4 text-purple-600" />
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-white/30"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Agenda tu Cita
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Comienza el Cuidado
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {" "}de tu Mascota Hoy
              </span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Completa el formulario y nos contactaremos en menos de 1 hora para confirmar tu cita
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4">¡Solicitud Enviada!</h3>
                <p className="text-white/80 text-lg mb-6">
                  Nos contactaremos contigo en las próximas 24 horas para confirmar tu cita.
                </p>
                <div className="flex items-center justify-center gap-4 text-white/60">
                  <Phone className="w-5 h-5" />
                  <span>+54 9 11 2345-6789</span>
                  <Mail className="w-5 h-5 ml-4" />
                  <span>contacto@vetcarepro.com</span>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
                      <UserCheck className="w-4 h-4" />
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 outline-none transition-all backdrop-blur-sm ${
                        formErrors.name 
                          ? 'border-red-400 focus:border-red-400 bg-red-400/10' 
                          : 'border-white/30 focus:border-white/60 focus:bg-white/25'
                      }`}
                      placeholder="Tu nombre completo"
                    />
                    {formErrors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-300 text-sm mt-2 flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {formErrors.name}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 outline-none transition-all backdrop-blur-sm ${
                        formErrors.email 
                          ? 'border-red-400 focus:border-red-400 bg-red-400/10' 
                          : 'border-white/30 focus:border-white/60 focus:bg-white/25'
                      }`}
                      placeholder="tu@email.com"
                    />
                    {formErrors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-300 text-sm mt-2 flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {formErrors.email}
                      </motion.p>
                    )}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Teléfono (opcional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 outline-none focus:border-white/60 focus:bg-white/25 transition-all backdrop-blur-sm"
                      placeholder="+54 9 11 1234-5678"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Nombre de tu mascota
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.petName}
                      onChange={(e) => handleInputChange('petName', e.target.value)}
                      className={`w-full px-4 py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 outline-none transition-all backdrop-blur-sm ${
                        formErrors.petName 
                          ? 'border-red-400 focus:border-red-400 bg-red-400/10' 
                          : 'border-white/30 focus:border-white/60 focus:bg-white/25'
                      }`}
                      placeholder="Nombre de tu mascota"
                    />
                    {formErrors.petName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-300 text-sm mt-2 flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {formErrors.petName}
                      </motion.p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
                    <Stethoscope className="w-4 h-4" />
                    Servicio de interés
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    className={`w-full px-4 py-4 bg-white/20 border rounded-xl text-white outline-none transition-all backdrop-blur-sm ${
                      formErrors.service 
                        ? 'border-red-400 focus:border-red-400 bg-red-400/10' 
                        : 'border-white/30 focus:border-white/60 focus:bg-white/25'
                    }`}
                  >
                    <option value="" className="bg-purple-900">Selecciona un servicio</option>
                    {services.map(service => (
                      <option key={service.name} value={service.name} className="bg-purple-900">
                        {service.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.service && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-300 text-sm mt-2 flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {formErrors.service}
                    </motion.p>
                  )}
                </div>
                
                <div>
                  <label className="block text-white text-sm font-semibold mb-3 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Mensaje
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full px-4 py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 outline-none transition-all backdrop-blur-sm resize-none ${
                      formErrors.message 
                        ? 'border-red-400 focus:border-red-400 bg-red-400/10' 
                        : 'border-white/30 focus:border-white/60 focus:bg-white/25'
                    }`}
                    placeholder="Cuéntanos sobre tu mascota y lo que necesitas..."
                  />
                  {formErrors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-300 text-sm mt-2 flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {formErrors.message}
                    </motion.p>
                  )}
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -3 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full py-4 font-bold rounded-xl shadow-xl transition-all ${
                    isSubmitting
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:shadow-yellow-500/50 cursor-pointer'
                  }`}
                >
                  <span className="flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full"
                        />
                        Enviando solicitud...
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5" />
                        Agendar Cita
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <PawPrint className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">VetCare Pro</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Cuidado profesional para la salud y bienestar de tu mascota con tecnología avanzada y amor por los animales.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Servicios</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#servicios" className="hover:text-white transition-colors">Consultas Médicas</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Vacunación</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Cirugías</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Emergencias 24/7</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +54 9 11 2345-6789
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contacto@vetcarepro.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Av. Libertador 1234, CABA
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Horarios</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Lun a Vie: 9:00 - 20:00</li>
                <li>Sáb: 9:00 - 14:00</li>
                <li className="text-green-400 font-semibold">Emergencias: 24/7</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VetCare Pro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 z-40 flex flex-col gap-4"
      >
        <motion.a
          href={`https://wa.me/5491123456789?text=Hola! Quiero consultar sobre los servicios de VetCare Pro`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-all"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </motion.a>

        <motion.button
          whileHover={{ scale: 1.1, rotate: -15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/50 transition-all"
        >
          <Home className="w-6 h-6 text-white" />
        </motion.button>
      </motion.div>
    </div>
  );
}
