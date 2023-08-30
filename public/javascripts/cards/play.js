const cardFrontEl = document.querySelector('#card-front')
const cardBackEl = document.querySelector('#card-back')
const cardEls = document.querySelectorAll('.card')

cardFrontEl.addEventListener("click", handleCardClick)
cardBackEl.addEventListener("click", handleCardClick)

let cardToggle = true


cardFrontEl.style.display = 'flex'
cardBackEl.style.display = 'none'

function handleCardClick(evt) {
    if (cardToggle) {
        cardFrontEl.style.display = 'flex'
        cardBackEl.style.display = 'none'
    } else {
        cardFrontEl.style.display = 'none'
        cardBackEl.style.display = 'flex'
    }
    cardToggle = !cardToggle
}
