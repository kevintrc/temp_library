const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const booksSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    genre: {
        type: String,
        required: true,
        trim: true

    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        required: true,
        type: Buffer
    },
    description: {
        required: true,
        type: String
    }
})

const bookData = mongoose.model('bookdata', booksSchema);

module.exports = bookData;  