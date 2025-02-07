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
) => {
  const { data, error } = await resend.emails.send({
    from: "Weride <team@weride.live>",
    to: [ownerEmail],
    subject: "Request a Book",
    html: `<div style="background: linear-gradient(to right, #1f2937, #374151); padding: 40px; color: #f3f4f6; min-height: 100vh; font-family: Arial, sans-serif;">
  <h1 style="margin-bottom: 48px; text-align: center; font-size: 32px; font-weight: bold;">Rental Request</h1>
  <div style="border-radius: 16px; background: rgba(167, 139, 250, 0.2); padding: 24px; font-family: monospace;">
    <p style="padding-left: 28px; margin-top: 28px; text-align: left;">Hi <span style="font-weight: 800;">${ownerName},</span></p>
    
    <p style="padding-left: 28px; margin-top: 28px; text-align: left;">
      <span style="font-weight: 800;">${renterName}</span> has requested to rent your vehicle 
      <strong>${bikeName}</strong> for <strong>${hours}</strong> hours.
    </p>
    
    <p style="padding-left: 28px; margin-top: 28px; text-align: left;">📍 Pickup Location: <strong>${location}</strong></p>
    <p style="padding-left: 28px; margin-top: 8px; text-align: left;">📞 Renter’s Contact: <strong>${phone}</strong></p>
    
    <p style="padding-left: 28px; margin-top: 20px; text-align: left;">⏳ Please respond to this request within <strong>20 mins.</strong></p>
    
    <p style="padding-left: 28px; margin-top: 20px; text-align: left; color: #9ca3af; font-weight: 800;">Cheers,</p>
    <p style="padding-left: 28px; text-align: left; margin-bottom: 28px; color: #9ca3af; font-weight: 800;">Team Weride !!</p>
  </div>
</div>`,
  });
  if (error) {
    console.error("Email Sending Failed: ");
    return { error };
  }
  return { success: "Email sent successfully", data };
};
