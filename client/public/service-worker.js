const CACHE_NAME = 'shree-taarini-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn-icons-png.flaticon.com/512/7564/7564393.png',
  'https://images.unsplash.com/photo-1609766418204-94aae0ecf4ec'
];

const API_CACHE_NAME = 'shree-taarini-api-v1';
const API_ROUTES = [
  '/api/rooms'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('shree-taarini-') && name !== CACHE_NAME && name !== API_CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - handle requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests
  if (API_ROUTES.some(route => url.pathname.startsWith(route))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response before caching
          const clonedResponse = response.clone();
          caches.open(API_CACHE_NAME).then((cache) => {
            cache.put(request, clonedResponse);
          });
          return response;
        })
        .catch(() => {
          // Return cached API response if available
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || Promise.reject('No cached data available');
          });
        })
    );
    return;
  }

  // Handle static assets and navigation requests
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Return cached response if available
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise fetch from network
      return fetch(request).then((response) => {
        // Don't cache non-GET requests or error responses
        if (request.method !== 'GET' || !response || response.status !== 200) {
          return response;
        }

        // Clone the response before caching
        const clonedResponse = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, clonedResponse);
        });

        return response;
      });
    })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'roomBooking') {
    event.waitUntil(
      // Handle background sync for room booking data
      // This would be implemented when offline booking functionality is added
      Promise.resolve()
    );
  }
});

// Push notification handling
self.addEventListener('push', (event) => {
  if (event.data) {
    const notification = event.data.json();
    const options = {
      body: notification.body,
      icon: 'https://cdn-icons-png.flaticon.com/512/7564/7564393.png',
      badge: 'https://cdn-icons-png.flaticon.com/512/7564/7564393.png',
      vibrate: [100, 50, 100],
      data: {
        url: notification.url || '/'
      }
    };

    event.waitUntil(
      self.registration.showNotification(notification.title, options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
