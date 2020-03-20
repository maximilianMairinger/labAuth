import Panel from "../panel"
import Button from "./../../_button/_rippleButton/blockButton/blockButton"
import PanelManager from "../../panelManager/panelManager"
import delay from "delay"
import ajax from "../../../lib/ajax"



export default class SetUpConfirmationPanel extends Panel {
  public preferedWidth = 20

  
  private subjectElem = this.q("subject-text").first
  private classRoomElem = this.q("classroom-text").first
  private hoursElem = this.q("hours-text").first

  private confirmButton: Button
  private abortButton: Button
  constructor(manager: PanelManager) {
    super()


    this.abortButton = new Button("Abort").addClass("abort")
    this.abortButton.hotkey = "Escape"
    this.confirmButton = new Button("Sure").addClass("confirm")

    this.abortButton.addActivationCallback(async () => {
      this.confirmButton.disable()
      let req = ajax.post("destroySession", {}, undefined, true)
      req.fail(() => {
        // Intentionally left empty
      })
      await Promise.all([delay(600), req])
      delete localStorage.sessKey
      manager.panelIndex.edu.activeTeacherSession = false
    },
    () => {
      manager.panelIndex.info.updateContents("LabAuth", "A teacher may log in with his edu.card to start the session.")
      manager.panelIndex.edu.expectTeacher()
      manager.setPanel("info", "left")
      manager.setPanel("edu", "right").then(() => {
        this.confirmButton.enable()
        manager.panelIndex.setUpPanel.resetInputs()
      })
    })

    this.confirmButton.addActivationCallback(async () => {
      this.abortButton.disable()

      let req = ajax.post("startUnit", {
        hours: +this.hoursElem.text(),
        subject: this.subjectElem.text(),
        classroom: this.classRoomElem.text()
      }, undefined, true)
      
      req.fail(() => {
        // Intentionally left empty
      })

      await Promise.all([delay(600), req])
    }, () => {
      manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subjectElem.text() + "</text-hightlight> here. To sign out, register your card again.")
      manager.panelIndex.edu.subject = this.subjectElem.text()
      manager.panelIndex.edu.maxHours = +this.hoursElem.text()
      manager.panelIndex.edu.expectStudent()
      manager.setPanel("info", "left")
      manager.setPanel("edu", "right").then(() => {
        this.abortButton.enable()
        manager.panelIndex.setUpPanel.resetInputs()
      })
    })

    this.apd(this.abortButton, this.confirmButton)


    this.updateButtonsMaybe()
  }
  private subjectOK = false
  subject(s: string) {
    this.subjectOK = !!s
    this.subjectElem.text(s || "no subject")
    this.updateButtonsMaybe()
  }
  private classroomOK = false
  classroom(s: string) {
    this.classroomOK = !!s
    this.classRoomElem.text(s || "no classroom")
    this.updateButtonsMaybe()
  }
  private hoursOK = false
  hours(s: string) {
    this.hoursOK = !!s
    this.hoursElem.text(s || "0")
    this.updateButtonsMaybe()
  }
  private updateButtonsMaybe() {
    if (this.subjectOK && this.classroomOK && this.hoursOK) this.confirmButton.enable()
    else this.confirmButton.disable()
  }
  async hightlightConfirmButton() {
    this.confirmButton.focus()
    await this.confirmButton.anim({background: "rgba(0,0,0,0.05)"}, 300)
    await this.confirmButton.anim({background: "rgba(0,0,0,0)"}, 300)
  }
  confirm() {
    this.confirmButton.click()
  }

  stl() {
    return super.stl() + require("./setUpConfirmationPanel.css").toString()
  }
  pug() {
    return require("./setUpConfirmationPanel.pug").default
  }
}

//@ts-ignore
window.customElements.define('c-setup-confirmation-panel', SetUpConfirmationPanel);