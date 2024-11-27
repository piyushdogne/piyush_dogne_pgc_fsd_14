import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts, setLoading, setError } from '../features/productsSlice';

const useFetchProducts = (url) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true)); // Set loading to true at the start
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        dispatch(setProducts(data.products)); // Populate products
      } catch (err) {
        dispatch(setError(err.message)); // Handle error
      } finally {
        dispatch(setLoading(false)); // Ensure loading is set to false
      }
    };

    fetchProducts();
  }, [dispatch, url]);
};

export default useFetchProducts;
