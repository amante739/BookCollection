import { Route, Routes, useNavigate } from "react-router-dom";
import BookList from "./components/BookList";
import Book from "./components/Book";
import SingleBook from "./components/SingleBook";
import NewBook from "./components/NewBook";
import EditBook from "./components/EditBook"
function App() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <button
          className="navbar-brand btn btn-link"
          onClick={() => handleNavigation("/")}
        >
          Home
        </button>
        <button
          className="navbar-brand btn btn-link"
          onClick={() => handleNavigation("/booklist")}
        >
          Book List
        </button>
        <button
          className="navbar-brand btn btn-link"
          onClick={() => handleNavigation("/book/create")}
        >
          New Book
        </button>
      </nav>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/booklist" element={<Book />} />
        <Route path="/book/create" element={<NewBook />} />
        <Route path="/book/:id" element={<SingleBook />} />
        <Route path="/book/:id/edit" element={<EditBook />} />

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </div>
  );
}

export default App;
