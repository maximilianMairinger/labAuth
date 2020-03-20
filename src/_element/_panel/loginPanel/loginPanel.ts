import Panel from "../panel"
import "./../../input/input"
import PanelManager from "../../panelManager/panelManager"
import { ElementList } from "extended-dom"
import Input from "./../../input/input"
import ajax from "../../../lib/ajax"
import delay from "delay"
import { disable, enable } from "../../../lib/cardReader"



export default class LoginPanel extends Panel {
  public preferedWidth: "small" = "small"
  public preventFocusInterference = true


  private inputs = this.q("c-input") as ElementList<Input>
  private usr = this.inputs.first
  private pwd = this.inputs[1]

  public cardId = ""

  constructor(private manager: PanelManager) {
    super()

    let invalid = false
    let submitCb = async () => {
      this.inputs.Inner("disable", [])
      manager.panelIndex.edu.mainCard.authentication()
      let req = ajax.post("LDAPAuth", {username: this.usr.value, password: this.pwd.value})

      req.fail(async () => {
        manager.panelIndex.edu.mainCard.doneAuthentication()
        await manager.setPanel("info", "left")
        this.inputs.Inner("enable", [])
      })

      await Promise.all([req, delay(1000 + (Math.random() * 1000))])

      manager.panelIndex.edu.mainCard.doneAuthentication()

      let res = await req
      if (res.valid) {
        disable()
        manager.panelIndex.edu.registerRequest(res.data, this.cardId).then(() => {
          enable()
        })

        await manager.setPanel("info", "left")
        this.inputs.ea((input) => {
          input.value = ""
        })
        this.inputs.Inner("enable", [])
      }
      else {
        this.inputs.Inner("showInvalidation", ["Username or password is incorrect."])
        this.inputs.Inner("enable", [])
        invalid = true
        manager.panelIndex.edu.mainCard.fullName("Authentication failed")
      }

    }

    this.inputs.Inner("onInput", [() => {
      if (invalid) {
        this.inputs.Inner("showInvalidation", [false])
        invalid = false
        manager.panelIndex.edu.mainCard.fullName("Unknown")
      }
    }])
    
    this.inputs.ea((input) => {
      input.submitCallback = submitCb
    })
    this.usr.onInput((v) => {
      manager.panelIndex.edu.mainCard.username(v as string)
    })
    this.pwd.onInput((v) => {
      manager.panelIndex.edu.mainCard.updatePasscode((v as string).length)
    })
  }

  activationCallback() {
    super.activationCallback()

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