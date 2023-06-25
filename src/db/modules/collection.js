const mongoose = require('mongoose')

const Sch = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is missing"],
        unique: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }
}, {
    timestamps: true
});
// hide info
Sch.methods.toJSON = function () {
    let collection = this

    collection = collection.toObject()
    delete collection.owner

    return collection
}

const Collection = mongoose.model('collections', Sch);

module.exports = Collection