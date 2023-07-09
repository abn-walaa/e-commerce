const jwt = require('jsonwebtoken')
let User = require('../db/modules/users')
let errorHandling = require('../controllers/ErrorHandling')
const auth = async (req, res, next) => {
    try {

        if (!req.headers.authorization) {
            throw new Error("Headers missing !")
        }

        let [code, token] = req.headers.authorization.split(" ")
        if (code !== "Bearer") {
            throw new Error("Header missing !")
        }

        let id = jwt.verify(token, process.env.JWT)
        let user = await User.findOne({ id: id.id, "tokens.token": token })

        if (!user) {
            throw new Error("not auth")
        }
        req.user = user;
        req.token = token;
        next()
    } catch (error) {
        errorHandling(res, { message: "don't have access" })
    }
}
module.exports = auth