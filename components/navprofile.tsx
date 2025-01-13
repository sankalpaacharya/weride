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
import { RiBikeFill } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function NavProfile() {
  const logOutUser = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    window.location.reload();
  };

  const NavLinks = [
    {
      name: "Profile",
      icon: FaRegUser,
      href: "/settings/profile",
    },
    {
      name: "Vehicle",
      icon: RiBikeFill,
      href: "/vechile",
    },
    {
      name: "History",
      icon: FaHistory,
      href: "/rental/requests",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/randompost12.png" />
          <AvatarFallback>WR</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" alignOffset={12}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {NavLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <DropdownMenuItem className="flex gap-2 items-center py-3">
              <link.icon /> <span className="">{link.name}</span>
              <ChevronRight className="ml-auto" size={16} />
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logOutUser} className="flex gap-2 py-3">
          <MdLogout /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
