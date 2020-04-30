const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    genre: { type: String, required: true },
    author: { type: String, required: true },
    read: { type: Boolean, required: true }
});

module.exports = mongoose.model('Book', bookSchema);