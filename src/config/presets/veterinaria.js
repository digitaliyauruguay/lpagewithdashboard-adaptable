// ============================================
// PRESET: VETERINARIA
// ============================================
// Este archivo define TODA la configuración de la landing
// para el rubro veterinaria. Cambiá valores acá, no en componentes.

export const veterinariaPreset = {
  // ==================== IDENTIDAD ====================
  businessName: "VetCare",
  tagline: "Cuidamos a tu mejor amigo",
  industry: "veterinaria",
  
  // ==================== CONTACTO ====================
  contact: {
    phone: "+5491123456789",
    phoneDisplay: "+54 9 11 2345-6789",
    email: "contacto@vetcare.com",
    whatsapp: "+5491123456789",
    whatsappMessage: "Hola! Quiero consultar sobre los servicios de VetCare",
    address: "Av. Libertador 1234, CABA",
    mapsUrl: "https://maps.google.com/?q=Av.+Libertador+1234+CABA",
  },

  // ==================== AUTENTICACIÓN ====================
  // 🔐 ADMIN CREDENTIALS - Cambiá esto para cada cliente
  admin: {
    username: "admin@vetcare.com",
    password: "vetcare2024", // ⚠️ CAMBIAR EN PRODUCCIÓN
  },

  // ==================== COLORES & TEMA ====================
  theme: {
    primary: "#10b981", // Verde veterinaria
    primaryHover: "#059669",
    secondary: "#3b82f6",
    accent: "#f59e0b",
    dark: "#1f2937",
    light: "#f9fafb",
  },

  // ==================== HERO SECTION ====================
  hero: {
    title: "La salud de tu mascota, nuestra prioridad",
    subtitle: "Atención veterinaria profesional con más de 15 años de experiencia. Abierto 24/7 para emergencias.",
    ctaText: "Reservar turno",
    ctaSecondary: "Ver servicios",
    // Carousel de imágenes - queries para Unsplash
    images: [
      "veterinarian examining dog",
      "cute puppy veterinary clinic",
      "happy cat veterinarian",
      "veterinary surgery equipment modern"
    ],
  },

  // ==================== SERVICIOS ====================
  services: [
    {
      id: "consultas",
      icon: "Stethoscope",
      title: "Consultas Generales",
      description: "Revisión completa del estado de salud de tu mascota con profesionales certificados.",
      features: ["Diagnóstico", "Tratamiento", "Seguimiento"],
    },
    {
      id: "vacunacion",
      icon: "Syringe",
      title: "Vacunación",
      description: "Plan completo de vacunación para cachorros y adultos. Certificados oficiales.",
      features: ["Antirrábica", "Quíntuple", "Sextuple"],
    },
    {
      id: "cirugia",
      icon: "Activity",
      title: "Cirugías",
      description: "Quirófano equipado para cirugías menores y mayores con anestesia segura.",
      features: ["Castraciones", "Emergencias", "Post-operatorio"],
    },
    {
      id: "laboratorio",
      icon: "FlaskConical",
      title: "Laboratorio",
      description: "Análisis clínicos completos con resultados en 24hs.",
      features: ["Hemogramas", "Orina", "Materia fecal"],
    },
    {
      id: "emergencias",
      icon: "Ambulance",
      title: "Emergencias 24/7",
      description: "Atención de urgencias las 24 horas, todos los días del año.",
      features: ["Guardia activa", "Internación", "UCI"],
    },
    {
      id: "peluqueria",
      icon: "Scissors",
      title: "Peluquería & Baño",
      description: "Servicio completo de estética y cuidado del pelaje.",
      features: ["Baño medicado", "Corte de pelo", "Corte de uñas"],
    },
  ],

  // ==================== ABOUT ====================
  about: {
    title: "15 años cuidando a tus mascotas",
    description: "Somos un equipo de veterinarios apasionados comprometidos con el bienestar animal. Contamos con tecnología de última generación y un equipo capacitado en las mejores prácticas internacionales.",
    stats: [
      { value: "15+", label: "Años de experiencia" },
      { value: "5000+", label: "Mascotas atendidas" },
      { value: "24/7", label: "Atención de emergencias" },
      { value: "100%", label: "Clientes satisfechos" },
    ],
    image: "happy veterinarian with dog", // Query para Unsplash
  },

  // ==================== TESTIMONIOS ====================
  testimonials: [
    {
      name: "María González",
      role: "Dueña de Max",
      content: "El mejor lugar para llevar a tu mascota. Salvaron a mi perro después de un accidente y el trato fue excepcional.",
      rating: 5,
      avatar: "MG",
    },
    {
      name: "Carlos Rodríguez",
      role: "Dueño de Luna y Sol",
      content: "Profesionales de primera. Mis gatos están super bien cuidados y los precios son justos.",
      rating: 5,
      avatar: "CR",
    },
    {
      name: "Ana Martínez",
      role: "Dueña de Toby",
      content: "Atención 24/7 real. Una noche tuve una emergencia y me atendieron de inmediato. Totalmente recomendable.",
      rating: 5,
      avatar: "AM",
    },
  ],

  // ==================== FAQ ====================
  faq: [
    {
      question: "¿Atienden emergencias las 24 horas?",
      answer: "Sí, contamos con guardia veterinaria activa las 24 horas, los 7 días de la semana. Ante cualquier emergencia, podés comunicarte directamente por WhatsApp o venir a la clínica.",
    },
    {
      question: "¿Necesito turno para consultas?",
      answer: "Para consultas generales recomendamos sacar turno para evitar esperas. Para emergencias no es necesario, atendemos por orden de llegada según gravedad.",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos efectivo, tarjetas de débito y crédito (hasta 6 cuotas sin interés), y transferencias bancarias.",
    },
    {
      question: "¿Hacen visitas a domicilio?",
      answer: "Sí, ofrecemos servicio de atención a domicilio para casos especiales. Consultá disponibilidad y tarifas por WhatsApp.",
    },
    {
      question: "¿Qué especies atienden?",
      answer: "Atendemos perros, gatos, conejos, hurones y otras mascotas exóticas. Consultá por especies específicas.",
    },
  ],

  // ==================== FORMULARIO DE CONTACTO ====================
  contactForm: {
    title: "Reservá tu turno",
    subtitle: "Completá el formulario y nos contactamos en menos de 1 hora",
    fields: [
      { name: "name", label: "Nombre completo", type: "text", required: true },
      { name: "phone", label: "Teléfono", type: "tel", required: true },
      { name: "email", label: "Email", type: "email", required: false },
      { 
        name: "service", 
        label: "Servicio de interés", 
        type: "select", 
        required: true,
        options: ["Consulta general", "Vacunación", "Cirugía", "Emergencia", "Peluquería", "Otro"]
      },
      { name: "message", label: "Mensaje / Detalles", type: "textarea", required: true },
    ],
    submitText: "Enviar consulta",
    successMessage: "✅ Consulta enviada! Te contactamos pronto.",
  },

  // ==================== HORARIOS ====================
  schedule: {
    weekdays: "Lun a Vie: 9:00 - 20:00",
    weekend: "Sáb: 9:00 - 14:00",
    emergency: "Emergencias: 24/7",
  },

  // ==================== SEO ====================
  seo: {
    title: "VetCare - Veterinaria 24/7 en CABA | Atención de Emergencias",
    description: "Clínica veterinaria con más de 15 años de experiencia. Consultas, cirugías, vacunación y emergencias 24/7. Atención profesional para tu mascota en CABA.",
    keywords: "veterinaria, veterinaria 24 horas, emergencias veterinarias, vacunación mascotas, cirugía veterinaria, CABA, atención veterinaria",
    ogImage: "/og-image-vet.jpg", // Crear después
  },

  // ==================== ANALYTICS ====================
  analytics: {
    // 🔧 CONFIGURAR CUANDO TENGAS LAS CUENTAS
    googleAnalyticsId: "G-XXXXXXXXXX", // ⚠️ CAMBIAR
    metaPixelId: "1234567890", // ⚠️ CAMBIAR
  },

  // ==================== AIRTABLE ====================
  // 🔧 CONFIGURAR CUANDO CREES LA BASE EN AIRTABLE
  airtable: {
    baseId: "appXXXXXXXXXXXXXX", // ⚠️ CAMBIAR
    tableName: "Leads", // Nombre de la tabla en Airtable
    apiKey: "keyXXXXXXXXXXXXXXXX", // ⚠️ CAMBIAR (usar variables de entorno en producción)
  },

  // ==================== POPUP DE CONVERSIÓN ====================
  conversionPopup: {
    enabled: true,
    delay: 6000, // 6 segundos
    title: "🎉 ¡Primera consulta con 20% OFF!",
    message: "Reservá ahora y obtené descuento en tu primera visita. Cupos limitados.",
    ctaText: "Reservar con descuento",
    ctaUrl: "whatsapp", // "whatsapp" o URL personalizada
  },

  // ==================== REDES SOCIALES ====================
  social: {
    facebook: "https://facebook.com/vetcare",
    instagram: "https://instagram.com/vetcare",
    twitter: "",
    linkedin: "",
  },
};

export default veterinariaPreset;