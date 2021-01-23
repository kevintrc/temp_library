const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const authorSchema = new Schema({
    nationality: {
        trim: true,
        type: String,
        required: true
    },
    name: {
        trim: true,
        type: String,
        required: true,
        unique: true
    },
    born: {
        trim: true,
        type: String,
        required: true
    },
    image: {
        required: true,
        type: Buffer,
    },
    description: {
        required: true,
        type: String
    }
})

const authorData = mongoose.model('authordata', authorSchema);

module.exports = authorData;  