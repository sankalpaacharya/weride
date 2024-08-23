import Image from 'next/image'
import React from 'react'
import RentalModal from '@/components/rentalmodal'
import { FaStar } from "react-icons/fa";

export default function index({ imageName }: { imageName: String }) {
    return (
        <div className='border p-3 shadow-lg md:mt-10 flex flex-col rounded-lg'>
            <Image className='border rounded-xl w-56 h-48 object-cover' alt='bike' src={`/images/${imageName}`} width={200} height={200} />
            <div className='mt-2'>
                <div className='flex  gap-2'>
                    <span className='text-xs bg-green-600 rounded-lg px-2 text-white'>Available</span>
                    <span className='text-xs  rounded-lg px-2 bg-indigo-500 text-white'>✨ Best</span>
                </div>
                <div className='mt-2 flex flex-col gap-1'>

                    <p className='text-sm'>
                        Owner:
                        Vinit Thakkar
                    </p>
                    <p className='text-sm'>
                        Duration Available: 3 hours
                    </p>
                    <p className='text-sm'>
                        Price: ₹80/hour
                    </p>
                    <div className='flex items-center  text-sm gap-2'>
                        <span>Rating:
                        </span>
                        <div className='flex gap-1'>
                            <FaStar className='text-yellow-400' />
                            <FaStar className='text-yellow-400' />
                            <FaStar className='text-yellow-400' />
                            <FaStar className='text-yellow-400' />
                        </div>
                    </div>
                    <RentalModal>
                        <button className='bg-[#2874A6] cursor-pointer text-md px-3 py-1 rounded-lg mt-2 w-full text-white'>Rent</button>
                    </RentalModal>
                </div>
            </div>
        </div>
    )
}
