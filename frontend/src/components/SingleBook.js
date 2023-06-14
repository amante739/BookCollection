import { useState, useEffect } from "react";

const SingleBook = ({ match }) => {
  const bookId = match.params.id;
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await fetch(`/api/books/${bookId}`);
      if (response.ok) {
        const bookData = await response.json();
        setBook(bookData);
      } else {
        console.error("Error fetching book:", response.status);
      }
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  return (
    <div>
      <h2>Book Details</h2>
      {book ? (
        <div>
          <h3>Title: {book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Publication Year: {book.publicationYear}</p>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default SingleBook;
