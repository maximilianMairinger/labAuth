const cacheName = "LabAuthCache"


self.addEventListener("install", function (event) {
    console.log("[SW - LabAuth] Installing");
});



self.addEventListener("fetch", function (event) {
    event.respondWith(
        (async function() {
            var cache = await caches.open(cacheName);
            var cachedFiles = await cache.match(event.request);
            if(cachedFiles) {
                console.log("serving cache", event.request.url)
                return cachedFiles;
            } else {
                console.log("serving network", event.request.url)
                try {
                    var response = await fetch(event.request);
                    await cache.put(event.request, response.clone());
                    return response;
                } catch(e) { /* ... */ }
            }
        }())
    )
});
