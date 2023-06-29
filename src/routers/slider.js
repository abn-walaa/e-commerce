const express = require('express')
const router = express.Router()
const errorHandling = require('../controllers/ErrorHandling')
const Slider = require('../db/modules/slider')
// getAll sliders
router.get('/', async (req, res) => {
    try {
        let sliders = await Slider.find().sort({ "createAt": "asc" })

        res.send(sliders)
    } catch (error) {
        errorHandling(res, error)
    }
})
// get img of slider
router.get('/:id', async (req, res) => {
    try {
        let slider = await Slider.findById(req.params.id)
        res.set('Content-Type', 'image/webp');
        res.send(slider.buffer)
    } catch (error) {
        errorHandling(res, error)
    }
})

module.exports = router