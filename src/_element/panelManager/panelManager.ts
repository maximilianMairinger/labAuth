import Element from "../element"
import Panel from "../_panel/panel";
import EduPanel from "../_panel/eduPanel/eduPanel";
import InformPanel from "../_panel/informPanel/informPanel";
import LoginPanel from "../_panel/loginPanel/loginPanel";
import { Data, DataBase } from "front-db"
import SetUpConfirmationPanel from "../_panel/setUpConfirmationPanel/setUpConfirmationPanel";
import SetUpPanel from "../_panel/setUpPanel/setUpPanel";
import delay from "delay";
import * as cardReader from "../../lib/cardReader"


type Percent = number

type PanelCombo = {left: Panel, right: Panel} | {left: Panel} | {right: Panel}


//@ts-ignore
let entries: DataArray<Entry> = new DataBase(new Data([])).asArray

// ("gone" | "toBeGone" | "active")

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

  public panelIndex: PanelIndex = {
    edu: new EduPanel(this, entries),
    info: new InformPanel(this, "LabAuth", "A teacher may log in with his edu.card to start the session."),
    login: new LoginPanel(this),
    setUpConfirmationPanel: new SetUpConfirmationPanel(this),
    setUpPanel: new SetUpPanel(this, "there")
  }

  constructor() {
    super()

    
  }

  public setPanel(panel: keyof PanelIndex, side: "left" | "right", prevCardReaderEnable: boolean = false) {
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
          log(this.left.css("display"))
          this.left.anim([{opacity: 0, translateX: -5, offset: 0}, {opacity: 1, translateX: .1}], 300).then(() => {
            this.left.activate()
          })
        }, 10)
        
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
          this.right.anim([{opacity: 0, translateX: -5, offset: 0}, {opacity: 1, translateX: .1}], 300).then(() => {
            this.right.activate()
          })
        }, 10)
      }

      if (!prevCardReaderEnable && this.right && this.left) {
        if ((this.right.wantsCardReader || this.left.wantsCardReader) && !this.right.preventFocusInterference && !this.left.preventFocusInterference) cardReader.enable()
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

window.customElements.define('c-panel-manager', PanelManager);