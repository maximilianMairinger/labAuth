import Panel from "../panel"
import Button from "./../../_button/_rippleButton/blockButton/blockButton"
import PanelManager from "../../panelManager/panelManager"



export default class SetUpConfirmationPanel extends Panel {
  public preferedWidth = 20

  
  private subjectElem = this.q("subject-text")
  private facultyElem = this.q("faculty-text")
  private hoursElem = this.q("hours-text")

  private confirmButton: Button
  constructor(manager: PanelManager, public confirmCallback?: (confirmation: boolean) => void) {
    super()


    let cb = (e) => {
      if (this.confirmCallback) this.confirmCallback(e.target === this.confirmButton)
    }

    let abortButton = new Button("Abort", cb).addClass("abort")
    this.confirmButton = new Button("Sure", cb).addClass("confirm")

    this.apd(abortButton, this.confirmButton)


    this.hightlightConfirmButton()

  }
  subject(s: string) {
    this.subjectElem.text(s)
  }
  faculty(s: string) {
    this.facultyElem.text(s)
  }
  hours(s: string) {
    this.hoursElem.text(s)
  }
  async hightlightConfirmButton() {
    // this.confirmButton.css()
  }

  stl() {
    return require("./setUpConfirmationPanel.css").toString()
  }
  pug() {
    return require("./setUpConfirmationPanel.pug").default
  }
}

//@ts-ignore
window.customElements.define('c-setup-confirmation-panel', SetUpConfirmationPanel);