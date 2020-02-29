import Element from "../element"
import { Data } from "front-db";






export default class Edu extends Element {
  private usernameElement = this.q("#Username__mmairinger span")
  private passcodeElem = this.q("#ID2424_Wien span")
  constructor() {
    super(false);
    
  }

  username(to: string) {
    this.usernameElement.html("Username: " + to)
  }
  updatePasscode(length: number) {
    this.passcodeElem.html(Math.round(Math.random() * ((Math.pow(10, (3 + (length * 0.7)) >= 17 ? 17 : (3 + (length * 0.7)))))))
  }

  stl() {
    return require("./edu.css").toString()
  }
  pug() {
    return require("./edu.pug").default
  }
}

window.customElements.define('c-edu', Edu);