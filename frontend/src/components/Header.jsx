import { useState, useEffect, useRef, useCallback } from "react";
import logo from "../assets/images/Ondia.png";
import { CiHeart, CiLogin, CiSearch, CiUser } from "react-icons/ci";
import { BsCart3, BsPersonCircle } from "react-icons/bs";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const searchRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleSearch = useCallback(() => setIsSearchOpen((prev) => !prev), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const toggleDropdown = useCallback(() => setIsDropdownOpen((prev) => !prev), []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && !searchRef.current.contains(event.target) &&
        menuRef.current && !menuRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "capitalize text-primary cursor-pointer my-1 border-b border-primary"
      : "capitalize text-black cursor-pointer my-1 hover:text-primary";

  return (
    <div>
      <div className="sub-header bg-black text-white text-center text-[12px] py-3">
        <span>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </span>
        <a
          href="https://www.facebook.com/"
          className="font-semibold mx-3 underline"
        >
          Shop now
        </a>
      </div>
      <div className="w-full border">
        <div className="main-header flex justify-between max-w-screen-xl mx-4 lg:mx-auto mt-3 lg:pt-5 pb-2 gap-8">
          <div className="logo w-1/4 flex items-center">
            <img src={logo} alt="Ondia Logo" className="h-10 lg:h-16 w-auto" />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center justify-start gap-10 w-1/3">
            {["/", "/contact", "/about", "/signup"].map((path, index) => {
              const labels = ["Home", "Contact", "About", "Sign Up"];
              return (
                <li key={index}>
                  <NavLink to={path} className={getNavLinkClass}>
                    {labels[index]}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu */}
          <div
            ref={menuRef}
            className={`fixed top-0 left-0 h-full w-full bg-white z-40 transition-transform transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } lg:hidden`}
          >
            <div className="flex justify-between p-4 border-b">
              <img src={logo} alt="Ondia Logo" className="h-10" />
              <AiOutlineClose size={25} onClick={toggleMenu} />
            </div>
            <ul className="flex flex-col items-center gap-4 mt-6">
              {["/", "/contact", "/about", "/signup"].map((path, index) => {
                const labels = ["Home", "Contact", "About", "Sign Up"];
                return (
                  <li key={index}>
                    <NavLink
                      to={path}
                      className={getNavLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {labels[index]}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="navbar w-3/4 lg:w-1/3 flex items-center justify-between relative">
            {/* Search Bar for small screens */}
            <div
              ref={searchRef}
              className={`${
                isSearchOpen ? "flex" : "hidden"
              } absolute lg:hidden top-12 left-0 w-full bg-gray-300 rounded items-center z-50`}
            >
              <input
                type="search"
                className="text-black block w-full rounded bg-transparent py-2 px-3 font-normal placeholder:text-gray-600 leading-[1.6] text-surface outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none text-[13px]"
                placeholder="What are you looking for?"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              <div className="flex items-center p-2 cursor-pointer">
                <CiSearch className="text-black size-5" />
              </div>
            </div>

            {/* Search Bar for large screens */}
            <div className="hidden lg:flex items-center bg-gray-300 rounded relative">
              <input
                type="search"
                className="text-black block flex-grow rounded bg-transparent bg-clip-padding w-[210px] py-2 px-3 font-normal placeholder:text-gray-600 leading-[1.6] text-surface outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none text-[13px]"
                placeholder="What are you looking for?"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              <div className="flex items-center p-2 cursor-pointer">
                <CiSearch className="text-black size-5" />
              </div>
            </div>

            <AiOutlineMenuUnfold
              className="block lg:hidden cursor-pointer"
              size={25}
              onClick={toggleMenu}
            />
            <CiSearch
              className="block lg:hidden cursor-pointer"
              size={25}
              onClick={toggleSearch}
            />

            {/* Wishlist and Cart Links */}
            <NavLink to="/wishlist" className={getNavLinkClass}>
              <CiHeart className="hover:text-primary" size={25} />
            </NavLink>
            <NavLink to="/cart" className={getNavLinkClass}>
              <BsCart3 className="hover:text-primary" size={25} />
            </NavLink>

            {/* User Icon with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <BsPersonCircle
                size={25}
                onClick={toggleDropdown}
                className={`${isDropdownOpen ? 'text-primary' : ''} cursor-pointer hover:text-primary`}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 bg-[rgba(97,91,97,0.8)] border border-gray-200 shadow-lg rounded mt-2 z-50 min-w-max">
                  <ul className="flex flex-col p-2 text-white text-[14px] lg:text-[15px]">
                    <li className="py-1 px-3 hover:text-primary cursor-pointer flex items-center gap-3">
                      <CiLogin size={23} />
                      <NavLink to="/login" onClick={() => setIsDropdownOpen(false)}>
                        Login
                      </NavLink>
                    </li>
                    <li className="py-1 px-3 hover:text-primary cursor-pointer flex items-center gap-3">
                      <CiUser size={23} />
                      <NavLink to="/register" onClick={() => setIsDropdownOpen(false)}>
                        Register
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
