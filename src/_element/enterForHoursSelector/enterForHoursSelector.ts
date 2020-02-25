import Element from "../element"


export default class EnterForHoursSelector extends Element {

  constructor(max: number) {
    super(false)

    
    for (let i = 0; i < max; i++) {
      this.apd(
        ce("hour-box")
      )
    }

    let elements = this.childs()
    elements.on("click", () => {
      elements
    })

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