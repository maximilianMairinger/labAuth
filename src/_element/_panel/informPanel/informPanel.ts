import Panel from "../panel"



export default class InformPanel extends Panel {
  public preferedWidth: "small" = "small"

  
  private headingElem = this.q("text-heading")
  private contentElem = this.q("text-paragraph")
  constructor(heading: string, content: string) {
    super()

    this.heading(heading)
    this.content(content)


    this.heading("New Heading")
    
  }
  heading(to: string) {
    this.headingElem.text(to)
  }
  content(to: string) {
    this.contentElem.text(to)
  }

  stl() {
    return require("./informPanel.css").toString()
  }
  pug() {
    return require("./informPanel.pug").default
  }
}

//@ts-ignore
window.customElements.define('c-inform-panel', InformPanel);