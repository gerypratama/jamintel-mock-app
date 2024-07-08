import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/graphSlice";

const store = configureStore({
  reducer: {
    graph: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const AppDispatch = store.dispatch;

export default store;
