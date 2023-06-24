const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
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
        mixLength: 6
    },
    roll: {
        type: String,
        default: "customer"
    },
    tokens: [{
        token: {
            type: String
        }
    }]
})

// GEN TOKEN
Schema.methods.genToken = async () => {
    let user = this
    let token = jwt.sign({ _id: user.id.toString() }, process.env.JWT)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// PER THE SAVE HASH THE PASSWORD
Schema.pre('save', (next) => {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 8)
    }
    next()
})
// delete info
Schema.methods.toJSON = async () => {
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
    const check = bcrypt.compare(password, user.password);
    if (!check) {
        throw new Error("Password is wrong !")
    }

    return user;
}

const User = mongoose.model("users", Schema);

module.exports = User