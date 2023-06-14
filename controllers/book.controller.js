const Book = require("../models/book.model");

const config = require("../config");

exports.create_book = (req, res) => {
  // Check for required fields
  if (!req.body.title || !req.body.author || !req.body.publicationYear) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  let newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    publicationYear: req.body.publicationYear,
  });
  newBook.save().then((book) => {
    if (book) {
      res.status(201).json(newBook);
    } else {
      console.error("Error creating a new book:", book);
      res.status(500).json({ error: "Failed to create a new book" });
    }
  });
};



exports.id_book = async (req, res) => {
    //req.params contains all direct parameters from the URL

    try {
        const book = await Book.findOne({ _id: req.params.id });

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.json(book);
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ error: "Server error" });
    }

};

exports.update_book = async (req, res) => {

    try {
        const updatedBook = await Book.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );

        if (updatedBook.nModified === 0) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.json({ message: "Book updated successfully" });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "Server error" });
    }


};
//delete book by id
exports.delete_book = async (req, res) => {
    try {
        await Book.findOneAndDelete({ _id: req.params.id })
            .then(book => {
                res.status(204).json({ book })
            })
            .catch(error => {
                res.status(404).json({ error })
            });
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve book' });
    }
};

exports.all_book = async (req, res) => {
    //get all book
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve books' });
    }
};