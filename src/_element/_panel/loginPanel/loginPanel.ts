import Panel from "../panel"
import "./../../input/input"



export default class LoginPanel extends Panel {
  public preferedWidth: "small" = "small"

  constructor() {
    super()

    
  }


  stl() {
    return require("./loginPanel.css").toString()
  }
  pug() {
    return require("./loginPanel.pug").default
  }
}

window.customElements.define('c-login-panel', LoginPanel);