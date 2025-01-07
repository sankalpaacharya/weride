import { z } from "zod";

export const checkOutSchema = z.object({
  hour: z.string().default("1"),
  kilometer: z.string().default("10"),
  location: z
    .string()
    .trim()
    .min(10, "minimum length should be of 10 characters")
    .max(100, "location can't be more than 100 characters"),
  ownerId: z.string().default(""),
  bikeId: z.string().default(""),
});

export type TcheckOutSchema = z.infer<typeof checkOutSchema>;
