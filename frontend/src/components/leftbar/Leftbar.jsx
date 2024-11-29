import { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import SummaryApi from "../../common";
import Category from "./Category";
import { useSelector } from "react-redux";

function Leftbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]); // State để lưu danh mục
  const sidebarRef = useRef(null);
  const user = useSelector((state) => state?.user?.user);
  console.log("fhdajk",user); // Lấy người dùng từ Redux

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const getAllCategories = async () => {
    try {
      const dataResponse = await axios({
        url: SummaryApi.getAllCategories.url,
        method: SummaryApi.getAllCategories.method,
        withCredentials: true,
        credentials: "include",
      });
      const dataApi = dataResponse.data;
      setCategories(dataApi.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
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
          {categories.map((item,index) => index < 8 && (
            <Category key={item._id} item={item} /> // Sử dụng component Category để hiển thị
          ))}
        </ul>
      </div>
    </>
  );
}

export default Leftbar;
