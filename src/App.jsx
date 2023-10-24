import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Cart from "./Components/Cart/Cart";
import Profile from "./Components/Profile/Profile";
import NotFound from "./Components/NotFound/NotFound";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "./Context/Authentication";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Payment from "./Components/Payment/Payment";
import AllOrders from "./Components/AllOrders/AllOrders";
import { Offline } from "react-detect-offline";
import Brands from "./Components/Brands/Brands";
import WishlistProvider from "./Context/WishListContext";
import Wishlist from "./Components/Wishlist/Wishlist";
import GetEmailadress from "./Components/GetEmailadress/GetEmailadress";
import GetVerificationCode from './Components/GetVerificationCode/GetVerificationCode';
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Home from "./Components/Home/Home";

let router = createHashRouter([
  {
    path: "/", element: <Layout />, children: [

      {
        index: true, element: <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      },
      {
        path: "home", element: <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      },
      {
        path: "products/:id", element: <ProtectedRoute>
          <ProductDetails />
        </ProtectedRoute>
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgotpassword", element: <GetEmailadress /> },
      { path: "getverificationcode", element: <GetVerificationCode /> },
      { path: "resetPassword", element: <ResetPassword /> },
      {
        path: "cart", element: <ProtectedRoute>

          <Cart />
        </ProtectedRoute>
      },
      {
        path: "profile", element: <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      },
      {
        path: "payment", element: <ProtectedRoute>
          <Payment />
        </ProtectedRoute>
      },
      {
        path: "allorders", element: <ProtectedRoute>
          <AllOrders />
        </ProtectedRoute>
      },
      {
        path: "brands", element: <ProtectedRoute>
          <Brands />
        </ProtectedRoute>
      },
      {
        path: "wishlist", element: <ProtectedRoute>
          <Wishlist />
        </ProtectedRoute>
      },
      { path: "*", element: <NotFound /> }
    ]
  }
])

let queryClient = new QueryClient();
function App() {

  return <>
    <QueryClientProvider client={queryClient}>
      <AuthProvider >
        <WishlistProvider>
          <CartProvider>
            <RouterProvider router={router} />
            <Toaster />
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </QueryClientProvider >

    <Offline>
      <div className='Position-absolute bottom-0 start-0 bg-dark text-white p-3 rounded-2'>
        you are offline please check your internet connection
      </div>
    </Offline>
  </>
}

export default App;
