export default function() {
  //@ts-ignore
  global.log = console.log
  //@ts-ignore
  global.ce = document.createElement.bind(document)
}
