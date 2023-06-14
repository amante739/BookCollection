import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const NewBook = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        publicationYear: "",
    });
    const navigate = useNavigate();



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:5000/api/v1/books/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newBook),
                }
            );
            if (response.ok) {
                const createdBook = await response.json();
                setBooks([...books, createdBook]);
                setNewBook({ title: "", author: "", publicationYear: "" });
                navigate("/");
            } else {
                console.error("Error creating book:", response.status);
            }
        } catch (error) {
            console.error("Error creating book:", error);
        }
    };




    return (
        <div className="container">
            <h1>Book Collection</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={newBook.title}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Author:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="author"
                        value={newBook.author}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Publication Year:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="publicationYear"
                        value={newBook.publicationYear}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Create Book
                </button>
            </form>

        </div>
    );
};

export default NewBook;
