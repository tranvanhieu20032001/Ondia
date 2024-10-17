/* eslint-disable react/prop-types */
// Cardproduct.js
import { Rating } from "@material-tailwind/react";
import { CiHeart } from "react-icons/ci";
import { PiEyeThin } from "react-icons/pi";
import { Link } from "react-router-dom";

const Cardproduct = ({ item }) => {
  return (
    <div className="relative flex w-full max-w-[12rem] lg:max-w-[16rem] flex-col overflow-hidden rounded-md border border-gray-100 bg-white shadow-md group/cart">
      <div className="relative mx-2 mt-2">
        <Link to={item.type+'/'+item.brand+'/'+item.href} className="flex h-36 lg:h-56 overflow-hidden rounded-md">
          <img className="object-cover w-full" src={item.img} alt="" />
        </Link>
        <span className="absolute top-0 left-0 m-1 lg:m-2 rounded-md bg-primary px-1 lg:px-3 py-1 text-center text-[10px] lg:text-[12px] text-white">
          -39%
        </span>
        <a
          href="/some/valid/uri"
          className="absolute bottom-0 right-0 left-0 hidden group-hover/cart:flex w-full items-center justify-center rounded-md bg-slate-900 px-2 py-2 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Add to cart
        </a>
        <div className="absolute top-1 right-2 hidden group-hover/cart:block">
          <span className="flex justify-center items-center w-8 h-8 rounded-full my-1 bg-gray-100 cursor-pointer hover:text-primary">
            <CiHeart size={20} />
          </span>
          <span className="flex justify-center items-center w-8 h-8 rounded-full my-1 bg-gray-100 cursor-pointer hover:text-primary">
            <PiEyeThin size={20} />
          </span>
        </div>
      </div>
      <div className="mt-4 px-5 pb-5">
      <Link to={item.type+'/'+item.brand+'/'+item.href}>
        <h5 className="text-[12px] lg:text-[14px] font-semibold tracking-tight text-slate-900 line-clamp-1">
            {item.title}
          </h5>
        </Link>
        <div className="">
          <p className="pb-1 flex items-center gap-2">
            <span className="font-semibold text-primary text-[14px] lg:text-[16px]">
              {item.sale_price}
            </span>
            <span className="lg:text-[14px] text-slate-900 text-[12px] line-through">
              {item.regular_price}
            </span>
          </p>
          <div className="flex items-center">
          <Rating value={5} className="text-primary text-sm" readonly/>
            <span className="mr-2 ml-2 rounded px-2.5 py-0.5 text-xs font-semibold">
              (8.8)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardproduct;
