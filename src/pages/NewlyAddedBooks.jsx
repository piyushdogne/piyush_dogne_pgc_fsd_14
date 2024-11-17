import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewlyAddedBooks } from "../redux/booksSlice";
import { Link } from "react-router-dom";

const NewlyAddedBooks = () => {
  const dispatch = useDispatch();
  const { newlyAddedBooks = []} = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchNewlyAddedBooks());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Newly Added Books</h1>
      <main>
       
        {newlyAddedBooks.length === 0  ? (
          <p className="text-center text-gray-600 text-lg">
            No newly added books found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {newlyAddedBooks.map((book , index) => (
              <div
                key={book.id}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
              >
                <div className="w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center mb-4 overflow-hidden rounded-lg">
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
                <h3 className="font-semibold text-center text-sm truncate w-full">
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

export default NewlyAddedBooks;
