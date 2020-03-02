import { resolveLang } from "../../../lib/interpolateHTMLWithLang"
import * as cardReader from "./../../../lib/card-reader"
import Swal from 'sweetalert2'
import EnterForHoursSelector from "../../enterForHoursSelector/enterForHoursSelector"


export default function studentRegistered(name: string, hours: number, subject: string) {
  Swal.fire({
    title: "Hallo " + name,
    html: new EnterForHoursSelector(hours, subject, ),
    timer: 50000000,
    showCancelButton: false,
    showConfirmButton: false,
    icon: "success",
    allowEscapeKey : false,
    allowOutsideClick: false
  })
}