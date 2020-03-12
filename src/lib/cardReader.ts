import { Tel } from "extended-dom"

let subscription = []

let input = document.createElement("input")
let hide = document.createElement("hide-input")

input.css({
  position: "absolute",
  top: 0,
  left: 0
})

hide.css({
  position: "absolute",
  top: 0,
  left: 0,
  width: 200,
  height: 200,
  background: "white"
})



//@ts-ignore
document.body.append(input, hide)
input.focus()

let blurListener: Tel = input.ls("blur", () => {
  input.focus();
});

input.addEventListener("keydown", (e) => {
  if(e.key === "Enter") {
    subscription.forEach((f) => {
      f(input.value)
    });
    input.value = ""
  }
});

export function addListener(f) {
  subscription.push(f)
}

export function removeListener(f) {
  const index = subscription.indexOf(f);
  if (index > -1) {
    subscription.splice(index, 1);
  }
}

export function disable() {
  blurListener.disable()
  input.tabIndex = -1
}

disable()

export function enable() {
  blurListener.enable()
  input.focus()
  input.tabIndex = 0
}

//@ts-ignore
global.cardRead = () => {
  subscription.forEach((f) => {
    f("testid")
  });
}
