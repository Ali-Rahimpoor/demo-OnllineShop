import { Link, Outlet } from "react-router";
import Nav from "../components/Nav"
const App = () => {
 

  return (
    <>


        <header>
          <Nav/>
       
          <div className="w-full mx-auto py-5 mt-20">
            <div className="header w-[60%] h-[300px] rounded-full mx-auto bg-gray-200"></div>
          </div>
          
          <h1 className="font-MorabbaBold text-gray-800 flex items-center justify-center mx-auto w-full text-6xl mt-10">
            فروشگاه آنلاین
          </h1>
          
          <ul className="flex items-center mt-25 justify-between w-[600px] mx-auto font-Morabba">
            <Link to={'/products'}>
            <li className="w-30 h-20 text-xl cursor-pointer hover:scale-110 hover:bg-red-200 transition-all flex items-center justify-center border border-gray-300 rounded-2xl">محصولات</li>
            </Link>
           <Link to={'/cart'}>
           <li className="w-30 h-20 text-xl cursor-pointer hover:scale-110 hover:bg-red-200 transition-all flex items-center justify-center border border-gray-300 rounded-2xl">سبد خرید</li>
           </Link>
          </ul>
        
        </header>
   
        <main>
            <Outlet/>
        </main>
      
    </>
  );
};

export default App;