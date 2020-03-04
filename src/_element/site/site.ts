import Element from "../element"
import PanelManager from "../panelManager/panelManager"






export default class Site extends Element {

  constructor() {
    super()

    this.apd(new PanelManager())
    
  }

  stl() {
    return require("./site.css").toString()
  }
  pug() {
    return require("./site.pug").default
  }
}

window.customElements.define('c-site', Site);