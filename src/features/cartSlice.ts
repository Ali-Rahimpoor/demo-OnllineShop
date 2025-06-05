import { createSlice,createEntityAdapter } from "@reduxjs/toolkit";
import  type{ICartItem } from "../types/Types";
import type{ RootState } from "../app/store";
import type { PayloadAction } from "@reduxjs/toolkit";
const cartAdapter = createEntityAdapter<ICartItem>();
const initialState = cartAdapter.getInitialState({
   cartTotalAmount:0,
   cartTotalQty:0,
});

const cartSlice = createSlice({
   name:"cart",
   initialState,
   reducers:()=>({
      addToCart(state,action:PayloadAction<ICartItem>){
         const productExist = state.entities[action.payload.id];

         if(productExist){
            productExist.cartQty +=1;
         }else{
            cartAdapter.addOne(state,action.payload);
         }
      },
      getTotals(State){
         let {qty,total} = Object.values(State.entities).reduce(
            (cartTotal,cartItem)=>{
               const {price,cartQty} = cartItem;
               const itemTotal = price * cartQty;

               cartTotal.total += itemTotal;
               cartTotal.qty += cartQty;

               return cartTotal;
               
            },{total:0,qty:0})

            State.cartTotalQty = qty;
            State.cartTotalAmount = total;
      }
   })
});

export const {selectAll} = cartAdapter.getSelectors((state:RootState)=> state.cart);

export const {
   addToCart,
   getTotals
} = cartSlice.actions;

export default cartSlice.reducer;