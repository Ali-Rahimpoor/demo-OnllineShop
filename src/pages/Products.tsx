import { useGetProductsQuery } from "../features/apiSlice";
import Products_svg from "../assets/svg/Products.svg?react";
import ReactPaginate from "react-paginate";
import { useEffect,useState } from "react";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { addToCart, getTotals } from "../features/cartSlice";
import type { IProduct} from "../types/Types";
import ShowProducts from "../components/ShowProducts";

const Products = ()=>{
   const itemsPerPage = 8;

   const {data:normalizeData,isLoading,isError} = useGetProductsQuery();

   const [itemOffset, setItemOffset] = useState(0);   
   const endOffset = itemOffset + itemsPerPage;

   const allProducts = useMemo(() => {
    if (!normalizeData) return [];
    return normalizeData.ids.map(id => normalizeData.entities[id]);
   }, [normalizeData]);

const pageCount = Math.ceil(allProducts.length / itemsPerPage);
   
  const currentItems = useMemo(()=>allProducts.slice(itemOffset, endOffset),[allProducts, itemOffset, endOffset]) 
  
  
  useEffect(()=>{
      setItemOffset(0);
  },[pageCount])
  
   const handlePageClick = (event: { selected: number; }) => {
    const newOffset = (event.selected * itemsPerPage) % allProducts.length;
    setItemOffset(newOffset);
  };
  const dispatch = useDispatch();

  const handleAddToCart = (product: IProduct) =>{
   dispatch(addToCart(product));
   dispatch(getTotals());
  }

   if(isLoading)return <div>loading</div>
   if(isError)return <div>Error</div>
   return(
      <>
      <section className="font-Dana">
      <div className="lg:flex flex-col items-center justify-around hidden">
         <div className="flex items-center justify-between lg:w-[900px]">
              <Products_svg className="size-100" />
              <div className="font-DanaMed flex flex-col gap-y-6">
              <h1 className="text-5xl">از بین محصولات موجود</h1>
              <h2 className="text-4xl"> محصول مدنظر خود را <span className="text-green-700">انتخاب</span></h2>
              <h3 className="text-6xl text-red-300"> و </h3>
              <h4 className="text-4xl">به سبد <span className="text-green-700">خرید</span> اضافه کنید</h4>
              </div>
         </div>
     
      </div>
  <h1 className="text-5xl text-center my-10 font-Dana">محصولات</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-5 mx-auto container px-2 lg:px-10">
         <ShowProducts handleAddToCart={handleAddToCart} currentItems={currentItems} />
      </ul>
      </section>

      {allProducts.length > itemsPerPage && (
      <div className="flex justify-center my-6">
        <ReactPaginate
          previousLabel={null}
          nextLabel={false}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex gap-2"}
          pageClassName={"border border-gray-300 px-3 py-1 rounded cursor-pointer"}
          activeClassName={"bg-blue-500 text-white"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>)}

      </>
   )
}
export default Products;