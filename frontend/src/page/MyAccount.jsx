import React, { useState } from "react";
import { Link } from "react-router-dom";
import Editprofile from "../components/layouts/editprofile";
import Myorder from "../components/layouts/Myorder";
import Wishlist from "./Wishlist";
import { BsPersonCircle } from "react-icons/bs";
import { CiHeart, CiLogout, CiViewList } from "react-icons/ci";
// import Mywishlist from "../components/layouts/Mywishlist"; // Thêm MyWishlist component nếu có

function MyAccount() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="max-w-screen-xl mx-auto lg:px-0 pb-8">
      <div className="flex justify-between items-center my-10 px-2">
        <p className="">
          <Link to="/" className="text-gray-500 hover:underline">
            Home
          </Link>
          / <span className="">My Account</span>
        </p>
        <p>
          Welcome, <span className="text-primary">Admin</span>
        </p>
      </div>
      <div className="relative grid grid-cols-8 lg:grid-cols-5 gap-1">
        <nav className="space-y-6 col-span-1 shadow-lg">
          <ul className="space-y-6 text-gray-500">
            <li
              className={`flex items-center justify-center lg:justify-start gap-2 px-1 lg:px-6 py-2 cursor-pointer hover:text-primary ${
                activeSection === "profile"
                  ? "text-primary border-b border-b-primary"
                  : ""
              }`}
              onClick={() => setActiveSection("profile")}
            >
              <BsPersonCircle size={25} />
              <span className="hidden lg:inline-block">My Profile</span>
            </li>
            <li
              className={`flex items-center justify-center lg:justify-start gap-2 px-1 lg:px-6 py-2 cursor-pointer hover:text-primary ${
                activeSection === "orders"
                  ? "text-primary border-b border-b-primary"
                  : ""
              }`}
              onClick={() => setActiveSection("orders")}
            >
              <CiViewList size={25} />{" "}
              <span className="hidden lg:inline-block">My Orders</span>
            </li>
            <li
              className={`flex items-center justify-center lg:justify-start gap-2 px-1 lg:px-6 py-2 cursor-pointer hover:text-primary ${
                activeSection === "wishlist"
                  ? "text-primary border-b border-b-primary"
                  : ""
              }`}
              onClick={() => setActiveSection("wishlist")}
            >
              <CiHeart size={25} />{" "}
              <span className="hidden lg:inline-block">My Wishlist</span>
            </li>
            <li className="flex items-center justify-center lg:justify-start gap-2 px-1 lg:px-6 py-2 cursor-pointer hover:text-primary">
              <CiLogout size={23} />
              <span className="hidden lg:inline-block">Logout</span>
            </li>
          </ul>
        </nav>
        <div className="col-span-7 lg:col-span-4">
          {activeSection === "profile" && <Editprofile />}
          {activeSection === "orders" && <Myorder />}
          {activeSection === "wishlist" && <Wishlist />}
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
