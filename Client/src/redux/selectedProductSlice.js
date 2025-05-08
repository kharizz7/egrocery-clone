
import { createSlice } from '@reduxjs/toolkit';

const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState: {
    product: null,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.product = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.product = null;
    }
  },
});

export const { setSelectedProduct, clearSelectedProduct } = selectedProductSlice.actions;
export default selectedProductSlice.reducer;
