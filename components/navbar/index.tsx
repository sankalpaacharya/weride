"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

export default function index() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className='bg-[#146eb4] text-white py-3 md:px-14 px-5  z-0'>
            <div className='flex justify-between items-center'>
                <div className='text-xl font-bold cursor-pointer'>
                    <Link href={"/"}>
                        WeRide
                    </Link>
                </div>
                <div className='md:flex gap-10 hidden'>
                    <Link className='hover:bg-[#ffffff22] px-2 py-1 text-center rounded-lg transition-all' href={'/'}>Home</Link>
                    <Link className='hover:bg-[#ffffff22] px-2 py-1 text-center rounded-lg transition-all' href={'/'}>Terms of Use</Link>
                    <Link className='hover:bg-[#ffffff22] px-2 py-1 text-center rounded-lg transition-all' href={'/'}>Privacy</Link>
                    <Link className='hover:bg-[#ffffff22] px-2 py-1 text-center rounded-lg transition-all' href={'/'}>About us</Link>
                </div>
                <button className=''>
                    <IoMdMenu size={30} onClick={() => { setIsOpen((prev) => !prev) }} />
                </button>
            </div>
            <div className={`absolute text-black border h-screen z-40 bg-white top-0 right-0 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-full md:w-[24rem] `}>
                <div className='px-10 mt-10 flex justify-between items-center'>
                    <p className='text-2xl font-medium'>Menu</p>
                    <RxCross1 onClick={() => { setIsOpen((prev) => !prev) }} className='cursor-pointer' size={25} />
                </div>
                <div className='px-10 mt-10 flex gap-5 flex-col'>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/'}>Terms of Use</Link>
                    <Link href={'/'}>Privacy</Link>
                    <Link href={'/'}>About us</Link>
                </div>
            </div>
        </header>
    )
}
