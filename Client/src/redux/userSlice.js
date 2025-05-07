import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  addresses: [],
  selectedAddress: null, // store the entire selected address
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.addresses = [];
      state.selectedAddress = null; // reset selected address
    },
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    selectAddress: (state, action) => {
      // Find the address by index and store it
      state.selectedAddress = state.addresses[action.payload];
    },
  },
});

export const { setUser, logout, addAddress, selectAddress } = userSlice.actions;
export default userSlice.reducer;
