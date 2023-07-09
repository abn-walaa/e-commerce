const express = require('express')
const router = express.Router()

const User = require('../db/modules/users')
const jwt = require('jsonwebtoken')
const errorHandling = require('../controllers/ErrorHandling')
const email = require('../controllers/emails/RestartPassword')
let authRestartPassword = require('../middleware/authRestartPassword')
const { v1 } = require('uuid')
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
        console.log(req.body)
        if (!req.body.email || !req.body.email) {
            throw new Error('Missing info')
        }
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
//get Code
router.post('/forgotPassword', async (req, res) => {
    try {
        if (!req.body.email) {
            throw new Error("Plase Enter a email.")
        }
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw new Error("Email not valid")
        }
        let code = v1().substring(0, 8)
        user.passwordCode = code
        let token = jwt.sign({ id: user.id, code }, process.env.JWT, { expiresIn: "3h" })
        await user.save()
        email(user.email, code).catch(e => console.log(e))
        res.send({ token })
    } catch (error) {
        errorHandling(res, error)
    }
})
// restart the password 
router.patch('/forgotPassword', authRestartPassword, async (req, res) => {
    try {
        let user = req.user
        if (req.body.password < 6) {
            throw new Error("Password should be min Length is 6")
        }
        user.password = req.body.password
        user.passwordCode = undefined
        await user.save()

        res.send()
    } catch (error) {
        errorHandling(res, error)
    }
})
module.exports = router