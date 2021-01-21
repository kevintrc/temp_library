const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Library')

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    nationality: String,
    name: String,
    born: Number,
    image: Buffer,
    description: String
})

const authorData = mongoose.model('authordata', authorSchema);

module.exports = authorData;  