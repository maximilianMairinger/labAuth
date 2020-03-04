import Panel from "../panel"
import Edu from "../../edu/edu"
import { ElementList } from "extended-dom";
import delay from "delay"
import Easing from "waapi-easing"


type Percent = number


export default class EduPanel extends Panel {
  public preferedWidth: "big" | "small" | Percent
  public card: Edu;
  private hoursContainer = this.q("hours-container")
  constructor(expectedUser: "teacher" | "student" = "student") {
    super()

    this.card = new Edu(expectedUser)

    this.elementBody.apd(this.card)
    
  }

  async showHours(max: number, toBeGone: number = 0) {
    this.hoursContainer.html("")
    let active = max - toBeGone
    let elements: ElementList = new ElementList()
    for (let i = 0; i < active; i++) {
      this.hoursContainer.apd(...elements.add(ce("hour-box").addClass("active")))
    }

    for (let i = active; i < max; i++) {
      this.hoursContainer.apd(...elements.add(ce("hour-box").addClass("toBeGone")))
    }

    let easing = new Easing(0.485, 0.010, 0.155, 1);

    await Promise.all([
      elements.anim({translateY: 21}, {duration: 700, easing: easing}),
      elements.anim({opacity: 1}, {duration: 700, easing: "linear"}, 100),
      this.card.anim({translateY: -21}, {duration: 700, easing: easing})
    ])
    
    await delay(3000)
    await Promise.all([
      this.card.anim({translateY: 0}, {duration: 700, easing: easing}),
      elements.anim({translateY: 0}, {duration: 700, easing: easing})
    ])

  }

  stl() {
    return require("./eduPanel.css").toString()
  }
  pug() {
    return require("./eduPanel.pug").default
  }
}

window.customElements.define('c-edu-panel', EduPanel);