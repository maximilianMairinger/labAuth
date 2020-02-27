import Element from "../element"
import "./../input/input"
import Input from "./../input/input"





export default class Login extends Element {

  constructor() {
    super(false);

    //@ts-ignore
    (this.q("c-input").first as Input).placeHolderUp("css");
    
    setTimeout(() => {
      (this.q("c-input").first as Input).focus();
    }, 16)
  }

  stl() {
    return require("./login.css").toString()
  }
  pug() {
    return require("./login.pug").default
  }
}

window.customElements.define('c-login', Login);