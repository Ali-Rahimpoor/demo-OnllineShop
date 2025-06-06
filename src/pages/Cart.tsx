import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getTotals, selectAll, addToCart, decreaseCart, deleteCart, deleteAllCart,} from "../features/cartSlice";
import { useEffect } from "react";
import SVG from "../assets/svg/svg1.svg?react";
import { IoTrashOutline, IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import Order_svg from "../assets/svg/order.svg?react";
import Buy_svg from "../assets/svg/Buy.svg?react";
import type { RootState } from "../app/store";
import { MdDeleteSweep } from "react-icons/md";
import { formatPrice } from "../helper/RialConvertor";
const img_url = "/server/images/"
const Cart = () => {
  const cartItems = useSelector(selectAll);
  const dispatch = useDispatch();
  const totalQty = useSelector((state:RootState) => state.cart.cartTotalQty);
  const totalAmount = useSelector((state:RootState) => state.cart.cartTotalAmount);

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  if (cartItems.length === 0) {
    return (
      <main>
        <div className="font-Dana flex flex-row-reverse items-center justify-center mt-3 gap-x-6">
          <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl">سفارشی ندارید</h1>
          <Link to="/products" className="border-b border-gray-200 mt-5 text-gray-500">
             در بخش محصولات سفارش خود را انجام دهید !
          </Link>
          </div>
          <SVG className="size-90" />
        </div>
      </main>
    );
  }

  return (
    <main className="pr-10 pl-5  container py-2 font-Dana">
      <h2 className="text-4xl font-extrabold my-6 text-center">سبد خرید شما</h2>
      <div className="flex justify-between">
      <section className="grid grid-cols-2 h-[600px] overflow-y-scroll container mx-10 md:grid-cols-3 gap-4">
        {cartItems.map((item) => (
         
          <div key={item.id} className="border h-[300px] border-gray-300 rounded-xl shadow-md p-4 flex flex-col justify-between">
            <img
              src={`${img_url}/${item.image}.webp`}
              alt={item.name}
              className="w-full scale-110 h-40 object-contain mb-2"
              loading="lazy"
            />
            <h3 className="text-lg font-DanaBold mb-1">{item.name}</h3>
            <div className="flex justify-start gap-x-2 px-1 items-center font-bold text-green-700 mb-3">
               <span className="text-sm text-gray-700"> تعداد: {item.cartQty}</span>
              <span>هزینه : {item.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between px-2 items-center gap-2 mt-auto">
              <div className="flex items-center justify-between gap-x-5">
              <button
                onClick={()=> dispatch(decreaseCart(item.id))}
                className="bg-gray-100 p-2 rounded hover:bg-gray-200"
              >
                <IoRemoveOutline />
              </button>
              <button
                onClick={() => dispatch(addToCart(item))}
                className="bg-gray-100 p-2 rounded hover:bg-gray-200"
              >
                <IoAddOutline />
              </button>
              </div>
              <button
                className="bg-red-100 p-2 rounded hover:bg-red-200 text-red-600"
                onClick={()=> dispatch(deleteCart(item.id))}
              >
                <IoTrashOutline />
              </button>
            </div>
          </div>
        ))}
      </section>
      <nav className=" px-4 w-[400px] h-[600px]">
        <Buy_svg className="size-70" />
        <div className="flex justify-between items-center px-1">
        <div>
          <h1 className="font-Morabba text-xl text-emerald-600">هزینه کل</h1>
          <p className="font-DanaMed text-emerald-600">{formatPrice(totalAmount)}</p>
          <h1 className="font-Morabba text-xl">تعداد کل</h1>
          <p>{totalQty}</p>
        </div>
        <button
        className="font-Morabba flex flex-col hover:text-red-700 items-center"
        onClick={()=> dispatch(deleteAllCart())}
        >
          <MdDeleteSweep className="size-10" />
          <span>حذف همه</span>
        </button>
        </div>
        <button className="mx-auto block bg-rose-600/60 hover:bg-red-600 text-white p-2 rounded-3xl">
          <span className="font-MorabbaLight text-xl">پرداخت از طریق درگاه بانکی</span>
          <Order_svg className="size-40"/>
        </button>
      </nav>
      </div>
      
    </main>
  );
};

export default Cart;
