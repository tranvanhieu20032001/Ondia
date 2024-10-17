import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { links } from "../../constants/link";
import Category from "./Category";

function Leftbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        className={`${
          isOpen ? "text-primary" : ""
        } absolute z-30 lg:hidden flex items-center text-[14px] top-1`}
        onClick={toggleSidebar}
      >
        <IoMdArrowDropdown />
        Danh mục
      </button>
      <div
        ref={sidebarRef}
        className={`${
          isOpen ? "block" : "hidden"
        } w-2/5 lg:w-1/5 border-r pt-0 lg:pt-6 top-8 lg:top-0 bg-white lg:block absolute lg:relative z-40 shadow lg:shadow-none`}
      >
        <ul className="text-[12px] lg:text-[15px] relative">
          {links.map((item, index) =>
            index <= 9 ? <Category key={item.text} item={item} /> : null
          )}
        </ul>
      </div>
    </>
  );
}

export default Leftbar;
