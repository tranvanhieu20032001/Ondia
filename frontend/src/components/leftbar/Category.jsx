import React from "react";
import { IoIosArrowForward } from "react-icons/io";

function Category({ item }) {
  return (
    <li
      key={item.text}
      className="flex flex-col px-4 py-2 capitalize group border cursor-pointer border-transparent hover:shadow hover:shadow-primary rounded-[9999px]"
    >
      <div className="flex items-center gap:3 lg:gap-8 group-hover:text-primary">
        <span className="w-36">{item.text}</span>
        <IoIosArrowForward />
      </div>
      {item.data && (
        <div className="mt-2 pl-4 hidden group-hover:block absolute z-20 left-full -top-2 bg-white lg:bg-transparent lg:max-h-full w-[230px] lg:w-[65.7rem]">
          <ul className="shadow-primary shadow rounded-[1rem] bg-white min-h-[405px] px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Đặt vị trí cố định cho submenu */}
            {item.data.map((subItem) => (
              <li
                key={subItem.title}
                className="flex flex-col text-[14px] group"
              >
                <span className="font-semibold text-primary">
                  {subItem.title}
                </span>
                <ul className="pl-4 text-[13px]">
                  {subItem.subTitles.map((subTitle, index) => (
                    <li key={index} className="mt-1 hover:text-primary">
                      {subTitle}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default Category;
