import React from "react";
import { Link } from "react-router-dom";
import { Cardshopping } from "../components/cart/Cardshopping";
import products from "../constants/products";
import { IoReturnUpBack } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";

function Cart() {
  return (
    <div className="max-w-screen-xl mx-auto bg-white p-4">
      <p>
        <Link to="/" className="text-gray-500 hover:underline">
          Home
        </Link>
        / <span>Cart</span>
      </p>
      <div className="grid grid-cols-5 gap-2 lg:gap-8 mt-4 px-4 lg:mt-16 bg-white border-none outline-none py-6 shadow-md text-[14px] lg:text-base">
        <h1 className="capitalize col-span-3 lg:col-span-2 font-normal flex justify-start">
          Product
        </h1>
        <div className="col-span-1 lg:col-span-2 flex flex-col lg:flex-row justify-around">
          <h1 className="capitalize font-normal justify-start hidden lg:flex">
            Price
          </h1>
          <h1 className="capitalize font-normal justify-start hidden lg:flex">
            Quantity
          </h1>
        </div>
        <h1 className="capitalize font-normal flex justify-start">Subtotal</h1>
      </div>
      {products.map(
        (item, index) => index < 5 && <Cardshopping key={index} item={item} />
      )}
      <div className="flex justify-between gap-8 my-8">
        <button
          type="button"
          className="text-[12px] lg:text-sm flex items-center gap-3 capitalize px-2 py-2 lg:px-4 lg:py-2.5 font-semibold tracking-wide bg-transparent text-primary border border-primary hover:bg-primary hover:text-white rounded-md"
        >
          <IoReturnUpBack size={20} />
          Return to Shop
        </button>
        <button
          type="button"
          className="text-[12px] lg:text-sm flex items-center gap-3 capitalize px-2 py-2 lg:px-4 lg:py-2.5 font-semibold tracking-wide bg-transparent text-primary border border-primary hover:bg-primary hover:text-white rounded-md"
        >
          <RxUpdate size={20} /> Update Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form className="flex h-10 gap-4 justify-between lg:justify-start">
          <input className="w-60 lg:w-72 h-10 border-2 focus:outline-none rounded-md focus:border px-4 focus:border-primary" />
          <button className="text-[12px] lg:text-sm gap-3 capitalize px-2 py-2 lg:px-4 lg:py-2.5 tracking-wide bg-transparent flex items-center font-semibold hover:bg-primary hover:text-white border-primary border rounded-md text-primary">
            App Coupon
          </button>
        </form>
        <div className="bg-gray-100 rounded-md p-4 h-max">
          <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">
            Order Summary
          </h3>

          <ul className="text-gray-800 mt-6 space-y-3">
            <li className="flex flex-wrap gap-4 text-sm">
              Subtotal <span className="ml-auto font-bold">$200.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Discount <span className="ml-auto font-bold">$4.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Shipping <span className="ml-auto font-bold">$2.00</span>
            </li>
            <hr className="border-gray-300" />
            <li className="flex flex-wrap gap-4 text-sm font-bold">
              Total <span className="ml-auto">$206.00</span>
            </li>
          </ul>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-primary border border-primary hover:bg-primary hover:text-white rounded-md"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
