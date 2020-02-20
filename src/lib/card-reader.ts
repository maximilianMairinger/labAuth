let subscription = []

let input = document.createElement("input")


//@ts-ignore
document.body.append(input)
input.focus()
input.addEventListener("blur", () => {
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
        