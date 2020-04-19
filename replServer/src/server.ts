import liveReloadServer from "./liveRealoadServer"
import * as bodyParser from "body-parser"

let app = liveReloadServer()



app.get("/", (req, res) => {
  res.send("Hellow")
})



