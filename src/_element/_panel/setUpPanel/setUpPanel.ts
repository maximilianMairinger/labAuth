import Panel from "../panel"



export default class SetUpPanel extends Panel {
  public preferedWidth: "big" = "big"

  
  private headingElem = this.q("text-heading")
  private contentElem = this.q("tex t-paragraph")
  constructor(heading: string, content: string) {
    super()

    this.heading(heading)
    this.content(content)
    
  }
  heading(to: string) {
    this.headingElem.text(to)
  }
  content(to: string) {
    this.contentElem.text(to)
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