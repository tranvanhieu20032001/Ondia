import React from "react";
import { CiMail } from "react-icons/ci";
import { MdPhoneCallback } from "react-icons/md";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <p className="my-10">
        <Link to="/" className="text-gray-500 hover:underline">
          Home
        </Link>
        /<span>Contact</span>
      </p>
      <div className="grid grid-cols-1 m-4 space-y-8 lg:grid-cols-3 my-4 lg:my-12 lg:space-x-4">
        <div className="col-span-1 grid grid-cols-2 lg:grid-cols-1 shadow-md px-2 lg:px-8 py-6 lg:space-y-8">
          <div className="space-y-4">
            <div className="flex gap-4 items-center m-4">
              <span className="bg-primary text-white p-2 flex items-center justify-center rounded-full">
                <MdPhoneCallback size={25} />
              </span>
              <span>Call To Us</span>
            </div>
            <h2 className="text-sm">We are available 24/7, 7 days a week.</h2>
            <h2 className="text-sm">Phone: +8801611112222</h2>
          </div>
          <hr className="hidden lg:block" />
          <div className="space-y-4">
            <div className="flex gap-4 items-center m-4">
              <span className="bg-primary text-white p-2 flex items-center justify-center rounded-full">
                <CiMail size={25} />
              </span>
              <span>Write To US</span>
            </div>
            <h2 className="text-sm">
              Fill out our form and we will contact you within 24 hours.
            </h2>
            <h2 className="text-sm">Emails: customer@exclusive.com</h2>
            <h2 className="text-sm">Emails: support@exclusive.com</h2>
          </div>
        </div>
        <div className="col-span-2 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
                <p>
                  <label
                    htmlFor="yourname"
                    className="bg-white text-gray-600 px-1"
                  >
                    Your name *
                  </label>
                </p>
              </div>
              <p>
                <input
                  id="yourname"
                  autoComplete="false"
                  tabIndex="0"
                  type="text"
                  className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
                />
              </p>
            </div>

            <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
                <p>
                  <label
                    htmlFor="yourphone"
                    className="bg-white text-gray-600 px-1"
                  >
                   Your phone *
                  </label>
                </p>
              </div>
              <p>
                <input
                  id="yourphone"
                  autoComplete="false"
                  tabIndex="0"
                  type="text"
                  className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
                />
              </p>
            </div>

            <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
                <p>
                  <label
                    htmlFor="youremail"
                    className="bg-white text-gray-600 px-1"
                  >
                    Your Email *
                  </label>
                </p>
              </div>
              <p>
                <input
                  id="youremail"
                  autoComplete="false"
                  tabIndex="0"
                  type="text"
                  className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
                />
              </p>
            </div>
          </div>
          <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
                <p>
                  <label
                    htmlFor="message"
                    className="bg-white text-gray-600 px-1"
                  >
                    Your Message *
                  </label>
                </p>
              </div>
              <p>
                <textarea
                  id="message"
                  autoComplete="false"
                  tabIndex="0"
                  type="text"
                  className="py-1 px-1 text-gray-900 outline-none block min-h-36 lg:min-h-60 w-full"
                />
              </p>
            </div>

            <div className="flex items-center gap-8 justify-end">
            <button
              type="button"
              className="text-sm px-5 py-2.5 font-semibold tracking-wide bg-transparent text-primary border border-primary hover:bg-primary hover:text-white rounded-md"
            >
              Save changes
            </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
