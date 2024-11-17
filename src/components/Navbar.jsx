import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-purple-800 via-indigo-900 to-black text-white py-4 shadow-lg z-50">
      <div className="flex items-center max-w-7xl  px-4">
        {/* Back Button */}
        {location.pathname == "/" ? (
          <button
            onClick={() => navigate(-1)}
            className="mr-3 px-6 py-1 opacity-0 text-sm bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white rounded shadow-md backdrop-blur-md border border-white/20 transition-all duration-300"
          >
            Back
          </button>
        ) : (
          <button
            onClick={() => navigate(-1)}
            className="mr-3 px-6 py-1 text-sm bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white rounded shadow-md backdrop-blur-md border border-white/20 transition-all duration-300"
          >
            Back
          </button>
        )}

        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold">
          Online Library
        </NavLink>

        {/* Nav Links */}
        <div className="ml-auto space-x-6 flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative pb-2 ${
                isActive
                  ? "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[3px] after:bg-red-500"
                  : "hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:right-0 hover:after:bottom-0 hover:after:h-[3px] hover:after:bg-gray-300"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `relative pb-2 ${
                isActive
                  ? "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[3px] after:bg-red-500"
                  : "hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:right-0 hover:after:bottom-0 hover:after:h-[3px] hover:after:bg-gray-300"
              }`
            }
          >
            Browse Books
          </NavLink>
          <NavLink
            to="/add-book"
            className={({ isActive }) =>
              `relative pb-2 ${
                isActive
                  ? "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[3px] after:bg-red-500"
                  : "hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:right-0 hover:after:bottom-0 hover:after:h-[3px] hover:after:bg-gray-300"
              }`
            }
          >
            Add Book
          </NavLink>
          <NavLink
            to="/newly-added-books"
            className={({ isActive }) =>
              `relative pb-2 ${
                isActive
                  ? "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[3px] after:bg-red-500"
                  : "hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:right-0 hover:after:bottom-0 hover:after:h-[3px] hover:after:bg-gray-300"
              }`
            }
          >
           Newly Added Book
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
