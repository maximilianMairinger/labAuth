import polyfill from "extended-dom"


export default async function() {
  await polyfill()
  //@ts-ignore
  global.log = console.log
  //@ts-ignore
  global.ce = document.createElement.bind(document)
}
