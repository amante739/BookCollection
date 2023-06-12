const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    author: String,
    publicationYear: String,
});

module.exports = mongoose.model("Book", bookSchema, "book");