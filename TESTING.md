# 🧪 GUÍA DE TESTING - Landing Pages

## 🎯 Qué testear antes de entregar a un cliente

---

## ✅ 1. FUNCIONALIDAD BÁSICA

### Landing Page:
- [ ] La página carga correctamente
- [ ] No hay errores en consola (F12)
- [ ] Todas las secciones se muestran
- [ ] Scroll suave funciona entre secciones
- [ ] Navbar sticky funciona
- [ ] Menu mobile se abre y cierra correctamente

### Hero:
- [ ] Carousel auto-reproduce (cada 5 segundos)
- [ ] Imágenes cargan correctamente
- [ ] Animaciones se ven fluidas
- [ ] CTAs funcionan (scroll a contacto)
- [ ] Badge "Atención profesional" está visible

### Componentes:
- [ ] Servicios se muestran completos con íconos
- [ ] About muestra stats correctamente
- [ ] Testimonios tienen avatares y estrellas
- [ ] FAQ se expande y contrae
- [ ] Footer tiene todos los links

---

## 📱 2. RESPONSIVE (Mobile/Tablet/Desktop)

### Mobile (320px - 767px):
- [ ] Navbar mobile menu funciona
- [ ] Hero carousel visible y funcional
- [ ] Textos se leen bien (no cortados)
- [ ] Botones son fáciles de tocar (min 44px)
- [ ] Formulario es usable
- [ ] WhatsApp button visible y no tapa contenido
- [ ] Animaciones NO están laggeadas

### Tablet (768px - 1023px):
- [ ] Layout se adapta correctamente
- [ ] Imágenes se ven bien (no estiradas)
- [ ] Grid de servicios se ajusta

### Desktop (1024px+):
- [ ] Hero ocupa full height
- [ ] Máx width respetado (1280px)
- [ ] Hover effects funcionan
- [ ] Animaciones premium se ven

**Herramientas:**
- Chrome DevTools (F12) → Toggle device toolbar
- Probar en dispositivo real

---

## 🎨 3. DISEÑO Y BRANDING

### Colores:
- [ ] Primary color se aplica en:
  - CTAs principales
  - Links hover
  - Badges
  - Íconos
  - WhatsApp button
- [ ] Colores contrastan bien (legibilidad)
- [ ] Tema consistente en toda la página

### Tipografía:
- [ ] Jerarquía clara (h1 > h2 > h3 > p)
- [ ] Textos no están cortados
- [ ] Line-height cómodo para leer

### Imágenes:
- [ ] Carousel del hero tiene 4 imágenes
- [ ] Imágenes son relevantes al rubro
- [ ] No hay imágenes rotas
- [ ] Aspect ratio correcto (no estiradas)

---

## 📋 4. FORMULARIO DE CONTACTO

### Validación:
- [ ] Campos requeridos marcados con *
- [ ] No se puede enviar vacío
- [ ] Email valida formato (si required)
- [ ] Teléfono acepta formato internacional

### UX:
- [ ] Focus states visibles
- [ ] Select tiene opciones correctas
- [ ] Textarea tiene tamaño adecuado
- [ ] Botón submit muestra loading state
- [ ] Success message aparece tras envío

### Integración:
- [ ] Envío a Airtable funciona (si conectado)
- [ ] O muestra éxito en modo MOCK
- [ ] Toast notification aparece
- [ ] Formulario se resetea tras envío
- [ ] Analytics trackea el lead

---

## 🔗 5. LINKS Y NAVEGACIÓN

### Links de contacto:
- [ ] Tel: abre app de teléfono
- [ ] Email: abre cliente de email
- [ ] WhatsApp: abre WhatsApp con mensaje pre-cargado
- [ ] Maps: abre Google Maps
- [ ] Social media: abren en nueva pestaña

### WhatsApp Button:
- [ ] Visible en toda la página
- [ ] Sticky (fixed bottom-right)
- [ ] Mensaje pre-cargado correcto
- [ ] No tapa contenido importante
- [ ] Funciona en mobile

### Login:
- [ ] Link en navbar funciona
- [ ] Página de login carga
- [ ] Credenciales del preset funcionan
- [ ] Redirect a dashboard tras login

---

## 🔐 6. DASHBOARD (Admin)

### Login:
- [ ] Usuario y password correctos
- [ ] Muestra error si credenciales incorrectas
- [ ] Show/hide password funciona
- [ ] Redirect a dashboard si ya logueado

### Dashboard:
- [ ] Requiere auth (redirect a login si no logueado)
- [ ] Cards de stats muestran números
- [ ] Gráficos se renderizan correctamente:
  - Leads por día
  - Visitantes
  - Leads por servicio (pie chart)
  - Fuentes de tráfico (pie chart)
  - Dispositivos (pie chart)
- [ ] Tabla de leads muestra datos
- [ ] Botón "Actualizar" funciona
- [ ] Botón "Salir" logout y redirect

### Datos:
- [ ] Mock data se muestra (si USE_MOCK = true)
- [ ] Real data de Airtable (si conectado)
- [ ] Fechas se formatean correctamente
- [ ] Teléfonos y emails son clickeables

---

## 🎭 7. ANIMACIONES Y PERFORMANCE

### Animaciones:
- [ ] Hero fade in suave
- [ ] Carousel transitions fluidas
- [ ] Scroll reveal en secciones
- [ ] Hover effects en botones
- [ ] Popup de conversión aparece tras delay

### Performance:
- [ ] Página carga en < 3 segundos
- [ ] No hay lag en scroll
- [ ] Animaciones a 60fps en desktop
- [ ] Mobile usa animaciones ligeras
- [ ] Sin parpadeos o flashes

**Test:**
- Throttle CPU en DevTools (4x slowdown)
- Network slow 3G
- Lighthouse score > 90

---

## 📊 8. ANALYTICS Y TRACKING

### Google Analytics (si configurado):
- [ ] Script se inyecta en head
- [ ] PageView se trackea
- [ ] Eventos se registran:
  - CTA clicks
  - WhatsApp clicks
  - Form submissions
  - Scroll depth

### Meta Pixel (si configurado):
- [ ] Script se inyecta
- [ ] PageView se trackea
- [ ] Lead event al enviar form

**Verificar:**
- Consola: Buscar logs de tracking
- Tag Assistant (extensión de Chrome)
- Facebook Events Manager

---

## 🔧 9. SEO

### Meta tags:
- [ ] Title correcto (< 60 caracteres)
- [ ] Description correcta (< 160 caracteres)
- [ ] Keywords incluídas
- [ ] Open Graph tags:
  - og:title
  - og:description
  - og:image
  - og:type
- [ ] Twitter card tags

### Structured Data:
- [ ] JSON-LD schema presente
- [ ] Tipo correcto (VeterinaryCare o HairSalon)
- [ ] Datos de contacto incluidos

**Herramientas:**
- Google Rich Results Test
- Facebook Sharing Debugger
- View Page Source

---

## ⚠️ 10. ERROR HANDLING

### Errores comunes:
- [ ] Airtable desconectado → muestra mensaje amigable
- [ ] Network error → toast de error
- [ ] 404 page existe y funciona
- [ ] Protected route sin auth → redirect a login
- [ ] Campos vacíos → no permite submit

---

## 🌐 11. BROWSERS

### Testear en:
- [ ] Chrome (desktop y mobile)
- [ ] Firefox
- [ ] Safari (Mac/iOS)
- [ ] Edge

### Compatibilidad:
- [ ] CSS moderno funciona
- [ ] JavaScript ES6+ transpilado
- [ ] Tailwind CSS renderiza bien
- [ ] Animaciones funcionan

---

## 🚀 12. PRE-DEPLOY CHECKLIST

### Código:
- [ ] No hay console.logs en producción
- [ ] No hay TODOs pendientes críticos
- [ ] Credenciales NO están hardcodeadas
- [ ] USE_MOCK = false (si Airtable conectado)
- [ ] Analytics IDs correctos

### Configuración:
- [ ] Preset del cliente activo
- [ ] Datos de contacto correctos
- [ ] Horarios actualizados
- [ ] Redes sociales con links reales
- [ ] Credenciales de admin cambiadas

### Build:
- [ ] npm run build → sin errores
- [ ] Build size razonable (< 5MB)
- [ ] Source maps generados

---

## 🎬 FLOW DE USUARIO COMPLETO

Simular usuario real:

1. **Landing:**
   - Llega a la home
   - Lee el hero
   - Scroll a servicios
   - Lee testimonios
   - Lee FAQ
   - Llena formulario
   - Envía

2. **Conversión:**
   - Click en WhatsApp button
   - O llama por teléfono
   - O envía email

3. **Admin:**
   - Dueño hace login
   - Ve leads en dashboard
   - Revisa métricas
   - Contacta leads

**Tiempo total test completo: ~20-30 minutos**

---

## 📝 REPORTE DE BUGS

Formato sugerido:

```
🐛 BUG: [Título corto]

📍 Dónde: [Sección/componente]
🔍 Qué pasa: [Descripción]
✅ Esperado: [Qué debería pasar]
🔄 Cómo reproducir:
   1. Paso 1
   2. Paso 2
   3. Paso 3

📱 Device: [Desktop/Mobile/Tablet]
🌐 Browser: [Chrome/Firefox/Safari]
📸 Screenshot: [Si aplica]
```

---

## ✅ SIGN-OFF FINAL

Antes de entregar al cliente:

- [ ] ✅ Todos los tests pasados
- [ ] ✅ Bugs críticos resueltos
- [ ] ✅ Performance óptimo
- [ ] ✅ Funciona en todos los devices
- [ ] ✅ Analytics trackeando
- [ ] ✅ Airtable conectado
- [ ] ✅ Deploy en producción
- [ ] ✅ Dominio conectado (si aplica)
- [ ] ✅ Cliente recibió credenciales de admin
- [ ] ✅ Cliente recibió guía de uso

**🎉 READY TO LAUNCH!**
