const Card = require('../models/card')

module.exports = {
    new: newCard, 
    create

}

function newCard (req, res) {
    res.render('/decks') // figure out the route for this
}

async function create (req, res) {
    try {
        const card = await Card.create(req.body)
        // need to cache the current deck so that you can access the deck id
        res.redirect(`decks/${deck._id}/cards/new`)
    } catch (err) {
        console.log(err)
        res.render(`decks/${deck._id}/cards/new`, {errorMsg: err.message})
    }
}