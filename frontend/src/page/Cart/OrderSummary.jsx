import React from "react";
import { Link } from "react-router-dom";

const OrderSummary = ({ cart }) => {
  const totalPrice = cart?.totalPrice || 0;

  return (
    <div className="bg-gray-100 rounded-md p-4 h-max">
      <h3 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">
        Order Summary
      </h3>
      <ul className="text-gray-800 mt-6 space-y-3">
        <li className="flex justify-between text-sm">
          Subtotal <span className="font-bold">{totalPrice.toLocaleString()} đ</span>
        </li>
        <li className="flex justify-between text-sm">
          Discount <span className="font-bold">0.00 đ</span>
        </li>
        <li className="flex justify-between text-sm font-bold">
          Total <span>{totalPrice.toLocaleString()} đ</span>
        </li>
      </ul>
        <Link to={'checkout'}><button
        type="button"
        className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-primary border border-primary hover:bg-primary hover:text-white rounded-md mt-6"
      >
        Thanh Toán
      </button></Link>
    </div>
  );
};

export default React.memo(OrderSummary);
