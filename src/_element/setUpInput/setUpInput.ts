import Element from "../element"
import Input from "./../input/input"
import "./../input/input"


export default class SetUpInput extends Element {

  private inputElem = this.q("c-input").first as Input
  private questionElem = this.q("text-paragraph")
  
  constructor(question: string, public changeCallback?: (content: string, e: InputEvent) => void, public submitCallback?: (content: string, e: KeyboardEvent) => void) {
    super(false)
    
    this.questionElem.html(question)

    this.inputElem.onChange((s, e) => {
      if (this.changeCallback) this.changeCallback(s, e)
    })
    this.inputElem.submitCallback = (s, e) => {
      if (this.submitCallback) this.submitCallback(s, e)
    }
    
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