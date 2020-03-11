import Element from "../element"
import Panel from "../_panel/panel";
import EduPanel from "../_panel/eduPanel/eduPanel";
import InformPanel from "../_panel/informPanel/informPanel";
import LoginPanel from "../_panel/loginPanel/loginPanel";
import { Data, DataBase } from "front-db"
import SetUpConfirmationPanel from "../_panel/setUpConfirmationPanel/setUpConfirmationPanel";
import SetUpPanel from "../_panel/setUpPanel/setUpPanel";


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
    info: new InformPanel(this, "Inform", "Content"),
    login: new LoginPanel(this),
    setUpConfirmationPanel: new SetUpConfirmationPanel(this, () => {
      console.log("confirm")
    }),
    setUpPanel: new SetUpPanel(this, "Dole")
  }

  constructor() {
    super()

    
  }

  public setPanel(panel: keyof PanelIndex, side: "left" | "right") {
    if (side === "left") {
      this.left = this.panelIndex[panel]
      this.leftContainer.html("")
      this.leftContainer.apd(this.left);
    }
    if (side === "right") {
      this.right = this.panelIndex[panel]
      this.rightContainer.html("")
      this.rightContainer.apd(this.right)
    }

    if (this.left.preferedWidth === "big") {
      this.leftContainer.anim({width: "58.75%"}, 1000)
    }
    else if (this.left.preferedWidth === "small") {
      this.leftContainer.anim({width: "41.25%"}, 1000)
    }
    else if (typeof this.left.preferedWidth === "number") {
      this.leftContainer.anim({width: this.left.preferedWidth + "%"}, 1000)
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