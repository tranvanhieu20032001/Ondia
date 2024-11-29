import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx"; // Layout chính cho người dùng
import Home from "./page/Home.jsx";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import Wishlist from "./page/Wishlist.jsx";
import Cart from "./page/Cart.jsx";
import Checkout from "./page/Checkout.jsx";
import MyAccount from "./page/MyAccount.jsx";
import About from "./page/About.jsx";
import Contact from "./page/Contact.jsx";
import NotFound from "./page/NotFound.jsx";
import ProductPage from "./page/ProductPage.jsx";
import Policy from "./page/Policy.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AdminLayout from "./page/admin/AdminLayout.jsx";
import AdminPanel from "./page/admin/AdminPanel.jsx";
import UserManagement from "./page/admin/usermanagement/UserManagement.jsx";
import ProductManagement from "./page/admin/productmanagement/ProductManagement.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/cart", element: <Cart /> },
      { path: "/cart/checkout", element: <Checkout /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/products/:productDetails", element: <ProductPage /> },
      { path: "/myaccount", element: <MyAccount /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/policy", element: <Policy /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminPanel /> },
      { path: "users", element: <UserManagement /> },
      { path: "products", element: <ProductManagement /> },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
