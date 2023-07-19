let errorHandling = require('../controllers/ErrorHandling')

const isAdmin = async (req, res, next) => {
    try {

        let user = req.user

        if (user.roll !== "admin") {
            throw new Error("don't have Access !")
        }

        next()
    } catch (error) {
        errorHandling(res, error)
    }
}
module.exports = isAdmin