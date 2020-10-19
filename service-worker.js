const CACHE_NAME = "Hunting-Photo-2";
var urlsToCache = [
    "/",
    "/navbar.html",
	"/index.html",
	"/css/style.css",
    "/pages/home.html",
    "/pages/hunt.html",
	"/pages/tips.html",
	"/pages/support-us.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
	"/js/navbar.js",
	"/js/reg-service-worker.js",
	"/images/icons/logo512.png",
	"/images/icons/logo192.png",
	"/images/banner1.jpg",
	"/images/banner2.jpg",
	"/images/banner3.jpg",
	"/images/pict-1.jpg",
	"/images/pict-2.jpg",
	"/images/pict-3.jpg",
	"/images/tips1.jpeg",
	"/images/tips2.jpeg",
	"/images/tips3.jpeg",
	"/images/tips4.jpeg",
	"/images/tips5.jpeg",
	"/images/tips6.jpeg",
	"https://fonts.googleapis.com/icon?family=Material+Icons",
	"https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
    "/manifest.json"
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
			
			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

