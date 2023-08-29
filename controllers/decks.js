const Deck = require('../models/deck')

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

async function index (req, res) {
    const deck = await Deck.find({'user._id': req.user.id }) 
    console.log(deck)
}

async function deleteDeck (req, res) {
    const deck = await Deck.findByIdAndRemove(req.params.deckId) // look into a way that doesn't use a protected path, ie. check for the user id as well as the deck id before deleting it 
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
    res.render('decks/index', {title: 'All Decks', decks})
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
        req.body.user = req.user
        const deck = await Deck.create(req.body)
        res.redirect(`/decks/${deck._id}/cards/new`)
    } catch (err) {
        console.log(err)
        res.render('decks/new', {errorMsg: err.message})
    }
    // redirect to card new 
}


// in the deck show be sure to pass the deck and cards/comments with the matching ids 
