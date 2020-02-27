import Element from "../element"
import "./../input/input"





export default class Login extends Element {

  constructor() {
    super(false)

  }

  stl() {
    return require("./login.css").toString()
  }
  pug() {
    return require("./login.pug").default
  }
}

window.customElements.define('c-login', Login);