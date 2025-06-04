import { useEffect } from "react";
import { useGetProductsQuery } from "../features/apiSlice";

const Products = ()=>{
   const {data} = useGetProductsQuery();
   useEffect(()=>{
      console.log(data);
   },[data])
   return(
      <>
      <h1>محصولات</h1>

      <div>
         {data?.ids.map((id)=>{
            const product = data.entities[id];
            return(
               <>
               <div>{product.name}</div>
               <div>{product.price}</div>
               </>
            )
         })}
      </div>
      </>
   )
}
export default Products;