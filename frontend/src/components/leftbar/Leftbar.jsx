import { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Category from "./Category";
import { fetchAllCategoriesCached } from "../../utils/catalogApi";

function Leftbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]); // State để lưu danh mục
  const [childcategories, setChildCategories] = useState([]);
  const sidebarRef = useRef(null);
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
      const allCategories = await fetchAllCategoriesCached();
      const parentCategories = allCategories.filter(
        (category) => category.parentCategory === null
      );
      const childCategories = allCategories.filter(
        (category) => category.parentCategory !== null
      );
      setCategories(parentCategories);
      setChildCategories(childCategories)
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
        } absolute z-30 lg:hidden flex items-center font-semibold text-base top-1 border-b`}
        onClick={toggleSidebar}
      >
        <IoMdArrowDropdown size={20} />
        Danh mục
      </button>
      <div
        ref={sidebarRef}
        className={`${
          isOpen ? "block" : "hidden"
        } w-2/5 lg:w-1/5 border-r pt-0 lg:pt-6 top-8 lg:top-0 bg-white lg:block absolute lg:relative z-40 shadow lg:shadow-none`}
      >
        <ul className="text-[12px] lg:text-[15px] relative">
          {categories.map((item) => (
            <Category key={item._id} item={item} childCategories={childcategories} /> // Sử dụng component Category để hiển thị
          ))}
        </ul>
      </div>
    </>
  );
}

export default Leftbar;
