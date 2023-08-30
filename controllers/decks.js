const Deck = require('../models/deck')
const app = require('../server')
const Card = require('../models/card')

module.exports = {
    index, 
    show, 
    new: newDeck, 
    create, 
    edit, 
    update, 
    delete: deleteDeck, 
    allDecks
}


// async function play(req, res) {
//     const deck = await Deck.findById(req.params.deckId)
//     const deckId = deck._id
//     console.log(deckId)
//     app.locals.deckId = deckId
//     if (!app.locals?.deckId) {
//         createSpentCardsArr(deck.cards.length, deckId)
//     }
//     let cardIdx = app.locals.deckId.findIndexOf(0)
//     if (cardIdx < 0) res.redirect(`decks/${deck._id}`)
//     const card = deck.cards[cardIdx]
//     console.log(card)
//     app.locals.deckId.splice(cardIdx, 1, 1)
//     // let randomIdx = getRandomInt(deck.cards.length)
//     // app.locals.spentCards.push(randomIdx)
//     res.render('decks/play', {deck, card})
// }

function createSpentCardsArr(length) {
    app.locals.deckId = []
    for (let i = 0; i < length; i++ ) {
        app.locals.title.push(0)
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random()*max)
}

async function index (req, res) {
    const decks = await Deck.find({'user': req.user.id }) 
    console.log(`req.user.id ${req.user.id}`)
    // console.log(`deck: ${decks}`)
    res.render('decks/index', {decks})
}

async function deleteDeck (req, res) {
    // const deck = await Deck.findByIdAndRemove(req.params.deckId) // look into a way that doesn't use a protected path, ie. check for the user id as well as the deck id before deleting it 
    const deck = await Deck.findOneAndDelete({'_id': req.params.deckId, 'user': req.user._id})
    res.redirect('/decks')
}

async function edit (req, res) {
    const deck = await Deck.findById(req.params.deckId).populate('cards')
    res.render('decks/edit', {title: 'Edit Deck', deck})
}

async function update (req, res) {
    const deck = await Deck.findOneAndUpdate(req.params.deckId, req.body, {new: true})
    res.redirect(`/decks`)
}

async function allDecks(req, res) {
    const decks = await Deck.find({})
    res.render('decks/all', {title: 'All Decks', decks})
}

async function show(req, res) {
    const deck = await Deck.findById(req.params.deckId).populate('cards')
    res.render('decks/show', {title: 'Deck Details', deck})
}

function newDeck (req, res) {
    res.render('decks/new', {title: 'Add Deck', errorMsg: ''})
}

async function create (req, res) {
    try {
        req.body.user = req.user._id 
        req.body.userName = req.user.name 
        req.body.userAvatar = req.user.avatar
        // req.body.user = req.user
        const deck = await Deck.create(req.body)
        res.redirect(`/decks/${deck._id}/cards/new`)
    } catch (err) {
        console.log(err)
        res.render('decks/new', {errorMsg: err.message})
    }
    // redirect to card new 
}


// in the deck show be sure to pass the deck and cards/comments with the matching ids 
