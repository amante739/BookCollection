import React, { useEffect, useState } from "react";

const BookList = () => {
  const [books, setBooks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/books/all");
      const data = await response.json();
      console.log(data);
      setBooks(data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults(books);
    } else {
      const filteredResults = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  }, [searchTerm, books]);








  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <h1>Book Collection</h1>

      <div className="mt-4">
        <input
          className="form-control"
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Year</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publicationYear}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default BookList;
