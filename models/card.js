const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        required: true, 
        // default: ()=> // think about the way you're going to implement temperature and where its going to start 
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Card', cardSchema)