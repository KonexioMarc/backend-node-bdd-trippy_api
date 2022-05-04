const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    "people": Number,
    "price": Number,
    "hasBathroom": Boolean
})

module.exports = mongoose.model('room', roomSchema)