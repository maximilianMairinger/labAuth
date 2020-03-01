import Element from "../element"
import { Data } from "front-db";
import * as randomDate from "random-date-generator"



function prittyDate(date: Date = randomDate.getRandomDate() as Date, year = false){
  var set = date
  var getDate = set.getDate().toString();
  if (getDate.length == 1){ //example if 1 change to 01
   getDate = "0"+getDate;
  }
  var getMonth = (set.getMonth()+1).toString();
  if (getMonth.length == 1){
   getMonth = "0"+getMonth;
  }
  var dateNow = getDate + "." + getMonth + (year ? "." + set.getFullYear() : "");
  return dateNow as string;
}

export default class Edu extends Element {
  private eduTeacher = this.q("#edu-teacher")
  private usernameElement = this.q("#Username__mmairinger span")
  private passcodeElem = this.q("#ID2424_Wien span")
  private fullNameElem = this.q("#Maximilian_Mairinger span")
  private luckyDayElem = this.q("#G_ltig_bis__29_08_2030 span")
  private validUntilElem = this.q("#Geburtsdatum__29_2_2000 span")
  constructor() {
    super(false);
    
  }

  username(to: string) {
    this.usernameElement.text("Username: " + to)
  }
  updatePasscode(length: number) {
    let num = Math.floor(Math.random() * ((Math.pow(10, ((length !== 0 ? 3 : 0) + (length * 0.7)) >= 17 ? 17 : ((length !== 0 ? 3 : 0) + (length * 0.7))))))
    this.passcodeElem.text(num === 0 ? "" : num)
  }
  fullName(to: string) {
    if (to === "") {
      this.fullNameElem.text("Unknown")
    }
    else {
      this.fullNameElem.text(to)
    }
    
  }
  luckyDay() {
    this.luckyDayElem.text("Glückstag: " + prittyDate())
  }
  employeeType(to: string) {
    this.validUntilElem.text("Inhaber: " + to)
  }
  private dotAnimInterval: NodeJS.Timeout;
  authentication() {
    this.fullNameElem.text("Authenticating...")
    let dots = "..."
    this.dotAnimInterval = setInterval(() => {
      if (dots.length === 3) dots = ""
      dots += "."
      this.fullNameElem.text("Authenticating" + dots)
      
    }, 400)
  }

  doneAuthentication() {
    clearInterval(this.dotAnimInterval)
  }

  setStudent() {
    this.eduTeacher.anim({opacity: 0})
  }
  setTeacher() {
    this.eduTeacher.anim({opacity: 1})
  }

  stl() {
    return require("./edu.css").toString()
  }
  pug() {
    return require("./edu.pug").default
  }
}

window.customElements.define('c-edu', Edu);