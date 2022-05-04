const mongoose = require('mongoose')
const RoomModel = require('./room.model')

const hotelSchema = new mongoose.Schema({
    "name": String,
    "address": String,
    "city": String,
    "country": String,
    "stars": {
        type: Number,
        min: 1,
        max: 5
    },
    "hasSpa": Boolean,
    "hasPool": Boolean,
    "priceCategory": {
        type: Number,
        min: 1,
        max: 3
    },
    "rooms": [{
        type: mongoose.Types.ObjectId,
        ref: 'room'
    }]
})

module.exports = mongoose.model('Hotel', hotelSchema)