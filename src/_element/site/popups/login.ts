import { resolveLang } from "../../../lib/interpolateHTMLWithLang"
import * as cardReader from "./../../../lib/card-reader"
import Swal from 'sweetalert2'
import EnterForHoursSelector from "../../enterForHoursSelector/enterForHoursSelector"
import Input from "../../input/input"
import Login from "../../login/login"


const greeting = resolveLang("greeting")

export default function login(name: string, hours: number, subject: string) {
  Swal.fire({
    title: greeting + name,
    html: new Login(),
    timer: 50000000,
    showCancelButton: false,
    showConfirmButton: false,
    icon: "info"
  })
}