import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../slices/navSlice";
import { persistReducer, persistStore } from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";

const persistConfig = {
    key: 'root',
    storage: ExpoFileSystemStorage,
    blacklist: [], // or whitelist: ['nav'] to persist only nav slice
    errorHandling: (err) => {
      console.error('Persist error:', err);
    }
  };
  
  const persistedReducer = persistReducer(persistConfig, navReducer);
  

export const store = configureStore({
    reducer: {
        nav: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
})

export const persistor = persistStore(store);