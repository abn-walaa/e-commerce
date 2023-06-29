const mongoose = require('mongoose')

const Sch = new mongoose.Schema({
    buffer: {
        type: Buffer,
        required: [true, "Upload a img !"]
    },
    URL: {
        type: String,
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
    let slider = this
    slider = slider.toObject()
    delete slider.owner
    delete slider.buffer
    slider.imgURL = process.env.URL + "slider/" + slider._id
    return slider
}


const Slider = mongoose.model('slider', Sch);

module.exports = Slider