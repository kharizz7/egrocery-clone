import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paymentMethod: '',      // To store the selected payment method (UPI, Net Banking, etc.)
  upiId: '',
  upiVerified: false,
  selectedBank: '',
  cardDetails: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  },
  cashOnDelivery: false,  // To store if Cash on Delivery is selected
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    // Set the selected payment method
    setPaymentMethod: (state, action) => {
      const method = action.payload;
      state.paymentMethod = method;

      // Reset all payment details based on the selected method
      if (method === 'UPI') {
        state.upiId = '';
        state.upiVerified = false;
        state.selectedBank = '';
        state.cardDetails = initialState.cardDetails;
        state.cashOnDelivery = false;
      } else if (method === 'Net Banking') {
        state.selectedBank = '';
        state.upiId = '';
        state.upiVerified = false;
        state.cardDetails = initialState.cardDetails;
        state.cashOnDelivery = false;
      } else if (method === 'Credit Card') {
        state.cardDetails = { ...initialState.cardDetails };
        state.upiId = '';
        state.selectedBank = '';
        state.upiVerified = false;
        state.cashOnDelivery = false;
      } else if (method === 'Cash on Delivery') {
        state.cashOnDelivery = true;
        state.upiId = '';
        state.selectedBank = '';
        state.cardDetails = initialState.cardDetails;
        state.upiVerified = false;
      }
    },

    // Store UPI ID and verify it
    setUpiId: (state, action) => {
      state.upiId = action.payload;
    },
    verifyUpi: (state) => {
      state.upiVerified = true;
    },

    // Store selected bank for Net Banking
    setSelectedBank: (state, action) => {
      state.selectedBank = action.payload;
    },

    // Store credit card details
    setCardDetails: (state, action) => {
      state.cardDetails = { ...state.cardDetails, ...action.payload };
    },
  },
});

export const {
  setPaymentMethod,
  setUpiId,
  verifyUpi,
  setSelectedBank,
  setCardDetails,
} = paymentSlice.actions;

export default paymentSlice.reducer;
