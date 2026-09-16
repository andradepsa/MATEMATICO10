/* â•â•â• Service Worker â€” Central de Estudos K10 â•â•â•
   EstratÃ©gia: app shell em cache (offline total) + bancos/vÃ­deos com fallback de rede */
var CACHE = 'ce10-app-v13';
var SHELL = [
  './index.html',
  './topicos.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (chaves) {
      return Promise.all(chaves.filter(function (k) { return k !== CACHE && k.indexOf('ce10-') === 0; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var url = e.request.url;

  /* app shell: cache-first (funciona 100% offline) */
  if (e.request.mode === 'navigate' || SHELL.indexOf(new URL(url).pathname.slice(-10)) >= 0) {
    e.respondWith(
      caches.match(e.request).then(function (r) { return r || fetch(e.request); })
    );
    return;
  }

  /* bancos JSON + vÃ­deos (armazenados pela prÃ³pria app via Cache API): rede-first */
  if (url.indexOf('.json') >= 0 || url.indexOf('V%C3%ADdeosK10') >= 0 || url.indexOf('VÃ­deosK10') >= 0) {
    e.respondWith(
      fetch(e.request).then(function (r) { return r; }).catch(function () {
        return caches.match(e.request).then(function (r) { return r || Response.error(); });
      })
    );
    return;
  }
});









