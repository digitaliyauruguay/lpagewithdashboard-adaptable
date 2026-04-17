// ============================================
// SERVICE WORKER FOR PWA
// ============================================
// Cache strategy y offline support

const CACHE_NAME = 'landing-app-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  // CSS y JS críticos
  '/src/main.tsx',
  '/src/styles/index.css',
  // Imágenes críticas
  '/icon-192x192.png',
  '/icon-512x512.png',
  // Fallbacks
  '/offline.html'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Removing old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Estrategia de cache: Network First con fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Solo cacheamos requests HTTP/HTTPS
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Estrategia para diferentes tipos de contenido
  if (url.origin === self.location.origin) {
    // Para recursos propios: Cache First
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.startsWith('/api/')) {
    // Para APIs: Network First
    event.respondWith(networkFirst(request));
  } else {
    // Para recursos externos: Stale While Revalidate
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Cache First Strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Actualizar cache en background
    fetch(request).then((response) => {
      if (response.ok) {
        const cache = await caches.open(DYNAMIC_CACHE);
        cache.put(request, response.clone());
      }
    }).catch(() => {
      // Ignorar errores de fetch
    });
    
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache First failed:', error);
    return new Response('Offline - No connection available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Network First Strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback para páginas HTML
    if (request.destination === 'document') {
      return caches.match('/offline.html');
    }
    
    return new Response('Offline - No cached data available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  // Siempre intentar actualizar el cache
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Devolver respuesta cacheada si el fetch falla
    return cachedResponse || new Response('Offline', { status: 503 });
  });
  
  // Devolver respuesta cacheada inmediatamente si existe
  return cachedResponse || fetchPromise;
}

// Background Sync para formularios
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-forms') {
    event.waitUntil(syncForms());
  }
});

async function syncForms() {
  // Obtener formularios pendientes de IndexedDB
  const pendingForms = await getPendingForms();
  
  for (const form of pendingForms) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.data)
      });
      
      if (response.ok) {
        // Eliminar formulario pendiente
        await removePendingForm(form.id);
      }
    } catch (error) {
      console.error('Background sync failed for form:', form.id, error);
    }
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nueva notificación',
    icon: '/icon-192x192.png',
    badge: '/icon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver',
        icon: '/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/icon-96x96.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Landing App', options)
  );
});

// Manejo de notificaciones
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Funciones helper para IndexedDB (simplificadas)
async function getPendingForms() {
  // Implementar con IndexedDB real
  return [];
}

async function removePendingForm(id) {
  // Implementar con IndexedDB real
  return Promise.resolve();
}
