self.addEventListener('install', function(e) {
e.waitUntil(
caches.open('airhorner').then(function(cache) {
return cache.addAll([
'/',
'/index.html',
'/css/style.css',
'https://drive.google.com/file/d/0B-OAzS6pCLATWExxT3RBaUFRT1k/view?usp=sharing',
'https://drive.google.com/file/d/0B-OAzS6pCLATanlpLVd0ZFBSNkk/view?usp=sharing',
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