import Element from "../element"
import PanelManager from "../panelManager/panelManager"
import InformPanel from "../_panel/informPanel/informPanel"
import EduPanel, { Entry } from "../_panel/eduPanel/eduPanel"
import LoginPanel from "../_panel/loginPanel/loginPanel"
import { Data, DataBase } from "front-db"
import SetUpPanel from "../_panel/setUpPanel/setUpPanel"
import SetUpConfirmationPanel from "../_panel/setUpConfirmationPanel/setUpConfirmationPanel"



//@ts-ignore
let entries: DataArray<Entry> = new DataBase(new Data([])).asArray

//@ts-ignore
global.entries = entries

entries.add({username: "mmairinger", fullName: "Maximilian Mairinger", registered: [true, true, true, true]})
entries.add({username: "rschlager", fullName: "Raphael Schlager", registered: [true, false, false, false]})
entries.add({username: "dzimmermann", fullName: "Daniel Zimmermann", registered: [true, true, false, true]})

export default class Site extends Element {
  private manager = new PanelManager()
  constructor() {
    super()

    this.apd(this.manager)

    
    // let edu = new EduPanel(entries)
    // edu.displayConfimOptions((e) => {
    //   console.log(e ? "confirm" : "cancel")
    // })
    
    // this.manager.setPanel({left: new InformPanel("LabAuth", "A teacher may log in with his edu.card to start the session."), right: edu})
    // setTimeout(() => {
    //   edu.showHours(4)
    // }, 2000)

    this.manager.setPanel({left: new SetUpPanel("Michael"), right: new SetUpConfirmationPanel()})
    
    
  }

  stl() {
    return require("./site.css").toString()
  }
  pug() {
    return require("./site.pug").default
  }
}

window.customElements.define('c-site', Site);