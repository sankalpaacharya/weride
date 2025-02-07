import {
  X,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Gauge,
  MapPinHouse,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import RideTimer from "@/components/ridetimer";
import Image from "next/image";
import QrCode from "@/public/images/QRimage.jpeg";
import { getActiveRide, updateRideStatus } from "@/lib/supabase/queries";
import { calculateRemainingTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { updateVehicleStatus } from "@/lib/supabase/queries";
import PendingLoading from "@/components/pendingloading";
import { calculatePendingTimeRemaining } from "@/lib/utils";

const Page = async () => {
  const activeRideData = await getActiveRide();
  if (!activeRideData) {
    return redirect("/");
  }

  async function cancelRide() {
    "use server";
    if (activeRideData.status !== "Active") {
      await updateRideStatus(activeRideData.id, "Canceled");
      await updateVehicleStatus(activeRideData.bike_id, "Available");
      return redirect("/");
    }
  }
  const timeLeft = calculateRemainingTime(
    activeRideData.accepted_at,
    activeRideData.rent_hour,
    activeRideData.status
  );

  return (
    <div className="w-full">
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header with Vehicle Info */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-purple-900">
              {activeRideData.status.toString().toUpperCase()} RIDE
            </h1>
            <p className="text-gray-600">Honda Activa 125</p>
          </div>
          {/* Time Remaining Card */}
          {activeRideData.status === "Active" ? (
            <RideTimer initialTime={timeLeft} />
          ) : (
            <PendingLoading
              timeRemaining={calculatePendingTimeRemaining(
                activeRideData.created_at
              )}
            />
          )}
          {/* Meter Reading Card */}
          <Card className={`border-2 border-purple-100`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="text-purple-900" />
                Meter Reading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Initial Reading</div>
                  <div className="text-2xl font-bold text-purple-900">
                    {activeRideData.initial_meter_reading}{" "}
                    {activeRideData.initial_meter_reading === "TBD" ? "" : "km"}
                  </div>
                  <div className="text-xs text-gray-400">Verified by Owner</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Rate</div>
                  <div className="text-2xl font-bold text-purple-900">
                    ₹40/hr
                  </div>
                  <div className="text-xs text-gray-400">
                    Final reading at return
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Final Reading</div>
                  <div className="text-2xl font-bold text-purple-900">
                    {activeRideData.final_meter_reading}{" "}
                    {activeRideData.final_meter_reading === "TBD" ? "" : "km"}
                  </div>
                  <div className="text-xs text-gray-400">Verified by Owner</div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Owner Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Owner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                    <img
                      src="https://github.com/sankalpaacharya.png"
                      alt="Owner"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {activeRideData.owner_id.name}
                      </h3>
                      <div className="flex items-center gap-1 text-yellow-500">
                        ★ 4.3
                        <span className="text-gray-500 text-sm">(5 rides)</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={16} className="text-purple-900" />
                      <a
                        href={`tel:+91 ${activeRideData.owner_id.phone}`}
                        className="hover:text-purple-900"
                      >
                        +91 {activeRideData.owner_id.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={16} className="text-purple-900" />
                      <a
                        href={`mailto:${activeRideData.owner_id.email}`}
                        className="hover:text-purple-900"
                      >
                        {activeRideData.owner_id.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Ride Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Ride Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-purple-900" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-gray-600">
                      {activeRideData.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-purple-900" />
                  <div>
                    <div className="font-medium">Rental Period</div>
                    <div className="text-gray-600">
                      {activeRideData.rent_hour} hour(s)
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPinHouse className="text-purple-900" />
                  <div>
                    <div className="font-medium">Pickup Location</div>
                    <div className="text-gray-600">
                      {activeRideData.pickup_location}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Payment QR Card */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center">
                <div className="bg-gray-100 p-6 rounded-lg inline-block mx-auto">
                  <Image
                    height={400}
                    width={400}
                    alt="Owner QR code"
                    src={QrCode}
                  />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-900">
                    ₹{activeRideData.rent_hour * 40}
                  </div>
                  <div className="text-gray-600">
                    Scan to pay after ride completion
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Final amount will be calculated based on meter reading
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Active ride cannot be canceled
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Action Buttons */}
          {(activeRideData.status === "Active" ||
            activeRideData.status === "Pending") && (
            <div className="flex gap-4 sticky bottom-6">
              <form
                action={cancelRide}
                className={`flex-1 h-15 bg-purple-900 cursor-pointer transition-all hover:bg-purple-800 text-white py-4 rounded-lg flex items-center justify-center gap-2 font-medium ${activeRideData.status === "active" ? "opacity-70" : null}`}
              >
                <button
                  type="submit"
                  disabled={activeRideData.status === "Active"}
                  className="flex items-center gap-2"
                >
                  <X size={20} />
                  {/* {cancelLoading ? <X size={20} /> : <LoaderCircle />} */}
                  End Ride
                </button>
              </form>
              <Button
                className="flex-1 h-15 border-2  py-4 border-primary"
                variant={"outline"}
              >
                Contact Support
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
