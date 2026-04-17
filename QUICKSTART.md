# ⚡ QUICKSTART - 5 Minutos

## 🎯 De 0 a Landing Funcionando en 5 Minutos

### 1️⃣ Instalar (1 min)

```bash
npm install
npm run dev
```

✅ Abre http://localhost:5173

---

### 2️⃣ Ver los 2 presets (30 seg)

**Editar `/src/config/activePreset.js`:**

```javascript
// VETERINARIA (verde):
export const config = veterinariaPreset;

// O PELUQUERÍA (fucsia):
// export const config = peluqueriaPreset;
```

Guardar → Refresh browser → Magia ✨

---

### 3️⃣ Probar funcionalidades (2 min)

**Landing Page:**
- Scroll por la página
- Mira el carousel auto-play
- Click en WhatsApp button
- Espera el popup (6-7 seg)
- Llena y envía el formulario

**Admin Panel:**
1. Click en 🔑 (esquina superior derecha)
2. Login:
   - Vet: `admin@vetcare.com` / `vetcare2024`
   - Peluquería: `admin@bellastyle.com` / `bella2024`
3. Ve el dashboard con gráficos

✅ **TODO funciona con datos mock (no necesitas configurar nada)**

---

### 4️⃣ Crear tu primer preset (20 min)

```bash
# Copiar preset existente
cp src/config/presets/veterinaria.js src/config/presets/miclienterestaurant.js
```

**Editar el nuevo archivo y cambiar:**
- `businessName`
- `contact.*` (teléfono, email, dirección)
- `theme.primary` (color principal)
- `services[]` (lista de servicios)
- `admin.*` (credenciales de login)
- Todo lo demás que necesites

**Activar:**
```javascript
// /src/config/activePreset.js
import { miclienterestaurantPreset } from './presets/miclienterestaurant.js';
export const config = miclienterestaurantPreset;
```

✅ **Landing personalizada lista**

---

### 5️⃣ Deploy a producción (10 min)

#### Opción A: Vercel (recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Seguir prompts → Listo!
```

#### Opción B: Web UI

1. Push código a GitHub
2. Ir a https://vercel.com
3. "Import Project" → Conectar GitHub
4. Deploy automático ✨

Ver guía completa: [DEPLOY.md](./DEPLOY.md)

---

## 📚 Siguiente Paso

Ahora que tienes lo básico funcionando:

1. **Configurar servicios reales:**
   - [Airtable](./SETUP_AIRTABLE.md) - para leads reales
   - Analytics (IDs en preset)

2. **Customizar más:**
   - Cambiar imágenes
   - Ajustar textos
   - Agregar secciones

3. **Testing:**
   - [TESTING.md](./TESTING.md) - checklist completo

4. **Deploy:**
   - [DEPLOY.md](./DEPLOY.md) - guía completa

---

## ❓ FAQ Rápido

**Q: ¿Necesito configurar Airtable/Analytics para probar?**  
A: NO. Todo funciona en modo MOCK por defecto.

**Q: ¿Cómo cambio los colores?**  
A: En tu preset, sección `theme`:
```javascript
theme: {
  primary: "#TU_COLOR_HEX",
  // ...
}
```

**Q: ¿Cómo agrego más servicios?**  
A: En tu preset, sección `services`, agrega objetos al array:
```javascript
services: [
  {
    id: "nuevo-servicio",
    icon: "Star", // Cualquier icono de Lucide
    title: "Título",
    description: "Descripción",
    features: ["Feature 1", "Feature 2"],
  },
  // ...
]
```

**Q: ¿Dónde cambio las credenciales de admin?**  
A: En tu preset, sección `admin`:
```javascript
admin: {
  username: "admin@tunegocio.com",
  password: "TU_PASSWORD_SEGURO",
}
```

**Q: ¿Cómo desactivo el modo MOCK?**  
A: En `/src/lib/airtable.js`:
```javascript
const USE_MOCK = false; // Cambiar a false
```

**Q: La página se ve rara / no carga estilos**  
A: Asegúrate de correr `npm install` primero. Luego `npm run dev`.

---

## 🆘 ¿Problemas?

1. **Revisar consola del browser** (F12)
2. **Revisar terminal** donde corre `npm run dev`
3. **Ver documentación completa:** [README_COMPLETO.md](./README_COMPLETO.md)
4. **Issues:** [GitHub Issues](https://github.com/tu-usuario/repo/issues)

---

## 🎉 ¡Listo!

Ya tenés una landing page funcionando. El resto es customización.

**Próximos pasos sugeridos:**
1. Crear preset de tu cliente
2. Deploy a Vercel
3. Mostrar al cliente
4. $$$ Profit

---

<div align="center">

**¿Te sirvió? Dale una ⭐**

[Documentación Completa](./README.md) • [Deploy](./DEPLOY.md) • [Testing](./TESTING.md)

</div>
