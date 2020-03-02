import { resolveLang } from "../../../lib/interpolateHTMLWithLang"
import * as cardReader from "./../../../lib/card-reader"
import Swal from 'sweetalert2'
import EnterForHoursSelector from "../../enterForHoursSelector/enterForHoursSelector"


export default function studentRegistered(name: string, max: number, subject: string, current: number) {
  Swal.fire({
    title: "Hallo " + name,
    html: new EnterForHoursSelector(max, subject, current),
    timer: 50000000,
    showCancelButton: false,
    showConfirmButton: false,
    icon: "warning",
    allowEscapeKey : false,
    allowOutsideClick: false
  })
}