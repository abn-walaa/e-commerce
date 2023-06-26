const mongoose = require('mongoose')

const Sch = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    imgs: [{
        buffer: Buffer,
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    Collection: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "collections",
        index: true
    }
}, {
    timestamps: true
})

Sch.methods.toJSON = function () {
    let product = this
    product = product.toObject()
    product.imgURL = product.imgs.map((e, i) => process.env.URL_ProductIMG + product._id + "/" + i)
    delete product.imgs
    delete product.owner

    return product
}
const products = mongoose.model('products', Sch)

module.exports = products