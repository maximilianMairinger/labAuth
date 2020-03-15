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

input.addEventListener("keydown", async (e) => {
  if(e.key === "Enter") {
    disable()
    let proms = []
    subscription.forEach((f) => {
      proms.add(f(input.value))
    });
    input.value = ""
    await Promise.all(proms)
    if (input.tabIndex !== -1) enable()
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
  console.log("card read")
  if (input.tabIndex === 0) {
    
    subscription.forEach((f) => {
      f("testid")
    });
  }
  
}


setTimeout(() => {
  //@ts-ignore
  cardRead()
  
}, 5000);

setTimeout(() => {
  //@ts-ignore
  cardRead()
}, 10000);