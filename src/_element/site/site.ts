import Element from "../element"
import PanelManager from "../panelManager/panelManager"
import { DataBase, Data, DataArray } from "front-db"
import delay from "delay"
import { Entry } from "../_panel/eduPanel/eduPanel"


const textIndex = {
  offline: "Offline",
  online: "Online",
  syncing: "Syncing"
}

const widthIndex = {
  offline: 55,
  online: 50,
  syncing: 60
}

export default class Site extends Element {
  private entries = new DataBase(new Data([])).asArray as any as DataArray<Entry>


  private manager = new PanelManager(this.entries, (expectedCard) => {
    if (expectedCard === "student") {
      this.offlineIndecator.anim({background: "black"})
    }
    else if (expectedCard === "teacher") {
      this.offlineIndecator.anim({background: "#1f7eea"})
    }
  })
  private iconContainer = ce("indecator-icon")
  private offlineTextElem = ce("indecator-text")
  private offlineIndecator = ce("offline-indecator").apd(
    this.iconContainer.apd(
      ce("offline-icon").html('<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0z" fill="none"/><path fill="white" d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"/></svg>'),
      ce("syncing-icon").html('<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path fill="white" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z"/></svg>'),
      ce("online-icon").html('<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path fill="white" d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6m0-2C9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4z"/></svg>'),
    ),
    ce("indecator-dash").text("-"),
    this.offlineTextElem
  )
  
  constructor() {
    super()

    window.addEventListener("online", () => {
      this.onOnlineStatusChange(true)
    })
    window.addEventListener("offline", () => {
      this.onOnlineStatusChange(false)
    })

    this.manager.setPanel("info", "left")
    this.manager.setPanel("edu", "right")
    this.manager.panelIndex.edu.expectTeacher()
    

    this.elementBody.apd(this.manager, this.offlineIndecator)
    
  }

  
  private onOnlineStatusChange(online: boolean) {
    if (online) {
      this.display("syncing")
      this.display("online")
    }
    else this.display("offline")
  }

  private async activateIcon(status: "offline" | "online" | "syncing") {
    let querySelector = status + "-icon"
    await this.iconContainer.childs().ea(async (icon) => {
      if (icon.matches(querySelector)) {
        icon.show()
        await icon.anim({opacity: 1})
      }
      else {
        await icon.anim({opacity: 0}).then(() => {
          icon.hide()
        })
      }
    })
  }

  private async setText(status: "offline" | "online" | "syncing") {
    if (this.offlineTextElem.css("opacity") !== 0) await this.offlineTextElem.anim({opacity: 0})
    this.offlineTextElem.text(textIndex[status])
    await this.offlineTextElem.anim({opacity: 1, width: widthIndex[status]})
  }

  private currentAnimationStatus: "offline" | "online" | "syncing"
  private currentlyInAnAnimation = false
  private async display(status: "offline" | "online" | "syncing") {
    this.currentAnimationStatus = status
    if (this.currentlyInAnAnimation) return
    this.currentlyInAnAnimation = true

    
    let proms = [this.activateIcon(status), this.setText(status)]
    
    if (status === "offline" || status === "syncing") {
      proms.add(this.offlineIndecator.anim({opacity: 1, height: 30}))

      if (status === "syncing") {
        proms.add(delay(3000))
      }
      else {
        proms.add(delay(2000))
      }
    }
    else if (status === "online") {
      proms.add(delay(2000).then(() => this.offlineIndecator.anim({opacity: 0, height: 0})))
      proms.add(delay(3000))
    }

    await Promise.all(proms)
    


    this.currentlyInAnAnimation = false
    if (status !== this.currentAnimationStatus) await this.display(this.currentAnimationStatus)
  }

  stl() {
    return require("./site.css").toString()
  }
  pug() {
    return require("./site.pug").default
  }
}

window.customElements.define('c-site', Site);