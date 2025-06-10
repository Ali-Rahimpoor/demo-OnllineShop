import { useGetProductsQuery } from "../features/apiSlice";
import ShowProducts from "./ShowProducts";


const EditOrDeleteProduct =()=>{

   const {data} = useGetProductsQuery();
   const allProducts = data?.ids.map(id=> data.entities[id]);
   return(
      <>
      <section>
            <h1 className="text-center">لیست کل محصولات</h1>
          <ul className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-5 mx-auto container px-2 lg:px-10">
                  <ShowProducts isAdmin={true} currentItems={allProducts || []} />
               </ul>
      </section>
      </>
   )
}
export default EditOrDeleteProduct;