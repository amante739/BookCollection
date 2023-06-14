import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: "",
        author: "",
        publicationYear: "",
    });
    console.log(id);
    useEffect(() => {
        // Simulating book details retrieval
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/v1/books/${id}`
                );
                if (response.ok) {
                    const bookData = await response.json();
                    setBook(bookData);
                    console.log(bookData);
                } else {
                    console.error("Error fetching book details:", response.status);
                }
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };

        fetchBookDetails();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:5000/api/v1/books/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(book),
                }
            );
            if (response.ok) {
                const bookToUpdate = await response.json();
                // Implement the logic to update the book
                console.log("Book to update:", bookToUpdate);
            } else {
                console.error("Error retrieving book:", response.status);
            }
        } catch (error) {
            console.error("Error retrieving book:", error);
        }
        // After updating the book, navigate back to the book details page
        navigate(`/booklist`);
    };

    return (
        <div container>
            <h2>Edit Book</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={book.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Author:</label>
                    <input
                        type="text"
                        name="author"
                        className="form-control"
                        value={book.author}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Publication Year:</label>
                    <input
                        type="text"
                        name="publicationYear"
                        className="form-control"
                        value={book.publicationYear}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-outline-success">Update</button>
            </form>
        </div>
    );
};

export default EditBook;
