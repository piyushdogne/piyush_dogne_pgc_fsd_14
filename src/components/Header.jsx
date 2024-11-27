import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { setSearchTerm } from '../features/cartSlice';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const location = useLocation();  // To get the current location

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  // Conditionally render the search bar based on the location
  const showSearchBar = location.pathname === '/';

  return (
    <header className="bg-blue-600 text-white p-3 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl pl-4"
          aria-label="Go to homepage"
        >
          ShoppyGlobe
        </Link>

        {/* Search Input */}
        {showSearchBar && (
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
          aria-label="Search products"
          className="w-24 sm:w-40 md:w-60 lg:w-80 h-8 sm:h-9 md:h-10 px-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-300 text-black text-sm"
        />
      )}
        {/* <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
          aria-label="Search products"
          className="w-24 sm:w-40 md:w-60 lg:w-80 h-8 sm:h-9 md:h-10 px-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-300 text-black text-sm"
        /> */}

        {/* Cart Icon */}
        <Link
          to="/cart"
          className="relative flex items-center pr-4"
          aria-label="View cart"
        >
          <AiOutlineShoppingCart className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 text-xs sm
            :text-sm">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
