const express = require('express')
const router = express.Router()

const Collection = require('../db/modules/collection')
const Products = require('../db/modules/products')
// return all collections
router.post('/all', async (req, res) => {
    try {
        let collection = await Collection.find({});
        res.send(collection)
    } catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})
// return one collection 
router.post('/:id', async (req, res) => {
    try {
        let products = await Products.find({ collection: req.params.id });
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
