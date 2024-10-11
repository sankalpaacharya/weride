import React from "react";
import { Search } from "lucide-react";
import { ArrowRight } from "lucide-react";

export default function SearchHero() {
  return (
    <div className="bg-pattern shadow-lg min-h-[20rem] w-full flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-semibold text-center text-2xl md:text-3xl lg:text-4xl text-white">
          From students for students rent or list bikes with{" "}
          <span className="hidden md:inline">
            <br />
          </span>
          ease for hassle-free rides
        </h2>

        <div className="flex flex-col items-center mt-6 md:mt-10 w-full">
          <div className="relative w-full max-w-[40rem]">
            <Search
              size={24}
              className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-600 opacity-50"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-main hover:brightness-75 transition-all rounded-full p-2 md:p-3 cursor-pointer"
              aria-label="Search"
            >
              <ArrowRight size={24} color="white" />
            </button>
            <input
              placeholder="Where do you want to go?"
              className="outline-none h-12 md:h-16 w-full border-2 shadow-lg rounded-full px-12 pr-16"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
