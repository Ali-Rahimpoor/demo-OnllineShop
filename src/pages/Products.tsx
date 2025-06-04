import { useGetProductsQuery } from "../features/apiSlice";
import { BsCartPlus } from "react-icons/bs";
import Products_svg from "../assets/svg/Products.svg?react"
const Products = ()=>{
   const {data:normalizeData,isLoading,isError} = useGetProductsQuery();
   

   const products = normalizeData?.ids.map(id=>{
      const product = normalizeData.entities[id];
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
         <button className="flex bg-rose-500 hover:bg-emerald-500 cursor-pointer rounded-r-full text-white items-center  border-gray-300 p-2 justify-between gap-x-1">
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

      <ul className="grid grid-cols-4 gap-5 ">
         {products}
      </ul>
      </section>
      </>
   )
}
export default Products;