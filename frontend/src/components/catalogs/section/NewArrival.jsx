import React from "react";
import lockhongkhi from "../../../assets/images/lockhongkhi.png";
import tv from "../../../assets/images/tv.png";
import speakers from "../../../assets/images/speakers.png";
import dongho from "../../../assets/images/dongho.png";

function NewArrival() {
  return (
    <div className="relative lg:mt-24 mt-20">
      <div className="flex items-center gap-4">
        <span className="inline-block w-5 h-11 rounded-md border bg-primary"></span>
        <span className="text-primary font-bold text-lg">
          Sản phẩm chất lượng
        </span>
      </div>
      <div className="flex items-center gap-10 lg:gap-32 mt-5 mb-8">
        <span className="capitalize font-bold text-xl lg:text-4xl">
          Thương hiệu hàng đầu
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex justify-center items-center w-full lg:h-[600px] h-[292px] bg-black rounded-md relative">
          <img
            src={lockhongkhi}
            alt="lockhongkhi"
            className="object-cover rounded-md h-4/5"
          />
          <div className="absolute text-white w-1/2 left-10 bottom-8">
            <h1 className="text-2xl font-semibold capitalize">
              Smartmi Air Purifier 2
            </h1>
            <h3 className="text-[14px] my-2 uppercase">
              Máy lọc không khí Smartmi Air Purifier 2
            </h3>
            <a href="/shop" className="border-b inline-block">
              Shop Now
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-rows-2 gap-4">
          <div className="relative flex justify-center items-center w-full h-[292px] bg-[#0d0d0d] rounded-md">
            <img
              src={tv}
              alt="tv Fashion"
              className="object-cover rounded-md"
            />
            <div className="absolute text-white w-1/2 left-10 bottom-8">
              <h1 className="text-2xl font-semibold capitalize">Tivi Xiaomi</h1>
              <h3 className="text-[14px] my-2 uppercase">
                Tivi Xiaomi A43 43 inch Nội Địa Model 2025
              </h3>
              <a href="/shop" className="border-b inline-block">
                Shop Now
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative flex justify-center items-center w-full h-[292px] bg-black rounded-md">
              <img
                src={speakers}
                alt="Speakers"
                className="object-cover rounded-md"
              />
              <div className="absolute text-white w-2/3 left-10 bottom-8">
                <h1 className="text-2xl font-semibold capitalize">
                  {" "}
                  Loa Bluetooth Xiaomi
                </h1>
                <h3 className="text-[14px] my-2 uppercase">
                  Loa Bluetooth Xiaomi Mi Portable Speaker 16WQBH4197GL
                </h3>
                <a href="/shop" className="border-b inline-block">
                  Shop Now
                </a>
              </div>
            </div>
            <div className="relative flex justify-center items-center w-full h-[292px] bg-black rounded-md">
              <img src={dongho} alt="" className="object-cover rounded-md" />
              <div className="absolute text-white w-2/3 left-10 bottom-8">
                <h1 className="text-2xl font-semibold capitalize">
                  Smart watch
                </h1>
                <h3 className="text-[14px] my-2 uppercase">
                  Đồng Hồ Đeo Tay Thông Minh Mibro Watch T2 XPA W012
                </h3>
                <a href="/shop" className="border-b inline-block">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewArrival;
