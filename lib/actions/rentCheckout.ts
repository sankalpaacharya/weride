"use server";
import { TcheckOutSchema, checkOutSchema } from "../schemas/checkOutSchema";

export async function rentCheckoutAction(data: TcheckOutSchema) {
  const result = checkOutSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }
}
