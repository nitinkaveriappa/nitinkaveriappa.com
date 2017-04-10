self.addEventListener('install', function(e) {
e.waitUntil(
caches.open('airhorner').then(function(cache) {
return cache.addAll([
'/',
'/favicon.ico',
'/index.html',
'/css/style.css',
'/images/me.jpg',
'/images/iconmonstr-github-1.svg',
'/images/iconmonstr-linkedin-3.svg',
'/images/android-icon-192x192.png',
'/audio/audio.mp3'
]);
})
);
});

self.addEventListener('fetch', function(event) {
console.log(event.request.url);
event.respondWith(
caches.match(event.request).then(function(response) {
return response || fetch(event.request);
})
);
});
