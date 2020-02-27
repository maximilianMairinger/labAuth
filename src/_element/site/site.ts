import Element from "../element"
import { resolveLang } from "../../lib/interpolateHTMLWithLang"
import * as cardReader from "./../../lib/card-reader"
import Swal from 'sweetalert2'
import EnterForHoursSelector from "../enterForHoursSelector/enterForHoursSelector"
import studentRegistered from "./popups/registered"
import login from "./popups/login"







cardReader.addListener(console.log)
cardReader.disable()

login("Maximilian Mairinger", 3, "Medt")

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