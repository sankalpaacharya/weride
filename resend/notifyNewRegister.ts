import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const notifyNewRegister = async (name: string) => {
  const { data, error } = await resend.emails.send({
    from: "Weride <team@weride.live>",
    to: [
      "sankalp.ace22@sot.pdpu.ac.in",
      "vinit.tce22@sot.pdpu.ac.in",
      "nishit.bce22@sot.pdpu.ac.in",
    ],
    subject: `🚀 New User Registration - ${name}!`,
    html: `
			<h1>New User Registration</h1>
			<p>Hello Admins,</p>
			<p>A new user named <strong>${name}</strong> has registered and uploaded their documents.</p>
			<p>Best Regards,<br>Weride Team</p>
		`,
  });
  if (error) {
    console.error("Email Sending Failed:", error);
    return { error };
  }
  return { success: "Email sent successfully", data };
};
