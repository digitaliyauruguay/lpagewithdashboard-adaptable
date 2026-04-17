// ============================================
// SEO COMPONENT
// ============================================
// Maneja meta tags, Open Graph, structured data

import { useEffect } from 'react';
import { config } from '../../config/activePreset';

export function SEO({ 
  title, 
  description, 
  image,
  type = 'website',
  url
}) {
  useEffect(() => {
    // Title
    document.title = title || config.seo.title;

    // Meta description
    updateMeta('description', description || config.seo.description);

    // Keywords
    updateMeta('keywords', config.seo.keywords);

    // Open Graph
    updateMetaProperty('og:title', title || config.seo.title);
    updateMetaProperty('og:description', description || config.seo.description);
    updateMetaProperty('og:image', image || config.seo.ogImage);
    updateMetaProperty('og:type', type);
    if (url) updateMetaProperty('og:url', url);
    updateMetaProperty('og:site_name', config.businessName);
    updateMetaProperty('og:locale', 'es_AR');

    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title || config.seo.title);
    updateMeta('twitter:description', description || config.seo.description);
    updateMeta('twitter:image', image || config.seo.ogImage);

    // Theme color (para mobile)
    updateMeta('theme-color', config.theme.primary);

    // Structured Data (JSON-LD)
    addStructuredData();
  }, [title, description, image, type, url]);

  return null; // Este componente no renderiza nada
}

// Helpers
function updateMeta(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function updateMetaProperty(property, content) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function addStructuredData() {
  // Local Business Schema
  const structuredData = {
    "@context": "https://schema.org",
    "@type": config.industry === 'veterinaria' ? 'VeterinaryCare' : 'HairSalon',
    "name": config.businessName,
    "description": config.tagline,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": config.contact.address,
      "addressLocality": "Buenos Aires",
      "addressCountry": "AR"
    },
    "telephone": config.contact.phone,
    "email": config.contact.email,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "20:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "200"
    },
    "priceRange": "$$"
  };

  let script = document.querySelector('script[type="application/ld+json"]');
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(structuredData);
}

export default SEO;
