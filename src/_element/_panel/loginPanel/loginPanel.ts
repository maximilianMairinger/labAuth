import Panel from "../panel"
import "./../../input/input"
import PanelManager from "../../panelManager/panelManager"



export default class LoginPanel extends Panel {
  public preferedWidth: "small" = "small"

  constructor(manager: PanelManager) {
    super()
    
  }

  stl() {
    return require("./loginPanel.css").toString()
  }
  pug() {
    return require("./loginPanel.pug").default
  }
}

//@ts-ignore
window.customElements.define('c-login-panel', LoginPanel);