import { z } from "zod";

export const loginInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("This is not a valid email")
    .regex(
      /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)?pdpu\.ac\.in$/,
      "Email must be a college email",
    ),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

export type TloginSchema = z.infer<typeof loginInSchema>;
