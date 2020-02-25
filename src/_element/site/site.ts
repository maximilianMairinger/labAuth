import Element from "../element"
import delay from "delay"
import { ElementList } from "extended-dom"
import { resolveLang } from "../../lib/interpolateHTMLWithLang"
import * as cardReader from "./../../lib/card-reader"
import Swal from 'sweetalert2'
import EnterForHoursSelector from "../enterForHoursSelector/enterForHoursSelector"




function getNow() {
  return new Date().toLocaleTimeString().substr(0, 5)
}




cardReader.addListener(console.log)

const studentRegistered = (() => {
  const title = resolveLang("succ_registered_head")
  const text1 = resolveLang("succ_registered_long_1")
  const text2 = resolveLang("succ_registered_long_2")
  return function studentRegistered(name: string) {
    let now = getNow()
    Swal.fire({
      title,
      html: new EnterForHoursSelector(4),
      timer: 50000000,
      showCancelButton: false,
      showConfirmButton: false,
      icon: "success"
    })
  }
})();

studentRegistered("Maximilian Mairinger")

export default class Site extends Element {

  constructor() {
    super()

    
    
  }

  stl() {
    return require("./site.css").toString()
  }
  pug() {
    return require("./site.pug").default
  }
}

window.customElements.define('c-site', Site);