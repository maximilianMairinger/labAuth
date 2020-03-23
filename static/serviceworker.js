const cacheName = "LabAuthCache"


self.addEventListener("install", function (event) {
    console.log("[SW - LabAuth] Installing");
});



self.addEventListener("fetch", function (event) {
    event.respondWith(
        (async () => {
            

            let cache = await caches.open(cacheName)
            
            let cacheRequest = new Promise(async (res) => {
                let cached = await cache.match(event.request)

                if (cached) {
                    res(cached)
                }
            })

            let networkRequest = new Promise(async (res) => {
                try {
                    let response = await fetch(event.request)
                    cache.put(event.request, response.clone())
                    res(response)
                }
                catch(e) {

                }
            })


            return await Promise.race([cacheRequest, networkRequest])
        })()
    )
});


self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
  });

