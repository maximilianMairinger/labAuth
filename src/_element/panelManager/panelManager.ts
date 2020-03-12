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

entries.add({username: "mmairinger", fullName: "Maximilian Mairinger", registered: [true, true, true, true]})
entries.add({username: "rschlager", fullName: "Raphael Schlager", registered: [true, true, true, true]})
entries.add({username: "dzimmermann", fullName: "Daniel Zimmermann", registered: [true, true, true, true]})

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

  public async setPanel(panel: keyof PanelIndex, side: "left" | "right") {
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
      if (lastLeft) {
        lastLeft.anim({opacity: 0, translateX: 5}, 300).then(() => lastLeft.remove())
        await delay(150)
      }
      this.leftContainer.apd(this.left);
      this.left.anim({opacity: 1, translateX: .1})
      this.left.activate()
      if (lastLeft) lastLeft.deactivate()
    }
    if (side === "right") {
      let lastRight = this.right
      this.right = this.panelIndex[panel]
      if (lastRight) {
        lastRight.anim({opacity: 0, translateX: 5}, 300).then(() => lastRight.remove())
        await delay(150)
      }
      this.rightContainer.apd(this.right)
      this.right.anim({opacity: 1, translateX: .1})
      this.right.activate()
      if (lastRight) lastRight.deactivate()
    }

    if (this.right && this.left) {
      if (this.right.wantsCardReader || this.left.wantsCardReader) cardReader.enable()
      else cardReader.disable()
    }
    

    

  }

  stl() {
    return require("./panelManager.css").toString()
  }
  pug() {
    return require("./panelManager.pug").default
  }
}

window.customElements.define('c-panel-manager', PanelManager);