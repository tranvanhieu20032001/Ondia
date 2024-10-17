import React, { useState } from "react";
import { Link } from "react-router-dom";
import product from "../assets/images/products/iphon15prm.jpg";

function Checkout() {
  const [selectedMethod, setSelectedMethod] = useState("bank");

  const handleRadioChange = (event) => {
    setSelectedMethod(event.target.id);
  };
  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-0">
      <p className="my-10">
        <Link to="/" className="text-gray-500 hover:underline">
          Home
        </Link>
        /
        <Link to="/cart" className="text-gray-500 hover:underline">
          Cart
        </Link>
        / <span>Checkout</span>
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-10 gap-20">
        <div className="space-y-8 shadow-md px-4 max-h-max pb-8">
          <h1 className="text-xl lg:text-4xl my-10">Billing Details</h1>
          <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="name" className="bg-white text-gray-600 px-1">
                  First name *
                </label>
              </p>
            </div>
            <p>
              <input
                id="name"
                autoComplete="false"
                tabIndex="0"
                type="text"
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>
          <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label
                  htmlFor="lastname"
                  className="bg-white text-gray-600 px-1"
                >
                  Last name *
                </label>
              </p>
            </div>
            <p>
              <input
                id="lastname"
                autoComplete="false"
                tabIndex="0"
                type="text"
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>
          <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label
                  htmlFor="address"
                  className="bg-white text-gray-600 px-1"
                >
                  Street Address*
                </label>
              </p>
            </div>
            <p>
              <input
                id="address"
                autoComplete="false"
                tabIndex="0"
                type="text"
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>
          <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label
                  htmlFor="apartment"
                  className="bg-white text-gray-600 px-1"
                >
                  Apartment, floor, etc. (optional)
                </label>
              </p>
            </div>
            <p>
              <input
                id="apartment"
                autoComplete="false"
                tabIndex="0"
                type="text"
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>
          <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="town" className="bg-white text-gray-600 px-1">
                  Town/City*
                </label>
              </p>
            </div>
            <p>
              <input
                id="town"
                autoComplete="false"
                tabIndex="0"
                type="text"
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>

          <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="phone" className="bg-white text-gray-600 px-1">
                  Phone Number*
                </label>
              </p>
            </div>
            <p>
              <input
                id="phone"
                autoComplete="false"
                tabIndex="0"
                type="text"
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>
          <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="email" className="bg-white text-gray-600 px-1">
                  Email Address*
                </label>
              </p>
            </div>
            <p>
              <input
                id="email"
                autoComplete="false"
                tabIndex="0"
                type="text"
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>
          <div className="inline-flex items-center gap-4">
            <label
              className="relative flex cursor-pointer items-center rounded-full"
              htmlFor="checkbox-1"
              data-ripple-dark="true"
            >
              <input
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-primary hover:before:opacity-10"
                id="checkbox-1"
              />
              <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </label>
            <label htmlFor="">
              Save this information for faster check-out next time
            </label>
          </div>
        </div>

        <div className="space-y-8 shadow-md bg-slate-100 px-4">
          <h1 className="text-xl lg:text-4xl my-10">Your Order</h1>
          <hr />
          <div className="grid grid-cols-5 items-center gap-2">
            <div className="flex justify-end">
              <img src={product} alt="" className="w-14 h-14" />
            </div>
            <div className="col-span-2 lg:col-span-3 flex flex-col justify-center">
              <h1 className="font-semibold text-[12px] lg:text-[15px] line-clamp-2 lg:line-clamp-1">
                Điện thoại 15 promax màu xanh 1TG
              </h1>
              <p className="flex gap-3 text-[11px] lg:text-sm text-gray-500">
                <span>12.000.000 đ</span> x <span>5</span>
              </p>
            </div>
            <div className="col-span-2 lg:col-span-1 justify-end flex items-center font-semibold text-[12px] lg:text-[15px]">
              60.000.000 đ
            </div>
          </div>
          <div className="grid grid-cols-5 items-center gap-2">
            <div className="flex justify-end">
              <img src={product} alt="" className="w-14 h-14" />
            </div>
            <div className="col-span-2 lg:col-span-3 flex flex-col justify-center">
              <h1 className="font-semibold text-[12px] lg:text-[15px] line-clamp-2 lg:line-clamp-1">
                Điện thoại 15 promax màu xanh 1TG
              </h1>
              <p className="flex gap-3 text-[11px] lg:text-sm text-gray-500">
                <span>12.000.000 đ</span> x <span>5</span>
              </p>
            </div>
            <div className="col-span-2 lg:col-span-1 justify-end flex items-center font-semibold text-[12px] lg:text-[15px]">
              60.000.000 đ
            </div>
          </div>
          <hr />
          <div className="space-y-4 pb-4">
            <p className="text-sm lg:text-base flex justify-between pl-10">
              Subtotal
              <span className="font-semibold text-sm lg:text-[16px]">
                300.000.000 đ
              </span>
            </p>
            <p className="text-sm lg:text-base flex justify-between pl-10">
              Discount
              <span className="font-semibold text-sm lg:text-[16px]">
                2.000.000 đ
              </span>
            </p>
            <p className="text-sm lg:text-base flex justify-between pl-10">
              Shipping
              <span className="font-semibold text-sm lg:text-[16px]">Free</span>
            </p>
            <hr />
            <p className="text-sm lg:text-base flex justify-between pl-10">
              Totals{" "}
              <span className="font-semibold text-sm lg:text-[16px]">
                298.000.000 đ
              </span>
            </p>
          </div>
          <hr className="border-t-black" />

          <div className=" space-y-5 pb-8">
            <div className="flex items-center">
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor="bank"
              >
                <input
                  name="checkout"
                  type="radio"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                  id="bank"
                  checked={selectedMethod === "bank"}
                  onChange={handleRadioChange}
                />
                <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
              <label
                className="ml-2 text-slate-600 cursor-pointer text-sm"
                htmlFor="bank"
              >
                Bank
              </label>
            </div>
            <div className="flex items-center">
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor="cash"
              >
                <input
                  name="checkout"
                  type="radio"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                  id="cash"
                  checked={selectedMethod === "cash"}
                  onChange={handleRadioChange}
                />
                <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
              <label
                className="ml-2 text-slate-600 cursor-pointer text-sm"
                htmlFor="cash"
              >
                Cash on delivery
              </label>
            </div>
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

export default Checkout;
