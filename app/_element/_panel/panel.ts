import Element from "../element"


type Percent = number
import * as cardReader from "../../lib/cardReader"


export default abstract class Panel extends Element {
  public abstract preferedWidth: "big" | "small" | Percent
  protected active: boolean

  public preventFocusInterference = false

  public wantsCardReader: boolean
  constructor() {
    super()

    
    if (this.cardReadCallback !== defaultCardReadCallback) {
      cardReader.addListener(this.cardReadCallback.bind(this))
      this.wantsCardReader = true
    }
    else this.wantsCardReader = false
  }

  public activate(): void {
    this.activationCallback()
  }
  public deactivate(): void {
    this.deactivationCallback()
  }
  public vate(activate: boolean) {
    if (activate) this.activate()
    else this.deactivate()
  }
  protected activationCallback() {

  }
  protected deactivationCallback() {

  }

  protected cardReadCallback(cardId: string) {
    
  }

  stl() {
    return require("./panel.css").toString()
  }
  pug() {
    return require("./panel.pug").default
  }
}

//@ts-ignore
let defaultCardReadCallback = Panel.prototype.cardReadCallback = function(cardId: string) {

}


//@ts-ignore
window.customElements.define('c-panel', Panel);