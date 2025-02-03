import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async () => {
  const { data, error } = await resend.emails.send({
    from: "Weride <team@weride.live>",
    to: ["sankalp.ace22@sot.pdpu.ac.in"],
    subject: "Request a Book",
    html: "hello this is testing email",
  });
};
