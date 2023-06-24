const express = require('express')
const router = express.Router()

const User = require('../db/modules/users')
const jwt = require('jsonwebtoken')
// auth
const auth = require('../middleware/auth')
// new user
router.post('/logup', async (req, res) => {
    try {

        let user = User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        let token = await user.genToken()

        res.send({ user, token })

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

// log in user
router.post('/login', async (req, res) => {
    try {
        let user = await User.checkUser(req.body.email, req.body.password)

        let token = await user.genToken()

        res.send({ user, token })

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})
// log out user of this token
router.delete('/logout', auth, async (req, res) => {
    try {
        let user = req.user
        user.tokens = user.tokens.map(token => token != req.token)
        await user.save()
        res.send()
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
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
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router