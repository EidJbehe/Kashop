import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import Home from "./assets/pages/home/Home.jsx";
import Cart from "./assets/pages/cart/Cart.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import Login from './assets/pages/login/Login';
import Register from './assets/pages/register/Register';
import About from './assets/pages/about/About.jsx';
import Contact from './assets/pages/contact/Contact.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children:[
        {
            path:"home",
            element:<Home />
        },
        {
            path:"cart",
            element:<Cart/>
        },
        {
            path:"login",
            element:<Login />
        },
        {
            path:"register",
            element:<Register/>
        },
         {
            path:"about",
            element:<About/>
        },
        {
            path:"contact",
            element:<Contact/>
        }
    ]}
  // },
  // {
  //   path: "/auth",
  //   element: <AuthLayout/>,
  //   children:[
  //       {
  //           path:"login",
  //           element:<Login />
  //       },
  //       {
  //           path:"register",
  //           element:<Register/>
  //       }
  //   ]
  // }
]);
export default router;