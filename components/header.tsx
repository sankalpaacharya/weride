import React from "react";
import { FaRegUser, FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { RiEBikeFill } from "react-icons/ri";
import Link from "next/link";
import Profile from "@/components/navprofile";
import { Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { isLoggedIn } from "@/lib/supabase/queries";

interface MenuItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  href,
  icon: Icon,
  label,
  className = "",
}) => (
  <Link href={href}>
    <div
      className={`flex shadow-md md:shadow-none items-center rounded-full gap-2 cursor-pointer p-2 bg-[#fffffff3] md:bg-gray-200 transition duration-200 ease-in-out hover:bg-gray-300 ${cn(className)}`}
    >
      <Icon size={20} />
      <p className="hidden md:flex text-center">{label}</p>
    </div>
  </Link>
);
const Index: React.FC = async () => {
  const isAuthenticated = await isLoggedIn();
  return (
    <div className="w-full bg-gray-200 text-gray-800 py-3 md:px-3 px-0">
      <div className="container flex justify-between items-center">
        <Link href={"/"}>
          <div className="cursor-pointer">
            <RiEBikeFill className="text-gray-600" size={25} />
          </div>
        </Link>
        <div className="flex gap-5 items-center">
          <MenuItem href="/" icon={FaHome} label="Home" />
          <MenuItem href="/ride" icon={Radio} label="Active" />
          <MenuItem href="/orders" icon={FaCartShopping} label="Orders" />
          {isAuthenticated ? (
            <Profile></Profile>
          ) : (
            <MenuItem href="/login" icon={FaRegUser} label="Account" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
