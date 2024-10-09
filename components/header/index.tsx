import React from "react";
import { FaRegUser, FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { RiEBikeFill } from "react-icons/ri";
import Link from "next/link";
import Profile from "@/components/profile";

interface MenuItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, icon: Icon, label }) => (
  <Link href={href}>
    <div className="flex shadow-md md:shadow-none items-center rounded-full gap-2 cursor-pointer p-2 bg-[#fffffff3] md:bg-gray-200 transition duration-200 ease-in-out hover:bg-gray-300">
      <Icon size={20} />
      <p className="hidden md:flex text-center">{label}</p>
    </div>
  </Link>
);
interface IndexProps {
  isAuthenticated: boolean;
}
const Index: React.FC<IndexProps> = ({ isAuthenticated }) => {
  return (
    <div className="w-full flex md:px-10 px-3 justify-between items-center bg-gray-200 text-gray-800 p-3">
      <Link href={"/"}>
        <div className="cursor-pointer">
          <RiEBikeFill className="text-gray-600" size={25} />
        </div>
      </Link>
      <div className="flex gap-5 items-center">
        <MenuItem href="/" icon={FaHome} label="Home" />
        <MenuItem href="/orders" icon={FaCartShopping} label="Orders" />
        {isAuthenticated ? (
          <Profile></Profile>
        ) : (
          <MenuItem href="/login" icon={FaRegUser} label="Account" />
        )}
      </div>
    </div>
  );
};

export default Index;
