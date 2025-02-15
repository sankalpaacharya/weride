import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (
  ownerEmail: string,
  ownerName: string,
  renterName: string,
  hours: number,
  location: string,
  phone: string,
  bikeName: string,
  destination: string,
) => {
  const { data, error } = await resend.emails.send({
    from: "Weride <team@weride.live>",
    to: ["sankalp.ace22@sot.pdpu.ac.in","vinit.tce22@sot.pdpu.ac.in","nishit.bce22@sot.pdpu.ac.in"],
    subject: `🚀 New Rental Request for ${bikeName}!`,
    html: `
  <div style="background: #f4f4f4; padding: 20px; font-family: Arial, sans-serif; color: #333; box-sizing: border-box;">
    <div style="max-width: 600px; width: 100%; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); padding: 24px; box-sizing: border-box;">
      
      <h2 style="text-align: center; color: #6A0DAD; margin-bottom: 16px;">🚲 Rental Request</h2>
      
      <p style="font-size: 16px; color: #444; line-height: 1.6;">
        Hi <strong>${ownerName}</strong>,
      </p>
      
      <p style="font-size: 16px; color: #444; line-height: 1.6;">
        <strong>${renterName}</strong> wants to rent your <strong style="color: #6A0DAD;">${bikeName}</strong> for 
        <strong style="color: #6A0DAD;">${hours} hours</strong>.
      </p>
  
      <div style="background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 16px 0; box-sizing: border-box;">
        <p style="margin: 0; font-size: 15px;"><strong>📍 Pickup:</strong> ${location}</p>
        <p style="margin: 8px 0 0 0; font-size: 15px;"><strong>📌 Destination:</strong> ${destination}</p>
        <p style="margin: 8px 0 0 0; font-size: 15px;"><strong>📞 Contact:</strong> ${phone}</p>
      </div>
  
      <p style="font-size: 16px; color: #D9534F; font-weight: bold; margin-top: 20px;">
        ⏳ Please respond within <strong>20 minutes</strong>.
      </p>
  
      <!-- Button Container with improved mobile styling -->
      <div style="text-align: center; margin-top: 25px;">
        <a href="#"
           style="background: #6A0DAD; color: #fff; padding: 12px 24px; text-decoration: none; font-size: 16px; border-radius: 6px; display: inline-block; font-weight: bold; width: 150px; margin: 5px;">
           ✅ Approve
        </a>
        <a href="#"
           style="background: #D9534F; color: #fff; padding: 12px 24px; text-decoration: none; font-size: 16px; border-radius: 6px; display: inline-block; width: 150px; margin: 5px; font-weight: bold;">
           ❌ Decline
        </a>
      </div>
  
      <p style="text-align: center; color: #888; font-size: 14px; margin-top: 30px;">
        🚀 Happy Riding,<br><strong>Team Weride</strong>
      </p>
    </div>
  </div>
  `,
  });
  if (error) {
    console.error("Email Sending Failed:", error);
    return { error };
  }
  return { success: "Email sent successfully", data };
};
