import Element from "../element"
import Panel from "../_panel/panel";
import EduPanel, { Entry } from "../_panel/eduPanel/eduPanel";
import InformPanel from "../_panel/informPanel/informPanel";
import LoginPanel from "../_panel/loginPanel/loginPanel";
import { Data, DataBase, DataArray } from "front-db"
import SetUpConfirmationPanel from "../_panel/setUpConfirmationPanel/setUpConfirmationPanel";
import SetUpPanel from "../_panel/setUpPanel/setUpPanel";
import delay from "delay";
import * as cardReader from "../../lib/cardReader"


type PanelIndex = {
  edu: EduPanel,
  info: InformPanel,
  login: LoginPanel,
  setUpConfirmationPanel: SetUpConfirmationPanel,
  setUpPanel: SetUpPanel
}


export default class PanelManager extends Element {
  private leftContainer = this.q("left-container")
  private rightContainer = this.q("right-container")

  private left: Panel
  private right: Panel

  public panelIndex: PanelIndex;

  constructor(entries: DataArray<Entry>, eduExpectedChangeCb?: (edu: "student" | "teacher") => void) {
    super()

    this.panelIndex = {
      edu: new EduPanel(this, entries, eduExpectedChangeCb),
      info: new InformPanel(this, "LabAuth", "A teacher may log in with his edu.card to start the session."),
      login: new LoginPanel(this),
      setUpConfirmationPanel: new SetUpConfirmationPanel(this),
      setUpPanel: new SetUpPanel(this, "there")
    }
  }

  public setPanel(panel: keyof PanelIndex, side: "left" | "right") {
    (async () => {
      let newPanel = this.panelIndex[panel]

      if (side === "left") {
        if (newPanel.preferedWidth === "big") {
          this.leftContainer.anim({width: "58.75%"}, 700)
        }
        else if (newPanel.preferedWidth === "small") {
          this.leftContainer.anim({width: "41.25%"}, 700)
        }
        else if (typeof newPanel.preferedWidth === "number") {
          this.leftContainer.anim({width: newPanel.preferedWidth + "%"}, 700)
        }
      }
      


      if (side === "left") {
        let lastLeft = this.left
        this.left = this.panelIndex[panel]
        this.leftContainer.apd(this.left);
        if (lastLeft) {
          lastLeft.anim({opacity: 0, translateX: 5}, 300).then(() => {
            if (lastLeft) lastLeft.deactivate()
            lastLeft.remove()
          })
          await delay(150)
        }
        

        setTimeout(() => {
          this.left.anim([{opacity: 0, translateX: -5, offset: 0}, {opacity: 1, translateX: .1}], 400).then(() => {
            this.left.activate()
          })
        }, 0)
        
      }
      if (side === "right") {
        let lastRight = this.right
        this.right = this.panelIndex[panel]
        this.rightContainer.apd(this.right)
        if (lastRight) {
          lastRight.anim({opacity: 0, translateX: 5}, 300).then(() => {
            if (lastRight) lastRight.deactivate()
            lastRight.remove()
          })
          await delay(150)
        }
        
        setTimeout(() => {
          this.right.anim([{opacity: 0, translateX: -5, offset: 0}, {opacity: 1, translateX: .1}], 400).then(() => {
            this.right.activate()
          })
        }, 0)
      }

      if (this.right && this.left) {
        let notExplicitlyPrevented = !this.right.preventFocusInterference && !this.left.preventFocusInterference

        if ((this.right.wantsCardReader || this.left.wantsCardReader) && notExplicitlyPrevented) cardReader.enable()
        else cardReader.disable()
      }
    })();
    

    
    return delay(700)
  }

  stl() {
    return require("./panelManager.css").toString()
  }
  pug() {
    return require("./panelManager.pug").default
  }
}

//@ts-ignore
window.customElements.define('c-panel-manager', PanelManager);