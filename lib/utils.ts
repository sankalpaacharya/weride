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

export function discordMessageMaker(ownerName: string, location: string) {
  return `
  🎉 Ride Confirmed! 🚗💨

📌 Details of the Ride:

    Vehicle Title: 🚙 {vehicle_title}
    Vehicle Name: 🔖 {vehicle_name}
    Owner Name: 🧑‍🔧 ${ownerName}
    Pickup Location: 📍 {pickup_location}
    Drop-off Location: 🎯 ${location}
    Date & Time: 📅 ${Date.now()}

🤝 Thank you for choosing us!
Sit back, relax, and enjoy your ride! 🚘✨
  `;
}
