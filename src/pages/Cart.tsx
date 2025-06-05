import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getTotals, selectAll, addToCart,} from "../features/cartSlice";
import { useEffect } from "react";
import SVG from "../assets/svg/svg1.svg?react";
import { IoTrashOutline, IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import { IoCashOutline } from "react-icons/io5";
import type { RootState } from "../app/store";
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
        <div className="font-Roboto flex flex-col items-center justify-center mt-10">
          <h1 className="text-3xl">No Orders</h1>
          <Link to="/products" className="border-b border-gray-200 mt-5 text-gray-500">
            Go To Products and Order what You want!
          </Link>
          <SVG className="sm:size-100 size-70 mt-10 sm:mt-0" />
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 font-Roboto">
      <h2 className="text-4xl font-extrabold my-6 text-center">Your Cart</h2>
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cartItems.map((item) => (
         
          <div key={item.id} className="border border-gray-300 rounded-xl shadow-md p-4 flex flex-col justify-between">
            <img
              src={`${img_url}/${item.image}.webp`}
              alt={item.name}
              className="w-full h-40 object-contain mb-2"
              loading="lazy"
            />
            <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
            <div className="flex justify-start gap-x-2 px-1 items-center font-bold text-green-700 mb-3">
              <span>${item.price.toLocaleString()}</span>
              <span className="text-sm text-gray-700">Qty: {item.cartQty}</span>
            </div>
            <div className="flex justify-between px-2 items-center gap-2 mt-auto">
              <div className="flex items-center justify-between gap-x-5">
              <button
                className="bg-gray-100 p-2 rounded hover:bg-gray-200"
              >
                <IoRemoveOutline />
              </button>
              <button
                onClick={() => dispatch(addToCart({ ...item, cartQty: 1 }))}
                className="bg-gray-100 p-2 rounded hover:bg-gray-200"
              >
                <IoAddOutline />
              </button>
              </div>
              <button
                className="bg-red-100 p-2 rounded hover:bg-red-200 text-red-600"
              >
                <IoTrashOutline />
              </button>
            </div>
          </div>
        ))}
      </section>

      <div className="mt-8 border-t border-t-gray-300 pt-4 flex items-center flex-col justify-center">
        <p className="text-lg font-Roboto text-green-700">
           Total Amount: ${Math.round(totalAmount)} 💰
        </p>
        <button className="flex items-center gap-x-1 text-lg justify-center mt-2">
            <span>Buy</span>
           <IoCashOutline/>
        </button>
      </div>
    </main>
  );
};

export default Cart;
