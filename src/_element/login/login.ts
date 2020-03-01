import Element from "../element"
import "./../input/input"
import Input from "./../input/input"
import { ElementList } from "extended-dom";





export default class Login extends Element {
  private inputs = this.q("c-input") as ElementList<Input>
  constructor(public usernameChangeCb?: (value: string) => void, public passwordChangeCb?: (value: string) => void, public submitCb?: (username: string, password: string) => void) {
    super(false);

    let usr = this.q("c-input#usr").first as Input
    let pwd = this.q("c-input#pwd").first as Input

    usr.customVerification = (e) => {
      return !e.toString().includes("@")
    }

    //@ts-ignore
    usr.placeHolderUp("css");
    
    setTimeout(() => {
      usr.focus();
    }, 16)


    usr.onChange((val, e) => {
      if (this.usernameChangeCb) this.usernameChangeCb(val)
    })
    pwd.onChange((val) => {
      if (this.usernameChangeCb) this.passwordChangeCb(val)
    })
    

    let submit = () => {
      
      if (this.submitCb) this.submitCb(usr.value, pwd.value)
    }
    usr.submitCallback = submit
    pwd.submitCallback = submit

    usr.on("keydown", (e) => {
      if (e.key === "Tab") {
        e.stopPropagation()
        e.preventDefault()
        if (!e.shiftKey) pwd.focus()
      }
    })
    pwd.on("keydown", (e) => {
      if (e.key === "Tab") {
        e.stopPropagation()
        e.preventDefault()
        if (e.shiftKey) usr.focus()
      }
    })

  }

  disableInputs() {
    this.inputs.Inner("disable", [])
  }
  enableInputs() {
    this.inputs.Inner("enable", [])
  }

  stl() {
    return require("./login.css").toString()
  }
  pug() {
    return require("./login.pug").default
  }
}

window.customElements.define('c-login', Login);