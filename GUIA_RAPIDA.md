# ⚡ GUÍA RÁPIDA - Sistema de Landing Pages

## 🎯 Para comenzar en 5 minutos

### 1️⃣ Instalar y correr (1 min)
```bash
npm install
npm run dev
```
Abrir: http://localhost:5173

✅ **Ya tenés la landing funcionando con datos de ejemplo**

---

### 2️⃣ Cambiar de rubro (30 segundos)

Editar `/src/config/activePreset.js`:

```javascript
// VETERINARIA (verde)
export const config = veterinariaPreset;

// O PELUQUERÍA (rosa/fucsia)
// export const config = peluqueriaPreset;
```

✅ **La página cambia automáticamente de colores, textos, servicios y todo**

---

### 3️⃣ Probar el sistema (2 min)

**Página pública:**
- Ver el carousel del hero (auto-play cada 5 segundos)
- Scroll suave entre secciones
- Click en WhatsApp (botón flotante abajo derecha)
- Esperar el popup de conversión (6-7 segundos)
- Llenar el formulario de contacto

**Panel admin:**
1. Ir a `/login` (o click en icono 🔑 en navbar)
2. Login:
   - **Veterinaria**: `admin@vetcare.com` / `vetcare2024`
   - **Peluquería**: `admin@bellastyle.com` / `bella2024`
3. Ver el dashboard con:
   - Leads capturados
   - Gráficos de conversión
   - Analytics del sitio

✅ **Todo funciona con datos mockeados (no necesitás Airtable aún)**

---

## 🔧 Configuración Real (cuando quieras producción)

### Conectar Airtable (10 min)

1. **Crear cuenta**: https://airtable.com
2. **Crear base** → tabla "Leads" → configurar campos (ver [SETUP_AIRTABLE.md](./SETUP_AIRTABLE.md))
3. **Obtener credenciales**:
   - Base ID: `appXXXXXXXXXXXXXX`
   - API Key: `patXXXXXXXXXXXXXXXX`
4. **Pegar en preset** (veterinaria.js o peluqueria.js):
   ```javascript
   airtable: {
     baseId: "TU_BASE_ID",
     tableName: "Leads",
     apiKey: "TU_API_KEY",
   },
   ```
5. **Activar** en `/src/lib/airtable.js`:
   ```javascript
   const USE_MOCK = false; // ⬅️ Cambiar a false
   ```

✅ **Ahora los leads se guardan en Airtable real**

---

### Configurar Analytics (5 min)

**Google Analytics:**
1. Crear cuenta GA4 → copiar ID (`G-XXXXXXXXXX`)
2. Pegar en preset:
   ```javascript
   analytics: {
     googleAnalyticsId: "G-TU-ID-ACA",
     metaPixelId: "...",
   }
   ```

**Meta Pixel:**
1. Facebook Events Manager → crear pixel → copiar ID
2. Pegar en preset (mismo lugar que GA)

✅ **Tracking automático de conversiones activado**

---

## 🎨 Personalización

### Cambiar colores
En el preset (ej: `veterinaria.js`):
```javascript
theme: {
  primary: "#10b981", // Color principal
  primaryHover: "#059669", // Hover del color principal
  secondary: "#3b82f6",
  accent: "#f59e0b",
}
```

### Cambiar textos
Todo está en el preset:
- `businessName`: Nombre del negocio
- `tagline`: Eslogan
- `hero.title`: Título principal
- `hero.subtitle`: Subtítulo
- `services[]`: Array de servicios
- `faq[]`: Preguntas frecuentes
- `testimonials[]`: Testimonios

### Cambiar imágenes del carousel
En el preset:
```javascript
hero: {
  images: [
    "tu búsqueda de unsplash 1",
    "tu búsqueda de unsplash 2",
    // ... hasta 4 imágenes
  ],
}
```

---

## 📱 Rutas del Sistema

| Ruta | Descripción | Acceso |
|------|-------------|---------|
| `/` | Landing pública | Todos |
| `/login` | Login admin | Público |
| `/dashboard` | Panel admin | Solo logueados |
| `*` | 404 Not Found | Todos |

---

## 🎯 Datos Clave que Captura

### 📊 De cada Lead:
1. ✅ Nombre completo
2. ✅ Teléfono (principal)
3. ✅ Email (opcional)
4. ✅ Servicio de interés
5. ✅ Mensaje/comentario
6. ✅ Fuente (Website, Instagram, etc)

### 📈 Analytics automáticos:
- Visitantes únicos
- Pageviews
- Fuentes de tráfico
- Dispositivos (mobile/desktop)
- Eventos (CTA clicks, WhatsApp, etc)
- Scroll depth
- Tasa de conversión

---

## 🚀 Deploy (Producción)

### Vercel (Recomendado)

1. **Push a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin tu-repo-url
   git push -u origin main
   ```

2. **En Vercel**:
   - Importar proyecto de GitHub
   - Deploy automático
   - Obtener URL: `tu-proyecto.vercel.app`

3. **Dominio custom** (opcional):
   - Vercel → Settings → Domains
   - Agregar `tudominio.com`
   - Configurar DNS según instrucciones

✅ **Landing en producción en 5 minutos**

---

## 💰 Vender a Clientes

### Proceso recomendado:

1. **Presentar demo**: 
   - Mostrar la landing con preset de veterinaria o peluquería
   - Mostrar el dashboard con métricas
   - Explicar el sistema de captura de leads

2. **Crear preset del cliente**:
   - Copiar archivo de preset existente
   - Cambiar todos los datos del cliente
   - Configurar colores según branding
   - Personalizar servicios y FAQ

3. **Configurar Airtable del cliente**:
   - Crear base nueva
   - Configurar automatizaciones de email
   - Entregar credenciales al cliente

4. **Deploy individualizado**:
   - Crear repo nuevo por cliente (o fork del template)
   - Deploy en Vercel/Netlify
   - Conectar dominio del cliente

5. **Entregar**:
   - URL de la landing
   - Acceso al dashboard (user/pass del preset)
   - Acceso a Airtable
   - Guía de uso

### Qué vendés:
- ✅ Landing page optimizada para conversión
- ✅ Sistema de captura de leads automático
- ✅ Dashboard de análisis
- ✅ Integración con Airtable (mini CRM)
- ✅ Analytics configurados
- ✅ Responsive mobile/tablet/desktop
- ✅ SEO optimizado
- ✅ Hosting incluido (Vercel gratis)

---

## 📚 Archivos Importantes

| Archivo | Para qué es |
|---------|-------------|
| `/src/config/activePreset.js` | ⭐ Cambiar de preset ACÁ |
| `/src/config/presets/*.js` | Configuración de cada rubro |
| `/src/lib/airtable.js` | Activar Airtable real (`USE_MOCK = false`) |
| `/SETUP_AIRTABLE.md` | Guía completa de Airtable |
| `/README_COMPLETO.md` | Documentación técnica completa |

---

## ⚠️ Checklist Pre-Deploy

Antes de deployar para un cliente:

- [ ] Preset del cliente creado y configurado
- [ ] Colores del branding aplicados
- [ ] Textos personalizados
- [ ] Servicios correctos
- [ ] FAQ relevantes
- [ ] Testimonios reales (o genéricos buenos)
- [ ] Credenciales de admin cambiadas
- [ ] Airtable configurado con credenciales reales
- [ ] `USE_MOCK = false` activado
- [ ] Google Analytics ID del cliente
- [ ] Meta Pixel ID del cliente
- [ ] Datos de contacto (teléfono, email, dirección) correctos
- [ ] WhatsApp con mensaje pre-cargado correcto
- [ ] Probado en mobile y desktop

---

## 🆘 Problemas Comunes

### "Las animaciones van lentas en mobile"
✅ Ya están optimizadas automáticamente. El sistema detecta mobile y usa animaciones ligeras.

### "No guarda leads en Airtable"
Checklist:
- [ ] `USE_MOCK = false` en `/src/lib/airtable.js`
- [ ] Credenciales correctas en preset
- [ ] Tabla se llama exactamente "Leads"
- [ ] Campos creados correctamente
- [ ] API Key tiene permisos de read/write

### "No puedo logearme al dashboard"
- Usuario y contraseña están en `config.admin` del preset activo
- Si cambiaste de preset, las credenciales cambiaron
- Limpiar localStorage del navegador

### "El carousel no se ve"
- Verificar que `slick-carousel` esté instalado
- Verificar que los CSS estén importados en `/src/styles/index.css`
- Refrescar la página

---

## 🎉 ¡Listo!

Con esto ya podés:
- ✅ Crear landings para cualquier rubro
- ✅ Capturar y gestionar leads
- ✅ Trackear conversiones
- ✅ Vender a múltiples clientes
- ✅ Escalar sin tocar código

**Próximos pasos:**
1. Crear más presets (gimnasio, restaurante, médico, abogado, etc)
2. Integrar pagos (Mercado Pago / Stripe)
3. Chat en vivo
4. Más automatizaciones en Airtable

---

**¿Dudas?** Revisá el [README_COMPLETO.md](./README_COMPLETO.md) o el [SETUP_AIRTABLE.md](./SETUP_AIRTABLE.md)
