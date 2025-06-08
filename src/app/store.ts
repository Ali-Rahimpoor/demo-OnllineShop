import { configureStore } from "@reduxjs/toolkit";
import { ProductApi } from "../features/apiSlice";
import cartReducer from "../features/cartSlice";
import { saveCartToLocalStorage } from "../utils/localStorage";
export const store = configureStore({
   reducer:{
      [ProductApi.reducerPath]: ProductApi.reducer,
      cart:cartReducer
   },
   middleware:(g)=> g().concat(ProductApi.middleware),
});
store.subscribe(()=>{
   const state = store.getState();
   saveCartToLocalStorage(state.cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;