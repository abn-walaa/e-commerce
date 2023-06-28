const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Plase enter the name filed"]
    },
    email: {
        type: String,
        required: [true, "Plase enter  email !"],
        unique: true,
        validate(v) {
            if (!validator.isEmail(v)) {
                throw new Error('Email is wrong ')
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: [5, 'min length is 6']
    },
    roll: {
        type: String,
        default: "customer"
    },
    tokens: [{
        token: {
            type: String
        }
    }],
    passwordCode: String
}, {
    timestamps: true
})

// GEN TOKEN
Schema.methods.genToken = async function () {
    let user = this

    let token = jwt.sign({ _id: user.id.toString() }, process.env.JWT)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// PER THE SAVE HASH THE PASSWORD
Schema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 8)
    }
    next()
})
// delete info
Schema.methods.toJSON = function () {
    let user = this
    user = user.toObject()
    delete user.password
    delete user.tokens
    return user
}

Schema.statics.checkUser = async (email, password) => {
    let user = await User.findOne({ email })
    if (!user) {
        throw new Error("No user found !")
    }
    const check = await bcrypt.compare(password, user.password);

    if (!check) {
        throw new Error("Password is wrong !")
    }

    return user;
}

const User = mongoose.model("users", Schema);

module.exports = User