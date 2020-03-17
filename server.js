const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 5500;
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function sendFile(res, p) {
  res.sendFile(path.join(__dirname + "/" + p));
}

app.use('/dist', express.static('dist'))
app.use('/res', express.static('res'))

app.get('*', (req, res) => {
  sendFile(res, "index.html")
});

app.post("/LDAPAuth", (req, res) => {
  setTimeout(() => {
    res.send({valid: true, data: {fullName: "Maximilian Mairinger", employeetype: "student", registered: ["gone", "active", "active", "active"], sessKey: "sessKeyDummy"}})
  }, 2000)
})

app.post("/cardAuth", (req, res) => {
  res.send({entry: true, data: {employeetype: "teacher", username: "ddolezal", fullName: "Domenik Dolezal", registered: ["gone", "active", "active", "toBeGone"], sessKey: "sessKeyDummy"}})
})

app.post("/destroySession", (req, res) => {
  res.send({})
})



app.listen(port);
console.log("Listening on Port: " + port);
