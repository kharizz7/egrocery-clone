import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paymentMethod: '',
  upiId: '',
  upiVerified: false,
  selectedBank: '',
  cardDetails: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  },
  cashOnDelivery: false,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentMethod: (state, action) => {
      // Keep this if you want, but prefer setFullPaymentDetails for updates
      state.paymentMethod = action.payload;
    },
    setFullPaymentDetails: (state, action) => {
      const {
        method,
        upiId = '',
        upiVerified = false,
        selectedBank = '',
        cardDetails = initialState.cardDetails,
      } = action.payload;

      state.paymentMethod = method;
      state.upiId = upiId;
      state.upiVerified = upiVerified;
      state.selectedBank = selectedBank;
      state.cardDetails = cardDetails;
      state.cashOnDelivery = method === 'Cash on Delivery';
    },
    setUpiId: (state, action) => {
      state.upiId = action.payload;
    },
    verifyUpi: (state) => {
      state.upiVerified = true;
    },
    setSelectedBank: (state, action) => {
      state.selectedBank = action.payload;
    },
    setCardDetails: (state, action) => {
      state.cardDetails = { ...state.cardDetails, ...action.payload };
    },
  },
});

export const {
  setPaymentMethod,
  setFullPaymentDetails,
  setUpiId,
  verifyUpi,
  setSelectedBank,
  setCardDetails,
} = paymentSlice.actions;

export default paymentSlice.reducer;
