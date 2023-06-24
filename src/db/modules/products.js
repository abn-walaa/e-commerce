const mongoose = require('mongoose')

const Sch = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    imgs: [{
        img: Buffer,
        required: true
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    collection: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "collection"
    }
})

Sch.methods.toJSON = async () => {
    let product = this
    product = product.toObject()
    delete product.imgs
    delete product.owner
    return product
}
const products = mongoose.model('products', Sch)

module.exports = products