import { createBrowserRouter } from "react-router";
import App from "../pages/App";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Error from "../components/Error";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import AddProduct from "../components/AddProduct";
import EditOrDeleteProduct from "../components/EditOrDeleteProduct";
import EditProduct from "../components/EditProduct";
export const router = createBrowserRouter([
   {
      path:"/",
      element:<App/>,
      errorElement:<Error/>,
      children:[
         {
            path:"/",
            element:<Home/>
         },
         {
            path:"/products",
            element:<Products/>
         },
         {
            path:"/cart",
            element:<Cart/>
         },
      ],
   },
   {
      path:"/admin",
      element:<Admin/>,
      errorElement:<Error/>,
      children:[
         {
            path:'/admin/addProduct',
            element:<AddProduct/>
         },
         {
            path:"/admin/editOrDeleteProduct",
            element:<EditOrDeleteProduct/>
         },
         {
            path:"/admin/editProduct/:productId",
            element:<EditProduct/>
         }
      ]
   }
]);