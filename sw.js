let staticCacheName = 'restaurant-cache-1';
let urls = [
  '/',
  '/restaurant.html',
  // '/restaurant.html?id=1',
  // '/restaurant.html?id=2',
  // '/restaurant.html?id=3',
  // '/restaurant.html?id=4',
  // '/restaurant.html?id=5',
  // '/restaurant.html?id=6',
  // '/restaurant.html?id=7',
  // '/restaurant.html?id=8',
  // '/restaurant.html?id=9',
  // '/restaurant.html?id=10',    
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

self.addEventListener('install', function(evt) {
  evt.waitUntil(
    caches.open(staticCacheName)
    .then(function(newCache) {
      console.log(newCache);
      return newCache.addAll(urls);
    })
    .catch(function(error) {
      console.log("Error in caching " + error);
    })
  );
});

self.addEventListener('activate', function(evt) {
  evt.waitUntil(
    caches.keys().then(function(allCaches) {
      return Promise.all(
        allCaches.filter(function(oldCache) {
          return oldCache.startsWith('restaurant-') && oldCache != staticCacheName;
        }).map(function(oldCache) {
          return caches.delete(oldCache);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(evt) {
  evt.respondWith(
    caches.match(evt.request).then(function(response) {
      return response || fetch(evt.request);
    })
  );
});
