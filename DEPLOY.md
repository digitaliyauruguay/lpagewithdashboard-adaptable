# 🚀 GUÍA DE DEPLOY - Vercel

## 🎯 Deploy en 10 minutos

Esta guía te mostrará cómo deployar tu landing page en **Vercel** de forma gratuita.

---

## ✅ Pre-requisitos

1. **Cuenta en GitHub** (para subir el código)
2. **Cuenta en Vercel** (gratis): https://vercel.com
3. **Credenciales configuradas** (Airtable + Analytics - opcional)

---

## 📦 Paso 1: Preparar el código

### 1.1 Configurar preset del cliente

Editar `/src/config/activePreset.js`:

```javascript
export const config = veterinariaPreset; // O el preset que corresponda
```

### 1.2 Actualizar datos del preset

Editar el archivo del preset (ejemplo: `/src/config/presets/veterinaria.js`):

```javascript
// Cambiar:
- businessName
- contact (teléfono, email, dirección, etc)
- admin.username y admin.password
- services
- testimonials
- faq
- social (redes sociales)
```

### 1.3 Configurar servicios (si ya están listos)

**Airtable:**
```javascript
airtable: {
  baseId: "appXXXXXXXXX", // Tu Base ID real
  tableName: "Leads",
  apiKey: "keyXXXXXXXXX", // Tu API Key real
}
```

**Analytics:**
```javascript
analytics: {
  googleAnalyticsId: "G-XXXXXXXXXX", // Tu ID de GA4
  metaPixelId: "1234567890", // Tu Pixel ID
}
```

### 1.4 Desactivar modo MOCK

Si configuraste Airtable, editar `/src/lib/airtable.js`:

```javascript
const USE_MOCK = false; // ⬅️ Cambiar a false
```

---

## 📤 Paso 2: Subir a GitHub

### 2.1 Crear repositorio

1. Ir a https://github.com/new
2. Nombre: `landing-[nombre-cliente]` (ejemplo: `landing-vetcare`)
3. Privado o público (recomendado: privado)
4. **NO** inicializar con README
5. Click en "Create repository"

### 2.2 Push del código

```bash
# En la terminal, dentro del proyecto:

# Inicializar git (si no lo hiciste)
git init

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "Initial commit - Landing [Cliente]"

# Conectar con GitHub (reemplazar con tu URL)
git remote add origin https://github.com/tu-usuario/landing-cliente.git

# Subir código
git branch -M main
git push -u origin main
```

✅ **Código subido a GitHub**

---

## 🌐 Paso 3: Deploy en Vercel

### 3.1 Conectar GitHub con Vercel

1. Ir a https://vercel.com
2. Click en "New Project"
3. Click en "Import Git Repository"
4. Seleccionar tu repositorio de GitHub
5. Autorizar acceso si es necesario

### 3.2 Configurar proyecto

**Build Settings:**
- Framework Preset: `Vite`
- Build Command: `npm run build` (auto-detectado)
- Output Directory: `dist` (auto-detectado)
- Install Command: `npm install` (auto-detectado)

**Environment Variables (si usás servicios reales):**

Click en "Environment Variables" y agregar:

| Key | Value | Ejemplo |
|-----|-------|---------|
| `VITE_AIRTABLE_BASE_ID` | Tu Base ID | `appXXXXXXXXXXXXXX` |
| `VITE_AIRTABLE_API_KEY` | Tu API Key | `keyXXXXXXXXXXXXXX` |
| `VITE_AIRTABLE_TABLE_NAME` | Nombre tabla | `Leads` |
| `VITE_GA_MEASUREMENT_ID` | Tu GA ID | `G-XXXXXXXXXX` |
| `VITE_META_PIXEL_ID` | Tu Pixel ID | `1234567890` |
| `VITE_USE_MOCK` | false | `false` |

> ⚠️ **IMPORTANTE**: No dejes espacios antes/después de los valores

### 3.3 Deploy!

1. Click en **"Deploy"**
2. Esperar 2-3 minutos (Vercel buildea y deploya)
3. ✅ **¡Sitio en vivo!**

---

## 🎉 Paso 4: Verificar deploy

### 4.1 Testing básico

Vercel te dará una URL tipo: `https://landing-cliente.vercel.app`

**Probar:**
- ✅ Landing carga correctamente
- ✅ Carousel funciona
- ✅ Formulario envía datos
- ✅ Login funciona
- ✅ Dashboard muestra datos
- ✅ WhatsApp button funciona
- ✅ Responsive en mobile

### 4.2 Verificar Analytics

1. Abrir DevTools (F12) → Console
2. Buscar logs de tracking:
   - `✅ Google Analytics inicializado`
   - `✅ Meta Pixel inicializado`
3. Verificar en Google Analytics (puede tardar 24hs en mostrar datos)
4. Verificar en Facebook Events Manager

### 4.3 Testing completo

Seguir la guía en [TESTING.md](./TESTING.md)

---

## 🌍 Paso 5: Dominio personalizado (opcional)

### Con dominio propio del cliente

1. En Vercel → Settings → Domains
2. Click en "Add Domain"
3. Ingresar dominio: `www.vetcare.com`
4. Seguir instrucciones para configurar DNS:
   - **CNAME Record**: `www` → `cname.vercel-dns.com`
   - **A Record**: `@` → IP de Vercel
5. Esperar propagación DNS (5-60 min)
6. ✅ Sitio accesible desde dominio propio

### Sin dominio (usar subdominio de Vercel)

1. En Vercel → Settings → Domains
2. Cambiar nombre del proyecto si querés URL custom:
   - Default: `landing-cliente-abc123.vercel.app`
   - Custom: `vetcare.vercel.app` (si está disponible)

---

## 🔄 Actualizaciones futuras

### Cambiar contenido

1. Editar archivos localmente
2. Commit y push:
   ```bash
   git add .
   git commit -m "Update: [descripción del cambio]"
   git push
   ```
3. **Vercel auto-deploya** en 2-3 min
4. ✅ Cambios en vivo

### Ver deployments anteriores

1. En Vercel → Deployments
2. Ver historial completo
3. Rollback a versión anterior si es necesario

---

## 🐛 Troubleshooting

### Build falla

**Error:** `Module not found`
- **Solución:** Verificar que todas las dependencias estén en `package.json`
- Correr localmente: `npm install && npm run build`

**Error:** `Command "npm run build" exited with 1`
- **Solución:** Ver logs completos en Vercel
- Verificar que el código funcione localmente

### Variables de entorno no funcionan

**Error:** Analytics no trackea / Airtable no guarda
- **Solución:** Verificar nombres de variables en Vercel
- DEBEN empezar con `VITE_` para que Vite las reconozca
- Redeploy después de agregar variables

### Sitio carga pero sin estilos

**Error:** Página blanca o sin CSS
- **Solución:** Verificar que Tailwind esté configurado
- Check: `/src/styles/tailwind.css` existe
- Check: Build command usa Vite

### 404 en rutas

**Error:** Al recargar `/dashboard` da 404
- **Solución:** Vercel maneja esto automáticamente con Vite
- Si persiste, crear `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 💰 Pricing de Vercel

### Plan FREE (suficiente para la mayoría):
- ✅ Deployments ilimitados
- ✅ Bandwidth: 100 GB/mes
- ✅ HTTPS automático
- ✅ 1 domain custom por proyecto
- ✅ Preview deployments
- ✅ Analytics básico

### Plan PRO ($20/mes) - para clientes enterprise:
- Todo lo anterior +
- Más bandwidth
- Soporte prioritario
- Múltiples dominios
- Analytics avanzado

---

## 📊 Métricas post-deploy

### Qué monitorear:

1. **Performance (Vercel Analytics)**
   - Tiempo de carga
   - Core Web Vitals
   - Errores runtime

2. **Conversión (Google Analytics)**
   - Visitantes únicos
   - Bounce rate
   - Conversión de leads

3. **Leads (Airtable + Dashboard)**
   - Cantidad de leads/día
   - Servicios más consultados
   - Fuentes de tráfico

---

## ✅ Checklist final pre-entrega al cliente

- [ ] Sitio funcionando en producción
- [ ] Dominio conectado (si aplica)
- [ ] Analytics trackeando
- [ ] Airtable guardando leads
- [ ] Formulario enviando emails (Airtable automation)
- [ ] WhatsApp button con número correcto
- [ ] Login con credenciales del cliente
- [ ] Dashboard accesible
- [ ] Testing completo realizado
- [ ] Screenshots del sitio guardados
- [ ] Credenciales entregadas al cliente:
  - URL del sitio
  - Usuario/password admin
  - Link a Airtable
  - Link a Analytics

---

## 📞 Soporte

Si tenés problemas con el deploy:

1. **Logs de Vercel:** Ver en la pestaña "Deployments" → Click en deploy fallido
2. **Local testing:** Siempre probar `npm run build` localmente primero
3. **Documentación Vercel:** https://vercel.com/docs

---

## 🎯 Próximos pasos sugeridos

Después del deploy:

1. **SEO:**
   - Crear sitemap.xml
   - Robots.txt
   - Submit a Google Search Console

2. **Performance:**
   - Optimizar imágenes
   - Lazy loading
   - Comprimir assets

3. **Marketing:**
   - Configurar Meta Ads
   - Google Ads
   - Email marketing

4. **Mantenimiento:**
   - Updates mensuales
   - Backup de Airtable
   - Monitoreo de analytics

---

**¡Listo! 🚀 Tu landing está en producción.**

Para más info, ver:
- [README_COMPLETO.md](./README_COMPLETO.md)
- [TESTING.md](./TESTING.md)
- [SETUP_AIRTABLE.md](./SETUP_AIRTABLE.md)
