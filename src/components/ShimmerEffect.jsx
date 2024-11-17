import React from "react";

const ShimmerEffect = ({ count = 1 }) => {
  return (
    <div className="grid grid-cols-5 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white shadow rounded p-4 flex flex-col items-center"
        >
          {/* Placeholder for the cover image */}
          <div className="w-full h-48 bg-gray-300 animate-pulse rounded mb-4" />

          {/* Placeholder for the title */}
          <div className="w-3/4 h-4 bg-gray-300 animate-pulse rounded mb-2" />

          {/* Placeholder for the author */}
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse rounded mb-4" />

          {/* Placeholder for the button */}
          <div className="w-1/3 h-8 bg-gray-300 animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
};

export default ShimmerEffect;
