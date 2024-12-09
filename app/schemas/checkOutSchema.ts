import { z } from "zod";

export const checkOutSchema = z.object({
  hour:z.string(),
  kilometer:z.string(),
  location:z.string()
})

export type TcheckOutSchema = z.infer<typeof checkOutSchema>