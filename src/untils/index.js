export const splitTextToSpan = (selector) => {
    let elements = document.querySelectorAll(selector)
    elements.forEach((element) => {
        let text = element.innerText
        let splitText = text.split("").map(function (char) {
            return `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`
        })
            .join("")

        element.innerHTML = splitText
    })
}

