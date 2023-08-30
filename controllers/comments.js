const Deck = require ('../models/deck')
const Card = require ('../models/card')

module.exports = {
    createDeckComment, 
    createCardComment, 
    deleteCardComment, 
    deleteDeckComment
}

async function deleteDeckComment (req, res) {
    const deck = await Deck.findById(req.params.deckId) 
    if(!deck) return res.redirect(`/decks/${deck._id}`)
    // const comment = card.comments
    const comment = deck.comments.id(req.params.commentId)
    if (comment.user.equals(req.user._id)) {
        deck.comments.remove(req.params.commentId)
        await deck.save()
    }
    // comment.findOneAndDelete({'_id': req.params.commentId, 'user': req.user._id})
    res.redirect(`/decks/${deck._id}`)
}
async function deleteCardComment (req, res) {
    const deck = await Deck.findById(req.params.deckId)
    const card = await Card.findById(req.params.cardId)
    if(!card) return res.redirect(`/decks/${deck._id}/cards/${card._id}/play`)
    // const comment = card.comments
    const comment = card.comments.id(req.params.commentId)
    if (comment.user.equals(req.user._id)) {
        card.comments.remove(req.params.commentId)
        await card.save()
    }
    // comment.findOneAndDelete({'_id': req.params.commentId, 'user': req.user._id})
    res.redirect(`/decks/${deck._id}/cards/${card._id}/play`)
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
async function createCardComment (req, res) {
    const deck = await Deck.findById(req.params.deckId)
    const card = await Card.findById(req.params.cardId)
    req.body.user = req.user._id 
    req.body.userName = req.user.name 
    req.body.userAvatar = req.user.avatar
    card.comments.push(req.body)
    try {
        await card.save() 
    } catch (err) {
        console.log(err)
    }
    console.log(card.comments[1].userAvatar)
    res.redirect(`/decks/${deck._id}/cards/${card._id}/play`)
}