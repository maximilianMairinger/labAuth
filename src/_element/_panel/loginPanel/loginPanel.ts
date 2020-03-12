import Panel from "../panel"
import "./../../input/input"
import PanelManager from "../../panelManager/panelManager"
import { ElementList } from "extended-dom"
import Input from "./../../input/input"



export default class LoginPanel extends Panel {
  public preferedWidth: "small" = "small"
  private inputs = this.q("c-input") as ElementList<Input>
  private usr = this.inputs.first
  private pwd = this.inputs[1]

  constructor(private manager: PanelManager) {
    super()
    
  }

  activationCallback(active: boolean) {
    super.activationCallback(active)

    this.usr.focus()
  }

  stl() {
    return super.stl() + require("./loginPanel.css").toString()
  }
  pug() {
    return require("./loginPanel.pug").default
  }
}

//@ts-ignore
window.customElements.define('c-login-panel', LoginPanel);