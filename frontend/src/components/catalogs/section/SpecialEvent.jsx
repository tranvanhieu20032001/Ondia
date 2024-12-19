import React from "react";
import event from "../../../assets/images/event.png";
import Countdown from "../../countdown/Countdown";
import { useNavigate } from "react-router-dom";

function SpecialEvent() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[500px] bg-black flex flex-col lg:flex-row items-center p-1 lg:p-10 mt-20">
      <div className="w-full lg:w-2/5 flex flex-col justify-center p-4 gap-y-4">
        <h3 className="text-[#00FF66] font-semibold">Categories</h3>
        <p className="text-white text-[24px] lg:text-[48px] font-normal lg:font-semibold">
          Enhance Your Music Experience
        </p>
        {/* <Countdown targetDate={'2024-10-18T00:00:00'} /> */}
        <button onClick={() => navigate("/shop")} className="capitalize mt-4 bg-[#00FF66] text-white p-2 text-[12px] lg:text-[16px] rounded-md w-20 md:w-44">
          Buy now
        </button>
      </div>
      <div className="w-full md:w-3/5 relative flex justify-center items-center">
        <img
          src={event}
          alt=""
          className="object-cover h-auto w-4/5 relative z-10"
        />
        <div className="absolute w-full h-full rounded-full opacity-30 blur-xl z-0 bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-[rgba(255,255,255)] to-[rgba(255,255,255,0.01)]"></div>
      </div>
    </div>
  );
}

export default SpecialEvent;
