"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegUser } from "react-icons/fa";
import { RiEBikeFill } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";

import { MdLogout } from "react-icons/md";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function index() {
  const logOutUser = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    window.location.reload();
  };
  return (
    <div className="pr-3 ">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <Avatar>
            <AvatarImage src="https://github.com/randompost12.png" />
            <AvatarFallback>WR</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={"/settings/profile"}>
            <DropdownMenuItem className="flex gap-2 items-center">
              <FaRegUser className="mr-2 h-4 w-4" />{" "}
              <span className="">Profile</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="flex gap-2 items-center">
            <RiEBikeFill className="mr-2 h-4 w-4" />{" "}
            <span className="">Vehicle</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 items-center">
            <FaHistory className="mr-2 h-4 w-4" />{" "}
            <span className="">History</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logOutUser} className="flex gap-2">
            <MdLogout /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
