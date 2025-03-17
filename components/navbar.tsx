"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tos", label: "Terms of Use" },
    { href: "/privacy", label: "Privacy" },
    { href: "/aboutus", label: "About Us" },
    { href: "/faq", label: "FAQ" },
    { href: "https://discord.gg/bEMrcuW3W3", label: "Discord" },
  ];

  return (
    <header className="bg-primary text-white py-3 md:px-14 px-5 z-10 relative">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold cursor-pointer">
          <Link prefetch={false} href="/">
            WeRide
          </Link>
        </div>
        <nav className="md:flex gap-10 hidden">
          {navLinks.map((link) => (
            <Link
              prefetch={false}
              key={link.label}
              className="hover:bg-[#ffffff22] px-2 py-1 text-center rounded-lg transition-all"
              href={link.href} target="_blank" rel="noopener noreferrer"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button onClick={toggleMenu} className="md:hidden" title="Toggle Menu">
          <IoMdMenu size={30} />
        </button>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleMenu}
        />
      )}
      <div
        className={`fixed text-black border h-full z-40 bg-white top-0 right-0 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-full md:w-[24rem]`}
      >
        <div className="px-10 mt-10 flex justify-between items-center">
          <p className="text-2xl font-medium">Menu</p>
          <RxCross1 onClick={toggleMenu} className="cursor-pointer" size={25} />
        </div>
        <nav className="px-10 mt-10 flex gap-5 flex-col">
          {navLinks.map((link) => (
            <Link
              prefetch={false}
              onClick={() => setIsOpen(false)}
              key={link.label}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
