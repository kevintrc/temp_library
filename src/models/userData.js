const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("Invalid Email Provided")
        }
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// usersSchema.pre('save', async function (next) {
//     const user = this;
//     user.password = await bcrypt.hash(user.password, 8)
//     next();
// })

usersSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, "secretcode")
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


usersSchema.statics.findByCredentials = async (email, password) => {
    const user = await userData.findOne({ email })
    if (!user) throw new Error("Unable to LOGIN(signup Please)")

    //const isMatch = await bcrypt.compare(password, user.password)
    if (password != user.password) throw new Error("Unable to LOGIN")

    return user
}

const userData = mongoose.model('userdata', usersSchema);
module.exports = userData;  