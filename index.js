/*{version:es6}*/

const enterListener = (event) => {
    const currentColor = getComputedStyle(event.target).getPropertyValue("background-color")
    let match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,(\s*\d+[\.\d+]*)*\)/g.exec(currentColor)
    let opacity = match[4]

    if (parseFloat(opacity) < 1) {
        let rgba = `rgba(${match[1]},${match[2]},${match[3]},${parseFloat(opacity)+0.1})`
        event.target.style.background = rgba
    }
}
const inputListener = (event) => {
    if (event.keyCode === 13)
        createGrid(event.target.value, true)
}
const createInput = () => {
    let input = document.createElement("INPUT")
    input.defaultValue = 16
    input.type = "number"
    input.style.display = "inline-block"
    input.style.margin = "0 auto"
    input.addEventListener("keypress", inputListener)
    return input
}
const createGrid = (squares = 16, refresh = false) => {
    let grid = []
    let container = document.querySelector("#container")
    if (refresh)
        container.innerHTML = ''
    let mod = Math.floor(960 % squares)
    let totalSquares = squares * squares
    let side = Math.floor(960 / squares)
    if (mod)
        side += mod / squares

    for (let i = 0; i < totalSquares; i++) {
        let cage = document.createElement('DIV')
        cage.style.background = "rgba(0,0,1,0)"
        cage.style.display = "inline-block"
        cage.style.width = (side - 2) + "px"
        cage.style.height = (side - 2) + "px"
        cage.style.margin = "none"
        cage.style.border = "1px black solid"
        cage.addEventListener("mouseenter", enterListener)
        container.appendChild(cage)
        grid.push(cage)
    }
    return grid
}

const init = () => {
    const body = document.querySelector("body")
    const input = createInput()
    const container = document.createElement("DIV")
    const inputContainer = document.createElement("DIV")

    container.style.padding = "0"
    container.style.width = "960px"
    container.style.height = "960px"
    container.style.border = "1px black solid"
    container.style.margin = "0 auto"
    container.style.fontSize = "0px"
    container.setAttribute("id", "container")

    inputContainer.style.width = "960px"
    inputContainer.style.height = "25px"
    inputContainer.style.margin = "0 auto"
    inputContainer.appendChild(input)

    body.appendChild(inputContainer)
    body.appendChild(container)
}

(function() {
    init()
    const grid = createGrid()
})()