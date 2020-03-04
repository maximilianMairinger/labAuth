import Element from "../element"
import Panel from "../_panel/panel";


type Percent = number

type PanelCombo = {left: Panel, right: Panel} | {left: Panel} | {right: Panel}

export default class PanelManager extends Element {
  private leftContainer = this.q("left-container")
  private rightContainer = this.q("right-container")

  private left: Panel
  private right: Panel
  constructor() {
    super()

    
    
  }

  public setPanel(panel: PanelCombo) {
    if ("left" in panel) {
      this.left = panel.left
      this.leftContainer.html("")
      this.leftContainer.apd(panel.left);
    }
    if ("right" in panel) {
      this.right = panel.right
      this.rightContainer.html("")
      this.rightContainer.apd(panel.right)
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