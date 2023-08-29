const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardCommentSchema = new Schema ({
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

const cardSchema = new Schema ({
    front:{
        type: String,
        required: true
    }, 
    back: {
        type: String, 
        required: true
    }, 
    temperature: {
        type: Number, 
        // default: ()=> // think about the way you're going to implement temperature and where its going to start 
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }, 
    userName: String, 
    userAvatar: String,
    // deck: [{
    //     type: Schema.Types.ObjectId, 
    //     ref: 'Deck', 
    //     required: true
    // }], 
    comments: [cardCommentSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Card', cardSchema)