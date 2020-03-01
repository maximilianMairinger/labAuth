import { resolveLang } from "../../../lib/interpolateHTMLWithLang"
import * as cardReader from "./../../../lib/card-reader"
import Swal from 'sweetalert2'
import EnterForHoursSelector from "../../enterForHoursSelector/enterForHoursSelector"
import Input from "../../input/input"
import Login from "../../login/login"
import Edu from "../../edu/edu"
import ajax from "./../../../lib/ajax"

interface LDAPAuthRes {
  valid: boolean
  data: {
    fullName: string,
    class: string
  }
}

const teacherAPIString = "lehrer"

const greeting = resolveLang("greeting")

export default function login() {
  let alreadyAuthenticating = false

  let edu = new Edu()
  let eduWrapper = ce("edu-wrapper").apd(edu).css({display: "inline-block", marginTop: 15, marginBottom: 5})
  let login = new Login((username) => {
    edu.username(username)
  }, (password) => {

    edu.updatePasscode(password.length)  
  }, async (username, password) => {
    if (alreadyAuthenticating) return
    alreadyAuthenticating = true
    login.disableInputs()
    edu.authentication()
    let res = await ajax.post("LDAPAuth", {username, password}) as LDAPAuthRes
    login.enableInputs()
    edu.doneAuthentication()
    alreadyAuthenticating = false

    if (res.valid) {
      edu.fullName(res.data.fullName)
      edu.luckyDay()
      
      if (res.data.class === teacherAPIString) {
        edu.setTeacher()
        edu.employeeType("Lehrer")
      }
      else {
        edu.setStudent()
        edu.employeeType("Schüler")
      }
    }
    else {
      edu.fullName("Authentication faild")
    }

  })
  
  Swal.fire({
    title: eduWrapper,
    html: login,
    timer: 50000000,
    showCancelButton: false,
    showConfirmButton: false,
  })
}