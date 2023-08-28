const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deckCommentSchema = new Schema ({
    content: {
        type: String, 
        required: true
    }, 
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }, 
    userName: String, 
    userAvatar: String
})

const deckSchema = new Schema ({
    title: {
        type: String, 
        required: true
    }, 
    notes: {
        type: String
    }, 
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      userName: String,
      userAvatar: String,
      comments: [deckCommentSchema]
    // user: userSchema // remember that the user schema used to be on this page so this will probably have to be changed
}, {
    timestamps: true
})


module.exports = mongoose.model('Deck', deckSchema)