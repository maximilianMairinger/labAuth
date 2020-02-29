import Element from "../element"
import "./../input/input"
import Input from "./../input/input"





export default class Login extends Element {
  constructor(public usernameChangeCb?: (value: string) => void, public passwordChangeCb?: (value: string) => void, public submitCb?: (username: string, password: string) => void) {
    super(false);

    let usr = this.q("c-input#usr").first as Input
    let pwd = this.q("c-input#pwd").first as Input

    //@ts-ignore
    usr.placeHolderUp("css");
    
    setTimeout(() => {
      usr.focus();
    }, 16)


    usr.onChange((val) => {
      if (this.usernameChangeCb) this.usernameChangeCb(val)
    })
    pwd.onChange((val) => {
      if (this.usernameChangeCb) this.passwordChangeCb(val)
    })
    usr.submitCallback = () => {
      if (this.submitCb) this.submitCb(usr.value, pwd.value)
    }
    pwd.submitCallback = () => {
      if (this.submitCb) this.submitCb(usr.value, pwd.value)
    }


  }

  stl() {
    return require("./login.css").toString()
  }
  pug() {
    return require("./login.pug").default
  }
}

window.customElements.define('c-login', Login);