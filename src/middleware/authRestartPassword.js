const jwt = require('jsonwebtoken')
let User = require('../db/modules/users')
let errorHandling = require('../controllers/ErrorHandling')
const authRestartPassword = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error("Headers missing !")
        }

        let [code, token] = req.headers.authorization.split(" ")
        if (code !== "Bearer") {
            throw new Error("Header missing !")
        }
        token = jwt.verify(token, process.env.JWT)
        if (token.code !== req.body.code) {
            throw new Error("The code is wrong")
        }
        let user = await User.findOne({ passwordCode: token.code })

        if (!user) {
            throw new Error("Don't have authorize ")
        }

        req.user = user;
        next()
    } catch (error) {
        errorHandling(res, error)
    }
}
module.exports = authRestartPassword