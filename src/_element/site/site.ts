import Element from "../element"
import delay from "delay"
import { ElementList } from "extended-dom"

import Swal from 'sweetalert2'


function studentRegistered(name: string) {
  Swal.fire({
    title: 'Successfully Registerd',
    text: 'I will close in 2 seconds.',
    timer: 2000,
    showCancelButton: false,
    showConfirmButton: false,
    icon: "success"
  })
}

delay(200).then(() => {

  
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