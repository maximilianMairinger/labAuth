# labAuth

## Contribute

Fistly install all dependencies

```
 $ npm i
```

### Develop commands

Watch and build all src files with sourcemaps

```
 $ npm run dev
```

Serve the frontend

```
 $ node server
```

### Deploy

```
 $ npm run build
```

Then copy the following files to a webserver: 
 * Everything in `/dist` (into `/dist`)
 * index.html (to `/`)
 * server.js (to `/`)
 
Finally start `server.js` on the webserver

```
 $ node server
```
