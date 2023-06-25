const express = require('express')
const router = express.Router()

const Products = require('../db/modules/products')

// return all products
router.post('/all', async (req, res) => {
    try {

        let products = await Products.find().populate('collection');
        products = products.map(product => {
            product.imgURL = product.imgs(e => process.env.URL + e.id)
            return product
        })
        res.send(products)
    } catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})
// return one product 
router.post('/:id', async (req, res) => {
    try {
        let id = req.params.id
        let product = await Products.findOne({ id: req.params.id }).populate('collection');
        product.imgURL = product.imgs(e => process.env.URL + e.id)
        res.send(products)
    } catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})
// router get prodect img
router.post('/:id/:num', async (req, res) => {
    try {
        let product = await Products.findOne({ id: req.params.id });
        res.set('Content-Type', 'image/webp');
        res.send(product.imgs[req.params.num])
    } catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})

module.exports = router