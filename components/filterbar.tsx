import React from "react";
import { Search } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { isLoggedIn } from "@/lib/supabase/queries";
import Link from "next/link";
import { CircleUser } from "lucide-react";
import { Bike } from "lucide-react";
export default async function SearchHero() {
  const isUser = await isLoggedIn();
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
          {isUser ? (
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
          ) : (
            <div className="flex justify-center gap-4 mb-4  items-center">
              <Link href={"/login"}>
                <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition">
                  <Bike /> Login
                </button>
              </Link>
              <Link href={"/register"}>
                <button className="flex items-center gap-2 bg-white hover:bg-gray-200 text-orange-500 font-medium py-3 px-6 rounded-lg shadow-lg border-2 border-orange-500 transition">
                  <CircleUser /> Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
