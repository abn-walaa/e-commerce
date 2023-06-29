const express = require('express')
const router = express.Router()

const Products = require('../db/modules/products')
const errorHandling = require('../controllers/ErrorHandling')
// return all products
router.post('/all', async (req, res) => {
    try {
        let $skip = req.body.skip || 0
        let $limit = req.body.limit || 5

        let products = await Products.aggregate([{
            // get the collection info
            $lookup: {
                from: "collections",
                localField: "Collection",
                foreignField: "_id",
                as: "Collection"
            },
        },
        {
            $unwind: {
                path: "$Collection"
            },
        }, {
            // get the owner of the product
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner"
            },
        },
        {
            // jsut one value
            $unwind: {
                path: "$owner"
            },
        }, {
            // Filtering the out data
            $project: {
                "_id": 1,
                title: 1,
                description: 1,
                price: 1,
                owner: {
                    name: 1,
                    _id: 1
                },
                imgs: 1,
                Collection: {
                    _id: 1,
                    name: 1
                },
                createdAt: 1,
                updatedAt: 1
            }
        }, { $skip }, {
            $limit
        },])
        // delete the img for the size of the requet and set a img url
        products.forEach(product => {
            product.imgURL = product.imgs.map((e, i) => process.env.URL + "product/" + product._id + "/" + i)
            delete product.imgs
        })
        res.send(products)
    } catch (error) {
        errorHandling(res, error)
    }
})
// return one product 
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id
        let product = await Products.findById(id).populate('collection');
        res.send(product)
    } catch (error) {
        errorHandling(res, error)
    }
})
// router get prodect img
router.get('/:id/:num', async (req, res) => {
    try {
        let product = await Products.findById(req.params.id);
        res.set('Content-Type', 'image/webp');
        res.send(product.imgs[req.params.num].buffer)
    } catch (error) {
        errorHandling(res, error)
    }
})

module.exports = router