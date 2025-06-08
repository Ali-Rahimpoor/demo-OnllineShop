import { useGetFilterQuery, useGetProductsQuery } from "../features/apiSlice";
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
   const [selectedFilter, setSelectedFilter] = useState<string>("همه");
   const [itemOffset, setItemOffset] = useState(0);   

   const {data:normalizeData,isLoading,isError} = useGetProductsQuery();
   const {data:filterData=[]} = useGetFilterQuery();
   const dispatch = useDispatch();
   

      const filteredProducts = useMemo(() => {
  if (!normalizeData) return [];
  
  let products = normalizeData.ids.map(id => normalizeData.entities[id]);
  
  if (selectedFilter !== "همه") {
    products = products.filter(product => 
      product.filter === filterData.find(f => f.category === selectedFilter)?.id
    );
  }
  
  return products;
}, [normalizeData, selectedFilter, filterData]);



   const endOffset = itemOffset + itemsPerPage;
const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

   // const allProducts = useMemo(() => {
   //  if (!normalizeData) return [];
   //  return normalizeData.ids.map(id => normalizeData.entities[id]);
   // }, [normalizeData]);

const currentItems = useMemo(()=>filteredProducts.slice(itemOffset, endOffset),[filteredProducts, itemOffset, endOffset]) 

  
  
  
  useEffect(()=>{
      setItemOffset(0);
  },[pageCount])
  
   const handlePageClick = (event: { selected: number; }) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  

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
     <div className="container mx-auto">
  <span>فیلتر کردن محصولات:</span>
  <select 
    value={selectedFilter}
    onChange={(e) => setSelectedFilter(e.target.value)}
    className="mr-2 p-1 border rounded"
  >
    <option value="همه">همه</option>
    {filterData.map((f, index) => (
      <option key={index} value={f.category}>
        {f.category}
      </option>
    ))}
  </select>
</div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-5 mx-auto container px-2 lg:px-10">
         <ShowProducts handleAddToCart={handleAddToCart} currentItems={currentItems} />
      </ul>
      </section>

      {filteredProducts.length > itemsPerPage && (
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