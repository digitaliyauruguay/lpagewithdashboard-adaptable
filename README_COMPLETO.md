# 🚀 LANDING PAGES QUE VENDEN - Sistema Completo

Sistema escalable de landing pages de alta conversión con Next.js, React, Tailwind CSS y Airtable.

---

## 📋 Índice

1. [Características](#-características)
2. [Stack Tecnológico](#-stack-tecnológico)
3. [Instalación Rápida](#-instalación-rápida)
4. [Cambiar de Preset/Rubro](#-cambiar-de-presetrubro)
5. [Crear Nuevo Preset](#-crear-nuevo-preset)
6. [Configurar Airtable](#-configurar-airtable)
7. [Configurar Analytics](#-configurar-analytics)
8. [Panel de Administración](#-panel-de-administración)
9. [Deploy](#-deploy)
10. [Estructura del Proyecto](#-estructura-del-proyecto)

---

## ✨ Características

### 🎯 Conversión Optimizada
- ✅ Hero con carousel de imágenes premium
- ✅ Popup de conversión estratégico (delay configurable)
- ✅ Botón WhatsApp flotante con mensaje pre-cargado
- ✅ FAQ antes del formulario (elimina objeciones)
- ✅ Animaciones premium optimizadas según dispositivo
- ✅ CTA claros en toda la página
- ✅ Prueba social (testimonios + stats)

### 🎨 Diseño Premium
- ✅ Scroll suave
- ✅ Navbar fija con blur effect
- ✅ Hover effects en botones, cards y texto
- ✅ Animaciones con Motion (Framer Motion)
- ✅ Responsive real (mobile-first)
- ✅ Colores dinámicos según rubro
- ✅ Tipografía optimizada

### 📊 Sistema de Leads
- ✅ Integración con Airtable (mini CRM)
- ✅ Captura de 6 datos clave:
  1. Nombre
  2. Teléfono
  3. Email (opcional)
  4. Servicio de interés
  5. Mensaje
  6. Fuente (Website, Instagram, etc)
- ✅ Automatizaciones de email (vía Airtable)

### 📈 Dashboard de Administración
- ✅ Login protegido (credenciales en preset)
- ✅ Análisis completo de leads:
  - Leads por día (últimos 7 días)
  - Leads por servicio
  - Leads por fuente
  - Tabla con datos completos
- ✅ Métricas de sitio web:
  - Visitantes
  - Tasa de conversión
  - Bounce rate
  - Fuentes de tráfico
  - Dispositivos
- ✅ Gráficos interactivos (Recharts)

### 🔍 SEO & Analytics
- ✅ Meta tags dinámicos según preset
- ✅ Google Analytics 4 (GA4)
- ✅ Meta Pixel (Facebook)
- ✅ Open Graph tags
- ✅ Tracking de eventos:
  - Lead generado
  - CTA clicks
  - WhatsApp clicks
  - Scroll depth
  - Popup views

### ⚡ Performance
- ✅ Animaciones optimizadas según dispositivo
- ✅ Detección de mobile/tablet/desktop
- ✅ Lazy loading de imágenes
- ✅ Componentes modulares
- ✅ Code splitting automático

---

## 🛠 Stack Tecnológico

- **Frontend**: React 18.3
- **Build Tool**: Vite
- **Routing**: React Router 7
- **Styling**: Tailwind CSS v4
- **Animaciones**: Motion (Framer Motion)
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Carousel**: React Slick
- **Database**: Airtable
- **Analytics**: Google Analytics + Meta Pixel
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Date Utils**: date-fns

---

## 🚀 Instalación Rápida

### 1. Clonar el repositorio
```bash
git clone <tu-repo>
cd <nombre-proyecto>
```

### 2. Instalar dependencias
```bash
npm install
# o
pnpm install
```

### 3. Iniciar servidor de desarrollo
```bash
npm run dev
```

### 4. Abrir en el navegador
```
http://localhost:5173
```

**¡Listo!** Ya tenés la landing corriendo con datos de ejemplo (modo MOCK).

---

## 🎨 Cambiar de Preset/Rubro

Para cambiar entre veterinaria y peluquería (o cualquier preset):

### Opción 1: Editar archivo
Abrir `/src/config/activePreset.js`:

```javascript
// Cambiar esta línea:
export const config = veterinariaPreset;

// Por esta:
export const config = peluqueriaPreset;
```

### Opción 2: Comentar/descomentar
```javascript
// Veterinaria
export const config = veterinariaPreset;

// Peluquería
// export const config = peluqueriaPreset;
```

**¡Eso es todo!** La página se adapta automáticamente:
- ✅ Colores
- ✅ Textos
- ✅ Servicios
- ✅ FAQ
- ✅ Imágenes del carousel
- ✅ Credenciales de admin
- ✅ SEO
- ✅ Todo el contenido

---

## 🆕 Crear Nuevo Preset

### PASO 1: Copiar archivo base
```bash
cp src/config/presets/veterinaria.js src/config/presets/restaurante.js
```

### PASO 2: Editar el nuevo preset

Abrir `/src/config/presets/restaurante.js` y modificar:

```javascript
export const restaurantePreset = {
  // ==================== IDENTIDAD ====================
  businessName: "La Trattoria",
  tagline: "Auténtica cocina italiana",
  industry: "restaurante",
  
  // ==================== CONTACTO ====================
  contact: {
    phone: "+5491112345678",
    phoneDisplay: "+54 9 11 1234-5678",
    email: "info@latrattoria.com",
    whatsapp: "+5491112345678",
    whatsappMessage: "Hola! Quiero hacer una reserva",
    address: "Av. Corrientes 1234, CABA",
    mapsUrl: "https://maps.google.com/?q=...",
  },

  // ==================== AUTENTICACIÓN ====================
  admin: {
    username: "admin@latrattoria.com",
    password: "trattoria2024",
  },

  // ==================== COLORES & TEMA ====================
  theme: {
    primary: "#dc2626", // Rojo italiano
    primaryHover: "#b91c1c",
    secondary: "#16a34a", // Verde italiano
    accent: "#f59e0b",
    dark: "#1f2937",
    light: "#fef2f2",
  },

  // ==================== HERO SECTION ====================
  hero: {
    title: "Auténtica cocina italiana en el corazón de Buenos Aires",
    subtitle: "Pasta artesanal, pizzas al horno de leña y la mejor selección de vinos.",
    ctaText: "Reservar mesa",
    ctaSecondary: "Ver menú",
    images: [
      "italian restaurant interior cozy",
      "fresh pasta making chef",
      "pizza oven fire wood",
      "italian wine cheese"
    ],
  },

  // ==================== SERVICIOS ====================
  services: [
    {
      id: "menu-dia",
      icon: "UtensilsCrossed",
      title: "Menú del Día",
      description: "Entrada + plato principal + postre con ingredientes frescos.",
      features: ["Lun a Vie", "12-16hs", "Precio fijo"],
    },
    // ... más servicios
  ],

  // ... resto de la configuración
};

export default restaurantePreset;
```

### PASO 3: Importar y activar

Abrir `/src/config/activePreset.js`:

```javascript
import { veterinariaPreset } from './presets/veterinaria.js';
import { peluqueriaPreset } from './presets/peluqueria.js';
import { restaurantePreset } from './presets/restaurante.js'; // ⬅️ Agregar

export const config = restaurantePreset; // ⬅️ Activar
```

**¡Listo!** Ya tenés un nuevo preset funcionando.

---

## 📊 Configurar Airtable

### Quick Start

1. **Crear cuenta**: https://airtable.com
2. **Crear base** con tabla "Leads"
3. **Configurar campos** (ver tabla abajo)
4. **Obtener credenciales** (Base ID + API Key)
5. **Pegar en preset** (sección `airtable`)
6. **Cambiar `USE_MOCK = false`** en `/src/lib/airtable.js`

### Campos de la tabla "Leads"

| Campo | Tipo |
|-------|------|
| Name | Single line text |
| Phone | Phone number |
| Email | Email |
| Service | Single select |
| Message | Long text |
| Source | Single line text |
| Created | Created time |

### Configurar en preset

```javascript
airtable: {
  baseId: "appYOUR_BASE_ID_HERE",
  tableName: "Leads",
  apiKey: "patYOUR_API_KEY_HERE",
},
```

### Activar conexión real

En `/src/lib/airtable.js`:
```javascript
const USE_MOCK = false; // Cambiar de true a false
```

📖 **Ver guía completa**: [SETUP_AIRTABLE.md](./SETUP_AIRTABLE.md)

---

## 📈 Configurar Analytics

### Google Analytics (GA4)

1. Crear cuenta en https://analytics.google.com
2. Crear propiedad GA4
3. Copiar ID (formato: `G-XXXXXXXXXX`)
4. Pegar en preset:

```javascript
analytics: {
  googleAnalyticsId: "G-YOUR-GA-ID",
  metaPixelId: "YOUR-META-PIXEL-ID",
},
```

### Meta Pixel (Facebook)

1. Ir a Facebook Events Manager
2. Crear nuevo pixel
3. Copiar Pixel ID (15 dígitos)
4. Pegar en preset (mismo lugar que GA)

### Eventos trackeados automáticamente:
- ✅ Lead generado
- ✅ CTA clicks
- ✅ WhatsApp clicks
- ✅ Teléfono clicks
- ✅ Popup views
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Page views

---

## 🔐 Panel de Administración

### Acceder al Dashboard

1. **Ir a** `/login`
2. **Credenciales** están en el preset activo:
   - Usuario: `config.admin.username`
   - Contraseña: `config.admin.password`

### Credenciales por preset:

**Veterinaria:**
- Usuario: `admin@vetcare.com`
- Contraseña: `vetcare2024`

**Peluquería:**
- Usuario: `admin@bellastyle.com`
- Contraseña: `bella2024`

### Features del Dashboard:
- ✅ Vista de todos los leads
- ✅ Gráficos de conversión
- ✅ Analytics del sitio
- ✅ Filtros y búsqueda
- ✅ Exportar datos

⚠️ **IMPORTANTE**: Cambiar las contraseñas en producción.

---

## 🌐 Deploy

### Opción 1: Vercel (Recomendado)

1. **Conectar GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <tu-repo>
   git push -u origin main
   ```

2. **Importar en Vercel**
   - Ir a https://vercel.com
   - "Import Project"
   - Seleccionar tu repo
   - Deploy

3. **Variables de entorno** (opcional)
   - En Vercel: Settings → Environment Variables
   - Agregar:
     - `VITE_AIRTABLE_API_KEY`
     - `VITE_AIRTABLE_BASE_ID`
     - (Sacar credenciales del preset)

### Opción 2: Netlify

Similar a Vercel:
1. Conectar repo
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

---

## 📁 Estructura del Proyecto

```
/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes React
│   │   │   ├── HeroCarousel.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── WhatsAppButton.jsx
│   │   │   ├── ConversionPopup.jsx
│   │   │   └── ui/              # UI Components (Radix)
│   │   ├── pages/               # Páginas
│   │   │   ├── Landing.jsx      # Página principal
│   │   │   ├── Login.tsx        # Login admin
│   │   │   ├── Dashboard.tsx    # Panel admin
│   │   │   └── NotFound.tsx     # 404
│   │   ├── App.tsx              # App principal
│   │   └── routes.tsx           # Configuración de rutas
│   │
│   ├── config/
│   │   ├── activePreset.js      # ⭐ CAMBIAR PRESET ACÁ
│   │   └── presets/
│   │       ├── veterinaria.js   # Preset veterinaria
│   │       └── peluqueria.js    # Preset peluquería
│   │
│   ├── lib/
│   │   ├── airtable.js          # Servicio Airtable
│   │   ├── analytics.js         # GA + Meta Pixel
│   │   ├── auth.js              # Autenticación
│   │   └── deviceDetection.js   # Detección de dispositivo
│   │
│   └── styles/
│       ├── index.css            # CSS principal
│       ├── tailwind.css         # Tailwind base
│       ├── theme.css            # Variables CSS
│       └── fonts.css            # Fuentes
│
├── SETUP_AIRTABLE.md            # Guía Airtable completa
├── README_COMPLETO.md           # Este archivo
└── package.json
```

---

## 🎯 Casos de Uso

### Para vender a clientes:

1. **Clonar el repo como template**
2. **Crear preset del cliente**
3. **Configurar Airtable del cliente**
4. **Deploy en Vercel**
5. **Conectar dominio del cliente**

### Ventajas:
- ✅ Mismo código base para todos los clientes
- ✅ Solo cambiás el preset
- ✅ Cada cliente tiene su propio Airtable
- ✅ Cada cliente tiene su propio dominio
- ✅ Cada cliente tiene su dashboard personalizado

---

## 🔧 Customización Avanzada

### Cambiar animaciones

En `/src/lib/deviceDetection.js`:
```javascript
// Personalizar animaciones por dispositivo
export const getAnimationConfig = (deviceType) => {
  // Mobile: animaciones ligeras
  // Desktop: animaciones premium
};
```

### Agregar nuevos servicios

En el preset:
```javascript
services: [
  {
    id: "nuevo-servicio",
    icon: "IconName", // De lucide-react
    title: "Título",
    description: "Descripción",
    features: ["Feature 1", "Feature 2"],
  },
],
```

### Cambiar colores del tema

En el preset:
```javascript
theme: {
  primary: "#HEXCOLOR",
  primaryHover: "#HEXCOLOR",
  secondary: "#HEXCOLOR",
  // ...
},
```

---

## 🐛 Troubleshooting

### Las imágenes no cargan
- Verificar conexión a internet
- Unsplash puede estar bloqueado
- Usar imágenes locales en `/public`

### Airtable no guarda leads
- Verificar `USE_MOCK = false`
- Verificar credenciales en preset
- Ver consola del navegador para errores

### Dashboard no carga
- Verificar que estés logueado (`/login`)
- Verificar credenciales del preset
- Limpiar localStorage y volver a loguearse

### Animaciones lentas en mobile
- Ya están optimizadas automáticamente
- Verificar que `deviceDetection.js` esté funcionando

---

## 📞 Soporte

Para problemas:
1. Revisar consola del navegador (F12)
2. Revisar archivos de log
3. Verificar configuración del preset
4. Verificar que todas las dependencias estén instaladas

---

## 🎉 ¡A vender!

Ahora tenés un sistema completo para:
- ✅ Crear landings en minutos
- ✅ Capturar leads automáticamente
- ✅ Analizar conversiones
- ✅ Escalar a múltiples clientes
- ✅ Trackear todo con analytics

**Próximos pasos sugeridos:**
1. Crear presets de más rubros
2. Configurar dominios personalizados
3. Integrar sistemas de pago (Mercado Pago, Stripe)
4. Agregar chat en vivo
5. Integrar con CRM más robusto

---

**Made with ❤️ for conversion**
