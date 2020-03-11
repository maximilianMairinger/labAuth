import Element from "./../element";
import { Tel } from "extended-dom";


const pressedClass = "pressed";

export default class Button extends Element {
  private doesFocusOnHover: boolean;
  private mouseOverListener: Tel;
  private mouseOutListener: Tel;
  private callbacks: Function[] = [];

  private preferedTabIndex: number
  constructor(activationCallback?: Function, protected readonly enabled: boolean = true, focusOnHover: boolean = false, public tabIndex: number = 0, public obtainDefault: boolean = false, public preventFocus = false, blurOnMouseOut: boolean = false) {
    super();

    if (enabled) this.enable()
    else this.disable()

    this.preferedTabIndex = this.tabIndex

    let alreadyPressed = false;

    this.on("mousedown", (e) => {
      if (e.which === 1) this.click(e);
    });
    this.on("mouseup", () => {
      this.removeClass(pressedClass);
    });
    this.on("mouseout", () => {
      this.removeClass(pressedClass);
    })
    this.on("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") if (!alreadyPressed) {
        alreadyPressed = true;
        this.click(e)
      }
    });
    this.on("keyup", ({key}) => {
      if (key === " " || key === "Enter"){
        alreadyPressed = false;
        this.removeClass(pressedClass);
      }
    });
    this.on("blur", () => {
      alreadyPressed = false;
    });

    this.mouseOverListener = this.ls("mouseover", () => {
      this.focus();
    }, false)
    this.mouseOutListener = this.ls("mouseout", () => {
      this.blur();
    }, false)

    this.addActivationCallback(activationCallback);
    this.focusOnHover = focusOnHover;
    this.blurOnMouseOut = blurOnMouseOut;
  }
  public enable(prevFocus: boolean = false) {
    //@ts-ignore
    this.enabled = true
    this.tabIndex = this.preferedTabIndex
    this.addClass("enabled");
    if (!prevFocus) this.focus()
  }
  public disable(prevBlur: boolean = false) {
    //@ts-ignore
    this.enabled = false
    this.tabIndex = undefined
    this.removeClass("enabled");
    if (!prevBlur) this.blur()
  }
  public set blurOnMouseOut(to: boolean) {
    if (to) this.mouseOutListener.enable();
    else this.mouseOutListener.disable();
  }
  public addActivationCallback(cb?: Function) {
    if (cb !== undefined) this.callbacks.add(cb);
  }
  public removeActivationCallback(cb?: Function) {
    if (cb !== undefined) this.callbacks.removeV(cb);
  }
  public set focusOnHover(to: boolean) {
    this.doesFocusOnHover = to;
    if (to) {
      this.mouseOverListener.enable();
      this.mouseOutListener.enable();
    }
    else {
      this.mouseOverListener.disable();
      this.mouseOutListener.disable();
    }
  }
  public get focusOnHover(): boolean {
    return this.doesFocusOnHover;
  }
  public click(e?: Event) {
    if (e !== undefined && !this.obtainDefault) e.preventDefault();
    if (this.enabled) {
      if (!this.preventFocus) this.focus();
      this.addClass(pressedClass);
      this.callbacks.forEach(f => {f(e);});
    }
  }
  stl() {
    return require('./button.css').toString();
  }
  pug() {
    return require("./button.pug").default
  }
}

window.customElements.define('c-button', Button);
