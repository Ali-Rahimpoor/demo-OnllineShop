import SVG from "../assets/svg/svg1.svg?react"
const Error = ()=>{

   return(
   <div className="container px-4 text-center font-Dana text-zinc-600">
      <SVG className="size-120 mx-auto" />
      <h1 className="text-5xl text-red-700" >صفحه مورد نظر یافت نشد</h1>
      <h2 className="text-8xl mt-10">404</h2>
      
   </div>
   )
}
export default Error;