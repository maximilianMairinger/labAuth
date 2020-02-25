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

window.customElements.define('c-list-element', ListElement);