const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Library')

const Schema = mongoose.Schema;

const booksSchema = new Schema({
    title: String,
    genre: String,
    author: String,
    image: Buffer,
    description: String
})

const bookData = mongoose.model('bookdata', booksSchema);

module.exports = bookData;  