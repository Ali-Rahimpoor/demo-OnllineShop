import SVG from "../assets/svg/svg1.svg?react"
import { Link } from "react-router";
const Error = ()=>{

   return(
   <div className="container mx-auto px-4 text-center font-Dana text-zinc-600">
      <SVG className="md:size-120 size-70 mx-auto" />
      <h1 className="sm:text-5xl text-lg text-red-700" >صفحه مورد نظر یافت نشد</h1>
      <h2 className="sm:text-8xl text-xl mt-10">404</h2>
      <Link className="sm:text-2xl border border-gray-400 p-2 sm:p-3 rounded-2xl" to={'/'}>تلاش مجدد</Link>
   </div>
   )
}
export default Error;