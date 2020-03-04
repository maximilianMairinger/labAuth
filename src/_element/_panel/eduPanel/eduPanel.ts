import Panel from "../panel"
import Edu from "../../edu/edu"


type Percent = number


export default class EduPanel extends Panel {
  public preferedWidth: "big" | "small" | Percent
  public card: Edu;
  constructor(expectedUser: "teacher" | "student" = "student") {
    super()

    this.card = new Edu(expectedUser)

    this.elementBody.apd(this.card)
    
  }

  stl() {
    return require("./eduPanel.css").toString()
  }
  pug() {
    return require("./eduPanel.pug").default
  }
}

window.customElements.define('c-edu-panel', EduPanel);