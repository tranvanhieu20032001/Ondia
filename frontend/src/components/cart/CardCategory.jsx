import React from "react";
function CardCategory({ name, icon }) {
  return (
    <div className="relative flex w-full max-w-[10.5rem] flex-col overflow-hidden rounded-md border border-gray-100 bg-white shadow-md group hover:bg-primary transition-colors duration-300 ease-in-out">
      <a
        className="flex flex-col gap-y-3 justify-center items-center overflow-hidden rounded-md group-hover:text-white m-2 lg:m-4 transition-colors duration-300 ease-in-out"
        href="/"
      >
        <span className="flex items-center justify-center text-[32px] lg:text-[54px]">
          {icon}
        </span>
        <span className="font-semibold text-[12px] lg:text-lg">{name}</span>
      </a>
    </div>
  );
}

export default CardCategory;
