const ShimmerLoader = () => {
    const shimmerCategories = ["Beauty", "Fragrances", "Furniture"];
  
    return (
      <div className="space-y-8 p-8">
        {shimmerCategories.map((category, index) => (
          <div key={index}>
            {/* Shimmer Category Header */}
            <h2 className="text-2xl font-bold capitalize mb-4">
              {category}
            </h2>
            {/* Shimmer Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white shadow-lg rounded-lg overflow-hidden animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-2">
                    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                    <div className="w-full h-3 bg-gray-200 rounded"></div>
                    <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="w-20 h-6 bg-gray-200 rounded"></div>
                      <div className="w-16 h-6 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  export default ShimmerLoader;

  export const ShimmerLoader2 = () => {
    return (
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
        {/* Left: Shimmer for Image */}
        <div className="bg-gray-200 p-4 flex items-center justify-center rounded-lg h-96"></div>
  
        {/* Right: Shimmer for Details */}
        <div>
          {/* Title */}
          <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
          {/* Description */}
          <div className="h-4 bg-gray-200 rounded mb-6 w-full"></div>
          <div className="h-4 bg-gray-200 rounded mb-6 w-5/6"></div>
  
          {/* Pricing */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-10 bg-gray-200 rounded w-24"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
  
          {/* Ratings */}
          <div className="flex items-center mb-6">
            <div className="h-6 bg-gray-200 rounded w-28"></div>
            <div className="h-4 bg-gray-200 rounded w-16 ml-2"></div>
          </div>
  
          {/* Stock Information */}
          <div className="h-4 bg-gray-200 rounded mb-6 w-1/2"></div>
  
          {/* Buttons */}
          <div className="flex space-x-4">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  };
  