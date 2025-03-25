import {
  ChevronRight,
  MapPin,
  Clock,
  Bike,
  Phone,
  MessageSquare,
} from "lucide-react";

type RideProps = {
  rideNumber?: string;
  date?: string;
  time?: string;
  riderName?: string;
  phoneNumber?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  distance?: string;
  duration?: string;
  bikeModel?: string;
  price?: string;
};

export default function Page({
  rideNumber = "0057",
  date = "March 14, 2025",
  time = "2:30 PM",
  riderName = "Sophia Martinez",
  phoneNumber = "+1 (555) 123-4567",
  pickupLocation = "Science Building",
  dropoffLocation = "University Square Apartments",
  distance = "3.2 miles",
  duration = "1h 20m",
  bikeModel = "Trek FX 2",
  price = "$12.50",
}: RideProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-purple-700 text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <ChevronRight className="w-5 h-5 mr-2" />
          <span className="font-semibold text-lg">Ride #{rideNumber}</span>
        </div>
        <div className="text-purple-100 text-sm font-medium">
          {date} • {time}
        </div>
      </div>

      <div className="p-6">
        {/* Rider info */}
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-4">
            {riderName.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-lg text-gray-800">{riderName}</div>
            <div className="flex items-center text-gray-500 text-sm">
              <Phone className="w-3 h-3 mr-2" />
              {phoneNumber}
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center mr-3">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <span className="text-gray-800">{pickupLocation}</span>
          </div>
          <div className="ml-3 w-px h-6 bg-gray-300"></div>
          <div className="flex items-center mt-3">
            <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center mr-3">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <span className="text-gray-800">{dropoffLocation}</span>
          </div>
        </div>

        {/* Ride details */}
        <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-b border-gray-100">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-purple-600" />
            <span className="text-gray-700">{distance}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-purple-600" />
            <span className="text-gray-700">{duration}</span>
          </div>
          <div className="flex items-center">
            <Bike className="w-4 h-4 mr-2 text-purple-600" />
            <span className="text-gray-700">{bikeModel}</span>
          </div>
        </div>

        {/* Price and action buttons */}
        <div className="flex justify-between items-center">
          <div className="text-primary font-bold text-2xl">{price}</div>
          <div className="flex space-x-3">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md font-medium flex items-center transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </button>
            <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2 rounded-md font-medium flex items-center transition-colors">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
