import React from "react";
import { AiOutlineFileProtect } from "react-icons/ai";
import { BsCoin } from "react-icons/bs";
import {
  CiBag1,
  CiFacebook,
  CiGift,
  CiInstagram,
  CiShop,
  CiTwitter,
} from "react-icons/ci";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { Link } from "react-router-dom";

function About() {
  const descriptions = [
    { number: "10.5k", des: "Sallers active our site", icon: <CiShop /> },
    { number: "15k", des: "Mopnthly Produduct Sale", icon: <BsCoin /> },
    { number: "45.5k", des: "Customer active in our site", icon: <CiGift /> },
    { number: "25k", des: "Anual gross sale in our site", icon: <CiBag1 /> },
    {
      number: "FREE AND FAST DELIVERY",
      des: "Free delivery for all orders over $140",
      icon: <FaShippingFast />,
    },
    {
      number: "24/7 CUSTOMER SERVICE",
      des: "Friendly 24/7 customer support",
      icon: <MdOutlineHeadsetMic />,
    },
    {
      number: "MONEY BACK GUARANTEE",
      des: "We reurn money within 30 days",
      icon: <AiOutlineFileProtect />,
    },
  ];
  return (
    <div className="max-w-screen-xl lg:mx-auto my-16 mx-2">
      <p className="my-10">
        <Link to="/" className="text-gray-500 hover:underline">
          Home
        </Link>
        /<span>About</span>
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-8">
          <h2 className="capitalize text-2xl font-semibold lg:text-5xl">
            Our Story
          </h2>
          <p className="font-normal text-[14px] lg:text-base text-justify">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p className="font-normal text-[14px] lg:text-base text-justify">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2023_12_27_638392840584950312_anh-dai-dien.jpg"
          alt=""
        />
      </div>

      <div className="grid grid-cols-4 gap-2 lg:gap-8 my-16">
        {descriptions.map(
          (des, index) =>
            index < 4 && (
              <div
                key={index}
                className="relative flex w-full justify-center rounded-md border border-gray-100 bg-white shadow-md group hover:bg-primary transition-colors duration-300 ease-in-out p-3"
              >
                <div className="flex flex-col gap-y-3 justify-center items-center rounded-md group-hover:text-white transition-colors duration-300 ease-in-out">
                  <span className="flex items-center justify-center text-[28px] lg:text-[48px] p-2 rounded-full border group-hover:bg-white group-hover:text-primary bg-black text-white outline outline-4 outline-gray-400">
                    {des.icon}
                  </span>
                  <span className="font-semibold text-[12px] lg:text-lg">
                    {des.number}
                  </span>
                  <span className="text-[10px] lg:text-lg text-center">
                    {des.des}
                  </span>
                </div>
              </div>
            )
        )}
      </div>
      <div className="grid grid-cols-3 gap-3 lg:ap-8">
        <div className="w-full h-auto space-y-3">
          <img
            className="w-full max-w-[370px] object-cover max-h-[420px] h-auto"
            src="https://studiochupanhdep.com/Upload/Images/Album/anh-cv-02.jpg"
            alt=""
          />
          <h2 className="capitalize text-sm lg:text-3xl font-semibold">
            Tom cruise
          </h2>
          <span className="text-[12px] lg:text-base">Founder & Chairman</span>
          <p className="flex gap-4 items-center">
            <CiTwitter size={25} />
            <CiInstagram size={25} />
            <CiFacebook size={25} />
          </p>
        </div>
        <div className="w-full h-auto space-y-3">
          <img
            className="w-full max-w-[370px] object-cover max-h-[420px] h-auto"
            src="https://hthaostudio.com/wp-content/uploads/2021/12/Anh-avatar-linkedin-dep-4.jpg"
            alt=""
          />
          <h2 className="capitalize text-sm lg:text-3xl font-semibold">
            emma wation
          </h2>
          <span className="text-[12px] lg:text-base">Managing Director</span>
          <p className="flex gap-4 items-center">
            <CiTwitter size={25} />
            <CiInstagram size={25} />
            <CiFacebook size={25} />
          </p>
        </div>
        <div className="w-full h-auto space-y-3">
          <img
            className="w-full max-w-[370px] object-cover max-h-[420px] h-auto"
            src="https://studiochupanhdep.com/Upload/Images/Album/anh-cv-02.jpg"
            alt=""
          />
          <h2 className="capitalize text-sm lg:text-3xl font-semibold">
            Will Smith
          </h2>
          <span className="text-[12px] lg:text-base">Product Designer</span>
          <p className="flex gap-4 items-center">
            <CiTwitter size={25} />
            <CiInstagram size={25} />
            <CiFacebook size={25} />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 lg:gap-8 my-16">
        {descriptions.map(
          (des, index) =>
            index >= 4 && (
              <div
                key={index}
                className="relative flex w-full justify-center rounded-md border border-gray-100 bg-white shadow-md group transition-colors duration-300 ease-in-out p-3"
              >
                <div className="flex flex-col gap-y-3 justify-center items-center rounded-md  transition-colors duration-300 ease-in-out">
                  <span className="flex items-center justify-center text-[28px] lg:text-[48px] p-2 rounded-full border bg-black text-white outline outline-4 outline-gray-400">
                    {des.icon}
                  </span>
                  <span className="font-semibold text-[12px] lg:text-lg text-center">
                    {des.number}
                  </span>
                  <span className="text-[10px] lg:text-lg text-center">
                    {des.des}
                  </span>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default About;
