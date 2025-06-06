import Slider from "../components/Slider.js";
import { BsArrowDownUp } from "react-icons/bs";
const Home = ()=>{

   const handelScroll = ()=>{
      window.scrollTo({
         behavior:"smooth",
         top:1000
      })
   }
   return(
      <>
         <div className="flex items-center justify-center">
               <div className="relative">
                  <BsArrowDownUp onClick={handelScroll} className="sm:size-25 size-15 mt-3 text-gray-400 hover:text-gray-800" />
               </div>
            </div>
      <section className="font-DanaMed pattern">
         
         <h1 className="md:text-6xl sm:text-3xl text-xl text-center text-gray-600 mt-20 bg-white/70 py-10">
            <span>محصولات پیشنهادی</span>
         </h1>
         <div className="container px-10 mx-auto py-5 sm:py-20">
            <Slider/>
         </div>
      </section>
      </>
   )
}
export default Home;