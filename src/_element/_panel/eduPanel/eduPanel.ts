import Panel from "../panel"
import Edu from "../../edu/edu"
import { ElementList } from "extended-dom";
import delay from "delay"
import Easing from "waapi-easing"
import { Data, DataArray } from "front-db";
import Button from "./../../_button/_rippleButton/blockButton/blockButton"
import animatedScrollTo from "animated-scroll-to"


type Percent = number


export type Entry = {
  fullName: string,
  username: string
}


export default class EduPanel extends Panel {
  public preferedWidth: "big" | "small" | Percent
  public mainCard: Edu;
  private mainBody = this.q("main-conatiner")
  private hoursContainer = this.q("hours-container")
  private otherCardsContainer = this.q("other-cards-container").first
  private cardsContainer = this.q("scroll-conatiner.cards").first
  private tableContainer = this.q("scroll-conatiner.table").first
  private tableRoot = this.q("table-root").first
  private arrow = this.q("#arrow")

  private buttons: ElementList<Button>
  private cancButton: Button
  private confButton: Button

  constructor(list: DataArray<Entry>) {
    super()

    this.arrow.on("mousedown", async (e) => {
      await animatedScrollTo(350, {
        elementToScroll: this.cardsContainer,
        speed: 2000
      })
    })

    this.cancButton = new Button("Abort")
    this.cancButton.id = "canc"
    this.confButton = new Button("Confirm")
    this.confButton.id = "conf"
    this.buttons = new ElementList(this.cancButton, this.confButton)

    this.mainBody.apd(this.cancButton, this.confButton)

    this.mainCard = new Edu()
    this.mainCard.id = "mainCard"

    this.cardsContainer.insertBefore(this.mainCard, this.otherCardsContainer)


    let guide = new Data(0)
    let lastPos = 0;
    this.cardsContainer.on("scroll", (e) => {
      let pos = this.cardsContainer.scrollTop


      guide.val = pos

      if (lastPos === 0 && pos > 0) {
        //this.otherCardsContainer.anim({translateY: 1})
        this.arrow.anim({opacity: 0}).then(() => this.arrow.hide())
        if (this.currentlyShowingConfirmOptions) this.buttons.anim({opacity: 0})
      }
      else if (lastPos > 0 && pos === 0) {
        //this.otherCardsContainer.anim({translateY: 125})
        this.arrow.show().anim({opacity: 1})
        if (this.currentlyShowingConfirmOptions) this.buttons.anim({opacity: 1})
      }

      lastPos = pos
    })
    
    this.otherCardsContainer.anim([{translateY: 125, offset: 0}, {translateY: 0}], {start: 0, end: 300}, guide)

    list.forEach(async (e, i) => {

      let edu = new Edu()
      

      edu.css("opacity", 0)

      let currentData = e.current()

      edu.username(currentData.username.val)
      edu.fullName(currentData.fullName.val)
      edu.luckyDay()
      edu.employeeType("Student")
      this.otherCardsContainer.insertBefore(edu, this.otherCardsContainer.childs()[i])

      await edu.anim({opacity: 1})




      let row = ce("table-row")
      this.tableRoot.apd(row)

      row.apd(ce("table-col").html(currentData.username.val))
      .apd(ce("table-col").html(currentData..val))
      
    }, async () => {
      this.otherCardsContainer.html("")
      this.tableRoot.html("")
    })



    
    
  }

  private currButtonCb: Function;
  private currentlyShowingConfirmOptions: boolean = false
  async displayConfimOptions(cb: (confirm: boolean) => void) {
    this.currentlyShowingConfirmOptions = true
    this.currButtonCb = (e) => {
      cb(e.target === this.confButton)
    }

    this.buttons.Inner("addActivationCallback", [this.currButtonCb])

    await animatedScrollTo(0, {
      elementToScroll: this.cardsContainer,
      speed: 1000
    })

    this.buttons.show().anim({opacity: 1})

  }
  hideConfimOptions() {
    this.currentlyShowingConfirmOptions = false
    this.buttons.Inner("removeActivationCallback", [this.currButtonCb])
    this.buttons.anim({opacity: 0}).then(() => this.buttons.hide())
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