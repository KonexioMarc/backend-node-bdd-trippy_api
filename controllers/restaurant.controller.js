const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const RestaurantModel = require('../models/restaurant.model')

router.get('/', async (req, res, next) => {
    // const restaurants = await RestaurantModel.find({}).exec()
    // console.log('restaurants', restaurants)

    RestaurantModel.find({}).exec()
        .then(function(restaurants) {
            console.log('restaurants', restaurants)
            res.json(restaurants)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send("Internal server error")
        })
})


router.get('/:id', function(req, res, next) {
    const id = req.params.id
    console.log('id', id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('The id needs to be an ObjecId')
    }
    RestaurantModel.findById(id)
        .exec()
        .then(restaurant => {
            console.log(restaurant)
            res.json(restaurant)
        })
        .catch(err => res.status(500).send("Internal server error"))
})


router.post('/', async function(req, res, next) {
    const body = req.body
    console.log('body', body)
    const newHotel = new RestaurantModel(body)

    // newHotel.save().then(hotel => res.json(hotel)).catch(err => res.status(500).send("Internal server error"))
    try {
        const restaurant = await newHotel.save()
        res.json(restaurant)
    } catch(err) {
        console.error(err)
        res.status(500).send("Internal server error")
    }
})


router.put('/:id', function(req, res, next) {
    const name = req.query.name
    const id = req.params.id
    console.log('name', name)
    console.log('id', id)
    RestaurantModel.findByIdAndUpdate(id, {
        name
    }, { new: true })
        .then(restaurantUpdated => {
            res.json(restaurantUpdated)
        }).catch(err => res.status(500).send("Internal server error"))
})


router.delete('/:id', function( req, res, next) {
    const id = req.params.id;
    RestaurantModel.findByIdAndDelete(id)
        .exec()
        .then(restaurantDeleted => {
            res.json(restaurantDeleted)
        }).catch(err => res.status(500).send("Internal server error"))
})


module.exports = router