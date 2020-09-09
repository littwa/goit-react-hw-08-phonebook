import app from "../redux/app/appReducer";
import auth from "./auth/authReducer";
import storage from "redux-persist/lib/storage";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
 persistStore,
 persistReducer,
 FLUSH,
 REHYDRATE,
 PAUSE,
 PERSIST,
 PURGE,
 REGISTER
} from "redux-persist";

const authPersistConfig = {
 key: "auth",
 storage,
 whitelist: ["token"]
};

const store = configureStore({
 reducer: { app, auth: persistReducer(authPersistConfig, auth) },
 middleware: getDefaultMiddleware({
  serializableCheck: {
   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
  }
 })
});

export const persistor = persistStore(store);
export default store;
