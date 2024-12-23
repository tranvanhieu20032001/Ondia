import React from "react";
import Flashsales from "./section/Flashsales";
import Catagory from "./section/Catagory";
import BestSelling from "./section/BestSelling";
import SpecialEvent from "./section/SpecialEvent";
import ExploreOurProducts from "./section/ExploreOurProducts";
import NewArrival from "./section/NewArrival";
import Service from "./section/Service";
import SectionProducts from "./section/SectionProducts";

function Catalog() {
  return (
    <div className="max-w-screen-xl mx-auto ">
      <Flashsales />
      <hr className="my-16" />
      <Catagory />
      <hr className="my-16" />
      <ExploreOurProducts type={"Robot Hút Bụi"}/>
      <hr className="my-16" />
      <ExploreOurProducts type={"Máy lọc không khí"}/>
      <hr className="my-16" />
      <SectionProducts type={"new"} title={"Sản phẩm mới nhất"} subtitle={"New Arrivals!"}/>
      <hr className="my-16" />
      <SectionProducts type={"promotion"} title={"khuyến mãi kịch sàn"} subtitle={"Hot Deals!"}/>
      <hr className="my-16" />
      <SectionProducts type={"outstanding"} title={"Dành cho bạn"} subtitle={"Trending Now!"}/>
      {/* <BestSelling /> */}
      <SpecialEvent/>
      {/* <ExploreOurProducts/> */}
      <NewArrival/>
      <Service/>
    </div>
  );
}

export default Catalog;
