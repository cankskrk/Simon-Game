// Oyun Durumu
const colors = ["red", "green", "blue", "yellow"]
const Level = document.getElementById("level-title")
const body = document.body
let gamePath = []
let playerPath = []
let gameState = false


// Oyunu Baslatmak
addEventListener("keypress", () => {
    if (gameState === false) {
        setTimeout(() => { Level.innerHTML = `Level: ${playerPath.length + 1}` }, 800)
        setTimeout(game, 1000)
        gameState = true
    }

    return
})


const timer = async (ms = 1000) =>
    new Promise((resolve) => setTimeout(resolve, ms))


// Tus Basimindan Sonraki Surec
addEventListener("click", async (button) => {
    if (
        (button.target.id !== "red" &&
            button.target.id !== "blue" &&
            button.target.id !== "green" &&
            button.target.id !== "yellow") ||
        gameState === false
    ) {
        return
    }

    playerPath.push(button.target.id)

    if (gamePath[playerPath.length - 1] === button.target.id) {
        blink(button.target.id)

        if (gamePath.length === playerPath.length) {
            Level.innerHTML = `Level: ${playerPath.length + 1}`
            playerPath = []
            await timer(1000)
            game()
        }
    }
    else {
        gameOver()
        Level.innerHTML = "Loser!"
        await timer(700)
        resetGame()
    }

})


const game = async () => {
    generateColor()
    blink(gamePath[gamePath.length - 1])
}


// Renk Uretimi
const generateColor = () => {
    const color = colors[Math.floor(Math.random() * colors.length)]
    gamePath.push(color)
    return color
}


// Tus Durumu
const blink = (button_Id) => {
    const buttonElement = document.querySelector(`#${button_Id}`)
    buttonElement.classList.add("pressed")
    setTimeout(() => {
        buttonElement.classList.remove("pressed")
    }, 100)

    var audio = new Audio(`sounds/${buttonElement.id}.mp3`)
    audio.play()
}


const gameOver = () => {
    body.classList.add("game-over")
    setTimeout(() => { body.classList.remove("game-over") }, 100)

    var audio = new Audio(`sounds/wrong.mp3`)
    audio.play()
}


// Oyun Sifirlama
const resetGame = () => {
    Level.innerHTML = "Press A Key to Start"
    playerPath = [];
    gamePath = []
    gameState = false
}