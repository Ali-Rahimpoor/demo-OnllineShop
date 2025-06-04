import { configureStore } from "@reduxjs/toolkit";
import { ProductApi } from "../features/apiSlice";

export const store = configureStore({
   reducer:{
      [ProductApi.reducerPath]: ProductApi.reducer,
   },
   middleware:(g)=> g().concat(ProductApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;