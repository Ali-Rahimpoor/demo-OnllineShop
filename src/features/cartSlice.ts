import { createSlice,createEntityAdapter } from "@reduxjs/toolkit";
import  type{ICartItem, IProduct} from "../types/Types";
import type{ RootState } from "../app/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Bounce, toast } from "react-toastify";
import { loadCartFromLocalStorage } from "../utils/localStorage";

const cartAdapter = createEntityAdapter<ICartItem>();
const loadedState = loadCartFromLocalStorage();
const initialState = cartAdapter.getInitialState({
   cartTotalAmount: 0,
   cartTotalQty: 0,
   ...(loadedState || {})
});

const cartSlice = createSlice({
   name:"cart",
   initialState,
   reducers: {
      addToCart(state,action:PayloadAction<IProduct>){
         const productExist = state.entities[action.payload.id];

         if(productExist){
            productExist.cartQty +=1;
            toast.success('تعداد افزایش یافت',{
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,});
         }else{
            cartAdapter.addOne(state,{...action.payload,cartQty:1});
             toast.success('محصول به سبد خرید اضافه شد',{
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,});
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
      },
      decreaseCart(state,action:PayloadAction<number | string>){
         const product = state.entities[action.payload];
         if(product){
         if(product.cartQty > 1){
               product.cartQty -=1;
         }else{
            cartAdapter.removeOne(state,action.payload);
            toast.warning('محصول حذف شد',{
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,})
         }
       }
      },
      deleteCart(state,action:PayloadAction<number | string>){
         cartAdapter.removeOne(state,action.payload);
         toast.warning('محصول حذف شد',{
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,})
      },
      deleteAllCart(state){
         cartAdapter.removeAll(state);
         toast.error('همه محصولات حذف شدن !',{
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,})
      }
   }
});

export const {selectAll} = cartAdapter.getSelectors((state:RootState)=> state.cart);

export const {
   addToCart,
   getTotals,
   decreaseCart,
   deleteCart,
   deleteAllCart
} = cartSlice.actions;

export default cartSlice.reducer;