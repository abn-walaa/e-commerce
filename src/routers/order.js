const express = require('express')
const router = express.Router()

const Order = require('../db/modules/order')
const Products = require('../db/modules/products')
const { isValidObjectId, ObjectId, Types } = require('mongoose')
const errorHandling = require('../controllers/ErrorHandling')

// new order
router.post('/new', async (req, res) => {
    try {

        let data = req.body

        if (!data && data.length === 0 && !Array.isArray(data)) {
            throw new Error("There is no products !")
        }
        // checking the info
        let productsIds = data.map(e => {
            let check = (Object.keys(e)).every((e) => ["product", "howMach"].includes(e))
            if (!check) {
                throw new Error("the data keys is wrong ")
            }
            let id = e.product

            if (!isValidObjectId(id)) {
                throw new Error("Product isn't valid")
            }
            return id
        })
        // let productsIds = data.map(e => ObjectId(e.product))

        let products = await Products.find({ _id: { $in: productsIds } })
        if (products.length !== data.length) {
            throw new Error("Product isn't valid")
        }
        let totle = 0;

        data.forEach(e => {
            let product = products.find(element => element.id === e.product)
            totle += product.price * e.howMach
        })
        console.log(data)
        let order = await Order.create({
            owner: req.user.id,
            products: data,
            Totel: totle
        })
        res.send(order)
    } catch (error) {
        errorHandling(res, error)
    }
})
// get my orders
router.post('/', async (req, res) => {
    try {

        let $skip = req.body.skip || 0
        let $limit = req.body.limit || 5

        let orders = await Order.aggregate([
            {
                $match: {
                    owner: req.user._id
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products.product',
                    foreignField: '_id',
                    as: 'joind'
                }
            },
            {
                $skip
            }, {
                $limit
            },
            {
                $project: {
                    joind: {
                        owner: 0
                    },
                    products: {
                        _id: 0
                    }
                }
            }
        ]);
        let TypeOfOrders = await Order.distinct("status")
        orders.forEach(order => {
            order.products = order.products.map(items => {
                // find from the join into the products.product
                items.product = order.joind.find(e => e._id.equals(items.product))
                // delete the imgs array and set the imgURL
                items.product.imgURL = items.product.imgs.map((e, i) => process.env.URL_ProductIMG + items.product._id + "/" + i)
                // deleting the buffer
                delete items.product.imgs
                return items
            })
            // delete the joind
            delete order.joind

        })
        res.send({ orders, TypeOfOrders })
    } catch (error) {
        errorHandling(res, error)
    }
})
// get my order
router.get('/:id', async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            throw new Error("Product isn't valid")
        }
        // maby cuz n+1 
        // let order = await Order.findOne({ owner: req.user.id, _id: req.params.id }).populate({ path: 'products.product' })
        let order = await Order.aggregate([
            {
                $match: { _id: new Types.ObjectId(req.params.id), "owner": new Types.ObjectId(req.user.id) }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products.product',
                    foreignField: '_id',
                    as: 'joind'
                }
            },
            {
                $project: {
                    joind: {
                        owner: 0
                    },
                    products: {
                        _id: 0
                    }
                }
            }
        ]);
        order = order[0]
        order.products = order.products.map(items => {
            // find from the join into the products.product
            items.product = order.joind.find(e => e._id.equals(items.product))
            // delete the imgs array and set the imgURL
            items.product.imgURL = items.product.imgs.map((e, i) => process.env.URL_ProductIMG + items.product._id + "/" + i)
            // deleting the buffer
            delete items.product.imgs
            return items
        })
        // delete the joind
        delete order.joind
        delete req.user.email
        order.owner = req.user

        res.send(order)
    } catch (error) {
        errorHandling(res, error)
    }
})
module.exports = router