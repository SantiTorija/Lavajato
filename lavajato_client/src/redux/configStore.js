import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import clientSlice from "./clientSlice";
import orderToEditSlice from "./orderToEditSlice";

import { combineReducers } from "redux";
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
  cart: cartSlice,
  client: clientSlice,
  orders: orderToEditSlice,
});

const persistConfig = {
  key: "root",
  storage,
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

const persistor = persistStore(store);
export { store, persistor };
