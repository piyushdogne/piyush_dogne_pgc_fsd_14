import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice'; // Import Redux action
import ConfirmationPopup from './ConfirmationPopup';

const ProductItem = ({ product }) => {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch(); // Initialize useDispatch from redux

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Dispatch Redux action to add product to cart
    setShowPopup(true); // Show popup after adding item to cart
    setTimeout(() => setShowPopup(false), 1000); // Hide popup after 1 second
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative">
      {showPopup && (
        <ConfirmationPopup
          message="Item added to cart!"
          onClose={() => setShowPopup(false)}
        />
      )}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.title}</h3>
        <p className="text-sm text-gray-600 mt-1 truncate">
          {product.description}
        </p>
        <div className="flex items-center mt-2 space-x-2">
          <span className="text-xl font-bold text-blue-600">
            ${discountedPrice}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-green-600 bg-green-100 px-2 py-0.5 rounded">
            {product.discountPercentage}% OFF
          </span>
        </div>
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: Math.round(product.rating) }).map((_, i) => (
              <AiFillStar key={i} />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500">
            ({product.stock} in stock)
          </span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            Add to Cart
          </button>
          <Link
            to={`/product/${product.id}`}
            className="bg-gray-100 text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition-colors w-full sm:w-auto text-center"
          >
            View Details
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default ProductItem;
