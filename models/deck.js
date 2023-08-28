const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deckSchema = new Schema ({
    card: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }],
    user: userSchema // remember that the user schema used to be on this page so this will probably have to be changed
})


module.exports = mongoose.model('Deck', deckSchema)