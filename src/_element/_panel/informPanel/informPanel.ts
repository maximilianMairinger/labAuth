import Panel from "../panel"
import PanelManager from "../../panelManager/panelManager"
import delay from "delay"



export default class InformPanel extends Panel {
  public preferedWidth: "small" = "small"

  
  private headingElem = this.q("text-heading").first
  private contentElem = this.q("text-paragraph").first
  constructor(manager: PanelManager, heading: string, content: string) {
    super()

    this.updateContents(heading, content)
  }
  async updateContents(heading: string, content: string) {
    let proms = []

    if (heading !== this.headingElem.html()) {
      proms.add(this.forceHeading(heading))
      if (content !== this.contentElem.html()) proms.add(delay(30).then(() => this.forceContent(content)))
    }
    else {
      if (content !== this.contentElem.html()) proms.add(this.forceContent(content))
    }
    
    
    await Promise.all(proms)
  }
  async heading(to: string) {
    if (to === this.headingElem.html()) return
    await this.forceHeading(to)
  }
  async content(to: string) {
    if (to === this.contentElem.html()) return
    await this.forceContent(to)
  }
  async forceHeading(to: string) {
    await this.headingElem.anim({opacity: 0, translateX: 3})
    this.headingElem.css({translateX: -3})
    this.headingElem.html(to)
    await this.headingElem.anim({opacity: 1, translateX: 0.1})
  }
  async forceContent(to: string) {
    await this.contentElem.anim({opacity: 0, translateX: 3})
    this.contentElem.css({translateX: -3})
    this.contentElem.html(to)
    await this.contentElem.anim({opacity: 1, translateX: 0.1})
  }


  stl() {
    return super.stl() + require("./informPanel.css").toString()
  }
  pug() {
    return require("./informPanel.pug").default
  }
}

//@ts-ignore
window.customElements.define('c-inform-panel', InformPanel);