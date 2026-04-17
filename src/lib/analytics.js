// ============================================
// ANALYTICS SERVICE
// ============================================
// Meta Pixel + Google Analytics Integration
// 
// 🔧 CONFIGURACIÓN:
// 
// GOOGLE ANALYTICS:
// 1. Crear cuenta en https://analytics.google.com
// 2. Crear propiedad GA4
// 3. Copiar el ID (formato: G-XXXXXXXXXX)
// 4. Agregarlo en tu preset: analytics.googleAnalyticsId
// 
// META PIXEL:
// 1. Ir a Facebook Events Manager
// 2. Crear un nuevo pixel
// 3. Copiar el Pixel ID (número de 15 dígitos)
// 4. Agregarlo en tu preset: analytics.metaPixelId
// 
// ============================================

import { config } from '../config/activePreset.js';

// ==================== GOOGLE ANALYTICS ====================

/**
 * Inicializar Google Analytics
 */
export function initGA() {
  const { googleAnalyticsId } = config.analytics;
  
  if (!googleAnalyticsId || googleAnalyticsId.includes('XXX')) {
    console.warn('⚠️ Google Analytics no configurado');
    return;
  }

  // Cargar script de GA
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
  document.head.appendChild(script);

  // Inicializar GA
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  
  gtag('js', new Date());
  gtag('config', googleAnalyticsId);

  console.log('✅ Google Analytics inicializado:', googleAnalyticsId);
}

/**
 * Trackear evento en GA
 */
export function trackGAEvent(eventName, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
    console.log('📊 GA Event:', eventName, params);
  }
}

/**
 * Trackear pageview en GA
 */
export function trackGAPageView(path) {
  if (typeof window.gtag === 'function') {
    window.gtag('config', config.analytics.googleAnalyticsId, {
      page_path: path,
    });
    console.log('📄 GA PageView:', path);
  }
}

// ==================== META PIXEL ====================

/**
 * Inicializar Meta Pixel
 */
export function initMetaPixel() {
  const { metaPixelId } = config.analytics;
  
  if (!metaPixelId || metaPixelId === '1234567890' || metaPixelId === '0987654321') {
    console.warn('⚠️ Meta Pixel no configurado');
    return;
  }

  // Código de inicialización de Meta Pixel
  !function(f,b,e,v,n,t,s) {
    if(f.fbq) return;
    n=f.fbq=function(){
      n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
    };
    if(!f._fbq) f._fbq=n;
    n.push=n;
    n.loaded=!0;
    n.version='2.0';
    n.queue=[];
    t=b.createElement(e);
    t.async=!0;
    t.src=v;
    s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', metaPixelId);
  window.fbq('track', 'PageView');

  console.log('✅ Meta Pixel inicializado:', metaPixelId);
}

/**
 * Trackear evento en Meta Pixel
 */
export function trackMetaEvent(eventName, params = {}) {
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, params);
    console.log('📊 Meta Event:', eventName, params);
  }
}

// ==================== EVENTOS COMUNES ====================

/**
 * Trackear lead generado
 */
export function trackLead(leadData) {
  // Google Analytics
  trackGAEvent('generate_lead', {
    event_category: 'Lead',
    event_label: leadData.service,
    value: 1,
  });

  // Meta Pixel
  trackMetaEvent('Lead', {
    content_name: leadData.service,
    content_category: 'Form Submission',
  });
}

/**
 * Trackear click en CTA
 */
export function trackCTAClick(ctaName, ctaLocation) {
  // Google Analytics
  trackGAEvent('cta_click', {
    event_category: 'CTA',
    event_label: ctaName,
    cta_location: ctaLocation,
  });

  // Meta Pixel
  trackMetaEvent('InitiateCheckout', {
    content_name: ctaName,
    content_category: ctaLocation,
  });
}

/**
 * Trackear click en WhatsApp
 */
export function trackWhatsAppClick(source) {
  // Google Analytics
  trackGAEvent('whatsapp_click', {
    event_category: 'Contact',
    event_label: 'WhatsApp',
    source: source,
  });

  // Meta Pixel
  trackMetaEvent('Contact', {
    content_name: 'WhatsApp',
    content_category: source,
  });
}

/**
 * Trackear click en teléfono
 */
export function trackPhoneClick() {
  trackGAEvent('phone_click', {
    event_category: 'Contact',
    event_label: 'Phone',
  });

  trackMetaEvent('Contact', {
    content_name: 'Phone',
  });
}

/**
 * Trackear apertura de popup
 */
export function trackPopupView() {
  trackGAEvent('popup_view', {
    event_category: 'Engagement',
    event_label: 'Conversion Popup',
  });

  trackMetaEvent('ViewContent', {
    content_name: 'Conversion Popup',
    content_type: 'popup',
  });
}

/**
 * Trackear scroll depth
 */
export function trackScrollDepth(percentage) {
  trackGAEvent('scroll_depth', {
    event_category: 'Engagement',
    event_label: `${percentage}%`,
    value: percentage,
  });
}

/**
 * Inicializar todos los analytics
 */
export function initAnalytics() {
  initGA();
  initMetaPixel();
}

// ==================== MOCK DATA PARA DASHBOARD ====================

/**
 * Obtener datos mock de analytics para dashboard
 * (En producción, estos datos vendrían de las APIs de GA y Meta)
 */
export function getMockAnalyticsData() {
  const now = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
  }).reverse();

  return {
    // Visitantes únicos por día
    visitors: last7Days.map((day, index) => ({
      day,
      visitors: Math.floor(Math.random() * 100) + 50,
    })),

    // Métricas generales
    metrics: {
      totalVisitors: 847,
      avgSessionDuration: '2:34',
      bounceRate: '32%',
      pageViews: 1523,
    },

    // Fuentes de tráfico
    sources: [
      { name: 'Direct', value: 420 },
      { name: 'Instagram', value: 235 },
      { name: 'Facebook', value: 112 },
      { name: 'Google', value: 80 },
    ],

    // Dispositivos
    devices: [
      { name: 'Mobile', value: 65 },
      { name: 'Desktop', value: 28 },
      { name: 'Tablet', value: 7 },
    ],

    // Eventos más trackeados
    topEvents: [
      { event: 'CTA Click', count: 234 },
      { event: 'WhatsApp Click', count: 189 },
      { event: 'Phone Click', count: 67 },
      { event: 'Form Submit', count: 45 },
      { event: 'Popup View', count: 156 },
    ],
  };
}

export default {
  initAnalytics,
  initGA,
  initMetaPixel,
  trackGAEvent,
  trackGAPageView,
  trackMetaEvent,
  trackLead,
  trackCTAClick,
  trackWhatsAppClick,
  trackPhoneClick,
  trackPopupView,
  trackScrollDepth,
  getMockAnalyticsData,
};
