import liveReloadServer from "./liveRealoadServer"

let app = liveReloadServer()



app.get("/", (req, res) => {
  res.send("Hellwow")
})


