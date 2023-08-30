const Profile = require('../models/user')
const Deck = require('../models/deck')

module.exports = {
    index
}

async function index(req, res) {
    const user = await Profile.findById(req.params.profileId)
    const decks = await Deck.find({'user': req.params.profileId})
    res.render('profiles/index', {decks, user})
}

