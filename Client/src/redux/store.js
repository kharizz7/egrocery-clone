import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import stocksReducer from "./stockSlice";  
import paymentReducer from './paymentSlice';
import selectedProductReducer from './selectedProductSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

// Correct the syntax here by removing the extra curly brace
const rootReducer = combineReducers({
  user: userReducer,
  stocks: stocksReducer,
  selectedProduct: selectedProductReducer,
  payment: paymentReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "stocks", "selectedProduct"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
