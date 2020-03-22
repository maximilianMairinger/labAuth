const cacheName = "LabAuthCache"


self.addEventListener("install", function (event) {
    console.log("[SW - LabAuth] Installing");
});



self.addEventListener("fetch", function (event) {
    event.respondWith(
        (async function() {
            var cache = await caches.open(cacheName);
            var cachedFiles = await cache.match(event.request);
            try {
                var response = await fetch(event.request);
                await cache.put(event.request, response.clone());
                console.log("serving network", event.request.url)
                return response;
            } catch(e) { 
                console.log("serving cache", event.request.url)
                return cachedFiles;
            }
        }())
    )
});
