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
        ref: "user",
        index: true
    },
    status: {
        type: String,
        default: "Hold"
    }
}, {
    timestamps: true
});


const Oder = mongoose.model('order', Sch);

module.exports = Oder