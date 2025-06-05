import Slider from "../components/Slider.js";
const Home = ()=>{

   return(
      <section className="font-DanaMed pattern">
         <h1 className="text-6xl text-center pr-25 mt-20 bg-white/70 py-10">
            <span>محصولات پیشنهادی</span>
         </h1>
         <div className="container py-20">
            <Slider/>
         </div>
      </section>
   )
}
export default Home;