import Element from "./../element";
import { ElementList } from "extended-dom"

var emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Note: on(input)

export default class Input extends Element {
  private placeholderElem: HTMLElement;
  private input: HTMLInputElement;
  private isUp: boolean = false;
  private isFocused: boolean = false;
  private allElems: ElementList;

  private _type: "password" | "text" | "number" | "email";
  constructor(placeholder: string = "", type: "password" | "text" | "number" | "email" = "text", public submitCallback?: Function, value?: any, public customVerification?: (value?: string | number) => boolean) {
    super(false);

    this.placeholderElem = ce("input-placeholder");
    this.placeholder = placeholder;
    this.placeholderElem.on("click", () => {
      this.input.focus();
    });

    this.input = ce("input");
    this.type = type;

    //Validation
    this.input.on("blur", (e) => {
      this.showInvalidation(!this.validate());
    });

    this.input.on("focus", () => {
      this.showInvalidation(false);
      this.placeHolderUp();
    });
    this.input.on("blur", () => {
      if (this.value === "") this.placeHolderDown();
    });

    let alreadyPressed = false;

    this.input.on("keydown", ({key}) => {
      if (key === "Enter" && this.submitCallback !== undefined) if (!alreadyPressed){
        alreadyPressed = true;
        this.submitCallback(this.value);
      }
    });
    this.input.on("keydown", (e: any) => {
      e.preventHotkey = "input";
    })
    this.input.on("keyup", ({key}) => {
      if (key === "Enter") {
        alreadyPressed = false;
      }
    });

    this.on("focus", () => {
      this.isFocused = true;
    });
    this.on("blur", () => {
      this.isFocused = false;
    });


    this.apd(this.placeholderElem, this.input as any as HTMLElement);
    this.allElems = new ElementList(this.placeholderElem, this.input as any as HTMLElement);

    if (value !== undefined) this.value = value;
  }
  public set placeholder(to: string) {
    this.placeholderElem.html(to);
  }
  public get placeholder(): string {
    return this.placeholderElem.html();
  }
  public set type(to: "password" | "text" | "number" | "email") {
    if (to === "password") {
      this.input.type = to;
    }
    else {
      this.input.type = "text";
    }
    this._type = to;
  }
  public get type(): "password" | "text" | "number" | "email" {
    return this._type;
  }
  public isValid(emptyAllowed: boolean = true) {
    let valid = this.validate();
    if (emptyAllowed) return valid;
    return this.value !== "" && valid;
  }
  public focus() {
    this.input.focus();
  }
  public get value(): any {
    let v = this.input.value;
    if (this.type === "number") {
      return +v;
    }
    return v;
  }
  public set value(to: any) {
    this.input.value = to;
    this.alignPlaceHolder();
  }
  private validate() {
    let valid = true;
    if (this.type === "number") valid = !isNaN(this.value);
    else if (this.type === "email") valid = emailValidationRegex.test(this.value.toLowerCase());
    if (this.customVerification !== undefined) if (!this.customVerification(this.value)) valid = false;
    return valid;
  }
  private alignPlaceHolder() {
    if (this.value === "" && !this.isFocused) this.placeHolderDown("css");
    else this.placeHolderUp("css");
  }
  private placeHolderUp(func: "anim" | "css" = "anim") {
    if (!this.isUp) {
      // This seems to be too complex for typescript. Maybe in thefuture the ts-ignore can be removed. Proof that it should work.
      // this.placeholder.css({marginLeft: "13px", marginTop: "10px", fontSize: "1em"})
      // this.placeholder.anim({marginLeft: "13px", marginTop: "10px", fontSize: "1em"})
      //@ts-ignore
      this.placeholderElem[func]({marginTop: "-1.2em", marginLeft: 0, fontSize: ".8em"});
      this.isUp = true;
      this.placeholderElem.css("cursor", "auto");
    }
  }
  private placeHolderDown(func: "anim" | "css" = "anim") {
    if (this.isUp) {
      //@ts-ignore
      this.placeholderElem[func]({marginLeft: "13px", marginTop: "10px", fontSize: "1em"});
      this.isUp = false;
      this.placeholderElem.css("cursor", "text");
    }
  }
  private showInvalidation(is: boolean = true) {
    if (is) {
      this.title = "Invalid input";
      this.allElems.addClass("invalid");
    }
    else {
      this.title = "";
      this.allElems.removeClass("invalid");
    }
  }
  static get observedAttributes() {
    return ["placeholder", "type", "value"];
  }
  stl() {
    return require('./input.css').toString();
  }
  pug() {
    return require("./input.pug").default
  }

}

window.customElements.define('c-input', Input);
