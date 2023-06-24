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
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    Collection: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "collection"
    }
}, {
    timestamps: true
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