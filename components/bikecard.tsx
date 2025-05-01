import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FaRegUserCircle, FaGasPump, FaStar } from "react-icons/fa";
import { MdDirectionsBike, MdSpeed, MdLocationOn } from "react-icons/md";
import { BiTime } from "react-icons/bi";
import Link from "next/link";

interface RentalCardProps {
  imageName: string;
  bikeDetails: {
    id: string;
    created_at: string;
    owner_id: string;
    name: string;
    vehicle_code: string;
    description: string;
    fuel_type: string;
    message: string;
    owner_name: string;
    price: number;
    availability: string;
  };
}

export default function RentalCard({
  imageName,
  bikeDetails,
}: RentalCardProps) {
  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Booked":
        return "bg-yellow-100 text-red-800";
      case "Unavailable":
        return "bg-red-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  // testing
  return (
    <Link
      href={`vehicle/${bikeDetails.id}`}
      prefetch={false}
      className="transition-all duration-300 hover:shadow-xl w-full"
    >
      <Card className="h-full">
        <div className="relative w-full pt-[66.67%]">
          <Image
            className="rounded-t-lg object-cover brightness-[70%] absolute inset-0"
            alt={bikeDetails.name}
            src={`https://cxlnoycrdkdkdezryaph.supabase.co/storage/v1/object/public/Vehicle/${bikeDetails.id}_side.webp`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="absolute top-4 right-4">
            <Badge
              className={`${getAvailabilityColor(bikeDetails.availability)} px-3 py-1`}
            >
              {bikeDetails.availability}
            </Badge>
          </div>
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <span className="font-bold text-lg text-primary">
              ₹{bikeDetails.price}
            </span>
            <span className="text-sm text-gray-600">/hr</span>
          </div>
        </div>

        <CardContent className="p-4 space-y-4">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap">
                  {bikeDetails.name}
                </h2>
                <p className="text-sm text-gray-600">{bikeDetails.name}</p>
              </div>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold">4.3</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <MdLocationOn className="text-primary text-lg" />
                <span className="text-sm">High Rise</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaGasPump className="text-primary text-lg" />
                <span className="text-sm">40kmpl</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <MdSpeed className="text-primary text-lg" />
                <span className="text-sm">90kmph</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <BiTime className="text-primary text-lg" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between space-y-2">
            <div className="flex items-center gap-2">
              <FaRegUserCircle className="text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-900">Owner</p>
                <p className="text-sm text-gray-600">
                  {bikeDetails.owner_name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MdDirectionsBike className="text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Last Rented By
                </p>
                <p className="text-sm text-gray-600">Someone</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
