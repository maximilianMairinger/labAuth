const nodemon = require("nodemon")
const detectPort = require("detect-port")
const args = require("yargs").argv;
const path = require("path")
const fs = require("fs")
const open = require("open")

// configureable
const serverEntryFileName = "server.js"






let dev = args.dev
let watchDir;

if (dev === "app") watchDir = "./replServer/dist"
else watchDir = "./server/dist";





(async (wantedPort = 6500) => {
  let gotPort;
  try {
    gotPort = await detectPort(wantedPort)
  }
  catch(e) {
    console.error(e)
  }



  let entryPath = path.join(watchDir, serverEntryFileName)
  
  
  if (!fs.existsSync(entryPath)) return console.log("No entry found under \"" + entryPath + "\"")




  
  let server = nodemon({
    watch: watchDir,
    script: entryPath,
    args: ["--port", gotPort]
  })

  server.on("restart", (e) => {
    console.log("")
    console.log("----------------")
    console.log("Server restaring")
    console.log("----------------")
    console.log("")
  })

  
  
  
  



  if (gotPort !== wantedPort) console.log(`Port ${wantedPort} was occupied, falling back to: ${gotPort}.\n----------------------------------------------\n`)
  else console.log(`Serving on port ${gotPort}.\n---------------------\n`)

  
  open(`http://127.0.0.1:${gotPort}`)
  
  
  
  
})(args.port)






