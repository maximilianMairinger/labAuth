import Panel from "../panel"
import SetUpInput from "../../setUpInput/setUpInput"
import Easing from "waapi-easing";
import delay from "delay";
import { ElementList } from "extended-dom";
import PanelManager from "../../panelManager/panelManager";




export default class SetUpPanel extends Panel {
  public preferedWidth = 62.5

  private questionContainer = this.q("question-container")
  private headingElem = this.q("text-heading")
  private backElem = this.q("#back")
  
  constructor(manager: PanelManager, addresser: string) {
    super()

    this.headingElem.text("Hello " + addresser)

    

    let submitCb = async (back = false) => {
      let sib = back ? activeElement.previousSibling as HTMLElement : activeElement.nextSibling as HTMLElement
      
      
      if (sib) {
        let currentlyActive = activeElement


        if (sib === inputs.first) this.hideBackButton()
        else this.showBackButton()


        if (back) {
          currentlyActive.anim({translateX: -10, opacity: 0}, 500).then(() => currentlyActive.hide())
          sib.css({translateX: 10, opacity: 0})
          sib.show()
          sib.focus()
          sib.anim({translateX: .1}, 700)
          delay(200).then(() => {
            sib.anim({opacity: 1}, 500)
          })
        }
        else {
          currentlyActive.anim({translateX: 10, opacity: 0}, 500).then(() => currentlyActive.hide())
          sib.css({translateX: -10, opacity: 0})
          sib.show()
          sib.focus()
          sib.anim({translateX: .1}, 700)
          delay(200).then(() => {
            sib.anim({opacity: 1}, 500)
          })
        }
        
        activeElement = sib as SetUpInput
        
      }
      else {
        if (back) {
          await activeElement.anim({translateX: -2})
          await activeElement.anim({translateX: .1})
        }
        else {
          manager.panelIndex.setUpConfirmationPanel.hightlightConfirmButton()
        }
      }
    }

    this.backElem.on("mousedown", (e) => {
      // Prevent blur of SetUpInput
      e.preventDefault()
      submitCb(true)
    })

    let inputs: ElementList<SetUpInput> = new ElementList(
      new SetUpInput("Please tell us what <highlight-text>subject</highlight-text> you are currently teaching", (s) => {
        manager.panelIndex.setUpConfirmationPanel.subject(s)
      }),
      new SetUpInput("Please tell us in which <highlight-text>faculty</highlight-text> you are teaching", (s) => {
        manager.panelIndex.setUpConfirmationPanel.faculty(s)
      }),
      new SetUpInput("Please tell us how many <highlight-text>hours</highlight-text> you are teaching", (s) => {
        manager.panelIndex.setUpConfirmationPanel.hours(s)
      }, undefined, "number")
    )

    inputs.ea((el) => {
      el.submitCallback = () => {
        submitCb()
      }
    })


    inputs.on("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault()
        submitCb(e.shiftKey)
      }
    })


    let activeElement = inputs.first
    inputs.first.show()
    inputs.first.focus()


    this.questionContainer.apd(...inputs)

  }

  private backButtonIsShown = false
  private async showBackButton() {
    if (this.backButtonIsShown) return
    this.backButtonIsShown = true
    await Promise.all([
      this.backElem.anim({translateX: 1}, {duration: 700}),
      delay(250).then(() => this.backElem.anim({opacity: 1}, {duration: 500})),
      this.headingElem.anim({translateX: 1}, {duration: 700})
    ])
    
  }
  private async hideBackButton() {
    if (!this.backButtonIsShown) return
    this.backButtonIsShown = false
    await Promise.all([
      this.backElem.anim({opacity: 0}, {duration: 300}),
      this.backElem.anim({translateX: -10}, {duration: 500}),
      this.headingElem.anim({translateX: -32}, {duration: 700})
    ])
  }

  stl() {
    return require("./setUpPanel.css").toString()
  }
  pug() {
    return require("./setUpPanel.pug").default
  }
}

//@ts-ignore
window.customElements.define('c-setup-panel', SetUpPanel);