import React, { useEffect, useState } from "react";
import Cardproduct from "../../cart/Cardproduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import Cardproductvariant from "../../cart/Cardproductvariant";
import products from "../../../constants/products";
import SummaryApi from "../../../common";
import axios from "axios";
function ExploreOurProducts() {
  const [viewAll, setViewAll] = useState(false);
  const [items, setItems] = useState([]);
  const renderProduct = async () => {
    try {
    const dataResponse =  await axios({
        url: SummaryApi.getAllProducts.url,
        method: SummaryApi.getAllProducts.method,
        withCredentials: true,
        credentials: "include",
      });
      const dataApi = await dataResponse.data;
      setItems(dataApi.products)

      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    renderProduct();
  },[])
  return (
    <div className="relative lg:mt-24 mt-20">
      <div className="flex items-center gap-4">
        <span className="inline-block w-5 h-11 rounded-md border bg-primary"></span>
        <span className="text-primary font-bold text-lg">Our Products</span>
      </div>
      <div className="flex items-center gap-10 lg:gap-32 mt-5 mb-8">
        <span className="capitalize font-bold text-xl lg:text-4xl">
          Explore Our Products
        </span>
      </div>

      {viewAll ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item, index) => (
              <Cardproduct key={index} item={item} />
            ))}
          </div>
        </>
      ) : (
        <div>
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
                delay: 3000, // Autoplay delay in milliseconds
                disableOnInteraction: false, // Keep autoplay active after interaction
              }}
              navigation={{
                nextEl: ".custom-next-explore",
                prevEl: ".custom-prev-explore",
              }}
              modules={[Pagination, Navigation, Autoplay]}
              className=""
            >
              {items.map((item, index) => (
                <SwiperSlide key={index}>
                  <Cardproduct item={item} />
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="custom-prev-explore absolute -top-[4rem] text-black bg-[#f5f5f5] rounded-full right-14 h-[46px] w-[46px] z-10 flex items-center justify-center">
              <IoIosArrowRoundBack size={25} />
            </button>
            <button className="custom-next-explore absolute -top-[4rem] text-black bg-[#f5f5f5] rounded-full right-0 h-[46px] w-[46px] z-10 flex items-center justify-center">
              <IoIosArrowRoundForward size={25} />
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center text-[12px] lg:text-[16px] my-4 lg:my-8">
        <button
          className="px-6 py-2 bg-primary text-white flex justify-center items-center rounded-sm"
          onClick={() => setViewAll(!viewAll)} // Chuyển đổi chế độ hiển thị
        >
          {viewAll ? "View less products" : "View all products"}
        </button>
      </div>
    </div>
  );
}

export default ExploreOurProducts;
