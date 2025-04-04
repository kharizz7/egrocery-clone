import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import stocksReducer from './stockSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    stocks: stocksReducer,
  },
});

export default store;
