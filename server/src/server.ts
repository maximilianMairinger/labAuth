import * as generateSalt from "crypto-random-string"
import * as express from "express"
import * as bodyParser from "body-parser"
import xrray from "xrray"; xrray(Array);
import initLib from "./lib/lib"

const args = require("yargs").argv
const port = args.port === undefined ? console.log("Serving on port 443") as undefined || 443 : args.port;
const salt = args.salt === undefined ? generateSalt({length: 15}) : args.salt
const securityLevel: "paranoid" | "casual" = ["paranoid", "casual"].includes(args.securityLevel) ? "casual" : args.securityLevel
const session = args.authKeyForRegistration === undefined ? console.warn("Unable to find \"authKeyForRegistration\" as command line option") as undefined || undefined : args.authKeyForRegistration



const app = express()
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen(port)

app.use(express.static("./public"))



initLib(salt).then((lib) => {



  app.post("/startUnit", async (req, res) => {
    await lib.startUnit(req.body.sessKey, req.body)

    res.send(true)
  })

  app.post("/destroySession", async (req, res) => {
    await lib.destroySession(req.body.sessKey)
    res.send(true)
  })

  app.post("/LDAPAuth", async (req, res) => {
    let studentOrTeacherData = await lib.getLdapAuthData(req.body.username, req.body.password)

    let isStudent = lib.isStudent(studentOrTeacherData)

    if (isStudent) {
      let studentData = studentOrTeacherData

      await lib.saveCardData(studentData, req.body.hashedCardId)
      let unitData = await lib.getUnitData(req.body.sessKey)
      let data = await lib.registerStudent(studentData, unitData)
      res.send({valid: true, data})

    }
    else if (isStudent === null) {
      res.send({valid: false})
    }
    else {
      let teacherDatas = studentOrTeacherData


    }
    
    
    
  })

  app.post("/studentSignOut", async (req, res) => {
    
  })

  app.post("/cardAuth", async (req, res) => {
    let cardData = await lib.getCardData(req.body.hashedCardId)
    if (cardData !== null) res.send({entry: true, data: cardData})
    else res.send({entry: false})
  })

  if (securityLevel === "casual") {
    app.post("/cardIndex", async (req, res) => {

    })
  }

  

  

  

  

})









