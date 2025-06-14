import { useEffect,useState } from "react";
import TextTransition, { presets } from "react-text-transition";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { GrUserAdmin } from "react-icons/gr";
const Nav = ()=> {

  const TEXTS = ["موبایل", "لپ تاپ", "ساعت",];
  const [index, setIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const cartQty = useSelector((state:RootState)=> state.cart.cartTotalQty);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      8000
    );
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(intervalId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

   return(
      <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto pl-5 pr-15 flex justify-between items-center">
          <Link to={'/'}>
          <h1 className="font-Morabba flex items-center justify-between sm:gap-x-0 gap-x-1 sm:w-41 cursor-pointer text-gray-700 text-lg sm:text-2xl">
            <span>فروشگاه </span>
            <span className="text-rose-600">
              <TextTransition springConfig={presets.stiff}>
                {TEXTS[index % TEXTS.length]}
              </TextTransition>
            </span>
          </h1>
          </Link>
          <ul className="md:flex hidden items-center justify-between gap-x-10 font-MorabbaLight">
            <Link to='/'>
            <li className="text-gray-700 hover:text-rose-600 transition">خانه</li>
            </Link>
            <Link to={'/products'}>
            <li className="text-gray-700 hover:text-rose-600 transition">محصولات</li>
            </Link>
            <Link to={'/admin'}>
            <li className="text-gray-700 hover:text-rose-600 transition">ورود ادمین</li>
            </Link>
            <li className="text-gray-700 hover:text-rose-600 transition">تماس با ما</li>
          </ul>
          
          <div>
              <Link to={'/cart'}>
            <button className="bg-rose-600 relative font-Morabba flex items-center justify-between text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition">
                <CiShoppingCart size={30} />
                <span>سبد خرید</span>
                 <span className="absolute -top-1 -right-1 bg-zinc-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartQty ?? 0}
              </span>
            </button>
                </Link>
          </div>
        </div>
        <Link to={'/admin'}>
        <button className="flex md:hidden items-center justify-center p-2 rounded-3xl border-gray-300 border mx-10">
            <GrUserAdmin/>
            <span>ورود ادمین</span>
        </button>
        </Link>
      </nav>
      </>
   )
}
export default Nav;