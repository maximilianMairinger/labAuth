import Element from "./../element";
import { ElementList } from "extended-dom"

var emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



export default class Input extends Element {
  private placeholderElem: HTMLElement;
  private input: HTMLInputElement = ce("input");
  private isUp: boolean = false;
  private isFocused: boolean = false;
  private allElems: ElementList;

  private enterAlreadyPressed = false;

  private _type: "password" | "text" | "number" | "email" | "uppercase";
  constructor(placeholder: string = "", type: "password" | "text" | "number" | "email" | "uppercase" = "text", public submitCallback?: (value: string | number, e: KeyboardEvent) => void, value?: any, public customVerification?: (value?: string | number) => (boolean | string | void), public intrusiveValidation?: boolean) {
    super(false);
    
    this.type = type;

    this.input.spellcheck = false

    this.placeholderElem = ce("input-placeholder");
    this.placeholder = placeholder;
    this.placeholderElem.on("click", () => {
      this.input.focus();
    });
    

    // ----- Validation start

    // unintrusive
    let listener = this.input.ls("input", () => {
      if (this.intrusiveValidation) {
        listener.disable()
        return
      }
      let invalid = this.validate()


      if (!invalid) {
        this.showInvalidation(false)
        listener.disable()
      }
    }, false)

    this.input.on("blur", (e) => {
      if (this.intrusiveValidation) return
      let invalid = this.validate()
      if (invalid) {
        this.showInvalidation(invalid)
        listener.enable()
      }
    });

    // intrusive
    this.input.on("input", () => {


      if (!this.intrusiveValidation) return
      let invalid = this.validate()

      this.showInvalidation(invalid)
    })


    // ----- Validation end
  

    let mousedown = false
    this.input.on('mousedown', () => {
      mousedown = true
    });

    this.input.on("focus", (e) => {
      if (!mousedown) {
        if (this.input.value !== "") this.input.select()  
      }
    })
    this.input.on("blur", () => {
      mousedown = false
      this.enterAlreadyPressed = false
    })

    this.on("focus", () => {
      this.input.focus()
      this.placeHolderUp();
    });
    this.on("blur", () => {
      if (this.value === "") this.placeHolderDown();
    });
    
    this.input.on("keydown", (e) => {
      if (e.key === "Enter" && this.submitCallback !== undefined && !this.enterAlreadyPressed && !this.currentlyInvalid) {
        this.enterAlreadyPressed = true;
        this.submitCallback(this.value, e);
      }
    });
    this.input.on("keydown", (e: any) => {
      e.preventHotkey = "input";
    })
    this.input.on("keyup", ({key}) => {
      if (key === "Enter") {
        this.enterAlreadyPressed = false;
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

  private isDisabled = false
  public disable() {
    if (this.isDisabled) return
    this.isDisabled = true
    this.allElems.addClass("disabled")
    let foc = this.isFocused
    this.input.disabled = true
    if (foc) this.focus()
    this.enterAlreadyPressed = false
  }

  public focus() {
    this.input.focus()
  }

  public enable() {
    if (!this.isDisabled) return
    this.isDisabled = false
    this.allElems.removeClass("disabled")
    this.input.disabled = false
    if (this.isFocused) this.input.focus()
  }

  private listeners: Map<(value: string | number, e: InputEvent) => void, (e: InputEvent) => void> = new Map()
  public onInput(f: (value: string | number, e: InputEvent) => void) {
    let inner = (e: InputEvent) => {
      if (!this.currentlyInvalid) f(this.value, e)
      else f("", e)
    }
    this.listeners.set(f, inner)
    this.input.on("input", inner)
  }
  public offInput(f: (value: string, e: InputEvent) => void) {
    this.input.off("input", this.listeners.get(f))
    this.listeners.delete(f)
  }


  public set placeholder(to: string) {
    this.placeholderElem.text(to);
  }
  public get placeholder(): string {
    return this.placeholderElem.text();
  }
  private upperCaseParseListener = this.input.ls("input", () => {
    this.input.value = this.input.value.toUpperCase()
  })
  public set type(to: "password" | "text" | "number" | "email" | "uppercase") {
    this.intrusiveValidation = to === "password" || to === "number"
    if (to === "password") {
      this.input.type = to;
      this.upperCaseParseListener.disable()
    }
    else if (to === "uppercase") {
      this.upperCaseParseListener.enable()
      this.input.type = "text";
    }
    else {
      this.input.type = "text";
      this.upperCaseParseListener.disable()
    }
    this._type = to;
  }
  public get type(): "password" | "text" | "number" | "email" | "uppercase" {
    return this._type;
  }
  public isValid(emptyAllowed: boolean = true) {
    let valid = !this.validate();
    if (emptyAllowed) return valid;
    return this.value !== "" && valid;
  }
  public get value(): string | number {
    let v = this.input.value;
    if (this.type === "number") {
      return +v;
    }
    return v;
  }
  public set value(to: string | number) {
    this.input.value = to.toString();
    this.alignPlaceHolder();
  }
  private validate(): string | boolean | void {
    let invalid: string | boolean | void = false
    if (this.type === "number") invalid = isNaN(this.value as number) ? "Expected a number" : false;
    else if (this.type === "email") invalid = emailValidationRegex.test((this.value as string).toLowerCase()) ? "This is not a valid email address" : false;
    if (this.customVerification !== undefined) {
      let returnInvalid = this.customVerification(this.value)
      if (typeof returnInvalid === "boolean") {
        if (!returnInvalid) invalid = false
      }
      else if (typeof returnInvalid === "string") {
        if (returnInvalid) invalid = returnInvalid
      }
    }
    if (this.input.value === "") invalid = false
    return invalid;
  }
  private alignPlaceHolder() {
    if (this.value === "" && !this.isFocused) this.placeHolderDown("css");
    else this.placeHolderUp("css");
  }
  private async placeHolderUp(func: "anim" | "css" = "anim") {
    if (!this.isUp) {
      // This seems to be too complex for typescript. Maybe in the future the ts-ignore can be removed. Proof that it should work.
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
  public readonly currentlyInvalid = false
  public showInvalidation(valid: boolean | string | void = true) {
    if (valid) {
      this.allElems.addClass("invalid");
      if (valid === true) {
        this.title = "Invalid input";
      }
      else if (typeof valid === "string") {
        this.title = valid
      }
    }
    else {
      this.title = "";
      this.allElems.removeClass("invalid");
    }

    //@ts-ignore
    this.currentlyInvalid = !!valid
  }
  static get observedAttributes() {
    return ["placeholder", "type", "value", "intrusiveValidation"];
  }
  stl() {
    return require('./input.css').toString();
  }
  pug() {
    return require("./input.pug").default
  }

}

window.customElements.define('c-input', Input);
