import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductItem from './ProductItem';
import ShimmerLoader from './ShimmerCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const searchTerm = useSelector((state) => state.cart.searchTerm); // Get search term from Redux

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  const categories = Array.from(new Set(products.map((product) => product.category)));

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!products.length) {
    return <ShimmerLoader/>;
  }

  return (
    <div className="space-y-8 p-8">
      {categories.map((category) => {
        const categoryProducts = filteredProducts.filter(
          (product) => product.category === category
        );

        return (
          <div key={category}>
            <h2 className="text-2xl font-bold text-gray-700 capitalize mb-4">
              {category}
            </h2>
            {categoryProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {categoryProducts.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No products found in this category.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
