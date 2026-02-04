import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layout/MainLayout.jsx';
import Home from './assets/pages/home/Home.jsx';
import Cart from './assets/pages/cart/Cart.jsx';
import AuthLayout from './layout/AuthLayout.jsx';
import Login from './assets/pages/login/Login';
import Register from './assets/pages/register/Register';
import About from './assets/pages/about/About.jsx';
import Contact from './assets/pages/contact/Contact.jsx';
import SendCode from './assets/pages/sendCode/SendCode.jsx';
import ResetPassword from './assets/pages/resetPassword/ResetPassword.jsx';
import ProtectedRouter from './ProtectedRouter.jsx';
import ProudctDetails from './assets/pages/proudcts/ProductDetails.jsx';
import Chekout from './assets/pages/chekout/Chekout.jsx';
import Profile from './assets/pages/profile/ProfileLayout.jsx';
import ProfileOrders from './assets/pages/profile/ProfileOrders.jsx';
import ProfileInfo from './assets/pages/profile/ProfileInfo.jsx';
import ProfileLayout from './assets/pages/profile/ProfileLayout.jsx';
import Products from './assets/pages/proudcts/Products.jsx';
import CreateProduct from './assets/pages/proudcts/CreateProduct.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'cart',
        element: (
          <ProtectedRouter>
            <Cart />
          </ProtectedRouter>
        ),
      },
      {
        path: 'checkout',
        element: <Chekout />,
      },
      {
        path: 'profile',
        element: <ProfileLayout />,
        children: [
           {
            index: true,
            element: <ProfileInfo />,
          },
          {
            path: 'orders',
            element: <ProfileOrders />,
          },
        ]
      },
      {
        path: 'Products/:id',
        element: <ProudctDetails />,
      }, {
        path: '/Products',
        element: <Products />,
        
      }, {
        path: '/Products/create',
        element: <CreateProduct />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'sendCode',
        element: <SendCode />,
      },
      {
        path: 'resetPassword',
        element: <ResetPassword />,
      },
    ],
  },
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
