// Simple Service Worker
// Currently provides no functionality, just to avoid 404 errors

self.addEventListener('install', (event) => {
    // Do nothing on install
    console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
    // Do nothing on activate
    console.log('Service Worker activated');
});

self.addEventListener('fetch', (event) => {
    // Don't intercept any requests, let them proceed normally
    return;
});
