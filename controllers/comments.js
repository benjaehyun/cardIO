const Deck = require ('../models/deck')
const Card = require ('../models/card')

module.exports = {
    createDeckComment
}

async function createDeckComment (req, res) {
    const deck = await Deck.findById(req.params.deckId)
    req.body.user = req.user._id 
    req.body.userName = req.user.name 
    req.body.avatar = req.user.avatar
    deck.comments.push(req.body)
    try {
        await deck.save() 
    } catch (err) {
        console.log(err)
    }
    res.redirect(`/decks/${deck._id}`)
}