import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
      data: [],
      loading: true,
      error: null,
    },
    reducers: {
      setProducts: (state, action) => {
        state.data = action.payload;
        state.loading = false; // Ensure loading is set to false
        state.error = null;
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
        state.loading = false; // Ensure loading is false if there's an error
      },
    },
  });
  
  export const { setProducts, setLoading, setError } = productsSlice.actions;
  export default productsSlice.reducer;
  

 