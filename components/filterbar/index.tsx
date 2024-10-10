import React from "react";
import { IoIosSearch } from "react-icons/io";
import { IoArrowForward } from "react-icons/io5";

export default function index() {
  return (
    <div className="bg-pattern shadow-lg h-[20rem] w-full flex flex-col items-center justify-center">
      <div>
        <h2 className="font-semibold text-center text-4xl text-white">
          From students for students rent or list bikes with <br /> ease for
          hassle-free rides
        </h2>
        <div className="flex flex-col items-center mt-10">
          <div className="relative">
            <IoIosSearch
              size={30}
              className="absolute top-[17px] opacity-50 left-[15px] text-gray-600"
            />
            <span className="absolute right-[5px] bg-main hover:brightness-75 transition-all rounded-full p-3 cursor-pointer top-[7px]">
              <IoArrowForward size={26} color="white" />
            </span>
            <input
              placeholder="Where do you want to go?"
              className="outline-none h-16 w-[40rem] border-2  shadow-lg rounded-full px-14"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
