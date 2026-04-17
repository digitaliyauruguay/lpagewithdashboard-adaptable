import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint, Heart, ArrowRight, Stethoscope, ShieldCheck, Activity, UserCheck, Settings, LogOut, Home } from 'lucide-react';

// Importar sistema de autenticación
import { login, logout, isAuthenticated, getCurrentUser } from '../../lib/auth.js';

export default function SimpleVetGrooming() {
  const [currentSection, setCurrentSection] = useState('inicio');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const currentUser = getCurrentUser();

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
      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.05 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-md"
              >
                <PawPrint className="w-6 h-6 text-white" />
              </motion.div>
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold text-gray-900"
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

            {/* User menu */}
            <div className="flex items-center gap-3">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span className="hidden sm:inline">{currentUser}</span>
                    <Settings className="w-4 h-4" />
                  </button>
                  
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      >
                        <a
                          href="/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Dashboard
                        </a>
                        <button
                          onClick={() => {
                            logout();
                            window.location.href = '/';
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Cerrar sesión
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <UserCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center max-w-5xl mx-auto px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6"
          >
            <PawPrint className="w-4 h-4 mr-2" />
            Salud Animal
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Cuidado Profesional para tu Mascota
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Servicios veterinarios de excelencia con tecnología avanzada y amor por los animales
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Agendar Cita
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
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Atención médica integral para la salud y bienestar de tu mascota
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Consultas Médicas",
                description: "Diagnóstico y tratamiento completo para la salud de tu mascota",
                icon: Stethoscope,
                features: ["Diagnóstico", "Tratamiento", "Seguimiento"]
              },
              {
                name: "Vacunación",
                description: "Plan completo de vacunación para cachorros y adultos. Certificados oficiales.",
                icon: ShieldCheck,
                features: ["Antirrábica", "Quíntuple", "Sextuple", "Certificados"]
              },
              {
                name: "Cirugías",
                description: "Quirófano equipado para cirugías menores y mayores con anestesia segura.",
                icon: Activity,
                features: ["Castraciones", "Emergencias", "Post-operatorio"]
              },
              {
                name: "Laboratorio",
                description: "Análisis clínicos completos con resultados en 24hs.",
                icon: Stethoscope,
                features: ["Hemogramas", "Orina", "Materia fecal", "Bioquímica"]
              },
              {
                name: "Emergencias 24/7",
                description: "Atención de urgencias las 24 horas, todos los días del año.",
                icon: ShieldCheck,
                features: ["Guardia activa", "Internación", "UCI"]
              },
              {
                name: "Peluquería & Baño",
                description: "Servicio completo de estética y cuidado del pelaje.",
                icon: Activity,
                features: ["Baño medicado", "Corte de pelo", "Corte de uñas"]
              }
            ].map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 cursor-pointer"
              >
                {/* Icono */}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
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
                  Agendar <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Historias de éxito de dueños de mascotas saludables
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                role: "Dueña de Max",
                content: "El equipo veterinario salvó a mi perro de una emergencia. Son los mejores.",
                rating: 5,
                company: "Cliente Satisfecho"
              },
              {
                name: "Carlos Rodríguez",
                role: "Dueña de Luna",
                content: "Atención excepcional y muy profesionales. Mi gata está sana y feliz.",
                rating: 5,
                company: "Cliente Regular"
              },
              {
                name: "Ana Martínez",
                role: "Dueña de Rocky",
                content: "Confío plenamente en ellos para el cuidado de mis mascotas.",
                rating: 5,
                company: "Cliente Fiel"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 cursor-pointer"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">{"\u2605"}</span>
                  ))}
                </div>

                <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

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

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-gradient-to-br from-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Agenda tu Cita
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Cuidado profesional para la salud de tu mascota
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/20"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Nombre completo</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 outline-none focus:border-white/60"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 outline-none focus:border-white/60"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Teléfono</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 outline-none focus:border-white/60"
                    placeholder="+54 9 11 1234-5678"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Nombre de tu mascota</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 outline-none focus:border-white/60"
                    placeholder="Nombre de tu mascota"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Servicio de interés</label>
                <select
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white outline-none focus:border-white/60"
                >
                  <option value="" className="bg-purple-900">Selecciona un servicio</option>
                  <option value="consulta" className="bg-purple-900">Consulta Médica</option>
                  <option value="vacunacion" className="bg-purple-900">Vacunación</option>
                  <option value="cirugia" className="bg-purple-900">Cirugía</option>
                  <option value="laboratorio" className="bg-purple-900">Laboratorio</option>
                  <option value="emergencia" className="bg-purple-900">Emergencia 24/7</option>
                  <option value="peluqueria" className="bg-purple-900">Peluquería & Baño</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Mensaje</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 outline-none focus:border-white/60 resize-none"
                  placeholder="Cuéntanos sobre tu mascota y lo que necesitas..."
                />
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-yellow-500/50 transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Agendar Cita
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Floating buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 z-40 flex flex-col gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: -15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/50 transition-all cursor-pointer"
        >
          <PawPrint className="w-6 h-6 text-white" />
        </motion.button>
      </motion.div>
    </div>
  );
}
