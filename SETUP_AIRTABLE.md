# 📋 CONFIGURACIÓN DE AIRTABLE

## 🎯 Objetivo
Conectar la landing page con Airtable para capturar y gestionar leads automáticamente.

---

## 🚀 PASO 1: Crear cuenta y base en Airtable

1. **Ir a Airtable**: https://airtable.com
2. **Crear cuenta gratis** (si no tenés)
3. **Crear una nueva Base** (Workspace)
   - Click en "+ New Base"
   - Elegir "Start from scratch"
   - Nombrarla (ej: "Leads VetCare" o "Leads Bella Style")

---

## 📊 PASO 2: Configurar la tabla "Leads"

### Crear la tabla con estos campos EXACTOS:

1. **Renombrar la tabla a "Leads"** (hacer click en el nombre de la tabla)

2. **Configurar los campos** (columnas):

| Campo | Tipo | Configuración |
|-------|------|---------------|
| **Name** | Single line text | Campo principal (viene por defecto) |
| **Phone** | Phone number o Single line text | - |
| **Email** | Email | - |
| **Service** | Single select | Ver opciones abajo según preset |
| **Message** | Long text | - |
| **Source** | Single line text | - |
| **Created** | Created time | Se auto-completa |

### Opciones para campo "Service":

**Para Veterinaria:**
- Consulta general
- Vacunación
- Cirugía
- Emergencia
- Peluquería
- Otro

**Para Peluquería:**
- Corte y peinado
- Coloración
- Tratamiento capilar
- Alisado
- Maquillaje
- Manicura/Pedicura
- Combo

---

## 🔑 PASO 3: Obtener credenciales

### A) Obtener API Key (Token Personal)

1. Click en tu perfil (arriba a la derecha)
2. Click en "Account"
3. En el menú lateral, click en "Tokens"
4. Click en "Create new token"
5. Configurar:
   - **Name**: "Landing Page Token"
   - **Scopes**: 
     - ✅ `data.records:read`
     - ✅ `data.records:write`
   - **Access**: Seleccionar tu Base creada
6. Click en "Create token"
7. **⚠️ COPIAR Y GUARDAR** el token (solo se muestra una vez)
   - Formato: `patXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

### B) Obtener Base ID

1. Ir a https://airtable.com/api
2. Seleccionar tu Base
3. El Base ID aparece en la documentación
   - Formato: `appXXXXXXXXXXXXXX`
4. **Copiar el Base ID**

---

## ⚙️ PASO 4: Configurar en el preset

Abrir el archivo del preset que estés usando:
- `/src/config/presets/veterinaria.js` 
- `/src/config/presets/peluqueria.js`

Buscar la sección `airtable` y reemplazar:

```javascript
// ==================== AIRTABLE ====================
airtable: {
  baseId: "appXXXXXXXXXXXXXX", // ⬅️ Pegar tu Base ID acá
  tableName: "Leads", // ⬅️ Dejar como "Leads"
  apiKey: "patXXXXXXXXXXXXXXXX", // ⬅️ Pegar tu API Key acá
},
```

---

## 🔧 PASO 5: Activar conexión real

Abrir `/src/lib/airtable.js` y cambiar:

```javascript
// Línea 42 aproximadamente
const USE_MOCK = true; // ⬅️ Cambiar a false
```

Por:

```javascript
const USE_MOCK = false; // ✅ Ahora usa Airtable real
```

---

## ✅ PASO 6: Probar la integración

1. **Iniciar la app** (si no está corriendo):
   ```bash
   npm run dev
   ```

2. **Ir al formulario de contacto** en la landing

3. **Completar y enviar** un lead de prueba

4. **Verificar en Airtable** que el lead se guardó

5. **Verificar en el Dashboard** (`/login` → `/dashboard`) que aparece el lead

---

## 🔔 PASO 7: Configurar automatización de emails (OPCIONAL)

Para que Airtable te envíe un email cada vez que llega un lead:

1. En Airtable, click en "Automations" (arriba)
2. Click en "Create automation"
3. **Trigger**: "When a record is created"
   - Seleccionar tabla "Leads"
4. **Action**: "Send email"
   - **To**: Tu email
   - **Subject**: `Nuevo lead de {Service}`
   - **Message**: 
     ```
     Nuevo lead recibido:
     
     Nombre: {Name}
     Teléfono: {Phone}
     Email: {Email}
     Servicio: {Service}
     Mensaje: {Message}
     Fuente: {Source}
     ```
5. Click en "Turn on automation"

---

## 🔒 SEGURIDAD (IMPORTANTE)

### ⚠️ Para producción:

**NO dejar las credenciales hardcodeadas en el código.**

Usar variables de entorno:

1. Crear archivo `.env` en la raíz:
   ```env
   VITE_AIRTABLE_API_KEY=patXXXXXXXXXXXXXXXX
   VITE_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
   ```

2. En Vercel/hosting, agregar estas variables de entorno

3. Modificar `/src/lib/airtable.js` para leer las variables:
   ```javascript
   const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY || config.airtable.apiKey;
   const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID || config.airtable.baseId;
   ```

---

## 📊 Vista del Dashboard

El dashboard mostrará:
- ✅ Total de leads
- ✅ Leads por servicio (gráfico)
- ✅ Leads por día (últimos 7 días)
- ✅ Leads por fuente (Website, Instagram, etc)
- ✅ Tabla con todos los leads recientes
- ✅ Datos de contacto completos

---

## 🎨 Campos recomendados para análisis (BONUS)

Podés agregar estos campos opcionales a tu tabla de Airtable:

- **Status** (Single select): Nuevo, Contactado, Agendado, Convertido, Perdido
- **Priority** (Single select): Alta, Media, Baja
- **Assigned To** (Single line text): A quién se asignó el lead
- **Follow Up Date** (Date): Fecha de seguimiento
- **Notes** (Long text): Notas internas

Estos te ayudarán a gestionar mejor los leads y hacer seguimiento.

---

## ❓ Troubleshooting

### Error: "Airtable no configurado"
- Verificá que hayas pegado bien el Base ID y API Key
- Verificá que no tengan espacios al inicio o final
- Verificá que el API Key tenga los permisos correctos

### Error: "403 Forbidden"
- Tu API Key no tiene permisos
- Volvé a crear el token con los scopes correctos

### Error: "404 Not Found"
- El Base ID es incorrecto
- O el nombre de la tabla no es "Leads" (case-sensitive)

### Los leads no aparecen en el dashboard
- Verificá que `USE_MOCK = false` en `/src/lib/airtable.js`
- Verificá la consola del navegador para ver errores
- Refrescá el dashboard con el botón "Actualizar"

---

## 📞 Contacto

Si tenés problemas con la configuración, revisá:
1. Los logs en la consola del navegador (F12)
2. Que todos los campos de la tabla coincidan con los del código
3. Que el API Key tenga los permisos necesarios

---

**¡Listo! 🎉 Ahora tenés un sistema completo de captura de leads con Airtable.**
