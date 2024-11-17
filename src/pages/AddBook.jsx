import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/booksSlice";
import { useNavigate } from "react-router-dom";

const AddBookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    rating: "",
    coverImage: null, // This will hold the file
    id: "",
  });

  const handleChange = (e) => setBook({ ...book, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    // Handle file selection, convert the file to base64
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBook((prevBook) => ({
          ...prevBook,
          coverImage: reader.result, // Save base64 image string
        }));
      };
      reader.readAsDataURL(file); // Convert the file to base64
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (book.title && book.author && book.category && book.description && book.rating) {
      const newBook = { 
        ...book, 
        id: crypto.randomUUID(),
        coverImage: book.coverImage || "", // Default placeholder if no image
      };    

      // Dispatch to Redux store
      dispatch(addBook(newBook));

      // Navigate to books page
      setTimeout(() => {
        navigate("/newly-added-books");
      }, 100);
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-12 bg-white/90 backdrop-blur-lg shadow-lg p-8 rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Add a New Book</h2>
      <input
        name="title"
        placeholder="Title"
        value={book.title}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="author"
        placeholder="Author"
        value={book.author}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="category"
        placeholder="Category"
        value={book.category}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={book.description}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="rating"
        type="number"
        placeholder="Rating (1-5)"
        value={book.rating}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* File Input for Cover Image */}
      <input
        name="coverImage"
        type="file"
        accept="image/*" // Restrict to image files
        onChange={handleFileChange}
        className="w-full px-4 py-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-purple-800 to-indigo-900 text-white rounded-lg hover:from-purple-600 hover:via-indigo-700 hover:to-gray-800 shadow-lg backdrop-blur-md border border-white/20 transition-all duration-300"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
