import Element from "../element"
import { resolveLang } from "../../lib/interpolateHTMLWithLang"


function getNow() {
  return new Date().toLocaleTimeString().substr(0, 5)
}

const suc = resolveLang("succRegistrationFor")
const hrsIn = resolveLang("hrsIn")
const reg = resolveLang("reg")

export default class EnterForHoursSelector extends Element {
  private textElem = ce("text-display")
  

  constructor(max: number, subject: string) {
    super(false)

    this.apd(
      this.textElem
    )
    this.textElem.html(suc + max + hrsIn + subject + reg)

    let hrWrapper = ce("hour-wrapper")
    this.apd(hrWrapper)
    
    for (let i = 0; i < max; i++) {
      hrWrapper.apd(
        ce("hour-box")
      )
    }

    let elements = hrWrapper.childs()
    elements.addClass("active")

  }

  stl() {
    return require("./enterForHoursSelector.css").toString()
  }
  pug() {
    return require("./enterForHoursSelector.pug").default
  }
}

//@ts-ignore
window.customElements.define('c-enter-for-hours-selector', EnterForHoursSelector);