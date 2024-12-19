import React from "react";
import { backendDomain } from "../../common";

function YourOrder({ orders, coupon }) {
  const subtotal = orders.reduce(
    (total, order) =>
      total +
      (order.product.saleprice !== 0 ? order.product.saleprice : order.product.price) *
        order.quantity,
    0
  );

  const discount = coupon
    ? coupon.discountType === "percentage"
      ? (subtotal * coupon.value) / 100 // Giảm giá theo phần trăm
      : coupon.value // Giảm giá theo giá trị cố định
    : 0;

  const totalPrice = subtotal - discount;

  return (
    <div className="space-y-8 shadow-md bg-slate-100 px-4 py-2">
      <h1 className="text-xl lg:text-4xl my-4">Your Order</h1>
      <hr />
      {orders.map((order) => {
        const product = order.product;
        const productImage = product?.images?.[0];
        const productName = product?.name;
        const productPrice =
          product?.saleprice !== 0 ? product?.saleprice : product?.price; // Kiểm tra và chọn saleprice hoặc price
        const quantity = order.quantity;

        const totalProductPrice = productPrice * quantity;

        return (
          <div
            key={productName}
            className="grid grid-cols-5 items-center gap-2 mb-4"
          >
            <div className="flex justify-end">
              <img
                src={`${backendDomain}/${productImage}`}
                alt={productName}
                className="w-14 h-14"
              />
            </div>
            <div className="col-span-2 lg:col-span-3 flex flex-col justify-center">
              <h1 className="font-medium text-[12px] lg:text-[15px] line-clamp-2 lg:line-clamp-1">
                {productName}
              </h1>
              <p className="flex gap-3 text-[11px] lg:text-sm text-gray-500">
                <span>{productPrice.toLocaleString()} đ</span> x{" "}
                <span>{quantity}</span>
              </p>
            </div>
            <div className="col-span-2 lg:col-span-1 justify-end flex items-center font-medium text-[12px] lg:text-[15px]">
              {totalProductPrice.toLocaleString()} đ
            </div>
          </div>
        );
      })}
      <hr />
      <div className="space-y-4 pb-4">
        <p className="text-sm lg:text-base flex justify-between pl-10">
          Subtotal
          <span className="font-medium text-sm lg:text-[16px]">
            {subtotal.toLocaleString()} đ
          </span>
        </p>

        {/* Hiển thị giảm giá nếu có */}
        {coupon && discount > 0 && (
          <p className="text-sm lg:text-base flex justify-between pl-10">
            Discount
            <span className="font-medium text-sm lg:text-[16px]">
              {coupon.discountType === "percentage"
                ? `- ${discount.toLocaleString()} đ (${coupon.value}% off)`
                : `- ${discount.toLocaleString()} đ`}
            </span>
          </p>
        )}

        <p className="text-sm lg:text-base flex justify-between pl-10">
          Shipping
          <span className="font-medium text-sm lg:text-[16px]">Free</span>
        </p>
        <hr />
        <p className="text-sm lg:text-base flex justify-between pl-10">
          Totals
          <span className="font-medium text-sm lg:text-[16px]">
            {totalPrice.toLocaleString()} đ
          </span>
        </p>
      </div>
      <hr className="border-t-black" />
    </div>
  );
}

export default YourOrder;
