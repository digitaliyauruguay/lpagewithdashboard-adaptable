// ============================================
// PRESET: PELUQUERÍA
// ============================================
// Este archivo define TODA la configuración de la landing
// para el rubro peluquería. Cambiá valores acá, no en componentes.

export const peluqueriaPreset = {
  // ==================== IDENTIDAD ====================
  businessName: "Bella Style",
  tagline: "Tu belleza, nuestro arte",
  industry: "peluqueria",
  
  // ==================== CONTACTO ====================
  contact: {
    phone: "+5491198765432",
    phoneDisplay: "+54 9 11 9876-5432",
    email: "hola@bellastyle.com",
    whatsapp: "+5491198765432",
    whatsappMessage: "Hola! Quiero reservar un turno en Bella Style",
    address: "Av. Santa Fe 2500, CABA",
    mapsUrl: "https://maps.google.com/?q=Av.+Santa+Fe+2500+CABA",
  },

  // ==================== AUTENTICACIÓN ====================
  // 🔐 ADMIN CREDENTIALS - Cambiá esto para cada cliente
  admin: {
    username: "admin@bellastyle.com",
    password: "bella2024", // ⚠️ CAMBIAR EN PRODUCCIÓN
  },

  // ==================== COLORES & TEMA ====================
  theme: {
    primary: "#ec4899", // Rosa/fucsia peluquería
    primaryHover: "#db2777",
    secondary: "#8b5cf6",
    accent: "#f59e0b",
    dark: "#1f2937",
    light: "#fdf2f8",
  },

  // ==================== HERO SECTION ====================
  hero: {
    title: "Transformamos tu look, potenciamos tu confianza",
    subtitle: "Salón de belleza premium con las últimas tendencias. Tratamientos personalizados para vos.",
    ctaText: "Reservar turno",
    ctaSecondary: "Ver servicios",
    // Carousel de imágenes - queries para Unsplash
    images: [
      "modern hair salon interior luxury",
      "woman beautiful hair salon",
      "hairstylist cutting hair professional",
      "hair color balayage salon"
    ],
  },

  // ==================== SERVICIOS ====================
  services: [
    {
      id: "corte",
      icon: "Scissors",
      title: "Corte & Peinado",
      description: "Cortes personalizados según tu estilo y tipo de cabello. Incluye lavado y peinado profesional.",
      features: ["Asesoramiento", "Lavado premium", "Peinado incluido"],
    },
    {
      id: "coloracion",
      icon: "Palette",
      title: "Coloración",
      description: "Color, mechas, balayage y técnicas de coloración de última tendencia.",
      features: ["Balayage", "Mechas californianas", "Color completo"],
    },
    {
      id: "tratamientos",
      icon: "Sparkles",
      title: "Tratamientos Capilares",
      description: "Tratamientos de hidratación, reparación y nutrición profunda para todo tipo de cabello.",
      features: ["Botox capilar", "Keratina", "Cauterización"],
    },
    {
      id: "alisado",
      icon: "Wind",
      title: "Alisados",
      description: "Alisado permanente, keratina y tratamientos alisadores con productos de primera calidad.",
      features: ["Alisado permanente", "Keratina brasilera", "Nanoplastia"],
    },
    {
      id: "maquillaje",
      icon: "Sparkle",
      title: "Maquillaje",
      description: "Maquillaje profesional para eventos, novias, sesiones de fotos y producción completa.",
      features: ["Social", "Novias", "Editorial"],
    },
    {
      id: "unas",
      icon: "Hand",
      title: "Manicura & Pedicura",
      description: "Servicio completo de cuidado de manos y pies con productos premium.",
      features: ["Manicura express", "Semipermanente", "Nail art"],
    },
  ],

  // ==================== ABOUT ====================
  about: {
    title: "10 años creando belleza",
    description: "Somos un equipo de estilistas profesionales apasionados por crear looks únicos. Trabajamos con las mejores marcas y técnicas internacionales para garantizar resultados excepcionales.",
    stats: [
      { value: "10+", label: "Años de trayectoria" },
      { value: "3000+", label: "Clientas felices" },
      { value: "50+", label: "Servicios mensuales" },
      { value: "100%", label: "Productos premium" },
    ],
    image: "happy hairstylist woman salon", // Query para Unsplash
  },

  // ==================== TESTIMONIOS ====================
  testimonials: [
    {
      name: "Lucía Fernández",
      role: "Cliente desde 2020",
      content: "El mejor salón de CABA sin dudas. Siempre salgo feliz con mi pelo. Las chicas son super profesionales y el ambiente es increíble.",
      rating: 5,
      avatar: "LF",
    },
    {
      name: "Valentina Torres",
      role: "Cliente frecuente",
      content: "Me hice balayage y el resultado fue espectacular. Usan productos de primera y realmente cuidan tu cabello.",
      rating: 5,
      avatar: "VT",
    },
    {
      name: "Sofía Ramírez",
      role: "Cliente VIP",
      content: "Voy desde hace años y nunca me decepcionaron. El servicio es excelente y los precios súper razonables para la calidad que ofrecen.",
      rating: 5,
      avatar: "SR",
    },
  ],

  // ==================== FAQ ====================
  faq: [
    {
      question: "¿Necesito turno previo?",
      answer: "Sí, trabajamos 100% con sistema de turnos para garantizarte atención personalizada sin esperas. Podés reservar por WhatsApp, teléfono o web.",
    },
    {
      question: "¿Qué marcas de productos usan?",
      answer: "Trabajamos exclusivamente con marcas premium como L'Oréal Professionnel, Schwarzkopf, Wella y Kevin Murphy para garantizar los mejores resultados.",
    },
    {
      question: "¿Hacen pruebas de color?",
      answer: "Sí, para cambios de color importantes siempre hacemos una consulta previa y pruebas de mechón para asegurar el resultado deseado.",
    },
    {
      question: "¿Cuánto dura un tratamiento de keratina?",
      answer: "La duración depende del tipo de cabello y cuidados, pero generalmente dura entre 3 a 6 meses. Te damos todas las recomendaciones post-tratamiento.",
    },
    {
      question: "¿Aceptan tarjetas de crédito?",
      answer: "Sí, aceptamos todas las tarjetas de débito y crédito con hasta 3 cuotas sin interés. También efectivo y transferencias.",
    },
  ],

  // ==================== FORMULARIO DE CONTACTO ====================
  contactForm: {
    title: "Reservá tu turno",
    subtitle: "Completá el formulario y confirmamos tu turno en minutos",
    fields: [
      { name: "name", label: "Nombre completo", type: "text", required: true },
      { name: "phone", label: "Teléfono / WhatsApp", type: "tel", required: true },
      { name: "email", label: "Email", type: "email", required: false },
      { 
        name: "service", 
        label: "Servicio de interés", 
        type: "select", 
        required: true,
        options: ["Corte y peinado", "Coloración", "Tratamiento capilar", "Alisado", "Maquillaje", "Manicura/Pedicura", "Combo"]
      },
      { name: "message", label: "Fecha preferida / Comentarios", type: "textarea", required: true },
    ],
    submitText: "Solicitar turno",
    successMessage: "✅ Turno solicitado! Te confirmamos por WhatsApp.",
  },

  // ==================== HORARIOS ====================
  schedule: {
    weekdays: "Lun a Vie: 10:00 - 20:00",
    weekend: "Sáb: 9:00 - 18:00",
    emergency: "Dom: Cerrado",
  },

  // ==================== SEO ====================
  seo: {
    title: "Bella Style - Salón de Belleza Premium en CABA | Peluquería & Estética",
    description: "Salón de belleza en CABA con 10 años de experiencia. Corte, coloración, tratamientos capilares, alisados, maquillaje y más. Reservá tu turno online.",
    keywords: "peluquería, salón de belleza, coloración, balayage, keratina, alisado, maquillaje, manicura, CABA, estilistas profesionales",
    ogImage: "/og-image-salon.jpg", // Crear después
  },

  // ==================== ANALYTICS ====================
  analytics: {
    // 🔧 CONFIGURAR CUANDO TENGAS LAS CUENTAS
    googleAnalyticsId: "G-YYYYYYYYYY", // ⚠️ CAMBIAR
    metaPixelId: "0987654321", // ⚠️ CAMBIAR
  },

  // ==================== AIRTABLE ====================
  // 🔧 CONFIGURAR CUANDO CREES LA BASE EN AIRTABLE
  airtable: {
    baseId: "appYYYYYYYYYYYYYY", // ⚠️ CAMBIAR
    tableName: "Leads", // Nombre de la tabla en Airtable
    apiKey: "keyYYYYYYYYYYYYYYYY", // ⚠️ CAMBIAR (usar variables de entorno en producción)
  },

  // ==================== POPUP DE CONVERSIÓN ====================
  conversionPopup: {
    enabled: true,
    delay: 7000, // 7 segundos
    title: "💅 ¡15% OFF en tu primer servicio!",
    message: "Reservá ahora y obtené descuento en cualquier servicio. Solo para nuevas clientas.",
    ctaText: "Quiero mi descuento",
    ctaUrl: "whatsapp", // "whatsapp" o URL personalizada
  },

  // ==================== REDES SOCIALES ====================
  social: {
    facebook: "https://facebook.com/bellastyle",
    instagram: "https://instagram.com/bellastyle",
    twitter: "",
    linkedin: "",
  },
};

export default peluqueriaPreset;