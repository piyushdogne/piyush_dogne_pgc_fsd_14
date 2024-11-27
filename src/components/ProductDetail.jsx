import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice'; // Import Redux action
import ConfirmationPopup from './ConfirmationPopup'; // Import the ConfirmationPopup component
import { ShimmerLoader2 } from './ShimmerCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch from Redux
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Popup state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product)); // Dispatch the product to the cart
      setShowPopup(true); // Show popup
      setTimeout(() => setShowPopup(false), 1000); // Hide popup after 1 second
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!product) {
    return (
      <div>
        <ShimmerLoader2 />
      </div>
    );
  }

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {showPopup && (
        <ConfirmationPopup
          message="Item added to cart!"
          onClose={() => setShowPopup(false)}
        />
      )}

      {/* Left: Product Image */}
      <div className="bg-gray-100 p-4 flex items-center justify-center rounded-lg">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-96 object-contain"
        />
      </div>

      {/* Right: Product Details */}
      <div>
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-600 mb-6">{product.description}</p>

        {/* Pricing Section */}
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-3xl font-bold text-blue-600">
            ${discountedPrice}
          </span>
          <span className="text-lg text-gray-500 line-through">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
            {product.discountPercentage}% OFF
          </span>
        </div>

        {/* Ratings */}
        <div className="flex items-center mb-6">
          <div className="flex text-yellow-400">
            {Array.from({ length: Math.round(product.rating) }).map((_, i) => (
              <AiFillStar key={i} />
            ))}
          </div>
          <span className="ml-2 text-gray-500">({product.rating.toFixed(1)} / 5)</span>
        </div>

        {/* Stock Information */}
        <p className="text-sm text-gray-500 mb-6">
          <span className="font-bold">{product.stock}</span> items left in stock.
        </p>

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
