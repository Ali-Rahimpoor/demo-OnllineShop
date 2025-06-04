import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter } from "@reduxjs/toolkit";
import type{ IProduct } from "../types/Types";

const ProductAdapter = createEntityAdapter<IProduct>();

export const ProductApi = createApi({
   reducerPath:"api",
   baseQuery:fetchBaseQuery({
      baseUrl:"http://localhost:8000/"
   }),
   endpoints: (builder)=>({
      getProducts: builder.query<ReturnType<typeof ProductAdapter.getInitialState>,void>({
         query: ()=> 'products',
         transformResponse: (response: IProduct[])=>{
            return ProductAdapter.setAll(ProductAdapter.getInitialState(),response);
         },
      })
   })
})


export const {useGetProductsQuery} = ProductApi;
