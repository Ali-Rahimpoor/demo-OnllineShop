import { useGetProductsQuery } from "../features/apiSlice";
import { BsCartPlus } from "react-icons/bs";
import Products_svg from "../assets/svg/Products.svg?react"
import ReactPaginate from "react-paginate";
import { useEffect,useState } from "react";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { addToCart, getTotals } from "../features/cartSlice";
import type { IProduct, ICartItem } from "../types/Types";
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

   const products = currentItems.map(product=>{
      
      return(
      <li key={product.id} className="">
         <div className="mt-1 flex flex-col px-4 py-2 border border-gray-200 rounded-t-lg border-b-0">
         <img 
         src={`../../server/images/${product.image}.webp`} 
         className="w-[90%] mx-auto h-[90%] p-3 shadow rounded-xl my-4" 
         alt={product.name}
         loading="lazy"
         />
         <h3 className="text-2xl font-DanaMed pr-3">{product.name}</h3>
         <p className="line-clamp-3 text-gray-600 text-balance">{product.description}</p>
         </div>
         <div className="flex bg-zinc-800 items-center justify-between">
         <p className="p-2 font-DanaMed text-emerald-500">قیمت : {product.price} ریال</p>
         <button className="flex bg-rose-500 hover:bg-emerald-500 cursor-pointer rounded-r-full text-white items-center  border-gray-300 p-2 justify-between gap-x-1" onClick={()=>handleAddToCart(product)}>
            <span className="pr-2">سفارش</span>
         <BsCartPlus size={30} />
         </button>
         </div>
      </li>
      )
   })
   

   if(isLoading)return <div>loading</div>
   if(isError)return <div>Error</div>
   return(
      <>
      <section className="font-Dana">
      <div className="flex flex-col items-center justify-around">
         <div className="flex items-center justify-between w-[900px]">
              <Products_svg className="size-100" />
              <div className="font-DanaMed flex flex-col gap-y-6">
              <h1 className="text-5xl">از بین محصولات موجود</h1>
              <h2 className="text-4xl"> محصول مدنظر خود را <span className="text-green-700">انتخاب</span></h2>
              <h3 className="text-6xl text-red-300"> و </h3>
              <h4 className="text-4xl">به سبد <span className="text-green-700">خرید</span> اضافه کنید</h4>
              </div>
         </div>
       <h1 className="text-5xl text-center mb-10">محصولات</h1>
      </div>

      <ul className="grid grid-cols-4 gap-5 container px-10">
         {products}
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