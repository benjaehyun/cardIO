const Deck = require('../models/deck')

module.exports = {
    index, 
    show, 
    new: newDeck, 
    create
}

async function index(req, res) {
    const decks = await Deck.find({})
    res.render('decks/index', {title: 'All Decks', decks})
}

async function show(req, res) {
    const deck = await Deck.findById(req.params.id).populate('cards')
    res.render('decks/show', {deck})
}

function newDeck (req, res) {
    res.render('decks/new', {errorMsg: ''})
}

async function create (req, res) {
    try {
        const deck = await Deck.create(req.body)
        res.redirect(`decks/${deck._id}/cards/new`)
    } catch (err) {
        console.log(err)
        res.render('decks/new', {errorMsg: err.message})
    }
    // redirect to card new 
}


// in the deck show be sure to pass the deck and cards/comments with the matching ids 
