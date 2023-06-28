const express = require('express')
const router = express.Router()
const errorHandling = require('../controllers/ErrorHandling')
// Get my info
router.get('/info', async (req, res) => {
    try {
        res.send(req.user)
    } catch (error) {
        errorHandling(res, error)
    }
})

module.exports = router