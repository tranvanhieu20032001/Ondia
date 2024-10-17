import React, { useState } from 'react';
import { TiDelete } from 'react-icons/ti';

export const Cardshopping = ({ item }) => {
  const [quantity, setQuantity] = useState(1);

  // Tính subtotal
  const subtotal = item.sale_price * quantity;

  // Xử lý khi người dùng thay đổi số lượng
  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value)); // Đảm bảo giá trị không dưới 1
    setQuantity(value);
  };

  return (
    <div className="relative grid grid-cols-5 gap-2 lg:gap-8 px-4 mt-2 bg-white border-none outline-none py-3 shadow-md text-[14px] lg:text-base">
      <div className="product flex items-center col-span-3 lg:col-span-2 gap-2">
        <img
          src={item.img}
          alt={item.title}
          className="w-14 h-14 lg:w-16 lg:h-16 object-cover"
        />
        <div className="detail">
          <h1 className="capitalize font-normal text-[12px] lg:text-base line-clamp-2 lg:line-clamp-1">{item.title}</h1>
          <span className="text-[11px] lg:text-sm text-gray-600">Màu: Đen</span>
        </div>
      </div>
      
      <div className="col-span-1 lg:col-span-2 flex flex-col lg:flex-row justify-around">
        <div className="price flex items-center text-[12px] lg:text-base">
          {item.sale_price.toLocaleString()}
        </div>

        <div className="quantity flex items-center">
          <input
            className="outline-none border lg:p-2 w-12 lg:w-20 rounded-md text-[12px] lg:text-base text-center"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            max={999}
            min={1}
            step={1}
          />
        </div>
      </div>

      <div className="subtotal flex items-center text-[12px] lg:text-base">
        {subtotal.toLocaleString()} đ
      </div>

      <TiDelete className="absolute cursor-pointer" size={25} color="red" />
    </div>
  );
};
