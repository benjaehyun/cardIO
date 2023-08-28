const Deck = require('../models/deck')

module.exports = {
    index, 
    show
}

async function index(req, res) {
    const decks = await Deck.find({})
    res.render('decks/index', {title: 'All Decks', decks})
}

async function show(req, res) {
    const deck = await Deck.findById(req.params.id).populate('cards')
    res.render('decks/show', {deck})
}

// in the deck show be sure to pass the deck and cards/comments with the matching ids 
