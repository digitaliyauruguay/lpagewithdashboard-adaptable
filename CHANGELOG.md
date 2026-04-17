# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [1.0.0] - 2026-04-17

### 🎉 Release Inicial

Primer release completo del sistema de landing pages escalable.

### ✨ Added
- **Sistema de Presets Modulares**
  - Preset Veterinaria completo
  - Preset Peluquería completo
  - Sistema de cambio de preset en 1 línea

- **Componentes de Landing**
  - Navbar responsive con menu mobile
  - HeroCarousel con imágenes de Unsplash
  - Sección de Servicios con iconos
  - About con stats animadas
  - Testimonios con ratings
  - FAQ con acordeones
  - ContactForm con validación
  - Footer completo
  - WhatsAppButton flotante
  - ConversionPopup estratégico

- **Sistema de Routing**
  - React Router v7 Data Mode
  - Landing page (/)
  - Login (/login)
  - Dashboard (/dashboard)
  - NotFound (404)
  - Protected routes con auth

- **Dashboard de Administración**
  - Login seguro por preset
  - Stats cards animadas
  - Gráficos interactivos (Recharts):
    - Leads por día (LineChart)
    - Visitantes por día (BarChart)
    - Leads por servicio (PieChart)
    - Fuentes de tráfico (PieChart)
    - Dispositivos (PieChart)
  - Tabla de leads en tiempo real
  - Botones de acción (Actualizar, Salir, Ver sitio)

- **Integración Airtable**
  - Sistema de leads completo
  - Mock mode para desarrollo
  - Real mode para producción
  - 6 campos capturados: Name, Phone, Email, Service, Message, Source
  - Automatizaciones ready

- **Analytics**
  - Google Analytics 4 (GA4)
  - Meta Pixel (Facebook)
  - Tracking automático de eventos:
    - PageView
    - CTA clicks
    - WhatsApp clicks
    - Phone clicks
    - Form submissions
    - Popup views
    - Scroll depth
  - Mock data para dashboard

- **Optimizaciones**
  - ThemeProvider con CSS variables dinámicas
  - SEO component con meta tags completos
  - Open Graph tags
  - Twitter Card tags
  - Structured Data (JSON-LD)
  - Detección de dispositivo (mobile/tablet/desktop)
  - Animaciones optimizadas por hardware
  - Loading states
  - Error Boundary
  - LoadingSpinner component

- **Documentación Completa**
  - README.md principal
  - README_COMPLETO.md técnico
  - GUIA_RAPIDA.md
  - SETUP_AIRTABLE.md
  - DEPLOY.md
  - TESTING.md
  - RESUMEN_EJECUTIVO.md
  - ATTRIBUTIONS.md
  - CHANGELOG.md (este archivo)

- **Configuración de Deploy**
  - vercel.json con rewrites y headers
  - .env.example con variables de entorno
  - .gitignore completo
  - Build optimizado para producción

### 🎨 Styling
- Tailwind CSS v4
- Tema dinámico por preset
- Responsive design (mobile-first)
- Animaciones con Motion (Framer Motion)
- Iconos con Lucide React

### 🔒 Security
- Protected routes
- Auth system simple pero efectivo
- Variables de entorno para credenciales
- Headers de seguridad en vercel.json

### 📦 Dependencies
- React 18.3
- TypeScript ready
- Vite 6.3
- React Router 7
- Tailwind CSS 4
- Motion (Framer Motion)
- Recharts
- Airtable SDK
- React Slick
- Radix UI components
- Sonner (toasts)
- Lucide React (icons)
- date-fns

### 🐛 Bug Fixes
- Fixed: Login duplicado (eliminado Login.jsx, mantenido Login.tsx)
- Fixed: Error boundaries para mejor manejo de errores
- Fixed: Loading states en dashboard

### 📝 Documentation
- 7 archivos MD con documentación completa
- Comentarios inline en todo el código
- Ejemplos de uso en cada preset
- Guías paso a paso

---

## [Unreleased]

### 🚧 En Desarrollo
- [ ] Preset Restaurante
- [ ] Preset Gimnasio
- [ ] Preset Clínica Médica
- [ ] Editor visual de presets
- [ ] Tests automatizados

### 🔮 Planeado para v1.1.0
- A/B testing integrado
- Multi-idioma (i18n)
- Integraciones adicionales (Calendly, MercadoPago)
- Chat en vivo
- Más animaciones premium
- Dark mode completo

---

## Convenciones de Versiones

- **MAJOR** (X.0.0): Cambios incompatibles con versiones anteriores
- **MINOR** (0.X.0): Nueva funcionalidad compatible
- **PATCH** (0.0.X): Bug fixes y mejoras menores

---

## Tipos de Cambios

- **Added**: Nueva funcionalidad
- **Changed**: Cambios en funcionalidad existente
- **Deprecated**: Funcionalidad que será removida
- **Removed**: Funcionalidad removida
- **Fixed**: Bug fixes
- **Security**: Cambios de seguridad

---

## Links

- [Repositorio](https://github.com/tu-usuario/landing-pages-system)
- [Issues](https://github.com/tu-usuario/landing-pages-system/issues)
- [Documentación](./README.md)

---

**Mantenido por:** [Tu Nombre]  
**Última actualización:** 2026-04-17
