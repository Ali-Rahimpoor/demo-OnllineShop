import { BsCartPlus } from "react-icons/bs"
import type { IProduct } from "../types/Types"


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
         </li>))}
         </>
         )
}
export default ShowProducts;