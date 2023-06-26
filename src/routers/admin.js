const express = require('express')
const router = express.Router()

const Collection = require('../db/modules/collection')
const Products = require('../db/modules/products')
const Users = require('../db/modules/users')
const sharp = require('sharp')
const multer = require('multer')
const errorHandling = require('../controllers/ErrorHandling')
const { Types: { ObjectId: { isValid } } } = require('mongoose')
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
router.post('/product', upload.array('imgs', 10), async (req, res) => {
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
router.post('/collection', async (req, res) => {
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

        let collection = await Collection.deleteOne({ _id: req.body.id })
        if (!collection.acknowledged) {
            res.status(400).send();
            return;
        }

        res.send()
    } catch (error) {
        errorHandling(res, error)
    }
})


module.exports = router