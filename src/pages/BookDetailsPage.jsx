import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookById } from "../redux/booksSlice";

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const dispatch = useDispatch();

  // Access the Redux state
  const book = useSelector((state) => state.books.currentBook);
  const status = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id)); // Dispatch the action to fetch book details by ID
    }
  }, [id, dispatch]);

  const renderStars = (rating) => {
    const stars = [];
    const maxRating = 5; // Assume ratings are out of 5
    const normalizedRating = Math.round(rating || (Math.random() * 4) + 1); // Use random rating (1-5) if no rating provided
  
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <span
          key={i}
          className={`text-3xl ${i <= normalizedRating ? "text-yellow-500" : "text-gray-300"}`}
        >
          ★
        </span>
      );
    }
  
    return stars;
  };
  
  const trimAuthors = (author) => {
    const maxAuthors = 2; // Maximum number of authors to display
    if (!author || typeof author !== "string") return "Unknown";
    const authorsArray = author.split(","); // Assuming authors are separated by commas
    return authorsArray.length > maxAuthors
      ? authorsArray.slice(0, maxAuthors).join(", ") + "..."
      : author;
  };

  const trimDescription = (description) => {
    const maxLength = 300; // Maximum description length
    if (!description || description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  }

  if (!book) {
    return <div className="min-h-screen flex items-center justify-center">No book found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">{book.title}</h1>
      <div className="bg-white shadow rounded p-4 w-3/4 flex flex-col md:flex-row justify-center items-center">
        <div
          className="w-64 h-96 flex items-center justify-center overflow-hidden rounded bg-gray-200"
          style={{ minWidth: "256px", minHeight: "384px" }}
        >
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          ) : (
            <p className="text-gray-500">No Cover</p>
          )}
        </div>
        <div className="ml-6 mt-4 md:mt-0 w-1/2">
          <h3 className="text-lg font-semibold mb-2">
            Author: {trimAuthors(book.author)}
          </h3>
          <p className="text-gray-600 mb-4">{trimDescription(book.description)}</p>
          <div className="flex items-center ">
            <p className="font-bold mr-2">Rating:</p>
            {renderStars(book.averageRating)}
          </div>
        </div>
      </div>
      <button
  onClick={() => window.history.back()}
  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-800  to-indigo-900 text-white rounded-lg hover:from-purple-600 hover:via-indigo-700 hover:to-gray-800 shadow-lg backdrop-blur-md border border-white/20 block mx-auto transition-all duration-300"
>
  Back to Browse
</button>
    </div>
  );
};

export default BookDetails;
