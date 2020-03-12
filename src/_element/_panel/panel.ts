import Element from "../element"


type Percent = number
import * as cardReader from "../../lib/cardReader"


export default abstract class Panel extends Element {
  public abstract preferedWidth: "big" | "small" | Percent
  protected active: boolean

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
    this.vate(true)
  }
  public deactivate(): void {
    this.vate(false)
  }
  public vate(activate: boolean) {
    this.active = activate;
    setTimeout(() => {
      this.activationCallback(activate);
    }, 100)
  }
  protected activationCallback(active: boolean) {

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