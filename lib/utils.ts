import { DISCORD_URL } from "@/utils/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, toDate } from "date-fns-tz";
import { differenceInSeconds, addHours } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sendDiscordMessage(userId: string, message: string) {
  if (userId !== "") {
    const response = await fetch(DISCORD_URL + "/notify/discord", {
      method: "POST",
      body: JSON.stringify({
        userId,
        message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export function getFormatedDate() {
  const indiaTimezone = "Asia/Kolkata";
  const now = new Date();
  const zonedDate = toDate(now, { timeZone: indiaTimezone });
  return `${format(zonedDate, "yyyy-MM-dd")}, ${format(zonedDate, "hh:mm:ss a", { timeZone: indiaTimezone })}`;
}

export function discordRenterMessageMaker(
  ownerName: string,
  location: string,
  vehicle_name: string,
) {
  return `
 \`\`\` 
  🎉 Ride Confirmed! 🚗💨

📌 Details of the Ride:

    Vehicle Name: 🚙 ${vehicle_name}
    Owner Name: 🧑‍🔧 ${ownerName}
    Pickup Location: 📍 PDEU
    Drop-off Location: 🎯 ${location}
    Date & Time: 📅 ${getFormatedDate()}

🤝 Thank you for choosing us!
Sit back, relax, and enjoy your ride! 🚘✨
 \`\`\` 
  `;
}

type NotificationTextProps = {
  renterName: string;
  location: string;
  hours: number;
  ownerName: string;
  pickUpLocation: string;
  renterPhone: number;
  vehicleName: string;
};

export const discordOwnerRentRequest = ({
  renterName,
  location,
  hours,
  ownerName,
  pickUpLocation,
  renterPhone,
  vehicleName,
}: NotificationTextProps) => {
  return `
    > 🚲 **New Rental Request!**
    > Hi  **${ownerName},**
    
    > **👤 Renter:** ${renterName}  
    > **🏍 Vehicle:** ${vehicleName}  
    > **⏳ Duration:** ${hours} hour(s)  

    > 📍 **Pickup Location:** ${pickUpLocation}  
    > 📌 **Destination:** ${location}  
    > 📞 **Contact:** ${renterPhone}  

    > ⏳ **Please respond within 20 minutes.** The request will expire after this time.  
    > ✅ **Approve** | ❌ **Decline**  

    🚀 *Happy Riding,*  
    **Team WeRide**
  `;
};

export const calculateRemainingTime = (
  acceptedAt: string,
  rentHour: number,
  status: string,
) => {
  if (status === "pending") {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  const startTime = new Date(acceptedAt);
  const endTime = addHours(startTime, rentHour);
  const now = new Date();
  const timeDifference = differenceInSeconds(endTime, now);
  const hours = Math.floor(timeDifference / 3600);
  const minutes = Math.floor((timeDifference % 3600) / 60);
  const seconds = timeDifference % 60;
  if (timeDifference <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  return {
    hours,
    minutes,
    seconds,
  };
};

export const calculatePendingTimeRemaining = (createdAt: string): number => {
  const now = new Date();
  const difference = differenceInSeconds(now, new Date(createdAt));
  if (difference <= 0) {
    return 0;
  }
  return difference;
};
