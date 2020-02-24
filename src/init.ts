import polyfill from "extended-dom"
import "xrray"
import global from "./global"
import Site from "./_element/site/site"



export async function init() {
  await polyfill()
  global()

  
  let site = new Site()

  document.body.append(site)



}
  
  


