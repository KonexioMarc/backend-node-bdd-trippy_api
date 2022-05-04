const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const HotelModel = require('../models/hotel.model')
const passport = require('passport')

router.get('/', passport.authorize('local'), async (req, res, next) => {
    // const hotels = await HotelModel.find({}).exec()
    // console.log('hotels', hotels)

    HotelModel.find({})
        .populate('rooms')
        .exec()
        .then(function(hotels) {
            console.log('hotels', hotels)
            res.json(hotels)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send("Internal server error")
        })
})


router.get('/:id',  function(req, res, next) {
    const id = req.params.id
    console.log('id', id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('The id needs to be an ObjecId')
    }
    HotelModel.findById(id)
        .populate('rooms')
        .exec()
        .then(hotel => {
            console.log(hotel)
            res.json(hotel)
        })
        .catch(err => res.status(500).send("Internal server error"))
})


router.post('/', passport.authorize('local'), async function(req, res, next) {
    const body = req.body
    console.log('body', body)
    const newHotel = new HotelModel(body)

    // newHotel.save().then(hotel => res.json(hotel)).catch(err => res.status(500).send("Internal server error"))
    try {
        const hotel = await newHotel.save()
        res.json(hotel)
    } catch(err) {
        console.error(err)
        res.status(500).send("Internal server error")
    }
})


router.put('/:id', passport.authorize('local'), function(req, res, next) {
    const name = req.query.name
    const id = req.params.id
    console.log('name', name)
    console.log('id', id)
    HotelModel.findByIdAndUpdate(id, {
        name
    }, { new: true })
        .then(hotelUpdated => {
            res.json(hotelUpdated)
        }).catch(err => res.status(500).send("Internal server error"))
})


router.delete('/:id', function( req, res, next) {
    const id = req.params.id;
    HotelModel.findByIdAndDelete(id)
        .exec()
        .then(hotelDeleted => {
            res.json(hotelDeleted)
        }).catch(err => res.status(500).send("Internal server error"))
})


module.exports = router