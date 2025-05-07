
import { createSlice } from '@reduxjs/toolkit';

const singleProductSlice = createSlice({
  name: 'selectedProduct',
  initialState: {
    product: null,
  },
  reducers: {
    setSingleProduct: (state, action) => {
      state.product = action.payload;
    },
    clearSingleProduct: (state) => {
      state.product = null;
    }
  },
});

export const { setSingleProduct, clearSingleProduct } = singleProductSlice.actions;
export default singleProductSlice.reducer;
