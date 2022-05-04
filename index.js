const express = require('express')
const app = express()
const port = 3001
const mongoose = require('mongoose')
const HotelRouter = require('./controllers/hotel.controller')
const RestaurantRouter = require('./controllers/restaurant.controller')

mongoose.connect('mongodb://localhost:27017/trippy_basics')

app.use(express.json())

app.use('/hotels', HotelRouter)
app.use('/restaurants', RestaurantRouter)

app.listen(port, () => {
    console.log('The server is listenning at port', 3001)
})