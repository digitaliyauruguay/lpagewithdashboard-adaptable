// ============================================
// ACTIVE PRESET SELECTOR
// ============================================
// 
// 🔧 INSTRUCCIONES:
// 
// Para cambiar el negocio/rubro de la landing:
// 1. Importá el preset que querés usar
// 2. Exportalo como "config"
// 
// ¡Eso es todo! La landing se adapta automáticamente.
//
// ============================================

// Importar presets disponibles
import { veterinariaPreset } from './presets/veterinaria.js';
import { peluqueriaPreset } from './presets/peluqueria.js';

// ⚠️ CAMBIAR ESTA LÍNEA PARA ACTIVAR OTRO PRESET
export const config = veterinariaPreset;
// export const config = peluqueriaPreset;

// ============================================
// 💡 CÓMO AGREGAR UN NUEVO PRESET:
// ============================================
// 
// 1. Creá un nuevo archivo en /src/config/presets/tu-rubro.js
// 2. Copiá la estructura de veterinaria.js o peluqueria.js
// 3. Cambiá todos los valores según el negocio
// 4. Importalo acá arriba
// 5. Exportalo como "config"
// 
// Ejemplo:
// import { restaurantePreset } from './presets/restaurante.js';
// export const config = restaurantePreset;
// 
// ============================================

export default config;
