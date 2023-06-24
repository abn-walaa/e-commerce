const isAdmin = async (req, res, next) => {
    try {
        let user = req.user
        if (user.roll !== "admin") {
            throw new Error("don't have Access !")
        }
        next()
    } catch (error) {
        res.status(400).send({ error: error })
    }
}
module.exports = isAdmin