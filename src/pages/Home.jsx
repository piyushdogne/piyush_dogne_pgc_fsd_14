import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const categories = ["Fiction", "Non-Fiction", "Sci-Fi", "Fantasy", "Mystery", "Biography"];
  const popularBooks = [
    { id: 1, title: "His Last Bow", author: "Arthur Conan Doyle", link: "book/works/OL262452W" },
    { id: 2, title: "Little Women", author: "Louisa May Alcott", link: "book/works/OL29983W" },
    { id: 3, title: "Tresure Island", author: "Robert Louis Stevenson", link: "book/works/OL24034W" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
            <main className="p-6">
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Welcome to the Online Library</h2>
          <p className="text-lg">Explore books across various categories and add your favorites to the collection.</p>
        </section>
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link
                to={`newly-added-books`}
                className="block p-4 bg-white shadow rounded hover:bg-blue-100"
              >
                Newly Added Books
              </Link>
            {categories.map((category) => (
              <Link
                to={`/books/${category.toLowerCase()}`}
                key={category}
                className="block p-4 bg-white shadow rounded hover:bg-blue-100"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-2xl font-semibold mb-4">Popular Books</h3>
          <div className="space-y-4">
            {popularBooks.map((book) => (
              <div
                key={book.id}
                className="p-4 bg-white shadow rounded flex justify-between items-center"
              >
                <div>
                  <h4 className="font-bold">{book.title}</h4>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                </div>
                <Link
                  to={book.link}
                  className="px-4 py-2 bg-gradient-to-r from-purple-800 to-indigo-900 text-white rounded-lg hover:from-purple-600 hover:via-indigo-700 hover:to-gray-800 shadow-lg backdrop-blur-md border border-white/20 block transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
