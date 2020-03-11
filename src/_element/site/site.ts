import Element from "../element"
import PanelManager from "../panelManager/panelManager"
import InformPanel from "../_panel/informPanel/informPanel"
import EduPanel, { Entry } from "../_panel/eduPanel/eduPanel"
import LoginPanel from "../_panel/loginPanel/loginPanel"
import { Data, DataBase } from "front-db"





export default class Site extends Element {
  private manager = new PanelManager()
  constructor() {
    super()

    

    //this.manager.setPanel({left: new InformPanel("LabAuth", "A teacher may log in with his edu.card to start the session."), right: new EduPanel("teacher")})
    this.manager.setPanel("edu", "left")
    this.manager.setPanel("info", "right")
    
    // setTimeout(() => {
    //   edu.showHours(4)
    // }, 1000)
  }

  stl() {
    return require("./site.css").toString()
  }
  pug() {
    return require("./site.pug").default
  }
}

window.customElements.define('c-site', Site);