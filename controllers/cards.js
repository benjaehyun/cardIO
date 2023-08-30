const Card = require('../models/card')
const Deck = require('../models/deck')

module.exports = {
    new: newCard, 
    create, 
    edit, 
    update, 
    delete: deleteCard, 
    play, 
    nextCard, 
    lastCard, 
    playCurrentCard
}

async function playCurrentCard (req, res) {
    const deck = await Deck.findById(req.params.deckId)
    const card = await Card.findById(req.params.cardId)
    res.render('cards/play', {deck, card})
}

async function play (req, res) {
    const deck = await Deck.findById(req.params.deckId)
    const card = await Card.findById(deck.cards[0])
    res.render('cards/play', {deck, card})
}

async function nextCard(req,res) {
    
    const deck = await Deck.findById(req.params.deckId)
    const cardsArr = deck.cards
    const idx = cardsArr.findIndex(card => card._id.equals(req.params.cardId)) 
    const nextIdx = idx + 1
    const card = await Card.findById(deck.cards[nextIdx])
    if (card) {
        res.render('cards/play', {deck, card})
    } else {
        res.redirect(`/decks/${deck._id}`)
    }   
}
async function lastCard(req,res) {
    const deck = await Deck.findById(req.params.deckId)
    const cardsArr = deck.cards
    const idx = cardsArr.findIndex(card => card._id.equals(req.params.cardId)) 
    const nextIdx = idx - 1
    const card = await Card.findById(deck.cards[nextIdx])
    if (card) {
        res.render('cards/play', {deck, card})
    } else {
        res.redirect(`/decks/${deck._id}`)
    }   

}

async function deleteCard (req, res) {
    const deckId = req.params.deckId
    // const card = await Card.findByIdAndRemove(req.params.cardId) // look into a way that doesn't use a protected path, ie. check for the user id as well as the deck id before deleting it 
    const card = await Card.findOneAndDelete({'_id': req.params.cardId, 'user': req.user._id})
    // do i not have to save the deck??? 
    res.redirect(`/decks/${deckId}`)
}

async function update (req, res) {
    try {    
        const deckId = req.params.deckId
    // const card = await Card.findByIdAndUpdate(req.params.cardId, req.body, {new: true})
    const card = await Card.findOneAndUpdate(
        {'_id': req.params.cardId, 'user': req.user._id}, 
        req.body, 
        {new:true}
    )
    return res.redirect(`/decks/${deckId}`)
    } catch (e) {
        console.log(e.message)
        return res.redirect('/decks')
    }
}

async function edit (req, res) {
    // const deck = await Deck.findById(req.params.deckId)
    const deck = await Deck.findOne({'_id': req.params.deckId, 'user': req.user._id})
    // const card = await Card.findById(req.params.cardId)
    const card = await Card.findOne({'_id': req.params.cardId, 'user': req.user._id})
    if (!card) return res.redirect('/decks')
    res.render(`cards/edit`, {title: 'Edit Card', card, deck})
}

function newCard (req, res) {
    const deckId = req.params.deckId
    res.render('cards/new', {title: 'Add a Card', deckId}) // figure out the route for this
}

async function create (req, res) {
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