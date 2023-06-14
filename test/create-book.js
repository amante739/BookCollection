const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const Book = require("../models/book.model");
const mongoose = require("mongoose");
chai.use(chaiHttp);
const expect = chai.expect;

describe("Create Book API", () => {
  beforeEach(async () => {
    // Clear the books collection before each test
      await Book.deleteMany();
      
  });

  after(async () => {
    // Close the database connection after all tests
      await mongoose.connection.close();
    
     
  });

  it("should create a new book", (done) => {
    const newBook = {
      title: "Test Book",
      author: "Test Author",
      publicationYear: '2023',
    };

    chai
      .request("localhost:5000")
      .post("/api/v1/books/create")
      .send(newBook)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("_id");
        expect(res.body.title).to.equal(newBook.title);
        expect(res.body.author).to.equal(newBook.author);
        expect(res.body.publicationYear).to.equal(newBook.publicationYear);

        // Verify that the book is saved in the database
        Book.findOne({ _id: res.body._id })
          .then((book) => {
            expect(book).to.exist;
            expect(book.title).to.equal(newBook.title);
            expect(book.author).to.equal(newBook.author);
            expect(book.publicationYear).to.equal(newBook.publicationYear);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
      //done();
      
  });

  it("should return 400 if required fields are missing", (done) => {
    const invalidBook = {
      author: "Test Author",
      publicationYear: "2023",
    };

    chai
      .request("localhost:5000")
      .post("/api/v1/books/create")
      .send(invalidBook)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal("Missing required fields");
        
        done();
      });
     
  });
});
