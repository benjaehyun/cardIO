const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema ({
    name: String, 
    googleId: {
        type: String, 
        required: true
    },
    email: String, 
    avatar: String, 
    // decks: deckSchema, 
    decks: [{
        type: Schema.Types.ObjectId, 
        ref: 'Deck'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)