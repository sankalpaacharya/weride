import { z } from "zod";

export const checkOutSchema = z.object({
  hour: z.number().min(1).max(6).default(1),
  location: z
    .string()
    .trim()
    .min(10, "minimum length should be of 10 characters")
    .max(100, "location can't be more than 100 characters"),
  pickUpLocation:z.enum(["Boys UG Gate","Cafeteria Gate", "High Rise Gate"]).default("High Rise Gate"),
  ownerId: z.string().default(""),
  bikeId: z.string().default(""),
});

export type TcheckOutSchema = z.infer<typeof checkOutSchema>;
