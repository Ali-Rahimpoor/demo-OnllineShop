import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter, nanoid } from "@reduxjs/toolkit";
import type{ IFilter, IProduct } from "../types/Types";

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
      }),
      getFilter: builder.query<IFilter[],void>({
         query:()=> "/filter",
      }),
      addProduct: builder.mutation({
         query:(newProduct)=>({
            url: "products",
            method: "POST",
            body: {...newProduct,id:nanoid()},
         })
         
      }),
      deleteProduct: builder.mutation({
         query:({id})=>({
            url:`products/${id}`,
            method:"DELETE"
         })
      })
   })
})


export const {useGetProductsQuery,useGetFilterQuery,useAddProductMutation,useDeleteProductMutation} = ProductApi;
