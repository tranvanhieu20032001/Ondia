import React from "react";
import ps5 from "../../../assets/images/ps5.png";
import women from "../../../assets/images/women.png";
import speakers from "../../../assets/images/speakers.png";
import gucci from "../../../assets/images/gucci.png";

function NewArrival() {
  return (
    <div className="relative lg:mt-24 mt-20">
      <div className="flex items-center gap-4">
        <span className="inline-block w-5 h-11 rounded-md border bg-primary"></span>
        <span className="text-primary font-bold text-lg">Nổi bật</span>
      </div>
      <div className="flex items-center gap-10 lg:gap-32 mt-5 mb-8">
        <span className="capitalize font-bold text-xl lg:text-4xl">
          Sản phẩm nổi bật
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex justify-center items-center w-full lg:h-[600px] h-[292px] bg-black rounded-md relative">
          <img src={ps5} alt="PS5" className="object-cover rounded-md h-4/5" />
          <div className="absolute text-white w-1/2 left-10 bottom-8">
            <h1 className="text-2xl font-semibold capitalize">PlayStation 5</h1>
            <h3 className="text-[14px] my-2 uppercase">
              Black and White version of the PS5 coming out on sale.
            </h3>
            <a href="/" className="border-b inline-block">
              Shop Now
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-rows-2 gap-4">
          <div className="relative flex justify-center items-center w-full h-[292px] bg-[#0d0d0d] rounded-md">
            <img
              src={women}
              alt="Women Fashion"
              className="object-cover rounded-md"
            />
            <div className="absolute text-white w-1/2 left-10 bottom-8">
              <h1 className="text-2xl font-semibold capitalize">Women’s Collections</h1>
              <h3 className="text-[14px] my-2 uppercase">
              Nổi bật woman collections that give you another vibe.
              </h3>
              <a href="/" className="border-b inline-block">
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
                <h1 className="text-2xl font-semibold capitalize">Speakers5</h1>
                <h3 className="text-[14px] my-2 uppercase">
                Amazon wireless speakers.
                </h3>
                <a href="/" className="border-b inline-block">
                  Shop Now
                </a>
              </div>
            </div>
            <div className="relative flex justify-center items-center w-full h-[292px] bg-black rounded-md">
              <img
                src={gucci}
                alt="Gucci Bag"
                className="object-cover rounded-md"
              />
              <div className="absolute text-white w-2/3 left-10 bottom-8">
                <h1 className="text-2xl font-semibold capitalize">Perfume</h1>
                <h3 className="text-[14px] my-2 uppercase">
                GUCCI INTENSE OUD EDP
                </h3>
                <a href="/" className="border-b inline-block">
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
