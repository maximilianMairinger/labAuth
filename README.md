# LabAuth

## Contribute

The frontend / client is refered as app. The backend as server.

### Development env

#### Develop app

The source of the app can be found in `/app` and the serviceworker's in `/serviceWorker`.

```
 $ npm run devApp
```

Builds the app on save & spins up a live (notifies client to reload on change) repl server, whose source can be found in `/replServer/src`.

#### Develop server

Source found in `/server/src`.

```
 $ npm run devServer
```

Builds the server & a replApp on save. The source of the replApp can be found under `/replApp`

#### Develop server & app

```
 $ npm run dev
```

Watches production server & app and builds them on save. No live reloading avalible, since its the prod server.

### Deploy

#### Build scripts

Build everything for production

```
 $ npm run build
```

Start the server

```
 $ npm start --port 443
```
