// ============================================
// AIRTABLE SERVICE
// ============================================
// 
// 🔧 CONFIGURACIÓN REQUERIDA:
// 
// 1. Creá una base en Airtable
// 2. Creá una tabla llamada "Leads" con estos campos:
//    - Name (Single line text)
//    - Phone (Phone number o Single line text)
//    - Email (Email)
//    - Service (Single select con las opciones de tu preset)
//    - Message (Long text)
//    - Source (Single line text) - De dónde vino el lead
//    - Created (Created time) - Se auto-completa
// 
// 3. Obtené tu API Key:
//    - Ir a https://airtable.com/account
//    - En la sección "API" generá un token personal
//    - Copiá el token
// 
// 4. Obtené tu Base ID:
//    - Ir a https://airtable.com/api
//    - Seleccioná tu base
//    - El Base ID aparece en la URL y en la documentación (empieza con "app")
// 
// 5. Configurá los valores en tu preset:
//    airtable: {
//      baseId: "appXXXXXXXXXXXXXX",
//      tableName: "Leads",
//      apiKey: "keyXXXXXXXXXXXXXXXX"
//    }
// 
// ⚠️ IMPORTANTE: En producción, usá variables de entorno
// para las credenciales, NO las dejes hardcodeadas.
// 
// ============================================

import { config } from '../config/activePreset.js';

// Estado para modo mock/desarrollo
const USE_MOCK = true; // ⚠️ Cambiar a false cuando conectes Airtable real

/**
 * Guardar lead en Airtable
 * @param {Object} leadData - Datos del formulario
 * @returns {Promise<Object>} - Resultado de la operación
 */
export async function saveLead(leadData) {
  // ==================== MODO MOCK (DESARROLLO) ====================
  if (USE_MOCK) {
    console.log('📝 [MOCK] Guardando lead en Airtable:', leadData);
    
    // Simulamos delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulamos respuesta exitosa
    return {
      success: true,
      id: `mock_${Date.now()}`,
      data: leadData,
      message: 'Lead guardado exitosamente (MOCK)',
    };
  }

  // ==================== MODO REAL (PRODUCCIÓN) ====================
  try {
    const { baseId, tableName, apiKey } = config.airtable;

    // Validar configuración
    if (!baseId || !tableName || !apiKey || 
        baseId.includes('XXX') || apiKey.includes('XXX')) {
      throw new Error('⚠️ Airtable no configurado. Verificá baseId, tableName y apiKey en tu preset.');
    }

    // Endpoint de Airtable
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

    // Preparar datos para Airtable
    const airtableData = {
      fields: {
        Name: leadData.name,
        Phone: leadData.phone,
        Email: leadData.email || '',
        Service: leadData.service,
        Message: leadData.message,
        Source: leadData.source || 'Website',
        // Created se auto-completa en Airtable
      }
    };

    // Hacer request a Airtable
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(airtableData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Error al guardar en Airtable');
    }

    const result = await response.json();

    console.log('✅ Lead guardado en Airtable:', result.id);

    return {
      success: true,
      id: result.id,
      data: leadData,
      message: 'Lead guardado exitosamente',
    };

  } catch (error) {
    console.error('❌ Error al guardar lead:', error);
    
    return {
      success: false,
      error: error.message,
      message: 'Error al enviar formulario. Intenta por WhatsApp.',
    };
  }
}

/**
 * Obtener todos los leads (para dashboard)
 * @returns {Promise<Array>} - Array de leads
 */
export async function getLeads() {
  // ==================== MODO MOCK (DESARROLLO) ====================
  if (USE_MOCK) {
    console.log('📊 [MOCK] Obteniendo leads de Airtable...');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Datos mock para testing del dashboard
    return [
      {
        id: 'rec1',
        fields: {
          Name: 'Juan Pérez',
          Phone: '+54 9 11 1234-5678',
          Email: 'juan@email.com',
          Service: 'Consulta general',
          Message: 'Quiero turno para mi perro',
          Source: 'Website',
          Created: new Date(Date.now() - 86400000 * 2).toISOString(), // Hace 2 días
        }
      },
      {
        id: 'rec2',
        fields: {
          Name: 'María García',
          Phone: '+54 9 11 9876-5432',
          Email: 'maria@email.com',
          Service: 'Vacunación',
          Message: 'Vacunas para cachorro',
          Source: 'Instagram',
          Created: new Date(Date.now() - 86400000).toISOString(), // Hace 1 día
        }
      },
      {
        id: 'rec3',
        fields: {
          Name: 'Carlos López',
          Phone: '+54 9 11 5555-6666',
          Email: '',
          Service: 'Emergencia',
          Message: 'Mi gato no come hace 2 días',
          Source: 'WhatsApp',
          Created: new Date(Date.now() - 3600000).toISOString(), // Hace 1 hora
        }
      },
      {
        id: 'rec4',
        fields: {
          Name: 'Ana Martínez',
          Phone: '+54 9 11 7777-8888',
          Email: 'ana.m@email.com',
          Service: 'Peluquería',
          Message: 'Corte y baño para mi golden',
          Source: 'Website',
          Created: new Date().toISOString(), // Ahora
        }
      },
    ];
  }

  // ==================== MODO REAL (PRODUCCIÓN) ====================
  try {
    const { baseId, tableName, apiKey } = config.airtable;

    if (!baseId || !tableName || !apiKey || 
        baseId.includes('XXX') || apiKey.includes('XXX')) {
      throw new Error('Airtable no configurado');
    }

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?sort%5B0%5D%5Bfield%5D=Created&sort%5B0%5D%5Bdirection%5D=desc`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener leads de Airtable');
    }

    const result = await response.json();
    return result.records;

  } catch (error) {
    console.error('Error al obtener leads:', error);
    return [];
  }
}

/**
 * Obtener estadísticas de leads (para dashboard)
 * @returns {Promise<Object>} - Estadísticas
 */
export async function getLeadStats() {
  const leads = await getLeads();

  // Calcular stats
  const totalLeads = leads.length;
  
  // Leads por servicio
  const leadsByService = {};
  leads.forEach(lead => {
    const service = lead.fields.Service || 'Otro';
    leadsByService[service] = (leadsByService[service] || 0) + 1;
  });

  // Leads por día (últimos 7 días)
  const leadsByDay = {};
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  last7Days.forEach(day => {
    leadsByDay[day] = 0;
  });

  leads.forEach(lead => {
    const day = lead.fields.Created?.split('T')[0];
    if (leadsByDay.hasOwnProperty(day)) {
      leadsByDay[day]++;
    }
  });

  // Leads por source
  const leadsBySource = {};
  leads.forEach(lead => {
    const source = lead.fields.Source || 'Desconocido';
    leadsBySource[source] = (leadsBySource[source] || 0) + 1;
  });

  return {
    totalLeads,
    leadsByService,
    leadsByDay,
    leadsBySource,
  };
}

export default {
  saveLead,
  getLeads,
  getLeadStats,
};
