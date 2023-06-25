const express = require('express')
const router = express.Router()

const Collection = require('../db/modules/collection')
const Products = require('../db/modules/products')
const Users = require('../db/modules/users')
const sharp = require('sharp')
const multer = require('multer')
const errorHandling = require('../controllers/ErrorHandling')
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

        let updates = Object.keys(req.body)
        let allowed = ["title", "description", "price", "imgs", "Collection"]
        let check = updates.every(e => allowed.includes(e))
        if (!check) {
            throw new Error("invalid value !")
        }
        // check for product
        let product = await Products.findById(req.params.id)
        if (!product) {
            res.status(404).send();
            return;
        }
        // check collection
        let collection = await Collection.findById(req.body.id)
        if (!collection) {
            throw new Error("The collection Not found ! ")
        }

        if (req.files) {
            const imgs = req.files.map(async e => {
                let buffer = await sharp(e.buffer).webp({ lossless: true }).toBuffer()
                return { buffer }
            })
            product.imgs = imgs;
        }
        updates.forEach(e => {
            product[e] = req.body[e]
        })
        await product.save()
        res.send(product)
    } catch (error) {
        errorHandling(res, error)
    }
})
// delete producte
router.delete('/product/', async (req, res) => {
    try {
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
router.patch('/collection/:id', async (req, res) => {
    try {
        // check for product

        let collection = await Collection.findById(req.params.id)
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
        let collection = await Collection.deleteOne(req.bpdy.id)
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