const Card = require('../models/card')
const Deck = require('../models/deck')

module.exports = {
    new: newCard, 
    create, 
    edit, 
    update, 
    delete: deleteCard
}

async function deleteCard (req, res) {
    const deckId = req.params.deckId
    const card = await Card.findByIdAndRemove(req.params.cardId) // look into a way that doesn't use a protected path, ie. check for the user id as well as the deck id before deleting it 
    // do i not have to save the deck??? 
    res.redirect(`/decks/${deckId}`)
}

async function update (req, res) {
    const deckId = req.params.deckId
    const card = await Card.findByIdAndUpdate(req.params.cardId, req.body, {new: true})
    res.redirect(`/decks/${deckId}`)
}

async function edit (req, res) {
    const deck = await Deck.findById(req.params.deckId)
    const card = await Card.findById(req.params.cardId)
    res.render(`cards/edit`, {title: 'Edit Card', card, deck})
}

function newCard (req, res) {
    const deckId = req.params.deckId
    console.log(deckId)
    res.render('cards/new', {title: 'Add a Card', deckId}) // figure out the route for this
}

async function create (req, res) {
    console.log('test')
    console.log(req.body)
    const deckId = req.params.deckId
    if (req.body.comments === '') delete req.body.comments
    // for (let key in req.body) {
    //     if (req.body[key] ==='') delete req.body[key]
    // }
    try {
        req.body.user = req.user.id
        const card = await Card.create(req.body)
        const deck = await Deck.findById(deckId)
        deck.cards.push(card)
        await deck.save()
        // need to cache the current deck so that you can access the deck id
        res.redirect(`/decks/${deckId}/cards/new`)
    } catch (err) {
        console.log(err)
        res.redirect(`/decks/${deckId}/cards/new`, {errorMsg: err.message})
    }
}