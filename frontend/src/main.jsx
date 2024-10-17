// index.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx"; // Import App
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
      { path: "/:type/:brand/:productDetails", element: <ProductPage /> },
      { path: "/myaccount", element: <MyAccount /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/policy", element: <Policy /> },

    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
