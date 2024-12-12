import {
  ownerIdentitySchema,
  TownerIdentitySchema,
} from "../schemas/ownerIdentitySchema";

export async function ownerIdentityAction(data:TownerIdentitySchema) {
  console.log(data);

  return { message: "testing the for" };
}
