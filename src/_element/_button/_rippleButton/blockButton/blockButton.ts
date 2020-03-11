import RippleButton from "./../rippleButton";

export default class BlockButton extends RippleButton {
  private textElem: HTMLElement;
  constructor(content: string = "", activationCallback?: Function) {
    super(activationCallback);
    this.textElem = ce("button-text");
    this.content(content);
    this.sra(ce("button-container").apd(this.textElem));
  }
  content(to: string) {
    this.textElem.text(to)
  }
  stl() {
    return super.stl() + require('./blockButton.css').toString();
  }
  pug() {
    return super.pug() + require("./blockButton.pug").default
  }
}
window.customElements.define('c-block-button', BlockButton);
