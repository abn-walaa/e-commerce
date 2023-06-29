const express = require('express')
const router = express.Router()

const Collection = require('../db/modules/collection')
const Products = require('../db/modules/products')
const Users = require('../db/modules/users')
const Order = require('../db/modules/order')
const sharp = require('sharp')
const multer = require('multer')
const errorHandling = require('../controllers/ErrorHandling')
const { Types: { ObjectId: { isValid }, }, isValidObjectId, Types } = require('mongoose')
const User = require('../db/modules/users')
// buffering upload
const upload = multer({
    limits: {
        fieldSize: 10 * 1024 * 1024,
    },
    fileFilter: async (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PNG and JPEG files are allowed.'), false);
        }
    }
})
//ADD products
router.post('/product/', upload.array('imgs', 10), async (req, res) => {
    try {
        if (!req.files[0]?.buffer) {
            throw new Error("imgs missing")
        }
        // check collection
        let collection = await Collection.findById(req.body.collection)
        if (!collection) {
            throw new Error("The collection Not found ! ")
        }
        const imgs = await Promise.all(req.files.map(async e => {
            let buffer = await sharp(e.buffer).webp({ lossless: true }).toBuffer()
            return { buffer: buffer }
        }))
        let product = new Products({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            imgs: imgs,
            owner: req.user.id,
            Collection: req.body.collection
        })

        await product.save()

        res.send(product)
    } catch (error) {
        errorHandling(res, error)
    }
})
// upadate product
router.patch('/product/:id', upload.array('imgs', 10), async (req, res) => {
    try {
        // check for the id
        if (!isValid(req.params.id)) {
            throw new Error("The id is not valed")
        }
        // check for product
        let product = await Products.findOne({ _id: req.params.id })

        if (!product) {
            res.status(404).send();
            return;
        }
        // check collection
        if (req.body.collection) {
            let collection = await Collection.findById(req.body.collection)
            if (!collection) {
                throw new Error("The collection Not found ! ")
            }
            product.Collection = collection
        }
        // put the now pic as webp
        if (req.files.length !== 0) {
            const imgs = await Promise.all(req.files.map(async e => {
                let buffer = await sharp(e.buffer).webp({ lossless: true }).toBuffer()
                return { buffer: buffer }
            }))
            product.imgs = imgs;
        }
        //
        product.price = req.body.price ? req.body.price : product.price
        product.title = req.body.title ? req.body.title : product.title
        product.description = req.body.description ? req.body.description : product.description

        await product.save()

        res.send(product)
    } catch (error) {
        // console.log(error)
        errorHandling(res, error)
    }
})
// delete producte
router.delete('/product/', async (req, res) => {
    try {
        // check for the id
        if (!isValid(req.body.id)) {
            throw new Error("The id is not valed")
        }
        // check for product
        let product = await Products.deleteOne({ id: req.body.id })

        if (!product.acknowledged) {
            res.status(400).send();
            return;
        }
        res.send()
    } catch (error) {
        errorHandling(res, error)
    }
})
// ADD collection 
router.post('/collection/', async (req, res) => {
    try {
        // check for product
        let collection = new Collection({
            name: req.body.name,
            owner: req.user.id
        })
        await collection.save()

        res.send(collection)
    } catch (error) {
        errorHandling(res, error)
    }
})
// update collection 
router.patch('/collection/', async (req, res) => {
    try {
        // check for product

        let collection = await Collection.findById(req.body.id)
        if (!collection) {
            throw new Error("collection Not found !")
        }
        collection.name = req.body.name
        await collection.save()
        res.send(collection)
    } catch (error) {
        errorHandling(res, error)
    }
})
// delete collection 
router.delete('/collection/', async (req, res) => {
    try {
        // check for product
        let collection = await Collection.findOne({ _id: req.body.id })

        if (!collection.acknowledged) {
            res.status(400).send();
            return;
        }
        let prodects = await Products.findOne({ Collection: collection._id })
        if (prodects) {
            throw new Error("You can't delet the collection bcause there is porducts !")
        }
        res.send()
    } catch (error) {
        errorHandling(res, error)
    }
})
// getAll orders
router.get('/orders/', async (req, res) => {
    try {
        let $skip = req.body.skip || 0
        let $limit = req.body.limit || 5
        let orders = await Order.aggregate([
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
            }, {
                $lookup: {
                    from: 'users',
                    localField: 'owner',
                    foreignField: '_id',
                    as: 'owner'
                }
            },
            { $unwind: "$owner" }
            ,
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
// update order status
router.patch('/order', async (req, res) => {
    try {
        const id = req.body.id
        if (!isValidObjectId(id)) {
            throw new Error("The id is not valid")
        }
        let order = await Order.find({ id })
        order.status = req.body.status
        await order.save()
        res.send(order)
    } catch (error) {
        errorHandling(res, error)
    }
})
// get order by id
router.get('/order/:id', async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            throw new Error("Product isn't valid")
        }
        // Problem n+1 !!!
        // let order = await Order.findOne({ _id: req.params.id }).populate({ path: 'products.product' }).populate({ path: "owner" }) 
        let order = await Order.aggregate([
            {
                $match: { _id: new Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products.product',
                    foreignField: '_id',
                    as: 'joind'
                }
            }, {
                $lookup: {
                    from: 'users',
                    localField: 'owner',
                    foreignField: '_id',
                    as: 'owner'
                }
            },
            {
                $unwind: "$owner"
            }
            ,
            {
                $project: {
                    joind: {
                        owner: 0
                    },
                    products: {
                        _id: 0
                    },
                    owner: {
                        tokens: 0,
                        password: 0,
                        email: 0
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
        res.send(order)
    } catch (error) {
        errorHandling(res, error)
    }
})
// get Orders of user
router.get('/orders/user/', async (req, res) => {
    try {
        console.log(req.body)
        let id = req.body.id

        if (!isValidObjectId(id)) {
            throw new Error("ID is not valid")
        }
        // Problem n+1 !!!
        // let order = await Order.findOne({ _id: req.params.id }).populate({ path: 'products.product' }).populate({ path: "owner" }) 
        let orders = await Order.aggregate([
            {
                $match: { owner: new Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products.product',
                    foreignField: '_id',
                    as: 'joind'
                }
            }, {
                $lookup: {
                    from: 'users',
                    localField: 'owner',
                    foreignField: '_id',
                    as: 'owner'
                }
            },
            {
                $unwind: "$owner"
            }
            ,
            {
                $project: {
                    joind: {
                        owner: 0
                    },
                    products: {
                        _id: 0
                    },
                    owner: {
                        tokens: 0,
                        password: 0,
                        email: 0
                    }
                }
            }
        ]);
        if (!orders) {
            throw new Error("There is no Orders!")
        }
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
        res.send(orders)
    } catch (error) {
        errorHandling(res, error)
    }
})

// getAll users
router.get('/users', async (req, res) => {
    try {
        let skip = req.body.skip || 0
        let limit = req.body.limit || 10
        let users = await User.find({}, {}, { skip, limit })
        res.send(users)
    } catch (error) {
        errorHandling(res, error)
    }
})
// ADD SLIDER
const Slider = require('../db/modules/slider')
router.post('/slider', upload.single('img'), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error("Upload a img")
        }
        let buffer = await sharp(req.file.buffer).webp({ lossless: true }).toBuffer()
        let slider = await Slider.create({ buffer, URL: req.body.url, owner: req.user.id })
        res.send(slider)
    } catch (error) {
        errorHandling(res, error)
    }
})
// Delete a slider
router.delete('/slider', async (req, res) => {
    try {
        // check for the id
        if (!isValid(req.body.id)) {
            throw new Error("The id is not valed")
        }
        // delete a slider
        let slider = await Slider.deleteOne({ _id: req.body.id })
        // check
        if (!slider.acknowledged) {
            throw new Error("Not found !")
        }
        res.send()
    } catch (error) {
        errorHandling(res, error)
    }
})
module.exports = router