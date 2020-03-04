import Element from "../element"


type Percent = number


export default abstract class Panel extends Element {
  public abstract preferedWidth: "big" | "small" | Percent
  constructor() {
    super()

    
    
  }

  stl() {
    return require("./panel.css").toString()
  }
  pug() {
    return require("./panel.pug").default
  }
}


//@ts-ignore
window.customElements.define('c-panel', Panel);