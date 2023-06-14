import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Book = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/v1/books/all");
            const data = await response.json();
            console.log(data);
            setBooks(data);

        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };


    const handleUpdateBook = async (bookId) => {

        navigate(`/book/${bookId}/edit`);

    };

    const handleDeleteBook = async (bookId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/v1/books/delete/${bookId}`,
                {
                    method: "DELETE",
                }
            );
            if (response.ok) {
                const updatedBooks = books.filter((book) => book.id !== bookId);
                setBooks(updatedBooks);
                fetchBooks();
            } else {
                console.error("Error deleting book:", response.status);
            }
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };


    return (
        <div className="container">
            <h1>Book Collection</h1>

            <table className="table mt-4 border-1">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publication Year</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book._id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publicationYear}</td>
                            <td>
                                {" "}
                                <button
                                    onClick={() => handleUpdateBook(book._id)}
                                    className="btn  btn-outline-success"
                                >
                                    Update{" "}
                                </button>

                            </td>
                            <td>
                                {" "}
                                <button
                                    onClick={() => handleDeleteBook(book._id)}
                                    className="btn btn-outline-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Book;
