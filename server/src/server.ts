const args = require("yargs").argv
const port = args.port === undefined ? console.log("Serving on port 443") as undefined || 443 : args.port;

import * as express from "express"
import * as bodyParser from "body-parser"
import xrray from "xrray"; xrray(Array);
import initLib from "./lib/lib"

const app = express()
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen(port)

app.use(express.static("./public"))


initLib().then((lib) => {
  

  app.post("auth", () => {
    lib.createTeacherSession("test123")
  })


  

})









