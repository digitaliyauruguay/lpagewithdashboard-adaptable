# 🚀 Sistema de Landing Pages Escalable

> Sistema modular de landing pages de alta conversión para negocios locales, con CRM integrado, analytics y dashboard de administración.

[![Made with React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![Powered by Vite](https://img.shields.io/badge/Vite-6.3-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript)](https://www.typescriptlang.org/)

---

## 📋 Tabla de Contenidos

- [¿Qué es esto?](#-qué-es-esto)
- [Características](#-características)
- [Demo Rápida](#-demo-rápida)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Configuración](#-configuración)
- [Deploy](#-deploy)
- [Documentación](#-documentación)
- [Tech Stack](#-tech-stack)
- [Roadmap](#-roadmap)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## 🎯 ¿Qué es esto?

Un **sistema completo y listo para producción** que te permite crear landing pages profesionales en minutos. Perfecto para:

- 🏢 **Freelancers y agencias** que venden sitios web
- 💼 **Emprendedores** que ofrecen servicios locales
- 🚀 **Desarrolladores** que quieren acelerar proyectos
- 📈 **Marketers** que necesitan páginas de alta conversión

### El problema que resuelve:

❌ **Antes:** Cada landing page nueva = semanas de desarrollo, código duplicado, sin sistema

✅ **Ahora:** 1 preset + 30 minutos = landing page completa, funcional y deployada

---

## ✨ Características

### 🎨 Sistema de Presets Modulares
- **1 código → infinitos negocios**
- Cambiar preset = cambiar TODO (colores, textos, servicios, imágenes)
- 2 presets incluidos: Veterinaria + Peluquería
- Fácil agregar nuevos rubros

### 🔥 Optimizado para Conversión
- ✅ Hero con carousel de imágenes premium
- ✅ Popup de conversión estratégico
- ✅ WhatsApp flotante con mensaje pre-cargado
- ✅ FAQ antes del formulario (reduce fricción)
- ✅ Animaciones premium (optimizadas por dispositivo)
- ✅ Testimonios + prueba social
- ✅ CTAs claros y múltiples puntos de contacto

### 📊 Captura y Gestión de Leads
- **Airtable** como mini CRM gratuito
- Captura automática de 6 datos clave
- Dashboard de administración completo
- Automatizaciones de email (vía Airtable)
- Modo MOCK para desarrollo sin configurar nada

### 📈 Analytics Integrados
- **Google Analytics 4** (GA4)
- **Meta Pixel** (Facebook)
- Tracking automático de eventos
- Dashboard con métricas en tiempo real
- Modo desarrollo sin necesidad de credenciales

### 🎨 Diseño y UX
- **100% Responsive** (mobile-first)
- Detección automática de dispositivo
- Animaciones optimizadas según hardware
- Tailwind CSS v4
- Theme dinámico por preset
- SEO optimizado

### 🔐 Panel de Administración
- Login seguro con credenciales por preset
- Dashboard con gráficos interactivos
- Tabla de leads en tiempo real
- Analytics visuales (Recharts)
- Modo oscuro ready

---

## 🚀 Demo Rápida

### Ver en acción (5 minutos):

```bash
# 1. Clonar e instalar
git clone [tu-repo]
cd landing-pages-system
npm install

# 2. Correr en desarrollo
npm run dev

# 3. Abrir http://localhost:5173
# ✅ Landing funcionando con preset de Veterinaria
```

### Cambiar de rubro (30 segundos):

```javascript
// Editar /src/config/activePreset.js
export const config = peluqueriaPreset; // ← Cambiar esta línea
```

Guardar y ver la magia ✨ (todo cambia automáticamente)

### Probar el admin:

1. Ir a `/login`
2. Credentials:
   - **Veterinaria:** `admin@vetcare.com` / `vetcare2024`
   - **Peluquería:** `admin@bellastyle.com` / `bella2024`
3. Ver dashboard completo

---

## 📦 Instalación

### Requisitos:
- **Node.js** 18+ 
- **npm** o **pnpm**

### Setup:

```bash
# Clonar repositorio
git clone [tu-repo-url]
cd landing-pages-system

# Instalar dependencias
npm install

# Copiar variables de entorno (opcional para producción)
cp .env.example .env

# Correr en desarrollo
npm run dev
```

### Build para producción:

```bash
npm run build
```

---

## 🎓 Uso

### Para vender landing pages a clientes:

#### 1. Crear preset del cliente

```bash
# Copiar preset existente
cp src/config/presets/veterinaria.js src/config/presets/restaurante.js
```

Editar el nuevo preset:

```javascript
export const restaurantePreset = {
  businessName: "La Trattoria",
  tagline: "Auténtica cocina italiana",
  industry: "restaurante",
  
  contact: {
    phone: "+5491134567890",
    email: "info@latrattoria.com",
    // ... más datos
  },
  
  theme: {
    primary: "#e74c3c", // Color principal
    // ...
  },
  
  services: [
    // Servicios del restaurante
  ],
  
  // ... resto de configuración
};
```

#### 2. Activar el preset

```javascript
// /src/config/activePreset.js
import { restaurantePreset } from './presets/restaurante.js';
export const config = restaurantePreset;
```

#### 3. Configurar servicios reales (cuando estés listo)

Ver: [SETUP_AIRTABLE.md](./SETUP_AIRTABLE.md)

#### 4. Deploy a producción

Ver: [DEPLOY.md](./DEPLOY.md)

#### 5. Entregar al cliente

- URL del sitio deployado
- Credenciales de admin
- Link a Airtable
- Acceso a Analytics
- Guía de uso (ver docs)

---

## ⚙️ Configuración

### Estructura de Presets

Cada preset define TODO lo necesario:

```javascript
{
  // Identidad
  businessName: string,
  tagline: string,
  industry: string,
  
  // Contacto
  contact: { phone, email, whatsapp, address, ... },
  
  // Autenticación
  admin: { username, password },
  
  // Tema visual
  theme: { primary, secondary, accent, ... },
  
  // Hero
  hero: { title, subtitle, ctaText, images[] },
  
  // Servicios
  services: [{ icon, title, description, features[] }],
  
  // About
  about: { title, description, stats[], image },
  
  // Testimonios
  testimonials: [{ name, role, content, rating }],
  
  // FAQ
  faq: [{ question, answer }],
  
  // Formulario
  contactForm: { fields[], submitText, ... },
  
  // SEO
  seo: { title, description, keywords, ogImage },
  
  // Analytics
  analytics: { googleAnalyticsId, metaPixelId },
  
  // Airtable
  airtable: { baseId, tableName, apiKey },
  
  // Popup
  conversionPopup: { enabled, delay, title, ... },
  
  // Social
  social: { facebook, instagram, twitter, ... },
}
```

### Variables de Entorno

Para credenciales sensibles, usar `.env`:

```bash
# Airtable
VITE_AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX
VITE_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX

# Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_META_PIXEL_ID=1234567890

# Modo desarrollo
VITE_USE_MOCK=true
```

---

## 🌐 Deploy

### Vercel (Recomendado - Gratis):

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

O conectar desde la web: [vercel.com](https://vercel.com)

**Ver guía completa:** [DEPLOY.md](./DEPLOY.md)

### Otras plataformas:

- **Netlify:** Drag & drop de carpeta `dist`
- **GitHub Pages:** Via GitHub Actions
- **Railway:** 1-click deploy
- **Cloudflare Pages:** Git integration

---

## 📚 Documentación

Documentación completa en archivos MD:

| Archivo | Contenido |
|---------|-----------|
| **[README_COMPLETO.md](./README_COMPLETO.md)** | Documentación técnica completa |
| **[GUIA_RAPIDA.md](./GUIA_RAPIDA.md)** | Para empezar en 5 minutos |
| **[SETUP_AIRTABLE.md](./SETUP_AIRTABLE.md)** | Configurar Airtable paso a paso |
| **[DEPLOY.md](./DEPLOY.md)** | Deploy a producción en Vercel |
| **[TESTING.md](./TESTING.md)** | Checklist de testing completo |
| **[RESUMEN_EJECUTIVO.md](./RESUMEN_EJECUTIVO.md)** | Para entender el negocio |
| **[ATTRIBUTIONS.md](./ATTRIBUTIONS.md)** | Créditos y licencias |

---

## 🛠 Tech Stack

### Core:
- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite 6.3** - Build tool ultra-rápido
- **React Router 7** - Navigation

### Styling:
- **Tailwind CSS v4** - Utility-first CSS
- **Motion** (Framer Motion) - Animaciones premium
- **Lucide React** - Iconos

### Data & Backend:
- **Airtable** - CRM / Database
- **Google Analytics 4** - Analytics
- **Meta Pixel** - Facebook tracking

### Charts & Visualization:
- **Recharts** - Gráficos en dashboard

### UI Components:
- **Radix UI** - Componentes headless
- **Sonner** - Toast notifications
- **React Slick** - Carousel

---

## 🗺 Roadmap

### ✅ Completado:
- [x] Sistema de presets modulares
- [x] 2 presets completos (Veterinaria + Peluquería)
- [x] HeroCarousel con imágenes
- [x] Integración Airtable (mock + real)
- [x] Dashboard completo con gráficos
- [x] Analytics (GA4 + Meta Pixel)
- [x] Login protegido
- [x] Responsive design
- [x] SEO optimizado
- [x] Documentación completa
- [x] Error boundary
- [x] Loading states
- [x] Deploy ready (Vercel)

### 🚧 En progreso:
- [ ] Más presets (Restaurante, Gimnasio, Clínica)
- [ ] Editor visual de presets
- [ ] Testing automatizado

### 🔮 Futuro:
- [ ] A/B testing integrado
- [ ] Multi-idioma
- [ ] Integraciones (Calendly, MercadoPago, Stripe)
- [ ] Chat en vivo
- [ ] Email marketing
- [ ] SaaS multi-tenant
- [ ] Marketplace de templates

---

## 🤝 Contribuir

¡Contribuciones bienvenidas!

1. Fork el proyecto
2. Crear branch: `git checkout -b feature/nueva-feature`
3. Commit: `git commit -m 'Add: nueva feature'`
4. Push: `git push origin feature/nueva-feature`
5. Abrir Pull Request

### Guidelines:
- Seguir estructura de presets existente
- Documentar cambios
- Testear en mobile y desktop
- Mantener compatibilidad con presets

---

## 📄 Licencia

MIT License - ver [LICENSE](./LICENSE) para más detalles.

---

## 🙏 Créditos

- **Imágenes:** [Unsplash](https://unsplash.com)
- **Iconos:** [Lucide](https://lucide.dev)
- **UI Components:** [Radix UI](https://radix-ui.com)
- **Animaciones:** [Motion](https://motion.dev)

Ver [ATTRIBUTIONS.md](./ATTRIBUTIONS.md) para lista completa.

---

## 📞 Soporte

¿Preguntas? ¿Problemas? ¿Sugerencias?

- 📧 Email: tu-email@example.com
- 💬 Issues: [GitHub Issues](https://github.com/tu-usuario/repo/issues)
- 📖 Docs: Ver archivos MD en este repo

---

## 🎯 ¿Por qué usar este sistema?

### Para Freelancers / Agencias:
- ✅ Cerrar ventas más rápido (demo en vivo)
- ✅ Delivery ultra-rápido (30 min por cliente)
- ✅ Escalable (1 repo → N clientes)
- ✅ Ingresos recurrentes (mantenimiento)

### Para Clientes:
- ✅ Landing profesional sin costo de desarrollo custom
- ✅ CRM incluido (Airtable gratis)
- ✅ Analytics y tracking
- ✅ Fácil de mantener

### Para Desarrolladores:
- ✅ Código limpio y bien estructurado
- ✅ TypeScript ready
- ✅ Modular y extensible
- ✅ Best practices

---

## 📊 Stats del Proyecto

- 📦 Componentes: 20+
- 🎨 Presets: 2 (fácil agregar más)
- 📄 Documentación: 7 archivos MD completos
- ⚡ Tiempo de setup: < 5 minutos
- 🚀 Tiempo de deploy: < 10 minutos
- 💰 Costo hosting: $0 (Vercel free tier)

---

## 🌟 Showcase

Si usás este sistema para un proyecto, ¡compartilo!

- Enviá PR agregando tu proyecto a esta sección
- Incluí screenshot y link

---

<div align="center">

**Hecho con ❤️ para la comunidad**

⭐ **Dale una estrella si te sirvió** ⭐

[Ver Demo](#) • [Documentación](#-documentación) • [Issues](https://github.com/tu-usuario/repo/issues)

</div>
