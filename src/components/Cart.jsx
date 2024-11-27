import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // For navigation
import { removeFromCart, updateQuantity } from '../features/cartSlice';
import { CartItem } from './CartItem';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (!cartItems.length) {
    return (
      <div className="text-center py-10">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-blue-600 hover:underline"
        >
          Go Back
        </button>
        <div>Your cart is empty</div>
      </div>
    );
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Go Back
      </button>

      {/* Cart Items */}
      <CartItem cartItems={cartItems} />

      {/* Total Price and Checkout Button */}
      <div className="flex flex-col sm:flex-row sm:justify-end items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Total Price */}
        <div className="font-bold text-xl text-center sm:text-right">
          Total: ${totalPrice.toFixed(2)}
        </div>

        {/* Checkout Button */}
        <button
          onClick={() => navigate('/checkout')}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
