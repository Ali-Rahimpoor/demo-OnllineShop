import Slider from "../components/Slider.js";
import { BsArrowDownUp } from "react-icons/bs";
const Home = ()=>{

   return(
      <>
         <div className="flex items-center justify-center">
               <div className="relative">
                  <BsArrowDownUp className="size-25 text-gray-400 hover:text-gray-800" />
               </div>
            </div>
      <section className="font-DanaMed pattern">
         
         <h1 className="text-6xl text-center text-gray-600 pr-25 mt-20 bg-white/70 py-10">
            <span>محصولات پیشنهادی</span>
         </h1>
         <div className="container py-20">
            <Slider/>
         </div>
      </section>
      </>
   )
}
export default Home;