import Panel from "../panel"



export default class InformPanel extends Panel {
  public preferedWidth: "small" = "small"
  constructor() {
    super()

    
    
  }

  stl() {
    return require("./informPanel.css").toString()
  }
  pug() {
    return require("./informPanel.pug").default
  }
}

window.customElements.define('c-inform-panel', InformPanel);