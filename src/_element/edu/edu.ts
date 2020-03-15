import Element from "../element"
import * as randomDate from "random-date-generator"



function prittyDate(date: Date = randomDate.getRandomDate() as Date, year = false){
  var set = date
  var getDate = set.getDate().toString();
  if (getDate.length == 1){ //example if 1 change to 01
   getDate = "0" + getDate;
  }
  var getMonth = (set.getMonth()+1).toString();
  if (getMonth.length == 1){
   getMonth = "0" + getMonth;
  }
  var dateNow = getDate + "." + getMonth + (year ? "." + set.getFullYear() : "");
  return dateNow as string;
}

export default class Edu extends Element {
  private mainEduContainer = this.q("#edu")
  private eduTeacher = this.q("#edu-teacher")
  private usernameElement = this.q("#Username__mmairinger span")
  private passcodeElem = this.q("#ID2424_Wien span")
  private fullNameElem = this.q("#Maximilian_Mairinger span")
  private luckyDayElem = this.q("#G_ltig_bis__29_08_2030 span")
  private validUntilElem = this.q("#Geburtsdatum__29_2_2000 span")
  private fullNameOverlay = this.q("#FullnameOverlay")
  private moveFullName = this.q("#moveFullName")
  private spinner = this.q("#loadingSpinner")
  constructor(expectedUser?: "teacher" | "student") {
    super(false);
    

    if (expectedUser === "teacher") this.expectTeacher()
    else if (expectedUser === "student") this.expectStudent()
  }

  username(to: string) {
    this.usernameElement.text("Username: " + to)
  }
  updatePasscode(length: number = Math.ceil(Math.random() * 15)) {
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
    this.luckyDayElem.text("Lucky day: " + prittyDate())
  }
  clearLuckyDay() {
    this.luckyDayElem.text("Lucky day:")
  }
  employeeType(to: string) {
    this.validUntilElem.text("Employee: " + to)
  }

  authentication() {
    this.fullNameElem.text("Authenticating...")
    this.fullNameOverlay.css("opacity", 1)
    this.mainEduContainer.addClass("big")

    this.fullNameOverlay.anim([
      {translateX: 0, offset: 0},
      {translateX: 10, offset: .9},
      {translateX: 0}
    ], {duration: 900, easing: "linear", iterations: Infinity})
    

    this.spinner.anim([
      {opacity: 0, offset: 0},
      {opacity: 0, offset: .8},
      {opacity: 1}
    ], 1000)
    this.spinner.anim([
      {rotateZ: 0, offset: 0},
      {rotateZ: 360}
    ], {duration: 1000, iterations: Infinity, easing: "linear"})


    this.moveFullName.anim([
      {translateX: 0, offset: 0},
      {translateX: 0, offset: .5},
      {translateX: 15}
    ], 1000)

  }

  doneAuthentication() {
    this.mainEduContainer.removeClass("big")
    this.fullNameOverlay.css("opacity", 0)
    this.fullNameOverlay.anim({translateX: 0})
    this.moveFullName.anim({translateX: 0}, 300)
    this.spinner.anim({opacity: 0}).then(() => this.spinner.anim({rotateZ: 0}))
  }

  expectStudent() {
    this.eduTeacher.anim({opacity: 0})
    let c = this.fullNameOverlay.childs()
    c.first.css("background", "linear-gradient(90deg, rgba(83, 80, 74, 0), rgba(236, 168, 56, 1))")
    c[1].css("background", "rgb(236, 168, 56)")
  }
  expectTeacher() {
    this.eduTeacher.anim({opacity: 1})
    let c = this.fullNameOverlay.childs()
    c.first.css("background", "linear-gradient(90deg, rgba(77, 191, 238, 0), rgba(77, 191, 238, 1))")
    c[1].css("background", "rgb(77, 191, 238)")
  }

  stl() {
    return require("./edu.css").toString()
  }
  pug() {
    return require("./edu.pug").default
  }
}

window.customElements.define('c-edu', Edu);