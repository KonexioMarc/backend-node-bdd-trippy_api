const passport = require('passport')
const LocalStrategy = require('passport-local')
const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await UserModel.findOne({
            username
        }).exec()
        console.log('user', user)
        if (!user) {
            return done(null, false)
        }
        const isCorrect = await bcrypt.compare(password, user.password)
        console.log('isCorrect', isCorrect)
        if (!isCorrect) {
            return done(null, false)
        }
        done(null, user)
    } catch(err) {
        console.error(err)
        done(null, false)
    }
}))

module.exports = passport