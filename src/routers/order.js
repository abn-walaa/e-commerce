const express = require('express')
const router = express.Router()

const Order = require('../db/modules/order')
const Products = require('../db/modules/products')
const { ObjectId } = require('mongoose')
// new order
router.post('/new', async (req, res) => {
    try {
        if (!req.body.products && req.body.products.length === 0 && !Array.isArray(req.body.products)) {
            throw new Error("There is no products !")
        }

        let productsIds = req.body.products.map(e => ObjectId(e.product))
        let products = await Products.find({ _id: { $in: productsIds } })

        let totle = 0;

        req.body.products.forEach(e => {
            let product = products.find(element => element._id === e.product)
            totle += product.price * e.howMach
        })

        let order = await Order.create({
            owner: req.user.id,
            products: req.body.products,
            Totel: totle
        })

        res.send(order)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})
// get my orders
router.get('/', async (req, res) => {
    try {
        let orders = await Order.aggregate([
            { owner: req.user.id },
            {
                $lookup: {
                    from: "prodect",
                    localField: "owner",
                    foreignField: "_id",
                    as: "product"
                },
            },
            // { $unwind: "$" }
            {
                $lookup: {
                    from: 'collection',
                    localField: 'product.Collection',
                    foreignField: '_id',
                    as: 'joinedCollection'
                }
            }
        ])

        res.send(orders)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})
