self.addEventListener('install', function(e) {
e.waitUntil(
caches.open('airhorner').then(function(cache) {
return cache.addAll([
'/',
'/index.html',
'/css/style.css',
'/docs/resume.pdf',
'/docs/coverletter.pdf',
'/images/me.jpg',
'/images/githubdark.png',
'/images/linkedinblack.png',
'/images/terminal-152-195654.png',
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