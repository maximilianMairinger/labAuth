import Panel from "../panel"
import Edu from "../../edu/edu"
import { ElementList } from "extended-dom";
import delay from "delay"
import Easing from "waapi-easing"
import { Data, DataArray } from "front-db";


type Percent = number


export type Entry = {
  fullName: string,
  username: string
}


export default class EduPanel extends Panel {
  public preferedWidth: "big" | "small" | Percent
  public mainCard: Edu;
  private hoursContainer = this.q("hours-container")
  private otherCardsContainer = this.q("other-cards-container").first
  private scrollContainer = this.q("scroll-conatiner").first
  private arrow = this.q("#arrow")
  constructor(list: DataArray<Entry>) {
    super()

    this.mainCard = new Edu()
    this.mainCard.id = "mainCard"

    this.scrollContainer.insertBefore(this.mainCard, this.otherCardsContainer)


    let guide = new Data(0)
    let lastPos = 0;
    this.scrollContainer.on("scroll", (e) => {
      let pos = this.scrollContainer.scrollTop


      guide.val = pos

      if (lastPos === 0 && pos > 0) {
        //this.otherCardsContainer.anim({translateY: 1})
        this.arrow.anim({opacity: 0})
      }
      else if (lastPos > 0 && pos === 0) {
        //this.otherCardsContainer.anim({translateY: 125})
        this.arrow.anim({opacity: 1})
      }

      lastPos = pos
    })
    
    this.otherCardsContainer.anim([{translateY: 125, offset: 0}, {translateY: 0}], {start: 0, end: 300}, guide)

    list.forEach(async (e, i) => {

      let edu = new Edu()
      

      edu.css("opacity", 0)

      edu.username(e.current().username.val)
      edu.fullName(e.current().fullName.val)
      edu.luckyDay()
      edu.employeeType("Student")
      this.otherCardsContainer.insertBefore(edu, this.otherCardsContainer.childs()[i])

      await edu.anim({opacity: 1})
      
    }, async () => {
      this.otherCardsContainer.html("")
    })
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
      this.mainCard.anim({translateY: -21}, {duration: 700, easing: easing})
    ])
    
    await delay(3000)
    await Promise.all([
      this.mainCard.anim({translateY: 0}, {duration: 700, easing: easing}),
      elements.anim({translateY: 0}, {duration: 700, easing: easing}).then(() => elements.hide())
    ])

  }


  stl() {
    return require("./eduPanel.css").toString()
  }
  pug() {
    return require("./eduPanel.pug").default
  }
}

//@ts-ignore
window.customElements.define('c-edu-panel', EduPanel);