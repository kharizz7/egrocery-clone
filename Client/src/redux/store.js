import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import stocksReducer from "./stockSlice";  

import singleProductReducer from './selectedProductSlice';

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

const rootReducer = combineReducers({
  user: userReducer,
  stocks: stocksReducer,
  singleProduct: singleProductReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user","stocks","selectedProduct"], 
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
