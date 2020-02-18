import Element from "../element"
import delay from "delay"
import { ElementList } from "extended-dom"
import { resolveLang } from "../../lib/interpolateHTMLWithLang"
import * as moment from "moment"

import Swal from 'sweetalert2'

moment.locale()
console.log()


function getNow() {
  
}

console.log(getNow())

const studentRegistered = (() => {
  const title = resolveLang("succ_registered_head")
  const text1 = resolveLang("succ_registered_head_1")
  const text2 = resolveLang("succ_registered_head_2")
  return function studentRegistered(name: string) {
    let now = new Date()
    Swal.fire({
      title,
      text: name + text1 + getNow() + text2,
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
      icon: "success"
    })
  }
})();

delay(200).then(() => {

  studentRegistered("Maximilian Mairinger")
})


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