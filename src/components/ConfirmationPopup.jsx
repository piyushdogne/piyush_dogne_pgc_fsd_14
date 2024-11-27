import React, { useEffect } from 'react';

const ConfirmationPopup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 1000); // Automatically close after 1 second
    return () => clearTimeout(timer); // Clear timer if component unmounts
  }, [onClose]);

  return (
    <div className="z-100 fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg opacity-100 transition-opacity duration-500">
      {message}
    </div>
  );
};

export default ConfirmationPopup;
