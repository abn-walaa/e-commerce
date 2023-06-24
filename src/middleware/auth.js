const jwt = require('jsonwebtoken')
let User = require('../db/modules/users')

const auth = async (req, res, next) => {
    try {
        let [code, token] = req.headers.Authorization.splite(" ")
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
        res.status(400).send({ error: error })
    }
}
module.exports = auth