import Element from "../element"
import Input from "./../input/input"
import "./../input/input"


export default class SetUpInput extends Element {

  private inputElem = this.q("c-input").first as Input
  private questionElem = this.q("text-paragraph")
  
  constructor(question: string, type: "number" | "password" | "text" | "email" | "uppercase" = "text", public changeCallback?: (content: string, e: InputEvent) => void, public submitCallback?: (content: string, e: KeyboardEvent) => void, cunstomverifaction?: (value?: string | number) => (boolean | string | void)) {
    super(false)

    this.inputElem.type = type
    
    this.questionElem.html(question)

    this.inputElem.onInput((s, e) => {
      if (this.changeCallback) this.changeCallback(s, e)
    })
    this.inputElem.submitCallback = (s, e) => {
      if (this.submitCallback) this.submitCallback(s, e)
    }

    this.inputElem.customVerification = cunstomverifaction
  }

  public focus() {
    this.inputElem.focus()
  }

  get value() {
    return this.inputElem.value
  }

  stl() {
    return require("./setUpInput.css").toString()
  }
  pug() {
    return require("./setUpInput.pug").default
  }
}

//@ts-ignore
window.customElements.define('c-setup-input', SetUpInput);