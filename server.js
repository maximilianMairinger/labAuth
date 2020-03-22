import express from "express"
import bodyParser from "body-parser"
import * as path from "path"
const port = 5500;
const app = express();
import * as crypto from "crypto"

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function sendFile(res, p) {
  res.sendFile(path.join(path.resolve(path.dirname('')), p));
}

app.use('/dist', express.static('dist'))
app.use('/res', express.static('res'))

app.get('/', (req, res) => {
  sendFile(res, "index.html")
});


let exampleStudentCardIdEncrypted = crypto.createHash("sha256").update("s").digest("hex")
let exampleTeacherCardIdEncrypted = crypto.createHash("sha256").update("t").digest("hex")

app.post("/cardIndex", (req, res) => {

  let msg = {
    student: {
      // s: {
      //   fullName: "Maximilian Mairinger",
      //   username: "mmairinger"
      // }
    },
    teacher: {
      // t: {
      //   fullName: "Domenik Dolezal",
      //   username: "ddolezal"
      // }
    }
  }

  msg[exampleStudentCardIdEncrypted] = {
    fullName: "Maximilian Mairinger",
    username: "mmairinger"
  }

  msg[exampleTeacherCardIdEncrypted] = {
    fullName: "Domenik Dolezal",
    username: "ddolezal"
  }



  res.send(msg)
})


app.post("/studentSignOut", ({ body: param }, res) => {
  console.log("")
  console.log("studentSignOut: ")
  console.log(param)


  res.send({})
})

app.post("/startUnit", ({ body: param }, res) => {
  console.log("")
  console.log("start Unit: ")
  console.log(param)


  setTimeout(() => {
    res.send({})
  }, 600)
})

app.post("/LDAPAuth", (req, res) => {
  setTimeout(() => {
    if (req.body.username === "s") {
      res.send({valid: true, data: {fullName: "Maximilian Mairinger", username: "mmairinger", employeetype: "student", registered: ["active", "active", "active", "toBeGone"], sign: "out"}})
    }
    else if (req.body.username === "t") {
      res.send({valid: true, data: {fullName: "Domenik Dolezal", username: "ddolezal", employeetype: "teacher", sessKey: "sessKeyDummy"}})
    }
    else res.send({valid: false})
  }, 300)
})

app.post("/cardAuth", (req, res) => {
  console.log("")
  console.log("cardAuth")
  console.log(req.body)
  if (req.body.cardId === "t") {
    res.send({entry: true, data: {employeetype: "teacher", username: "ddolezal", fullName: "Domenik Dolezal", sessKey: "sessKeyDummy"}})
  }
  else if (req.body.cardId === "s") {
    res.send({entry: true, data: {employeetype: "student", username: "mmairinger", fullName: "Maximilian Mairinger", registered: ["active", "active", "active", "active"], sign: "in"}})
  }
  else {
    res.send({entry: false})
  }
  
})

app.post("/destroySession", (req, res) => {
  setTimeout(() => {
    res.send({})
  }, 6000)
})



app.listen(port);
console.log("Listening on Port: " + port);
