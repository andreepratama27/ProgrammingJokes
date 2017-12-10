var CACHE_NAME = 'simple-pwa-v1';

var urlsToCache = [
  './',
  './manifest.json',
  './bundle.js',
  './style.css',
  './39ffb3a01f6aa1178aa96ab869c76296.jpg',
  '/node_modules/bulma/css/bulma.css',
];

self.oninstall = function (e) {

  console.log('[serviceWorker]: Installing...');

  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('[serviceWorker]: cache all');
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        console.log('[serviceWorker]: Installed and skip waiting on install');
        return self.skipWaiting();
      })
  );
};

self.onfetch = function (e) {

  console.log('[serviceWorker]: Fetching ' + e.request.url);
  var raceUrl = 'API/';

  if(e.request.url.indexOf(raceUrl) > -1){
    e.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(e.request).then(function(res) {
          cache.put(e.request.url, res.clone());
          return res;
        }).catch(err => {
          console.log('[serviceWorker]: Fetch error ' + err);
        });
      })
    );
  }

  else if (e.request.url.indexOf('src/assets/img-content') > -1) {
    e.respondWith(
      caches.match(e.request).then(function(res) {

        if (res) return res

        return fetch(e.request.clone(), { mode: 'no-cors' }).then(function(newRes) {

          if (!newRes || newRes.status !== 200 || newRes.type !== 'basic') {
            return newRes;
          }

          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(e.request, newRes.clone())
          }).catch(err => {
            console.log('[serviceWorker]: Fetch error ' + err)
          });

          return newRes;
        });
      })
    );
  }

  else {
    e.respondWith(
      caches.match(e.request).then(function(res) {
        return res || fetch(e.request)
      })
    );
  }

};

self.onactivate = function (e) {

  console.log('[serviceWorker]: Actived');

  var whiteList = ['simple-pwa-v1'];

  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (whiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
      })
      )
    }).then(function() {
      console.log('[serviceWorker]: Client claims');
      return self.clients.claim();
    })
  );

};