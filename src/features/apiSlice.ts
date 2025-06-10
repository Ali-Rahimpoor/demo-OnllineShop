import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter, nanoid } from "@reduxjs/toolkit";
import type{ IFilter, IProduct } from "../types/Types";


type productAdapterState = ReturnType<typeof ProductAdapter.getInitialState>;
const ProductAdapter = createEntityAdapter<IProduct>();

export const ProductApi = createApi({
   reducerPath:"api",
   baseQuery:fetchBaseQuery({
      baseUrl:"http://localhost:8000/"
   }),
   // in endpoints : query< give , get =>if => void not have to get >(..)
   endpoints: (builder)=>({
      getProducts: builder.query<productAdapterState,void>({
         query: ()=> 'products',
         transformResponse: (response: IProduct[])=>{
            return ProductAdapter.setAll(ProductAdapter.getInitialState(),response);
         },
      }),
      getFilter: builder.query<IFilter[],void>({
         query:()=> "/filter",
      }),
      addProduct: builder.mutation<IProduct,Omit<IProduct,"id">>({
         query:(newProduct)=>({
            url: "products",
            method: "POST",
            body: {...newProduct,id:nanoid()},
         })
         
      }),
      deleteProduct: builder.mutation<{success:boolean;id:string},{id:string}>({
         query:({id})=>({
            url:`products/${id}`,
            method:"DELETE"
         })
      }),
      getProduct: builder.query<IProduct,string>({
         query:(id)=> `products/${id}`
      }),
      updateProduct: builder.mutation<IProduct,IProduct>({
         query: (product)=>({
            url:`products/${product.id}`,
            method:"PUT",
            body:product
         })
      })
   })
})


export const {
   useGetProductsQuery,
   useGetFilterQuery,
   useAddProductMutation,
   useDeleteProductMutation,
   useGetProductQuery,
   useUpdateProductMutation
} = ProductApi;
