const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

// end point with GET Methode for localhost:5000/api/v1/books/all
router.get("/all", bookController.all_book);

// end point with GET Methode for localhost:5000/api/v1/books/:id
router.get("/:id", bookController.id_book);

// end point with POST Methode for localhost:5000/api/v1/books/create
router.post("/create",bookController.create_book);

// end point with PUT Methode for localhost:5000/api/v1/books/update/:id
router.put("/update/:id", bookController.update_book);

// end point with DELETE Methode for localhost:5000/api/v1/books/delete/:id
router.delete("/delete/:id",bookController.delete_book);

module.exports = router;
