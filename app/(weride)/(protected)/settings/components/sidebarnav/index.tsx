"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarNav {
  items: {
    href: string;
    title: string;
  }[];
}

export default function SidebarNav({ items }: SidebarNav) {
  const pathname = usePathname();
  return (
    <div>
      <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
                            ${buttonVariants({ variant: "ghost" })} 
                            ${
                              pathname === item.href
                                ? "bg-muted hover:bg-muted"
                                : "hover:bg-transparent hover:underline"
                            } justify-start`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
