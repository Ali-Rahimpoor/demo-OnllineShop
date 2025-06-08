import { BsCartPlus } from "react-icons/bs"
import type { IProduct } from "../types/Types"
import { formatPrice } from "../helper/RialConvertor";

interface ShowProductsProps{
   currentItems:IProduct[];
   handleAddToCart:(product:IProduct)=>void;
}
const ShowProducts = ({currentItems,handleAddToCart}:ShowProductsProps)=>{
      

         return(
         <>
         {currentItems.map((product:IProduct)=>(
         <li key={product.id}>
            <div className="mt-1 flex flex-col px-4 py-2 border border-gray-200 rounded-t-lg border-b-0">
            <img 
            src={`../../server/images/${product.image}.webp`} 
            className="w-[90%] mx-auto h-[90%] p-3 shadow rounded-xl my-4" 
            alt={product.name}
            loading="lazy"
            onError={(e)=>{
               const imgElement = e.target as HTMLImageElement;
               imgElement.onerror = null;
               imgElement.src = "../../public/noImageProduct.png"
            }}
            />
            <h3 className="sm:text-2xl text-lg font-DanaMed pr-3">{product.name}</h3>
            <p className="line-clamp-3 sm:text-base text-xs text-gray-600 text-balance">{product.description}</p>
            </div>
            <div className="flex lg:flex-row flex-col bg-zinc-800 items-end lg:items-center justify-between">
            <p className="p-2 font-DanaMed sm:text-base text-xs text-emerald-500">قیمت : {formatPrice(product.price)}</p>
            <button className="flex sm:text-base text-sm bg-rose-500 hover:bg-emerald-500 cursor-pointer rounded-r-full text-white items-center  border-gray-300 p-2 justify-between gap-x-1" onClick={()=>handleAddToCart(product)}>
               <span className="pr-2">سفارش</span>
            <BsCartPlus size={30} />
            </button>
            </div>
         </li>))}
         </>
         )
}
export default ShowProducts;