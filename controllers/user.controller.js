const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const UserModel = require('../models/user.model')
const passport = require('passport')
const bcrypt = require("bcrypt");


router.post('/login', passport.authenticate('local'), (req, res, next) => {
    console.log('in post Login');
    res.json({
        message: `Bonjour ${req.user.username}`
    })
})

router.post('/signup', async(req, res, next) => {
    const body = req.body
    const hash = await bcrypt.hash(body.password, 5);
    const newUser = new UserModel({
        username: body.username,
        password: hash
    })
    const insertedUser = await newUser.save()
    res.json(insertedUser)
})


module.exports = router