const express = require('express')
const app = express()
const port = 3001
const mongoose = require('mongoose')
const HotelRouter = require('./controllers/hotel.controller')
const RestaurantRouter = require('./controllers/restaurant.controller')
const UserRouter = require('./controllers/user.controller')
const passport = require('./config/passport')
const session = require('express-session')

const UserModel = require('./models/user.model')

mongoose.connect('mongodb://localhost:27017/trippy_basics')

app.use(express.json())

// on configure la session
app.use(session({
    secret: 'asupersecret123',
    resave: false,
    saveUninitialized: true,
}))

// Serialize et deserialize user sont utilisé en association avec la session (lorsque l'utilisateur est authentifié)
// Elle permette de recuperer l'utilisateur de la session et 
// connaitre l'information a sauvegarder dans la session
passport.serializeUser((user, done) => {
    console.log('in serializeUser', user)
    done(null, user._id)
})
passport.deserializeUser(async (id, done) => {
    console.log('in deserializeUser', id)
    const user = await UserModel.findById(id).exec()
    done(null, user)
})

app.use(passport.initialize())
app.use(passport.session());


app.use('/hotels', HotelRouter)
app.use('/restaurants', RestaurantRouter)
app.use('/users', UserRouter)

app.listen(port, () => {
    console.log('The server is listenning at port', 3001)
})