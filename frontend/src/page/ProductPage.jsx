import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { Rating } from "@material-tailwind/react";
import Comment from "../components/layouts/Comment";
import { useLocation } from "react-router-dom";
import freedelivery from "../assets/icons/FreeDelivery.svg";
import ReturnDelivery from "../assets/icons/Return.svg";
import axios from "axios";
import SummaryApi from "../common";
const ProductPage = () => {
  let { state } = useLocation();
  const [product, setProduct] = useState([]);
  const showProduct = async (productId) => {
    try {
      const url = SummaryApi.getProductById.url.replace(":id", productId);

      const dataResponse = await axios({
        url: url,
        method: SummaryApi.getProductById.method,
        withCredentials: true,
      });
      const dataApi = await dataResponse.data;
      setProduct(dataApi.product)
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showProduct(state.id);
  }, []);

  // const [mainImage, setMainImage] = useState(product.img);

  const thumbnails = [
    "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
  ];

  const changeImage = (src) => {
    // setMainImage(src);
  };
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="shadow-md my-8 container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src="https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Product"
              className="size-96 lg:size-[480px] object-cover rounded-lg shadow-md mb-4"
              id="mainImage"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {thumbnails.map((thumb, index) => (
                <img
                  key={index}
                  src={thumb}
                  alt={`Thumbnail ${index + 1}`}
                  className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => changeImage(thumb)}
                />
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-xl lg:text-2xl font-bold mb-2">{product.name}</h2>
            <div className="flex items-center mb-4">
              <Rating value={4} className="text-primary text-sm" readonly />
              <span className="ml-2 text-gray-600">(120 reviews)</span>
            </div>
            <div className="mb-4">
              <span className="text-lg lg:text-2xl mr-2">$dfjkasd</span>
              <span className="text-gray-500 text-sm lg:text-base line-through">
                $dssadasd
              </span>
            </div>
            <p className="text-gray-700 text-sm mb-6">daksdjakskdasjg</p>
            <hr className="my-8" />
            <div className="mb-6 flex gap-6 items-center">
              {/* {product.color ? (
                <>
                  <h3 className="text-sm lg:text-base">Color:</h3>
                  <div className="flex space-x-2">
                    {product.color.map((color, index) => (
                      <button
                        key={index}
                        className="w-5 h-5 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        style={{ backgroundColor: color }}
                      ></button>
                    ))}
                  </div>
                </>
              ) : (
                ""
              )} */}
            </div>

            <div className="mb-6 flex gap-6 items-center">
              <h3 className="text-sm lg:text-base">Size:</h3>
              <div className="flex space-x-2">
                {/* {product.size.map((size, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 flex text-sm items-center justify-center rounded-md border-2 focus:bg-primary focus:text-white"
                  >
                    {size}
                  </button>
                ))} */}
              </div>
            </div>
            <div className="mb-6 flex gap-6 items-center">
              <h3 className="text-sm lg:text-base mb-2">Quantity:</h3>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max="999"
                defaultValue="1"
                className="h-8 w-24 text-center rounded-md border shadow-sm outline-none focus:border-primary focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              />
            </div>

            <div className="mb-6 flex gap-4 items-center">
              <button
                type="button"
                className="text-sm w-full lg:text-base px-5 py-2 font-semibold tracking-wide bg-white text-primary border border-primary hover:bg-primary hover:text-white rounded-md"
              >
                Buy Now
              </button>
              <CiHeart className="hover:text-primary" size={35} />
            </div>
            <div className="flex items-center gap-8 px-4 py-3 border">
              <img src={freedelivery} alt="" />
              <div>
                <h3 className="font-semibold">Free Delivery</h3>
                <span className="text-[13px]">
                  For orders worth over 1 million VND
                </span>
              </div>
            </div>
            <div className="flex items-center gap-8 px-4 py-3 border">
              <img src={ReturnDelivery} alt="" />
              <div>
                <h3 className="font-semibold">Return Delivery</h3>
                <span className="text-[13px]">
                  Free 7 Days Delivery Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Comment />
      <hr className="my-12" />
      <div className="relative mb-10">
        <div className="flex items-center justify-between mb-6 lg:mb-10">
          <div className="flex items-center gap-4">
            <span className="inline-block w-5 h-11 rounded-md border bg-primary"></span>
            <span className="text-primary font-bold text-lg">Related Item</span>
          </div>
        </div>
        {/* {products.filter((item) => item.type === type).length > 4 ? (
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
              navigation={{
                nextEl: ".custom-next-selling",
                prevEl: ".custom-prev-selling",
              }}
              modules={[Pagination, Navigation]}
            >
              {products
                .filter((item) => item.type === type)
                .map((item, index) => (
                  <SwiperSlide key={index}>
                    <Cardproduct item={item} />
                  </SwiperSlide>
                ))}
            </Swiper>

            <button className="custom-prev-selling absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-r-full left-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
              <IoIosArrowBack size={25} />
            </button>

            <button className="custom-next-selling absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-l-full right-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
              <IoIosArrowForward size={25} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-3">
            {products
              .filter((item) => item.type === type)
              .map((item, index) => (
                <Cardproduct key={index} item={item} />
              ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ProductPage;
