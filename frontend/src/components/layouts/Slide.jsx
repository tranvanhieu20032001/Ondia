import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules"; // Import Swiper modules
import "swiper/swiper-bundle.css";
import "swiper/css/navigation"; // Ensure navigation CSS is loaded
import { banner } from "../../constants/slide";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"; // Import custom icons
import "./slide.css";

function Slide() {
  return (
    <div className="relative flex items-center justify-center pt-8 lg:pt-6 lg:mx-0 w-full lg:w-4/5 group">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-next", // Link to custom next button
          prevEl: ".custom-prev", // Link to custom previous button
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000, // Autoplay delay in milliseconds
          disableOnInteraction: false, // Keep autoplay active after interaction
        }}
        modules={[Pagination, Navigation, Autoplay]} // Add Swiper modules
        className="h-[160px] lg:h-[385px] w-full"
      >
        {banner.map((item, index) => (
          <SwiperSlide key={index} className="h-[160px] lg:h-[385px]">
            
            <img
              src={item.img}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="custom-prev absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-r-full left-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
        <IoIosArrowBack size={25} />
      </button>
      <button className="custom-next absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-l-full right-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
        <IoIosArrowForward size={25} />
      </button>
    </div>
  );
}

export default Slide;
