import Panel from "../panel"
import Edu from "../../edu/edu"
import { ElementList } from "extended-dom";
import delay from "delay"
import Easing from "waapi-easing"
import { Data, DataArray } from "front-db";
import Button from "../../_button/_rippleButton/blockButton/blockButton"
import animatedScrollTo from "animated-scroll-to"
import PanelManager from "../../panelManager/panelManager";
import ajax from "../../../lib/ajax";
import * as cardReader from "../../../lib/cardReader"
import SHA256 from "crypto-js/sha256"


type Percent = number

let easing = new Easing(0.485, 0.010, 0.155, 1);


export type Entry = {
  fullName: string,
  username: string,
  registered: ("gone" | "toBeGone" | "active")[]
}

function getCurrentHour() {
  let date = new Date()
  let h = date.getHours()
  let min = date.getMinutes()
  if (min > 30) h++
  return h
}


const knownLogins: {
  student: {
    [encryptedCardId: string]: Entry & {
      startOfLastUnit?: number
      sign?: "in" | "out"
    }
  },
  teacher: {
    [encryptedCardId: string]: {
      username: string,
      fullName: string
    }
  }
} = {
  student: {

  },
  teacher: {

  }
}

const teacherString = "teacher"
const studentString = "student"
const employeeTypeString = "employeeType"
setTimeout(async () => {
  let res = await ajax.get("cardIndex", true)

  for (let key in res.student) {
    if (!knownLogins.student[key]) {
      knownLogins.student[key] = res.student[key]
      knownLogins.student[key][employeeTypeString] = studentString
    }
  }
  for (let key in res.teacher) {
    if (!knownLogins.teacher[key]) {
      knownLogins.teacher[key] = res.teacher[key]
      knownLogins.teacher[key][employeeTypeString] = teacherString
    }
  }

}, 0)

export default class EduPanel extends Panel {
  public preferedWidth: "big" | "small" | Percent
  public mainCard: Edu;
  private mainBody = this.q("main-conatiner")
  private hoursContainer = this.q("hours-container")
  private otherCardsContainer = this.q("other-cards-container").first
  private cardsContainer = this.q("scroll-conatiner.cards").first
  private tableContainer = this.q("scroll-conatiner.table").first
  private tableRoot = this.q("table-root").first
  private arrow = this.q("#arrow").first

  private buttons: ElementList<Button>
  private cancButton: Button
  private confButton: Button

  constructor(private manager: PanelManager, private list: DataArray<Entry>, public eduExpectedChangeCb?: (edu: "student" | "teacher") => void) {
    super()


    window.addEventListener("offline", async () => {

      if (!this.currentlyShowingConfirmOptions) if (this.expectedCard === "student") this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. Your card will be synced when online.")
    })

    window.addEventListener("online", async () => {
      if (this.expectedCard === "student") this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. To sign out, register your card again.")
    })

    this.arrow.on("mousedown", async (e) => {
      if (this.arrow.css("opacity") === 1)
      await animatedScrollTo(350, {
        elementToScroll: this.cardsContainer,
        speed: 2000
      })
    })

    this.cancButton = new Button("Abort")
    this.cancButton.hotkey = "Escape"
    this.cancButton.id = "canc"
    this.confButton = new Button("Confirm")
    this.confButton.id = "conf"
    this.cancButton.disable()
    this.confButton.disable()
    
    this.buttons = new ElementList(this.cancButton, this.confButton)
    const t = this
    this.buttons.Inner("addActivationCallback", [async function() {
      t.cancButton.disable()
      t.confButton.disable()
      let proms: any = [delay(600)]

      let conf = this === t.confButton

      
      proms.add(t.buttonLoadingCbs.ea(async (cb) => {
        await cb(conf)
      }))
      await Promise.all(proms)
      t.buttonLoadingCbs.clear()
      
    }, async function () {
      if (t.currButtonCb) t.currButtonCb(this === t.confButton)
      delete t.currButtonCb
      await t.hideConfimOptions()
    }])

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
        if (list.length() !== 0) this.arrow.anim({opacity: 0}).then(() => this.arrow.hide())
        if (this.currentlyShowingConfirmOptions) this.hideConfimOptions()
      }
      else if (lastPos > 0 && pos === 0) {
        
        if (list.length() !== 0) if (this.expectedCard !== "teacher") this.arrow.show().anim({opacity: 1})
      }

      lastPos = pos
    })
    
    this.otherCardsContainer.anim([{translateY: 125, offset: 0}, {translateY: .1}], {start: 0, end: 300}, guide)



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
      edu.updatePasscode()
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



    const zoom = .77
    this.cardsContainer.on("resize", () => {
      this.mainCard.css("marginTop", ((this.cardsContainer.height() - (this.mainCard.height() * zoom)) / 2) / zoom) 
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
    if (this.eduExpectedChangeCb) this.eduExpectedChangeCb("student")
    this.mainCard.employeeType("Student")
    this.expectedCard = "student"
    await this.mainCard.expectStudent()
  }
  public async expectTeacher() {
    this.expectedCard = "teacher"

    if (this.eduExpectedChangeCb) this.eduExpectedChangeCb("teacher")
    
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
    if (this.list.length() !== 0) {
      this.arrow.show()
      this.cardsContainer.css("overflowY", "auto")
      await this.arrow.anim({opacity: 1}, 500)
    }
    
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
  private currButtonCb: (confirm: boolean) => void
  private buttonLoadingCbs: ((confirm: boolean) => void | Promise<void>)[] = []
  showConfimOptions(loadingCb?: ((confirm: boolean) => void | Promise<void>)) {
    this.buttonLoadingCbs.add(loadingCb)
    if (this.currButtonPromise) {
      return this.currButtonPromise
    }
    this.currentlyShowingConfirmOptions = true

    let animProm = (async () => {
      this.elementBody.css("overflowX", "hidden")
      //@ts-ignore
      this.elementBody.css("scrollSnapType", "none")
      await Promise.all([
        animatedScrollTo(0, {
          elementToScroll: this.cardsContainer,
          speed: 2000,
          cancelOnUserAction: false
        }),
        animatedScrollTo([0, 0], {
          elementToScroll: this.elementBody,
          speed: 1000,
          cancelOnUserAction: false
          
        }).then(() => {
          this.elementBody.css("overflowX", "hidden")
          //@ts-ignore
          this.elementBody.css("scrollSnapType", "x mandatory")
        })
      ])

      this.buttons.Inner("enable", [])
      await this.buttons.show().anim({opacity: 1})
    })()

    this.currButtonPromise = new Promise((res) => {
      animProm.then(() => {
        this.currButtonCb = (conf) => {
          this.elementBody.css("overflowX", "auto")
          res(conf)
        }
      })
    })

    return this.currButtonPromise

  }
  async hideConfimOptions() {
    this.currentlyShowingConfirmOptions = false
    if (this.currButtonCb) this.currButtonCb(false)
    this.buttonLoadingCbs.clear()
    delete this.currButtonPromise
    await this.buttons.anim({opacity: 0}).then(() => {this.buttons.hide(); this.buttons.Inner("disable", [])})

  }

  private showHrsCancled = false
  private showingHours = false
  async showHours(data: any, cardId: string) {
    this.showingHours = true

    if (this.cardsContainer.scrollTop !== 0) {
      await animatedScrollTo(0, {
        elementToScroll: this.cardsContainer,
        speed: 2000,
        cancelOnUserAction: false
      })
      await delay(100)
    }

    let elements: ElementList = new ElementList()


    for (let i = 0; i < data.registered.length; i++) {
      let hour = ce("hour-box")
      if (data.registered[i] === "active") hour.addClass("active")
      else if (data.registered[i] === "gone") {}
      else if (data.registered[i] === "toBeGone") hour.addClass("toBeGone")
      elements.add(hour)
      this.hoursContainer.apd(hour)
    }

    if (data.sign === "in") {
      this.list.add({username: data.username, fullName: data.fullName, registered: data.registered})
      await Promise.all([
        elements.anim({translateY: 21}, {duration: 700, easing}),
        elements.anim({opacity: 1}, {duration: 700, easing: "linear"}, 100),
        this.mainCard.anim({translateY: -21}, {duration: 700, easing})
      ])

      if (this.showHrsCancled) return this.showHrsCancled = false

      delay(600).then(() => {
        if (this.showHrsCancled) return this.showHrsCancled = false
        if (this.cardsContainer.scrollTop === 0) this.expectStudent()
      })
      await delay(2500)
      if (this.showHrsCancled) return this.showHrsCancled = false
    }
    else if (data.sign === "out") {
      cardReader.disable()
      
      let confirmProm: any
      try {
        let logoutAfter = data.registered.length
        data.registered.ea((e, i) => {
          if (e === "toBeGone") return logoutAfter = i
        })

        if (logoutAfter === data.registered.length) {
          this.manager.panelIndex.info.updateContents("Note", "You will be signed out <text-hightlight>automatically</text-hightlight> after a unit ends.")
          await Promise.all([
            elements.anim({translateY: 21}, {duration: 700, easing}),
            elements.anim({opacity: 1}, {duration: 700, easing: "linear"}, 100),
            this.mainCard.anim({translateY: -21}, {duration: 700, easing})
          ])
          cardReader.enable()
          if (this.showHrsCancled) return this.showHrsCancled = false
          await delay(3000)
          if (this.showHrsCancled) return this.showHrsCancled = false

          
          await Promise.all([
            this.mainCard.anim({translateY: .1}, {duration: 800, easing}),
            elements.anim({translateY: .1}, {duration: 800, easing}).then(() => {
              elements.remove()
            })
          ])
          if (this.showHrsCancled) return this.showHrsCancled = false

          if (navigator.onLine) this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. To sign out, register your card again.")
          else this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. Your card will be synced when online.")
          
    
          return
        }
        else {
          let lastPredetermant = 0
          data.registered.ea((e, i) => {
            if (e === "active" || e === "gone") lastPredetermant = i + 1
          })

          let totalActiveSessions = logoutAfter - lastPredetermant

          if (totalActiveSessions === 0) {
            this.manager.panelIndex.info.updateContents("Logout", "You are about to sign out of this unit <text-hightlight>right away</text-hightlight>. Are you sure?")
          }
          else if (logoutAfter === 1) {
            this.manager.panelIndex.info.updateContents("Logout", "You are about to sign out after the <text-hightlight>first hour</text-hightlight>. Are you sure?")
          }
          else {
            this.manager.panelIndex.info.updateContents("Logout", "You are about to sign out after the first <text-hightlight>" + logoutAfter + " hours</text-hightlight>. Are you sure?")
          }
        }
        
        

        confirmProm = this.showConfimOptions((confirm) => {
          return new Promise(async (resButton) => {
            if (confirm) {
              let req = ajax.post("studentSignOut", {cardId}, undefined, true)
              req.fail(() => {
                let i = -1
                this.list.list((e, ind) => {
                  if (e.current().username.val === data.username) i = ind
                })
                this.list.removeI(i)
                cardReader.enable()
                resButton()
              })
  
              await req
              
              let i = -1
              this.list.list((e, ind) => {
                if (e.current().username.val === data.username) i = ind
              })
              this.list.removeI(i)
              resButton()
            }
            else resButton()
          })
          
        })
  
        await Promise.all([
          elements.anim({translateY: 21}, {duration: 700, easing}),
          elements.anim({opacity: 1}, {duration: 700, easing: "linear"}, 100),
          this.mainCard.anim({translateY: -21}, {duration: 700, easing}),
          confirmProm
        ])
      }
      catch(e) {

      }


      cardReader.enable()
      if (navigator.onLine) this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. To sign out, register your card again.")
          else this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. Your card will be synced when online.")

      let confirm = await confirmProm

      if (this.showHrsCancled) return this.showHrsCancled = false

      if (confirm) {
        await this.hoursContainer.childs(".toBeGone").anim({background: "#D9D9D9"}, 400, 50)
        await delay(300)
        data.registered.ea((e, i) => {
          if (e === "toBeGone") data.registered[i] = "gone"
        })
      }
      else {
        await this.hoursContainer.childs(".toBeGone").anim({background: "#79C865"}, 400, 50)
        await delay(300)
        data.registered.ea((e, i) => {
          if (e === "active") data.registered[i] = "gone"
        })
      }

      if (this.showHrsCancled) return this.showHrsCancled = false

      delay(600).then(() => {
        if (this.showHrsCancled) return this.showHrsCancled = false
        if (this.cardsContainer.scrollTop === 0 && this.list.length() !== 0) this.expectStudent()
        else this.hideScrollDown()
      })
      
    }


    elements = this.hoursContainer.childs()

    await Promise.all([
      this.mainCard.anim({translateY: .1}, {duration: 800, easing}),
      elements.anim({translateY: .1}, {duration: 800, easing}).then(() => {
        elements.remove()
      })
    ])
    this.mainCard.username("")
    this.mainCard.fullName("Unknown")
    this.mainCard.clearLuckyDay()
    this.mainCard.updatePasscode(0)

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
    if (navigator.onLine) this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. To sign out, register your card again.")
          else this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. Your card will be synced when online.")

    await Promise.all([
      this.mainCard.anim({translateY: .1}, {duration: 200, easing}),
      elements.anim({opacity: 0}, {duration: 100, easing}).then(() => elements.hide())
    ])

    this.showingHours = false
    this.alreadyCanc = false
  }

  public async registerRequest(data: any, encryptedCardId: string) {
    let expectedUser = this.expectedCard
    if (data.employeeType === "teacher") {

      // got user teacher

      if (!knownLogins.teacher[encryptedCardId]) {
        knownLogins.teacher[encryptedCardId] = data
      }
      
      
      this.mainCard.username(data.username)
      this.mainCard.fullName(data.fullName)
      this.mainCard.luckyDay()
      this.mainCard.updatePasscode()
      await this.expectTeacher()

      if (expectedUser === "teacher") {
        // expected and got teacher
        if (!this.activeTeacherSession) {
          // Teacher start session
          this.activeTeacherSession = true
          if (data.sessKey !== undefined) localStorage.sessKey = data.sessKey

          await this.loadingTeacherAnimation()

          this.manager.setPanel("setUpPanel", "left")
          this.manager.setPanel("setUpConfirmationPanel", "right")

          delay(250).then(() => {
            this.clearMainCard()
          })

        }
        else {
          // double login teacher
          await this.logoutTeacherAction()
        }
      }
      else {
        // expected student but got teacher
        await this.logoutTeacherAction()
      }
    }
    else {
      // Got user student

      

      if (!knownLogins.student[encryptedCardId]) {
        data.startOfLastUnit = getCurrentHour()
        knownLogins.student[encryptedCardId] = data
      }


      this.mainCard.username(data.username)
      this.mainCard.fullName(data.fullName)
      this.mainCard.luckyDay()
      this.mainCard.updatePasscode()
      
      

      if (expectedUser === "student") {
        // got and expected student 
        
        this.showHours(data, encryptedCardId)

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

  public activeTeacherSession = false
  cardReadCallback(cardId: string) {
    let encryptedCardId = SHA256(cardId).toString()

    return new Promise(async (resCardReadCallback) => {
      await this.cancelShowHours()
    await animatedScrollTo(0, {
      elementToScroll: this.cardsContainer,
      speed: 2000,
      cancelOnUserAction: false
    })
    this.hideScrollDown()
    this.mainCard.authentication()
    


    let req = ajax.post("cardAuth", {
      encryptedCardId
    }, undefined)

    req.fail(async () => {
      await delay(1200)

      let cardKnownAsStudent = !!knownLogins.student[encryptedCardId]
      let cardKnownAsTeacher = !!knownLogins.teacher[encryptedCardId]
      this.mainCard.doneAuthentication()

      if (this.expectedCard === "teacher") {
        if (cardKnownAsTeacher) {
          req.recall().then((res) => {
            if (res.data.sessKey) localStorage.sessKey = res.data.sessKey
          })

          
        }       
        if (cardKnownAsStudent || cardKnownAsTeacher) await this.registerRequest(knownLogins.teacher[encryptedCardId], encryptedCardId) 
      }
      else if (this.expectedCard === "student") {
        let recallRequest = req.recall()

        // Student
        if (cardKnownAsStudent) {
          let data = knownLogins.student[encryptedCardId]
          let regDef = data.registered !== undefined

          let firstInactivefieldAtTheEnd = 0
          if (regDef) {
            data.registered.Reverse().ea((e, i) => {
              if (e !== "gone") return firstInactivefieldAtTheEnd = data.registered.length - i
            })
          }
          
          
          if (regDef && data.startOfLastUnit !== undefined && firstInactivefieldAtTheEnd === data.registered.length) {
            let currTime = getCurrentHour()
            if (data.startOfLastUnit <= currTime) {
              data.sign = "out"

              recallRequest.abort()

              let timeDelta = currTime - data.startOfLastUnit

              for (let i = timeDelta; i < data.registered.length; i++) {
                data.registered[i] = "toBeGone"
              }

              
            }
            else {
              this.mainCard.fullName("Unexpected Error")
              await delay(2000)
              this.mainCard.fullName("Unknown")
              return false
            }
          }
          else {
            data.sign = "in"
            data.registered = []
            for (let i = 0; i < this.maxHours; i++) {
              data.registered[i] = "active"
            }
          }
          

          await this.registerRequest(data, encryptedCardId)
        }
        else recallRequest.abort()

        

        


        // Teacher

        if (cardKnownAsTeacher) {
          recallRequest.abort()
          await this.registerRequest(knownLogins.teacher[encryptedCardId], encryptedCardId)
        }
        else recallRequest.abort()
      }

      if (!cardKnownAsStudent && !cardKnownAsTeacher) {
        this.mainCard.fullName("Unable to authenticate")
        await delay(2000)
        this.mainCard.fullName("Unknown")
      }

      resCardReadCallback()
    })
    
    await Promise.all([req, delay(1000 + (Math.random() * 1000))])

    let res = await req

    this.mainCard.doneAuthentication()

    if (res.entry) {
      await this.registerRequest(res.data, encryptedCardId)
    }
    else {
      this.manager.panelIndex.login.encryptedCardId = encryptedCardId
      this.manager.setPanel("login", "left")
      this.mainCard.fullName("Unknown")
    }

    if (this.expectedCard === "student") this.showScrollDown()
    resCardReadCallback()
    })  
  }

  
  public subject = "Unknown"
  public maxHours = 0

  private async logoutTeacherAction() {
    this.manager.panelIndex.info.updateContents("Logout", "You are about to log out of, hence terminate this session. Are you sure?")
    let confirm = await this.showConfimOptions((confirm) => {
      return new Promise(async (resButton) => {
        if (confirm) {
          let req = ajax.post("destroySession", {}, undefined, true)
  
          req.fail(() => {
            while(this.list.length()) {
              this.list.removeI(0)
            }
            for (let key in knownLogins.student) {
              delete knownLogins.student[key].registered
              delete knownLogins.student[key].startOfLastUnit
            }
            resButton()
          })
  
          await req
          while(this.list.length()) {
            this.list.removeI(0)
          }
          for (let key in knownLogins.student) {
            delete knownLogins.student[key].registered
            delete knownLogins.student[key].startOfLastUnit
          }
          resButton()
        }
        else resButton()
      })
    })
    if (confirm) {

      delete localStorage.sessKey
      this.activeTeacherSession = false

      clearTimeout(this.manager.panelIndex.setUpConfirmationPanel.destroySessionTimeout)
      
      this.clearMainCard()
      this.manager.panelIndex.info.updateContents("LabAuth", "A teacher may log in with his edu.card to start the session.")
    }
    else {
      this.clearMainCard()
      await this.expectStudent()
      if (navigator.onLine) this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. To sign out, register your card again.")
      else this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. Your card will be synced when online.")
    }
  }

  private clearMainCard(expected: "student" | "teacher" = this.expectedCard) {
    this.mainCard.username("")
    this.mainCard.updatePasscode(0)
    this.mainCard.clearLuckyDay()
    this.mainCard.employeeType(expected)
    this.mainCard.fullName("Unknown")
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
      this.mainCard.anim({translateY: .1}, {duration: 900, easing})
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