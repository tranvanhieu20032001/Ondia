import { Rating } from "@material-tailwind/react";
import React from "react";

const Comment = () => {
  return (
    <div>
      <div className="mb-6 lg:mb-10">
        <div className="flex items-center gap-4">
          <span className="inline-block w-5 h-11 rounded-md border bg-primary"></span>
          <span className="text-primary font-bold text-lg">
            Customer reviews & rating
          </span>
        </div>
        <form className=" bg-white rounded-lg p-2 mt-4">
          <div className="px-3 mb-2 space-y-3">
          <Rating value={5} className="text-primary text-sm" />
            <textarea
              placeholder="Comment ..."
              className="w-full bg-gray-100 rounded border focus:border-primary leading-normal min-h-12 py-2 px-3 focus:outline-none focus:bg-white placeholder:text-gray-400"
            ></textarea>
          </div>
          <div className="flex justify-end px-4">
            <input
              type="submit"
              className="px-5 py-2 rounded-md text-primary hover:text-white text-sm border border-primary hover:bg-primary"
              value="Comment"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comment;
