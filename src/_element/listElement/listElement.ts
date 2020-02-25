import Element from "./../element"


export default class ListElement extends Element {

  constructor(name: string, ) {
    super()

    
    
  }

  stl() {
    return require("./listElement.css").toString()
  }
  pug() {
    return require("./listElement.pug").default
  }
}

//@ts-ignore
window.customElements.define('c-list-element', ListElement);