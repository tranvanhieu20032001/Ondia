import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
function Register() {
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
            Create an account
          </h2>
          <form className="divide-y divide-gray-200">
            <div className="py-4 text-base leading-6 space-y-8 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative mt-8">
                <input
                  autoComplete="off"
                  id="name"
                  name="name"
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
                  Name
                </label>
              </div>
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
                  type={isShowPassword ? "text" : "password"}
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
              <div className="relative mt-8">
                <input
                  autoComplete="off"
                  id="confirmpassword"
                  name="confirmpassword"
                  type={isShowPassword ? "text" : "password"}
                  required
                  className="peer placeholder-transparent h-8 w-full border-b pl-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary transition duration-200 ease-in-out"
                  placeholder=" "
                />
                <label
                  htmlFor="confirmpassword"
                  className="absolute left-2 -top-5 text-gray-600 text-base transition-all duration-200 ease-in-out
    peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440
    peer-focus:-top-5 peer-focus:left-0 peer-focus:text-gray-600 peer-focus:text-[13px]
    peer-valid:-top-5 peer-valid:left-0 peer-valid:text-[13px]"
                >
                  Confirm Password
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
          <div className="w-full flex justify-center">
            <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                width="800px"
                height="800px"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                
                <title>Google-color</title> <desc>Created with Sketch.</desc>
                <defs> </defs>
                <g
                  id="Icons"
                  stroke="none"
                  fill="none"
                >
                  
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      >
                      </path>
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      >
                      </path>
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      >
                      </path>
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      >
                      </path>
                    </g>
                  </g>
                </g>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
