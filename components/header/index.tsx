import React from 'react';
import { FaRegUser } from "react-icons/fa";
import { RiEBikeFill } from "react-icons/ri";
// import { RiInboxArchiveFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import Link from 'next/link';

export default function index() {
    return (
        <div className='w-full flex px-10 justify-between items-center bg-gray-200 text-gray-800 p-3'>
            <div className='cursor-pointer'>
                <RiEBikeFill className='text-gray-600' size={25} />
            </div>
            <div className='flex gap-5 items-center'>
                <Link href={"/login"}>
                    <div className='flex shadow-md md:shadow-none items-center rounded-full gap-2 cursor-pointer p-2 bg-[#fffffff3] md:bg-gray-200 transition duration-200 ease-in-out hover:bg-gray-300'>
                        <FaRegUser size={20} className='' />
                        <p className='hidden md:flex text-center'>
                            Account
                        </p>
                    </div>
                </Link>
                {/* <div className='flex shadow-md md:shadow-none items-center rounded-full gap-2 cursor-pointer p-2 bg-[#fffffff3] md:bg-gray-200 transition duration-200 ease-in-out hover:bg-gray-300'>
                    <RiInboxArchiveFill size={20} />
                    <p className='hidden md:flex text-center'>
                        Complain
                    </p>
                </div> */}
                <div className='flex shadow-md md:shadow-none items-center rounded-full gap-2 cursor-pointer p-2 bg-[#fffffff3] md:hover:bg-gray-300 md:bg-gray-200 transition duration-200 ease-in-out'>
                    <FaCartShopping size={20} />
                    <p className='hidden md:flex text-center'>
                        Orders
                    </p>
                </div>
                <Link href={"/faq"}>
                    <div className='flex shadow-md md:shadow-none items-center rounded-full gap-2 cursor-pointer p-2 bg-[#fffffff3] md:hover:bg-gray-300 md:bg-gray-200 transition duration-200 ease-in-out'>
                        <FaQuestion size={20} />
                        <p className='hidden md:flex text-center'>
                            FAQ
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
