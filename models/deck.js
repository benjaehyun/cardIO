const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deckSchema = new Schema ({
    card: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }],
    user: userSchema
})

const userSchema = new Schema ({
    decks: deckSchema, 
    dateCreated: {
        type: Date, 
        required: true, 
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Deck', deckSchema)