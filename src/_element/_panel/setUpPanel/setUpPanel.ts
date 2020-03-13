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
  private inputs: ElementList<SetUpInput>
  
  constructor(manager: PanelManager, addresser: string) {
    super()

    this.headingElem.text("Hello " + addresser)
    
    
    let currentAnimation: Symbol
    let submitCb = async (back = false, submit = false) => {
      let sib = back ? activeElement.previousSibling as HTMLElement : activeElement.nextSibling as HTMLElement
      
      
      
      if (sib) {
        currentAnimation = Symbol("anim")
        let localAniamtion = currentAnimation
        
        let currentlyActive = activeElement


        if (sib === this.inputs.first) this.hideBackButton()
        else this.showBackButton()


        if (back) {
          currentlyActive.anim({translateX: -10, opacity: 0}, 500).then(() => currentlyActive.hide())
          sib.css({translateX: 10, opacity: 0})
          sib.show()
          sib.focus()

          sib.anim({translateX: .1}, 700)
          
          delay(200).then(() => {
            if (currentAnimation === localAniamtion) {
              sib.show()
              sib.focus()
              sib.anim({opacity: 1}, 500)
            }
              
          })
        }
        else {
          
          currentlyActive.anim({translateX: 10, opacity: 0}, 500).then(() => currentlyActive.hide())
          sib.css({translateX: -10, opacity: 0})
          
          sib.show()
          sib.focus()
          sib.anim({translateX: .1}, 700)

          
          delay(200).then(() => {
            if (currentAnimation === localAniamtion) {
              sib.show()
              sib.focus()
              sib.anim({opacity: 1}, 500)
            }
              
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
          if (submit) {
            manager.panelIndex.setUpConfirmationPanel.confirm()
          }
          else {
            manager.panelIndex.setUpConfirmationPanel.hightlightConfirmButton()
          }
        }
      }
    }

    this.backElem.on("mousedown", (e) => {
      // Prevent blur of SetUpInput
      e.preventDefault()
      submitCb(true)
    })

    this.inputs = new ElementList(
      new SetUpInput("Please tell us what <highlight-text>subject</highlight-text> you are currently teaching.", "uppercase", (s) => {
        manager.panelIndex.setUpConfirmationPanel.subject(s)
      }),
      new SetUpInput("Please tell us which <highlight-text>classroom</highlight-text> you are teaching in.", "uppercase", (s) => {
        manager.panelIndex.setUpConfirmationPanel.faculty(s)
      }),
      new SetUpInput("Please tell us how many <highlight-text>hours</highlight-text> you are teaching for.", "number", (s) => {
        manager.panelIndex.setUpConfirmationPanel.hours(s)
      }, undefined, i => i !== 0 && i <= 24)
    )

    this.inputs.ea((el) => {
      el.submitCallback = () => {
        submitCb(false, true)
      }
    })


    this.inputs.on("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault()
        submitCb(e.shiftKey)
      }
    })


    let activeElement = this.inputs.first
    this.inputs.first.show()
    this.inputs.first.focus()


    this.questionContainer.apd(...this.inputs)

  }
  private currentBackButtonAniamtion: Symbol

  private backButtonIsShown = false
  private async showBackButton() {
    if (this.backButtonIsShown) return
    let localAnimation = Symbol("anim")
    this.currentBackButtonAniamtion = localAnimation
    this.backButtonIsShown = true
    await Promise.all([
      this.backElem.anim({translateX: 1}, {duration: 700}),
      delay(250).then(() => {
        if (this.currentBackButtonAniamtion === localAnimation) return this.backElem.anim({opacity: 1}, {duration: 500})
      }),
      this.headingElem.anim({translateX: 1}, {duration: 700})
    ])
    
  }
  private async hideBackButton() {
    if (!this.backButtonIsShown) return
    let localAnimation = Symbol("anim")
    this.currentBackButtonAniamtion = localAnimation
    this.backButtonIsShown = false
    await Promise.all([
      this.backElem.anim({opacity: 0}, {duration: 300}),
      this.backElem.anim({translateX: -10}, {duration: 500}),
      this.headingElem.anim({translateX: -32}, {duration: 700})
    ])
  }
  activationCallback() {
    super.activationCallback()
    
    this.inputs.first.focus()
  }

  stl() {
    return super.stl() + require("./setUpPanel.css").toString()
  }
  pug() {
    return require("./setUpPanel.pug").default
  }
}

//@ts-ignore
window.customElements.define('c-setup-panel', SetUpPanel);