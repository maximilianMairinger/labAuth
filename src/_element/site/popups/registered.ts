import { resolveLang } from "../../../lib/interpolateHTMLWithLang"
import * as cardReader from "./../../../lib/card-reader"
import Swal from 'sweetalert2'
import EnterForHoursSelector from "../../enterForHoursSelector/enterForHoursSelector"


const greeting = resolveLang("greeting")

export default function studentRegistered(name: string, hours: number, subject: string) {
  Swal.fire({
    title: greeting + name,
    html: new EnterForHoursSelector(hours, subject, ),
    timer: 50000000,
    showCancelButton: false,
    showConfirmButton: false,
    icon: "success"
  })
}