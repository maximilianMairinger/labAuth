import Panel from "../panel"
import Edu from "../../edu/edu"
import { ElementList } from "extended-dom";
import delay from "delay"
import Easing from "waapi-easing"
import { Data, DataArray } from "front-db";
import Button from "./../../_button/_rippleButton/blockButton/blockButton"
import animatedScrollTo from "animated-scroll-to"
import PanelManager from "../../panelManager/panelManager";


type Percent = number

let easing = new Easing(0.485, 0.010, 0.155, 1);


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

  constructor(manager: PanelManager, list: DataArray<Entry>) {
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


      this.cancelShowHours()

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



    list.forEach((e, i) => {

      let edu = new Edu()
      

      edu.css("opacity", 0)

      let currentData = e.current()
      e.get("username", (username) => {
        edu.username(username)
      })
      e.get("fullName", (fullName) => {
        edu.fullName(fullName)
      })

      edu.luckyDay()
      edu.employeeType("Student")
      this.otherCardsContainer.insertBefore(edu, this.otherCardsContainer.childs()[i])

      edu.anim({opacity: 1})




      
      this.tableRoot.apd(ce("table-col").text(currentData.username.val))
      let entryCol = ce("table-col")
      this.tableRoot.apd(entryCol)

      e.ref("registered").asArray.forEach((reg) => {
        let entryBox = ce("hour-box")
        reg.get("", (e) => {
          if (e) {
            entryBox.addClass("active")
          }
          else {
            entryBox.removeClass("active")
          }
        })
        entryCol.apd(entryBox)
      }, () => {
        entryCol.html("")
      }, () => {
        entryCol.childs().css("opacity", 1)
      })
      
      
      
    }, async () => {
      this.otherCardsContainer.html("")
      this.tableRoot.html("")
    })



    
    
  }

  private expectedCard: "student" | "teacher"
  public expectedStudent() {
    this.expectedCard = "student"
    this.mainCard.expectStudent()
    this.showScrollDown()
    this.enableTable()
  }
  public expectedTeacher() {
    this.expectedCard = "teacher"
    this.mainCard.expectTeacher()
    this.hideConfimOptions()
    this.hideScrollDown()
    this.disableTable()
  }

  private async showScrollDown() {
    this.arrow.show()
    this.cardsContainer.css("overflowY", "auto")
    await this.arrow.anim({opacity: 1})
  }
  private async hideScrollDown() {
    this.cardsContainer.css("overflowY", "hidden")
    await this.arrow.anim({opacity: 0})
    this.arrow.hide()
  }

  private async enableTable() {
    this.elementBody.css("overflowX", "auto")
  }
  private async disableTable() {
    this.elementBody.css("overflowX", "hidden")
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

  private showHrsCancled = false
  private showingHours = false
  async showHours(max: number, toBeGone: number = 0) {
    
    if (this.cardsContainer.scrollTop !== 0) {
      await animatedScrollTo(0, {
        elementToScroll: this.cardsContainer,
        speed: 2000,
        cancelOnUserAction: false,
      })
      await delay(100)
    }


    
    this.showingHours = true
    let active = max - toBeGone
    let elements: ElementList = new ElementList()
    for (let i = 0; i < active; i++) {
      this.hoursContainer.apd(...elements.add(ce("hour-box").addClass("active")))
    }

    for (let i = active; i < max; i++) {
      this.hoursContainer.apd(...elements.add(ce("hour-box").addClass("toBeGone")))
    }

    await Promise.all([
      elements.anim({translateY: 21}, {duration: 700, easing}),
      elements.anim({opacity: 1}, {duration: 700, easing: "linear"}, 100),
      this.mainCard.anim({translateY: -21}, {duration: 700, easing})
    ])
    if (this.showHrsCancled) return this.showHrsCancled = false
    
    await delay(3000)
    if (this.showHrsCancled) return this.showHrsCancled = false
    await Promise.all([
      this.mainCard.anim({translateY: 0}, {duration: 700, easing}),
      elements.anim({translateY: 0}, {duration: 700, easing}).then(() => elements.remove())
    ])
    this.showingHours = false
    this.showHrsCancled = false
  }

  private alreadyCanc = false
  async cancelShowHours() {
    if (this.alreadyCanc || !this.showingHours) return
    this.alreadyCanc = true

    this.showHrsCancled = true

    let elements = this.hoursContainer.childs()

    await Promise.all([
      this.mainCard.anim({translateY: 0}, {duration: 2000, easing}),
      elements.anim({opacity: 0}, {duration: 150, easing}).then(() => elements.hide())
    ])

    this.showingHours = false
    this.alreadyCanc = false
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