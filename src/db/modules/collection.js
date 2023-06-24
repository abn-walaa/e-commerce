const mongoose = require('mongoose')

const Sch = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }
});
// hide info
Sch.methods.toJSON = async () => {
    let collection = this
    collection = collection.toObject()
    delete collection.owner
    return collection
}

const Collection = mongoose.model('collection', Sch);

module.exports = Collection