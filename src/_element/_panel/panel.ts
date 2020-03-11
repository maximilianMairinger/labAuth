import Element from "../element"


type Percent = number
import * as cardReader from "./../../lib/card-reader"


export default abstract class Panel extends Element {
  public abstract preferedWidth: "big" | "small" | Percent
  protected active: boolean
  constructor() {
    super()

    
    if (this.cardReadCallback !== defaultCardReadCallback) {
      cardReader.addListener(this.cardReadCallback)
    }
  }

  public activate(): void {
    this.vate(true)
  }
  public deactivate(): void {
    this.vate(false)
  }
  public vate(activate: boolean) {
    this.active = activate;
    this.activationCallback(activate);
  }
  protected activationCallback(active: boolean) {
    if (active) {
      if (this.cardReadCallback !== defaultCardReadCallback) {
        cardReader.enable()
      }
      else {
        cardReader.disable()
      }
    }
    else {

    }
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