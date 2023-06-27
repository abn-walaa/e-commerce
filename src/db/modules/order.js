const mongoose = require('mongoose')

const Sch = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products"
        },
        howmMach: {
            type: Number,
            default: 1
        }
    }],
    Totel: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
        index: true
    },
    status: {
        type: String,
        default: "Hold",
        index: true
    }
}, {
    timestamps: true
});


const Order = mongoose.model('order', Sch);

module.exports = Order