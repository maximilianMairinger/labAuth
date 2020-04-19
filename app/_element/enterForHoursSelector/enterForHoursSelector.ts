import Element from "../element"
import { resolveLang } from "../../lib/interpolateHTMLWithLang"


function getNow() {
  return new Date().toLocaleTimeString().substr(0, 5)
}


export default class EnterForHoursSelector extends Element {
  private textElem = ce("text-display")
  

  constructor(max: number, subject: string, current?: number) {
    super(false)

    this.apd(
      this.textElem
    )
    

    let hrWrapper = ce("hour-wrapper")
    this.apd(hrWrapper)
    
    for (let i = 0; i < max; i++) {
      hrWrapper.apd(
        ce("hour-box")
      )
    }

    let elements = hrWrapper.childs()
    

    if (current !== undefined) {
      this.textElem.html("Möchtest du dich von den letzen " + (max - current) + " Stunden abmelden?")


      elements.length = current
      elements.addClass("active")
      let toBechangedElements = hrWrapper.childs()
      for (let i = 0; i < current; i++) {
        toBechangedElements.rmI(0)  
      }
      toBechangedElements.ea((elem) => {
        elem.addClass("toBeChanged")
      })
    }
    else {
      this.textElem.html("Du wurdest für " + max + " Stunden in " + subject + " angemeldet.")
      elements.addClass("active")
    }
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