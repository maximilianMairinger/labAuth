import { resolveLang } from "../../../lib/interpolateHTMLWithLang"
import * as cardReader from "./../../../lib/card-reader"
import Swal from 'sweetalert2'
import EnterForHoursSelector from "../../enterForHoursSelector/enterForHoursSelector"
import Input from "../../input/input"
import Login from "../../login/login"
import Edu from "../../edu/edu"


const greeting = resolveLang("greeting")

export default function login(name: string, hours: number, subject: string) {
  let edu = new Edu()
  let eduWrapper = ce("edu-wrapper").apd(edu).css({display: "inline-block", marginTop: 15, marginBottom: 25})
  let login = new Login((username) => {
    edu.username(username)
  }, () => {
    edu.updatePasscode()  
  }, (...a) => {
    console.log("sub", a)
  })
  login
  Swal.fire({
    title: eduWrapper,
    html: login,
    timer: 50000000,
    showCancelButton: false,
    showConfirmButton: false,
  })
}