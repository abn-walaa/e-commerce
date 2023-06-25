const express = require('express')
const router = express.Router()

const User = require('../db/modules/users')
const jwt = require('jsonwebtoken')
const errorHandling = require('../controllers/ErrorHandling')
// auth
const auth = require('../middleware/auth')
// new user
router.post('/logup', async (req, res) => {
    try {
        if (!req.body.password || !req.body.name || !req.body.email) {
            throw new Error("mssing info !")
        }

        let user = await User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        let token = await user.genToken()

        res.send({ user, token })

    } catch (error) {
        errorHandling(res, error)
    }
})

// log in user
router.post('/login', async (req, res) => {
    try {
        let user = await User.checkUser(req.body.email, req.body.password)

        let token = await user.genToken()

        res.send({ user, token })

    } catch (error) {
        errorHandling(res, error)
    }
})
// log out user of this token
router.delete('/logout', auth, async (req, res) => {
    try {
        let user = req.user
        user.tokens = user.tokens.filter(e => e.token !== req.token)
        console.log(user.tokens)
        await user.save()
        res.send()
    } catch (error) {
        errorHandling(res, error)
    }
})
//log out of all tokens
router.delete('/logoutAll', auth, async (req, res) => {
    try {
        let user = req.user
        user.tokens = []
        await user.save()
        res.send()
    } catch (error) {
        errorHandling(res, error)
    }
})

module.exports = router