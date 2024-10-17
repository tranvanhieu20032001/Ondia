import React from "react";
import Flashsales from "./section/Flashsales";
import Catagory from "./section/Catagory";
import BestSelling from "./section/BestSelling";
import SpecialEvent from "./section/SpecialEvent";
import ExploreOurProducts from "./section/ExploreOurProducts";
import NewArrival from "./section/NewArrival";
import Service from "./section/Service";

function Catalog() {
  return (
    <div className="max-w-screen-xl mx-auto ">
      <Flashsales />
      <hr className="my-16" />
      <Catagory />
      <hr className="my-16" />
      <BestSelling />
      <SpecialEvent/>
      <ExploreOurProducts/>
      <NewArrival/>
      <Service/>
    </div>
  );
}

export default Catalog;
