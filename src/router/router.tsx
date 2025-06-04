import { createBrowserRouter } from "react-router";
import App from "../pages/App";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Error from "../components/Error";
export const router = createBrowserRouter([
   {
      path:"/",
      element:<App/>,
      errorElement:<Error/>,
      children:[
         {
            path:"/products",
            element:<Products/>
         },
         {
            path:"/cart",
            element:<Cart/>
         }
      ]
   }
]);