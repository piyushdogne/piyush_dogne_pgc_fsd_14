import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooksByCategories  } from "../redux/booksSlice";
import { Link } from "react-router-dom";
import ShimmerEffect from "../components/ShimmerEffect"; // Import the detailed shimmer effect

const categories = [
  "science_fiction",
  "romance",
  "mystery",
  "fantasy",
  "history",
  "biography",
]; // Add more categories as needed.

const BooksByCategory = () => {
  const dispatch = useDispatch();
  const { categorizedBooks, status, error } = useSelector(
    (state) => state.books
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
 
    dispatch(fetchBooksByCategories(categories));
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filterBooks = () => {
    if (!searchTerm) return categorizedBooks;

    const filteredBooks = {};

    Object.keys(categorizedBooks).forEach((category) => {
      filteredBooks[category] = categorizedBooks[category].filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm) ||
          category.toLowerCase().includes(searchTerm)
      );
    });

    return filteredBooks;
  };

  const filteredCategorizedBooks = filterBooks();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Books by Category</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title, author, or category..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-6 w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Show error if any */}
      {status === "failed" && <p className="text-red-500">{error}</p>}

      {status === "loading"
        ? categories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 capitalize">
                {category.replace("_", " ")}
              </h2>
              {/* Detailed shimmer cards */}
              <ShimmerEffect count={5} />
            </div>
          ))
        : Object.keys(filteredCategorizedBooks).every(
            (category) => filteredCategorizedBooks[category].length === 0
          ) ? (
            <p className="text-gray-500">No books match the search criteria.</p>
          ) : (
            Object.keys(filteredCategorizedBooks).map((category) => (
              <div key={category} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 capitalize">
                  {category.replace("_", " ")}
                </h2>
                <div className="grid grid-cols-5 gap-6">
                  {filteredCategorizedBooks[category]?.length > 0 ? (
                    filteredCategorizedBooks[category].map((book) => (
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
                    ))
                  ) : (
                    <p className="text-gray-500">No books available.</p>
                  )}
                </div>
              </div>
            ))
          )}
    </div>
  );
};

export default BooksByCategory;
