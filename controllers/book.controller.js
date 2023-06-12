const Book = require("../models/book.model");
const fs = require('fs');
const config = require("../config");

let inMemoryBooks = [];
exports.create_book = (req, res) => {
    if (config.database.inMemory) {
        const newBook = { title, author, publicationYear };
        inMemoryBooks.push(newBook);
        res.status(201).json(newBook);
    } else {
        let newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            publicationYear: req.body.publicationYear
        });
        newBook.save().then((book) => {
            if (book) {
                res.status(201).json(newBook);
            } else {

                console.error('Error creating a new book:', book);
                res.status(500).json({ error: 'Failed to create a new book' });
            }
        });
    }
};

// Load books from a JSON file
// const loadBooksFromFile = () => {
//   fs.readFile('books.json', 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error loading books from file:', err);
//     } else {
//       inMemoryBooks = JSON.parse(data);
//       console.log('Books loaded from file');
//     }
//   });
// };
// Save books to a JSON file
// const saveBooksToFile = () => {
//   fs.writeFile('books.json', JSON.stringify(inMemoryBooks), (err) => {
//     if (err) {
//       console.error('Error saving books to file:', err);
//     } else {
//       console.log('Books saved to file');
//     }
//   });
// };
if (config.database.inMemory) {
    //  loadBooksFromFile();

    // Save books to file when the application is closed
    process.on('exit', () => {
        //saveBooksToFile();
    });
}

exports.id_book = async(req, res) => {
    //req.params contains all direct parameters from the URL
   // console.log(req.params.id);

    try {
        await Book.findOne({ _id: req.params.id })
        .then(book => {
            res.status(200).json({ book })
        })
        .catch(error => {
            res.status(404).json({ error })
        });
    } catch(err){
        res.status(500).json({ error: 'Failed to retrieve book' });
    }

};

exports.update_book = async(req, res) => {
    //single book update by id

     try {
        await Book.updateOne({ _id: req.params.id }, { $set: req.body })
        .then(book => {
            res.status(200).json({ book })
        })
        .catch(error => {
            res.status(404).json({ error })
        });
    } catch(err){
        res.status(500).json({ error: 'Failed to retrieve book' });
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
    } catch(err){
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