import { DISCORD_URL } from "@/utils/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
  const date = new Date();
  return `${date.toISOString().split("T")[0]}, ${date.toLocaleTimeString()}`;
}

export function discordRenterMessageMaker(
  ownerName: string,
  location: string,
  vehicle_name: string,
) {
  return `
  🎉 Ride Confirmed! 🚗💨

📌 Details of the Ride:

    Vehicle Name: 🚙 ${vehicle_name}
    Owner Name: 🧑‍🔧 ${ownerName}
    Pickup Location: 📍 PDEU
    Drop-off Location: 🎯 ${location}
    Date & Time: 📅 ${getFormatedDate()}

🤝 Thank you for choosing us!
Sit back, relax, and enjoy your ride! 🚘✨
  `;
}

type NotificationTextProps = {
  renterName: string;
  location: string;
  hours: string;
  kilometers: string;
};

export const discordOwnerRentRequest = ({
  renterName,
  location,
  hours,
  kilometers,
}: NotificationTextProps) => {
  return `New Rental Request!

${renterName} has requested to rent your vehicle

📍 Pickup Location: ${location}
⏰ Duration: ${hours} hour(s)
🛣️ Distance: ${kilometers} KM

Please review and respond to this rental request within 30 minutes. The request will expire after this time.

Thank you for using our service!`;
};
