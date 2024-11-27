import React from "react";

export const CartItem = ({ cartItems, handleQuantityChange, handleRemove }) => {
  return (
    <>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded shadow mb-4 space-y-4 md:space-y-0"
        >
          {/* Image */}
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-20 w-20 md:h-24 md:w-24 object-contain"
          />

          {/* Title and Description */}
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h3 className="text-base md:text-lg font-semibold">{item.title}</h3>
            <p className="text-xs md:text-sm text-gray-600">{item.description}</p>
          </div>

          {/* Price and Quantity Controls */}
          <div className="flex flex-col md:flex-row items-center md:space-x-4">
            <span className="text-sm md:text-lg">${item.price.toFixed(2)}</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  handleQuantityChange(item.id, Math.max(1, item.quantity - 1))
                }
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                -
              </button>
              <span className="px-4 text-sm md:text-base">{item.quantity}</span>
              <button
                onClick={() =>
                  handleQuantityChange(item.id, item.quantity + 1)
                }
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => handleRemove(item.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Remove
          </button>
        </div>
      ))}
    </>
  );
};
