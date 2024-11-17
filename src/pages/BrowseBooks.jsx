import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../redux/booksSlice";
import ShimmerEffect from "../components/ShimmerEffect"; // Import the ShimmerEffect component

const BrowseBooks = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { list: books, status, error } = useSelector((state) => state.books);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
     dispatch(fetchBooks({ category, limit: 50 })); // Fetch 50 books
  }, [dispatch, category]);

  const filteredBooks = books.filter((book) =>
    [book.title, book.author].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Browse Books</h1>
        {category && <p className="text-gray-600">Category: {category}</p>}
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-4 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </header>
      <main>
        {status === "loading" && (
          <ShimmerEffect count={10} /> // Use ShimmerEffect for loading
        )}
        {status === "failed" && (
          <p className="text-red-500">Failed to load books: {error}</p>
        )}
        {filteredBooks.length === 0 && status === "succeeded" ? (
          <p>No books found for this category or search term.</p>
        ) : (
          <div className="grid grid-cols-5 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white shadow rounded p-4 flex flex-col items-center"
              >
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4 overflow-hidden rounded">
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="h-full object-contain"
                    />
                  ) : (
                    <p className="text-gray-500">No Cover</p>
                  )}
                </div>
                <h3 className="font-bold text-center text-sm truncate w-full">
                  {book.title}
                </h3>
                <p className="text-gray-600 text-sm">{book.author}</p>
                <Link
                  to={`/book/works/${book.id}`}
                  className="mt-2 px-6 py-2 bg-gradient-to-r from-purple-800 to-indigo-900 text-white rounded-lg hover:from-purple-600 hover:via-indigo-700 hover:to-gray-800 shadow-lg backdrop-blur-md border border-white/20 block mx-auto transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowseBooks;
