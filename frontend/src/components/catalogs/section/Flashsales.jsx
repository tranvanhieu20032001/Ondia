import React, { useState } from "react";
import Cardproduct from "../../cart/Cardproduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Countdown from "../../countdown/Countdown";
import products from "../../../constants/products";

function Flashsales() {
  const [viewAll, setViewAll] = useState(false);

  return (
    <div className="mt-12 lg:mt-24">
      <div className="flex items-center gap-4">
        <span className="inline-block w-5 h-11 rounded-md border bg-primary"></span>
        <span className="text-primary font-bold text-lg">Today's</span>
      </div>
      <div className="flex items-center gap-6 lg:gap-32 mt-5 mb-8">
        <span className="capitalize font-bold text-xl lg:text-4xl">
          Flash Sales
        </span>
        <Countdown targetDate={'2024-10-18T00:00:00'} />
      </div>
      {viewAll ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((item, index) => (
            <Cardproduct key={index} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex mx-3 relative group">
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".custom-next-cart",
              prevEl: ".custom-prev-cart",
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className=""
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <Cardproduct item={item} /> {/* Use Cartproducy component */}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Previous Button */}
          <button className="custom-prev-cart absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-r-full left-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
            <IoIosArrowBack size={25} />
          </button>
          <button className="custom-next-cart absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-l-full right-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
            <IoIosArrowForward size={25} />
          </button>
        </div>
      )}

        <button
          className="mx-auto text-[12px] lg:text-[16px] my-4 lg:my-8 px-6 py-2 bg-primary text-white flex justify-center items-center rounded-sm"
          onClick={() => setViewAll(!viewAll)}
        >
          {viewAll ? "View less products" : "View all products"}
        </button>
    </div>
  );
}

export default Flashsales;
