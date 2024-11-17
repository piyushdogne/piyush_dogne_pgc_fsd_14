import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrowseBooks from "./pages/BrowseBooks";
import AddBook from "./pages/AddBook";
import BookDetails from "./pages/BookDetailsPage";
import NotFoundPage from "./pages/NotFound";
import BooksByCategory from "./pages/BooksByCategory";
import Navbar from "./components/Navbar";
import NewlyAddedBooks from "./pages/NewlyAddedBooks";

function App() {
  return (
    <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BrowseBooks />} />
        <Route path="/books/:category" element={<BrowseBooks />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/book/works/:id" element={<BookDetails />} />
        <Route path="/categories" element={<BooksByCategory />} />
        <Route path="/newly-added-books" element={<NewlyAddedBooks />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
