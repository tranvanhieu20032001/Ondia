import React from "react";

const Editprofile = () => {
  return (
      <div className="shadow-md h-full w-full p-4 lg:p-10 space-y-8 mb-8">
        <h1 className="text-xl text-primary"> Edit Your Profile</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
              <p>
                <label
                  htmlFor="firstname"
                  className="bg-white text-gray-600 px-1"
                >
                  First name *
                </label>
              </p>
            </div>
            <p>
              <input
                id="firstname"
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
                  htmlFor="lastname"
                  className="bg-white text-gray-600 px-1"
                >
                  Last name *
                </label>
              </p>
            </div>
            <p>
              <input
                id="lastname"
                autoComplete="false"
                tabIndex="0"
                type="text"
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
              <p>
                <label htmlFor="email" className="bg-white text-gray-600 px-1">
                  Email *
                </label>
              </p>
            </div>
            <p>
              <input
                id="email"
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
                  htmlFor="address"
                  className="bg-white text-gray-600 px-1"
                >
                  Address *
                </label>
              </p>
            </div>
            <p>
              <input
                id="address"
                autoComplete="false"
                tabIndex="0"
                type="text"
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>
        </div>
        <hr />
        <h1 className="text-xl text-primary">Change password</h1>
        <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
          <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
            <p>
              <label
                htmlFor="currentpassword"
                className="bg-white text-gray-600 px-1"
              >
                Current Password *
              </label>
            </p>
          </div>
          <p>
            <input
              id="currentpassword"
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
                htmlFor="newpassword"
                className="bg-white text-gray-600 px-1"
              >
                New Password *
              </label>
            </p>
          </div>
          <p>
            <input
              id="newpassword"
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
                htmlFor="comfirmpassword"
                className="bg-white text-gray-600 px-1"
              >
                Comfirm Password *
              </label>
            </p>
          </div>
          <p>
            <input
              id="comfirmpassword"
              autoComplete="false"
              tabIndex="0"
              type="text"
              className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
            />
          </p>
        </div>
        <div className="flex items-center gap-8 justify-end">
            <button className="cursor-pointer hover:text-primary">Cancel</button>
            <button
              type="button"
              className="text-sm px-5 py-2.5 font-semibold tracking-wide bg-transparent text-primary border border-primary hover:bg-primary hover:text-white rounded-md"
            >
              Save changes
            </button>
        </div>
      </div>
  );
};

export default Editprofile;
