import Panel from "../panel"
import Edu from "../../edu/edu"
import { ElementList } from "extended-dom";
import delay from "delay"
import Easing from "waapi-easing"
import { Data, DataArray } from "front-db";
import Button from "./../../_button/_rippleButton/blockButton/blockButton"
import animatedScrollTo from "animated-scroll-to"
import PanelManager from "../../panelManager/panelManager";
import ajax from "../../../lib/ajax";


type Percent = number

let easing = new Easing(0.485, 0.010, 0.155, 1);


export type Entry = {
  fullName: string,
  username: string,
  registered: boolean[]
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

  constructor(private manager: PanelManager, private list: DataArray<Entry>) {
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
        this.arrow.anim({opacity: 0}).then(() => this.arrow.hide())
        if (this.currentlyShowingConfirmOptions) this.buttons.anim({opacity: 0})
      }
      else if (lastPos > 0 && pos === 0) {
        
        if (this.expectedCard !== "teacher") this.arrow.show().anim({opacity: 1})
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
  public async expectStudent(temporary: boolean = false) {
    
    if (!temporary) {
      this.showScrollDown()
      this.enableTable()
    }
    else {
      this.hideScrollDown()
      this.disableTable()
    }
    
    if (this.expectedCard === "student") return
    this.mainCard.employeeType("Student")
    this.expectedCard = "student"
    await this.mainCard.expectStudent()
  }
  public async expectTeacher() {
    this.expectedCard = "teacher"
    
    if (this.active) {
      await animatedScrollTo(0, {
        elementToScroll: this.cardsContainer,
        speed: 2000,
        cancelOnUserAction: false
      })
      await delay(100)
    }
    
    this.hideScrollDown()
    this.disableTable()
    this.mainCard.employeeType("Teacher")
    await this.mainCard.expectTeacher()
  }

  private async showScrollDown() {
    this.arrow.show()
    this.cardsContainer.css("overflowY", "auto")
    await this.arrow.anim({opacity: 1}, 500)
  }
  private async hideScrollDown() {
    this.cardsContainer.css("overflowY", "hidden")
    await this.arrow.anim({opacity: 0}, 500)
    this.arrow.hide()
  }

  private async enableTable() {
    this.elementBody.css("overflowX", "auto")
  }
  private async disableTable() {
    this.elementBody.css("overflowX", "hidden")
  }

  private currentlyShowingConfirmOptions = false
  private currButtonPromise: Promise<boolean>
  private currButtonCb: (e: Event) => void
  showConfimOptions() {
    if (this.currButtonPromise) return this.currButtonPromise
    this.currentlyShowingConfirmOptions = true

    let activationProm = new Promise<boolean>((res) => {
      this.currButtonCb = (e) => {
        res(e.target === this.confButton)
        this.hideConfimOptions()
      }

      this.buttons.Inner("addActivationCallback", [this.currButtonCb])
    });

    let animProm = (async () => {
      await animatedScrollTo(0, {
        elementToScroll: this.cardsContainer,
        speed: 2000,
        cancelOnUserAction: false
      })
  
      await this.buttons.show().anim({opacity: 1})
    })()

    this.currButtonPromise = new Promise((res) => {
      Promise.all([animProm, activationProm]).then(() => {
        activationProm.then((v) => {
          res(v)
        })

        
        
      })
    })

    return this.currButtonPromise

  }
  hideConfimOptions() {
    this.currentlyShowingConfirmOptions = false
    this.buttons.Inner("removeActivationCallback", [this.currButtonCb])
    this.buttons.anim({opacity: 0}).then(() => this.buttons.hide())
  }

  private showHrsCancled = false
  private showingHours = false
  async showHours(max: number = this._maxHoursCount, toBeGone: number = 0) {
    
    if (this.cardsContainer.scrollTop !== 0) {
      await animatedScrollTo(0, {
        elementToScroll: this.cardsContainer,
        speed: 2000,
        cancelOnUserAction: false
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
    
    await delay(2500)
    if (this.showHrsCancled) return this.showHrsCancled = false

    let currMain = this.mainCard

    let proms = []

    proms.add(elements.anim({translateY: .1}, {duration: 500, easing}).then(() => {
      elements.hide()
      elements.remove()
    }))
    proms.add(this.mainCard.anim([
      {translateY: 12, opacity: 1, offset: .8},
      {translateY: 21, opacity: 0}
    ], {duration: 1100, easing: new Easing(0.34, 0.01, 0.03, 0.97)}))

    this.mainCard = new Edu(this.expectedCard)
    this.mainCard.css({opacity: 0, translateY: 158, position: "absolute"})
    
    this.cardsContainer.prepend(this.mainCard)

    proms.add(delay(850).then(() => {
      return this.mainCard.anim({opacity: 1, translateY: 168}, {easing, duration: 1000}).then(() => {
        this.mainCard.css({
          translateY: .1,
          position: "relative"
        })
        this.mainCard.id = "mainCard"
        currMain.remove()
      })
    }
      
    ))

    await Promise.all(proms)

    this.showingHours = false
    this.showHrsCancled = false
  }

  private alreadyCanc = false
  async cancelShowHours() {
    if (this.alreadyCanc || !this.showingHours) return
    this.alreadyCanc = true

    this.showHrsCancled = true

    let elements = this.hoursContainer.childs()

    this.mainCard.username("")
    this.mainCard.fullName("Unknown")
    this.mainCard.clearLuckyDay()
    this.mainCard.updatePasscode(0)

    await Promise.all([
      this.mainCard.anim({translateY: .1}, {duration: 2000, easing}),
      elements.anim({opacity: 0}, {duration: 100, easing}).then(() => elements.hide())
    ])

    this.showingHours = false
    this.alreadyCanc = false
  }

  private activeTeacherSession = false
  async cardReadCallback(cardId: string) {
    await animatedScrollTo(0, {
      elementToScroll: this.cardsContainer,
      speed: 2000,
      cancelOnUserAction: false
    })
    this.hideScrollDown()
    this.mainCard.authentication()
    



    let req = ajax.post("cardAuth", {
      cardId
    })
    
    await Promise.all([req, delay(1000 + (Math.random() * 1000))])

    let res = await req

    this.mainCard.doneAuthentication()

    let expectedUser = this.expectedCard
    if (res.entry) {
      if (res.data.employeetype === "lehrer") {
        // got user teacher
        
        this.mainCard.username(res.data.username)
        this.mainCard.fullName(res.data.fullName)
        this.mainCard.luckyDay()
        this.mainCard.updatePasscode()
        await this.expectTeacher()

        if (expectedUser === "teacher") {
          // expected and got teacher
          if (!this.activeTeacherSession) {
            // Teacher start session
            this.activeTeacherSession = true
            localStorage.sessKey = res.data.sessKey

            await this.loadingTeacherAnimation()

            this.manager.setPanel("setUpPanel", "left")
            this.manager.setPanel("setUpConfirmationPanel", "right")

            delay(250).then(() => {
              this.clearMainCard()
            })

          }
          else {
            // double login teacher
            await this.logoutAction()
          }
        }
        else {
          // expected student but got teacher
          await this.logoutAction()
        }
      }
      else {
        this.mainCard.username(res.data.username)
        this.mainCard.fullName(res.data.fullName)
        this.mainCard.luckyDay()
        this.mainCard.updatePasscode()
        
        

        if (expectedUser === "student") {
          // got and expected student 
          
      
          // TODO: Show hours needs to take entries as second param. 
          this.list.add({username: res.data.username, fullName: res.data.fullName, registered: res.data.registered})
          delay(600).then(() => {
            this.expectStudent()
          })
          await this.showHours()
            
        }
        else {
          // expected teacher but got student
          
          


          if (!this.activeTeacherSession) {
            // Teacher start session ( this should never happen since the must be a active Teacher session for expectedCard to be student )
            console.warn("Unexpected flow")
          }
          else {
            // expected teacher but got student
            await this.expectStudent(true)
            
            
            await this.mainCard.anim({
              translateX: [6, -6, 5, -5, 4, -4, 3, -3, 2, -2, 1, -1, 0]
            }, {duration: 1400, easing})
  
            this.mainCard.username("")
            this.mainCard.fullName("Unknown")
            this.mainCard.clearLuckyDay()
            this.mainCard.updatePasscode(0)
            await this.expectTeacher()
            
          }
        }
      }
    }
    else {
      this.manager.setPanel("login", "left")
      this.mainCard.fullName("Unknown")
      
    }

    if (this.expectedCard === "student") this.showScrollDown()
  }

  private async logoutAction() {
    this.manager.panelIndex.info.updateContents("Logout", "You are about to log out of, hence terminate this session. Are you sure?")
    let confirm = await this.showConfimOptions()
    if (confirm) {
      ajax.post("destroySession")
      delete localStorage.sessKey
      this.activeTeacherSession = false
      this.clearMainCard()
      this.manager.panelIndex.info.updateContents("LabAuth", "A teacher may log in with his edu.card to start the session.")
    }
  }

  private clearMainCard(expected: "student" | "teacher" = this.expectedCard) {
    this.mainCard.username("")
    this.mainCard.updatePasscode(0)
    this.mainCard.clearLuckyDay()
    this.mainCard.employeeType(expected)
    this.mainCard.fullName("Unknown")
  }

  private _maxHoursCount: number
  maxHoursCount(a: number) {
    this._maxHoursCount = a
  }

  private loadingBar = this.q("loading-bar")
  private loadingProgress = this.loadingBar.childs("loading-progress")
  private async loadingTeacherAnimation() {
    this.loadingBar.css("opacity", 1)
    let prom = Promise.all([
      Promise.all([
        this.loadingBar.anim({translateY: 85}, {duration: 900, easing}),
        this.loadingBar.anim({opacity: 1}, {duration: 900, easing: "linear"}, 100),
        this.mainCard.anim({translateY: -21}, {duration: 900, easing})
      ]),
      delay(550).then(() => Promise.all([
        this.loadingProgress.anim([
          {width: "30%", offset: .3},
          {width: "40%", offset: .555},
          {width: "74%", offset: .8},
          {width: "100%"}
        ], {duration: 1700}),
        delay(50)
      ]))
    ])
    prom.then(() => {
      this.loadingBar.anim({translateY: 85}, {duration: 900, easing}).then(() => {
        this.loadingBar.css("opacity", 0)
        this.loadingProgress.css("width", "0%")
      })
      this.mainCard.anim({translateY: 0}, {duration: 900, easing})
    })


    await prom
    
  }

  stl() {
    return super.stl() + require("./eduPanel.css").toString()
  }
  pug() {
    return require("./eduPanel.pug").default
  }
}

//@ts-ignore
window.customElements.define('c-edu-panel', EduPanel);