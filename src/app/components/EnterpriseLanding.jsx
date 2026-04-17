import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring, useMotionValue, useAnimation } from 'framer-motion';
import { 
  Menu, X, ArrowRight, Phone, Mail, MapPin, 
  Star, Heart, Sparkles, Zap, Camera, Grid3x3,
  Loader2, CheckCircle, Send, Calendar, Users,
  TrendingUp, Award, Target, Layers, Shield,
  Rocket, Brain, Cpu, Globe, Infinity, ChevronDown,
  Clock, MapPin as MapPinIcon, MessageCircle
} from 'lucide-react';
import { config } from '../../config/activePreset.js';
import { saveLead } from '../../lib/airtable.js';
import { trackLead } from '../../lib/analytics.js';
import { toast } from 'sonner';

// Hook para efectos de scroll avanzados
const useScrollEffects = () => {
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, [0, 1000], [0, 1]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.95]);
  
  return { scrollYProgress, scale, opacity };
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

// Componente de partículas de fondo
const BackgroundParticles = ({ density = 30 }) => {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

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
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
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

// Navegación enterprise con efectos suaves
const EnterpriseNav = ({ isOpen, setIsOpen, currentSection, scrollY }) => {
  const sections = ['inicio', 'servicios', 'testimonios', 'contacto'];
  const { scale, opacity } = useScrollEffects();

  return (
    <motion.header
      style={{ scale, opacity }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre de empresa */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.05 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-md"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold text-gray-900"
            >
              QuantumTech
            </motion.span>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {sections.map((section, index) => (
              <motion.button
                key={section}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
                className={`text-sm font-semibold transition-colors cursor-pointer ${
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
            className="md:hidden w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"
          >
            <motion.div animate={{ rotate: isOpen ? 45 : 0 }}>
              {isOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
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
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors font-medium cursor-pointer"
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

// Hero section enterprise
const EnterpriseHero = () => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });
  const { scrollYProgress } = useScrollEffects();

  const words = config.hero.title.split(' ');

  return (
    <section ref={heroRef} id="inicio" className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background particles */}
      <BackgroundParticles density={25} />
      
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)',
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
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center max-w-5xl mx-auto px-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Transformación Digital
          </motion.div>

          {/* Título animado */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ color: '#9333ea' }}
                className="inline-block mr-2 sm:mr-4"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            {config.hero.subtitle}
          </motion.p>

          {/* Estadísticas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-8 justify-center mb-12"
          >
            <div className="text-center">
              <AnimatedCounter target={200} suffix="+" />
              <p className="text-gray-600 mt-2">Clientes Transformados</p>
            </div>
            <div className="text-center">
              <AnimatedCounter target={95} suffix="%" />
              <p className="text-gray-600 mt-2">Satisfacción</p>
            </div>
            <div className="text-center">
              <AnimatedCounter target={24} suffix="/7" />
              <p className="text-gray-600 mt-2">Soporte</p>
            </div>
          </motion.div>

          {/* Botones CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Comenzar Ahora
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-300 hover:border-purple-600 transition-all cursor-pointer"
            >
              Ver Servicios
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
              className="text-gray-400"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Servicios enterprise
const EnterpriseServices = () => {
  const servicesRef = useRef(null);
  const isInView = useInView(servicesRef, { once: true });

  const services = [
    {
      name: "Consultoría Estratégica",
      description: "Transformamos tu visión en resultados tangibles con estrategias probadas",
      icon: Target,
      color: "from-purple-600 to-purple-800",
      features: ["Análisis de Mercado", "Roadmap Digital", "KPIs", "ROI"]
    },
    {
      name: "Desarrollo Web3",
      description: "Soluciones descentralizadas para la nueva economía digital",
      icon: Globe,
      color: "from-blue-600 to-blue-800",
      features: ["Smart Contracts", "DeFi", "NFTs", "DAOs"]
    },
    {
      name: "Inteligencia Artificial",
      description: "Sistemas cognitivos que aprenden y evolucionan con tu negocio",
      icon: Brain,
      color: "from-green-600 to-green-800",
      features: ["Machine Learning", "NLP", "Computer Vision", "Predictive Analytics"]
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={servicesRef}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones integrales para impulsar tu transformación digital
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 cursor-pointer"
            >
              {/* Icono */}
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Contenido */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.name}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              {/* Features */}
              <div className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors cursor-pointer"
              >
                Saber más <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonios enterprise
const EnterpriseTestimonials = () => {
  const testimonialsRef = useRef(null);
  const isInView = useInView(testimonialsRef, { once: true });

  const testimonials = [
    {
      name: "María González",
      role: "CEO, TechCorp",
      content: "La transformación digital que implementaron superó todas nuestras expectativas. El ROI fue del 300% en el primer año.",
      rating: 5,
      company: "TechCorp"
    },
    {
      name: "Carlos Rodríguez",
      role: "CTO, FutureLab",
      content: "Su enfoque en IA y Web3 nos posicionó como líderes en nuestro sector. Increíble equipo profesional.",
      rating: 5,
      company: "FutureLab"
    },
    {
      name: "Ana Martínez",
      role: "Directora, Innovation Hub",
      content: "Revolutionaron completamente nuestra operación. Ahora somos más eficientes y competitivos que nunca.",
      rating: 5,
      company: "Innovation Hub"
    }
  ];

  return (
    <section id="testimonios" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={testimonialsRef}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Historias de éxito de empresas que ya transformaron su negocio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 cursor-pointer"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-purple-600 font-medium">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contacto enterprise con integración real
const EnterpriseContact = () => {
  const contactRef = useRef(null);
  const isInView = useInView(contactRef, { once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // Validación avanzada
  const validateField = useCallback((name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'El nombre es requerido';
        } else if (value.trim().length < 3) {
          newErrors.name = 'El nombre debe tener al menos 3 caracteres';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          newErrors.name = 'El nombre solo puede contener letras';
        } else {
          delete newErrors.name;
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Ingresa un email válido';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'company':
        if (value && value.trim().length < 2) {
          newErrors.company = 'La empresa debe tener al menos 2 caracteres';
        } else {
          delete newErrors.company;
        }
        break;
        
      case 'service':
        if (!value) {
          newErrors.service = 'Selecciona un servicio';
        } else {
          delete newErrors.service;
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          newErrors.message = 'El mensaje es requerido';
        } else if (value.trim().length < 10) {
          newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
        } else if (value.trim().length > 500) {
          newErrors.message = 'El mensaje no puede exceder 500 caracteres';
        } else {
          delete newErrors.message;
        }
        break;
    }
    
    return newErrors;
  }, [errors]);

  const handleFieldChange = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const newErrors = validateField(name, value);
      setErrors(newErrors);
    }
  }, [touched, validateField]);

  const handleFieldBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const newErrors = validateField(name, formData[name]);
    setErrors(newErrors);
  }, [formData, validateField]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Marcar todos los campos como touched
    const allFields = ['name', 'email', 'company', 'service', 'message'];
    const newTouched = {};
    allFields.forEach(field => {
      newTouched[field] = true;
    });
    setTouched(newTouched);
    
    // Validar todos los campos
    let newErrors = {};
    allFields.forEach(field => {
      const fieldErrors = validateField(field, formData[field]);
      newErrors = { ...newErrors, ...fieldErrors };
    });
    setErrors(newErrors);
    
    // Si hay errores, mostrar mensaje
    if (Object.keys(newErrors).length > 0) {
      toast.error('Por favor, corrige los errores en el formulario');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitCount(prev => prev + 1);

    try {
      // Guardar en Airtable
      const result = await saveLead({
        ...formData,
        source: 'Enterprise Landing',
        service: formData.service || 'General Inquiry',
        submitCount: submitCount + 1,
        timestamp: new Date().toISOString()
      });

      if (result.success) {
        // Trackear en analytics
        trackLead({
          ...formData,
          submitCount: submitCount + 1,
          conversionType: 'contact_form'
        });

        // Mostrar éxito
        toast.success('¡Mensaje enviado con éxito! Nos contactaremos pronto.');
        setIsSubmitted(true);
        setFormData({ name: '', email: '', company: '', service: '', message: '' });
        setErrors({});
        setTouched({});
        
        // Reset después de 5 segundos
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        toast.error('Error al enviar. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error de conexión. Por favor, intenta más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    'Consultoría Estratégica',
    'Desarrollo Web3',
    'Inteligencia Artificial',
    'Integración General'
  ];

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-purple-900 to-pink-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={contactRef}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Comienza tu transformación
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            El futuro de tu negocio comienza hoy. Hablemos de cómo podemos ayudarte.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/20"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">¡Mensaje Enviado!</h3>
              <p className="text-white/80">Nos pondremos en contacto contigo en las próximas 24 horas.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <table className="w-full">
                <tbody>
                  <tr className="md:hidden">
                    <td colSpan="2">
                      <div className="space-y-4">
                        <div>
                          <input
                            type="text"
                            placeholder="Nombre completo"
                            value={formData.name}
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                            onBlur={() => handleFieldBlur('name')}
                            required
                            className={`w-full px-6 py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 outline-none transition-all ${
                              errors.name 
                                ? 'border-red-400 focus:border-red-400 bg-red-400/10' 
                                : touched.name && !errors.name
                                ? 'border-green-400 focus:border-green-400 bg-green-400/10'
                                : 'border-white/30 focus:border-white/60 focus:bg-white/25'
                            }`}
                          />
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-300 text-sm mt-2 flex items-center gap-1"
                            >
                              <span className="text-red-400">⚠</span> {errors.name}
                            </motion.p>
                          )}
                        </div>
                        
                        <div>
                          <input
                            type="email"
                            placeholder="Email profesional"
                            value={formData.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            onBlur={() => handleFieldBlur('email')}
                            required
                            className={`w-full px-6 py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 outline-none transition-all ${
                              errors.email 
                                ? 'border-red-400 focus:border-red-400 bg-red-400/10' 
                                : touched.email && !errors.email
                                ? 'border-green-400 focus:border-green-400 bg-green-400/10'
                                : 'border-white/30 focus:border-white/60 focus:bg-white/25'
                            }`}
                          />
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-300 text-sm mt-2 flex items-center gap-1"
                            >
                              <span className="text-red-400">⚠</span> {errors.email}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="Empresa (opcional)"
                            value={formData.company}
                            onChange={(e) => handleFieldChange('company', e.target.value)}
                            onBlur={() => handleFieldBlur('company')}
                            className={`w-full px-6 py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 outline-none transition-all ${
                              errors.company 
                                ? 'border-red-400 focus:border-red-400 bg-red-400/10' 
                                : touched.company && !errors.company && formData.company
                                ? 'border-green-400 focus:border-green-400 bg-green-400/10'
                                : 'border-white/30 focus:border-white/60 focus:bg-white/25'
                            }`}
                          />
                          {errors.company && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-300 text-sm mt-2 flex items-center gap-1"
                            >
                              <span className="text-red-400">⚠</span> {errors.company}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <select
                            value={formData.service}
                            onChange={(e) => handleFieldChange('service', e.target.value)}
                            onBlur={() => handleFieldBlur('service')}
                            required
                            className={`w-full px-6 py-4 bg-white/20 border rounded-xl text-white outline-none transition-all ${
                              errors.service 
                                ? 'border-red-400 focus:border-red-400 bg-red-400/10' 
                                : touched.service && !errors.service
                                ? 'border-green-400 focus:border-green-400 bg-green-400/10'
                                : 'border-white/30 focus:border-white/60 focus:bg-white/25'
                            }`}
                          >
                            <option value="" className="bg-purple-900">Selecciona un servicio</option>
                            {services.map(service => (
                              <option key={service} value={service} className="bg-purple-900">
                                {service}
                              </option>
                            ))}
                          </select>
                          {errors.service && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-300 text-sm mt-2 flex items-center gap-1"
                            >
                              <span className="text-red-400">⚠</span> {errors.service}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="hidden md:table-row">
                    <td className="pr-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Nombre completo"
                          value={formData.name}
                          onChange={(e) => handleFieldChange('name', e.target.value)}
                          onBlur={() => handleFieldBlur('name')}
                          required
                          className={`w-full px-6 py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 outline-none transition-all ${
                            errors.name 
                              ? 'border-red-400 focus:border-red-400 bg-red-400/10' 
                              : touched.name && !errors.name
                              ? 'border-green-400 focus:border-green-400 bg-green-400/10'
                              : 'border-white/30 focus:border-white/60 focus:bg-white/25'
                          }`}
                        />
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-300 text-sm mt-2 flex items-center gap-1"
                          >
                            <span className="text-red-400">⚠</span> {errors.name}
                          </motion.p>
                        )}
                      </div>
                    </td>
                    <td className="pl-4">
                      <div>
                        <input
                          type="email"
                          placeholder="Email profesional"
                          value={formData.email}
                          onChange={(e) => handleFieldChange('email', e.target.value)}
                          onBlur={() => handleFieldBlur('email')}
                          required
                          className={`w-full px-6 py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 outline-none transition-all ${
                            errors.email 
                              ? 'border-red-400 focus:border-red-400 bg-red-400/10' 
                              : touched.email && !errors.email
                              ? 'border-green-400 focus:border-green-400 bg-green-400/10'
                              : 'border-white/30 focus:border-white/60 focus:bg-white/25'
                          }`}
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-300 text-sm mt-2 flex items-center gap-1"
                          >
                            <span className="text-red-400">⚠</span> {errors.email}
                          </motion.p>
                        )}
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="hidden md:table-row">
                    <td className="pr-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Empresa (opcional)"
                          value={formData.company}
                          onChange={(e) => handleFieldChange('company', e.target.value)}
                          onBlur={() => handleFieldBlur('company')}
                          className={`w-full px-6 py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 outline-none transition-all ${
                            errors.company 
                              ? 'border-red-400 focus:border-red-400 bg-red-400/10' 
                              : touched.company && !errors.company && formData.company
                              ? 'border-green-400 focus:border-green-400 bg-green-400/10'
                              : 'border-white/30 focus:border-white/60 focus:bg-white/25'
                          }`}
                        />
                        {errors.company && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-300 text-sm mt-2 flex items-center gap-1"
                          >
                            <span className="text-red-400">⚠</span> {errors.company}
                          </motion.p>
                        )}
                      </div>
                    </td>
                    <td className="pl-4">
                      <div>
                        <select
                          value={formData.service}
                          onChange={(e) => handleFieldChange('service', e.target.value)}
                          onBlur={() => handleFieldBlur('service')}
                          required
                          className={`w-full px-6 py-4 bg-white/20 border rounded-xl text-white outline-none transition-all ${
                            errors.service 
                              ? 'border-red-400 focus:border-red-400 bg-red-400/10' 
                              : touched.service && !errors.service
                              ? 'border-green-400 focus:border-green-400 bg-green-400/10'
                              : 'border-white/30 focus:border-white/60 focus:bg-white/25'
                          }`}
                        >
                          <option value="" className="bg-purple-900">Selecciona un servicio</option>
                          {services.map(service => (
                            <option key={service} value={service} className="bg-purple-900">
                              {service}
                            </option>
                          ))}
                        </select>
                        {errors.service && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-300 text-sm mt-2 flex items-center gap-1"
                          >
                            <span className="text-red-400">⚠</span> {errors.service}
                          </motion.p>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div>
                <textarea
                  placeholder="Describe tu proyecto y objetivos..."
                  value={formData.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  onBlur={() => handleFieldBlur('message')}
                  required
                  rows={6}
                  maxLength={500}
                  className={`w-full px-6 py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 outline-none transition-all resize-none ${
                    errors.message 
                      ? 'border-red-400 focus:border-red-400 bg-red-400/10' 
                      : touched.message && !errors.message
                      ? 'border-green-400 focus:border-green-400 bg-green-400/10'
                      : 'border-white/30 focus:border-white/60 focus:bg-white/25'
                  }`}
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-300 text-sm flex items-center gap-1"
                    >
                      <span className="text-red-400">⚠</span> {errors.message}
                    </motion.p>
                  )}
                  <span className="text-white/60 text-sm">
                    {formData.message.length}/500 caracteres
                  </span>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
                whileHover={{ scale: (isSubmitting || Object.keys(errors).length > 0) ? 1 : 1.02, y: (isSubmitting || Object.keys(errors).length > 0) ? 0 : -3 }}
                whileTap={{ scale: (isSubmitting || Object.keys(errors).length > 0) ? 1 : 0.98 }}
                className={`w-full py-4 font-bold rounded-xl shadow-xl transition-all disabled:cursor-not-allowed ${
                  isSubmitting || Object.keys(errors).length > 0
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:shadow-yellow-500/50 cursor-pointer'
                }`}
              >
                <span className="flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando mensaje...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {Object.keys(errors).length > 0 ? 'Corrige los errores' : 'Enviar Mensaje'}
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default function EnterpriseLanding() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('inicio');
  const { scrollY } = useScroll();

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

  return (
    <div className="min-h-screen bg-gray-50">
      <EnterpriseNav 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        currentSection={currentSection}
        scrollY={scrollY}
      />
      
      <EnterpriseHero />
      <EnterpriseServices />
      <EnterpriseTestimonials />
      <EnterpriseContact />
      
      {/* Botones flotantes */}
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
          <MessageCircle className="w-7 h-7 text-white" />
        </motion.a>

        <motion.button
          whileHover={{ scale: 1.1, rotate: -15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/50 transition-all cursor-pointer"
        >
          <Rocket className="w-6 h-6 text-white" />
        </motion.button>
      </motion.div>
    </div>
  );
};
