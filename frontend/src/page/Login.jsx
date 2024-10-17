import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
function Login() {
  const [isShowPassword, setShowPassword] = useState(false);

  const showPassword = () => {
    console.log("hos");

    setShowPassword(!isShowPassword);
  };

  return (
    <div className="py-2 lg:py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm min-h-[640px] lg:max-w-4xl">
        <img
          className="hidden lg:block lg:w-1/2 object-cover"
          src="https://genk.mediacdn.vn/139269124445442048/2023/3/11/image2-1678430544115752600554-1678507891999-1678507892861387558657.jpg"
          alt=""
        />
        <div className="w-full my-auto p-4 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Log in to Ondia
          </h2>
          <form className="divide-y divide-gray-200">
            <div className="py-4 text-base leading-6 space-y-8 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative mt-8">
                <input
                  autoComplete="off"
                  id="email"
                  name="email"
                  type="text"
                  required
                  className="peer placeholder-transparent h-8 w-full border-b pl-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary transition duration-200 ease-in-out"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute left-2 -top-5 text-gray-600 text-base transition-all duration-200 ease-in-out
    peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440
    peer-focus:-top-5 peer-focus:left-0 peer-focus:text-gray-600 peer-focus:text-[13px]
    peer-valid:-top-5 peer-valid:left-0 peer-valid:text-[13px]"
                >
                  Email or phone number
                </label>
              </div>

              <div className="relative mt-8">
                <input
                  autoComplete="off"
                  id="password"
                  name="password"
                  type={isShowPassword?'text':'password'}
                  required
                  className="peer placeholder-transparent h-8 w-full border-b pl-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary transition duration-200 ease-in-out"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute left-2 -top-5 text-gray-600 text-base transition-all duration-200 ease-in-out
    peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440
    peer-focus:-top-5 peer-focus:left-0 peer-focus:text-gray-600 peer-focus:text-[13px]
    peer-valid:-top-5 peer-valid:left-0 peer-valid:text-[13px]"
                >
                  Password
                </label>
                <span
                  className="absolute right-3 top-2 cursor-pointer"
                  onClick={showPassword}
                >
                  {isShowPassword ? (
                     <IoEyeOutline className="text-primary" />
                    ) : (            
                      <IoEyeOffOutline />
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between mt-8">
                <div className="w-full lg:w-auto mb-0">
                  <label className="flex text-sm items-center" htmlFor="">
                    <input type="checkbox" />
                    <span className="ml-1">Remember me</span>
                  </label>
                </div>
                <div className="w-full lg:w-auto">
                  <a
                    className="text-sm inline-block text-gray-600 hover:underline focus:text-gray-800 focus:outline-none w-full"
                    href="#"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-3 w-full rounded-md text-center text-white font-bold bg-primary shadow-md hover:bg-[#f9851fda]"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="inline-flex relative items-center justify-center w-full">
            <hr className="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
              or
            </span>
          </div>
          <p className="text-center text-sm text-gray-500">
            Don&#x27;t have an account yet?
            <a
              href="#!"
              className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none px-2"
            >
              Sign up
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
