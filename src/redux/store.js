// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import animalsReducer from "./slices/animalsSlice";
import deliveryReducer from "./slices/deliverySlice";


const persistConfig = {
  key: "b7ayemko",
  storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    animals: animalsReducer,
    delivery: deliveryReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store);
