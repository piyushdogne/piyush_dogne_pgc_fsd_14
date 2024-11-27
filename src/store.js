import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import productsReducer from './features/productsSlice'; // Import products slice

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer, // Add products slice
  },
});

export default store;
