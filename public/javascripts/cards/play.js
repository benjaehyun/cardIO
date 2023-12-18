const cardFrontEl = document.querySelector('#card-front')
const cardBackEl = document.querySelector('#card-back')
const cardEls = document.querySelectorAll('.card')
const flipButton = document.querySelector("#flip-card-button")

cardFrontEl.addEventListener("click", handleCardClick)
cardBackEl.addEventListener("click", handleCardClick)
flipButton.addEventListener("click", handleCardClick)

let cardToggle = true


cardFrontEl.style.display = 'flex'
cardBackEl.style.display = 'none'

function handleCardClick(evt) {
    cardToggle = !cardToggle
    if (cardToggle) {
        cardFrontEl.style.display = 'flex'
        cardBackEl.style.display = 'none'
    } else {
        cardFrontEl.style.display = 'none'
        cardBackEl.style.display = 'flex'
    }
}
