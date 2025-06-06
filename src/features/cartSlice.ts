import { createSlice,createEntityAdapter } from "@reduxjs/toolkit";
import  type{ICartItem, IProduct} from "../types/Types";
import type{ RootState } from "../app/store";
import type { PayloadAction } from "@reduxjs/toolkit";
const cartAdapter = createEntityAdapter<ICartItem>();
const initialState = cartAdapter.getInitialState({
   cartTotalAmount: 0,
   cartTotalQty: 0,
});

const cartSlice = createSlice({
   name:"cart",
   initialState,
   reducers: {
      addToCart(state,action:PayloadAction<IProduct>){
         const productExist = state.entities[action.payload.id];

         if(productExist){
            productExist.cartQty +=1;
         }else{
            cartAdapter.addOne(state,{...action.payload,cartQty:1});
         }
      },
      getTotals(state){
         let {qty,total} = Object.values(state.entities).reduce(
            (cartTotal,cartItem)=>{
               const {price,cartQty} = cartItem;
               const itemTotal = price * cartQty;

               cartTotal.total += itemTotal;
               cartTotal.qty += cartQty;

               return cartTotal;
               
            },{total:0,qty:0})

            state.cartTotalQty = qty;
            state.cartTotalAmount = total;
      }
   }
});

export const {selectAll} = cartAdapter.getSelectors((state:RootState)=> state.cart);

export const {
   addToCart,
   getTotals
} = cartSlice.actions;

export default cartSlice.reducer;