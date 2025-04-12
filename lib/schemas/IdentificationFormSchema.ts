import { z } from "zod";

const isClient = typeof window !== "undefined";

export const fileSchema = isClient
  ? z
      .instanceof(FileList)
      .refine((files) => files.length > 0, {
        message: "this field is required",
      })
      .refine(
        (files) =>
          Array.from(files).every((file) =>
            ["image/jpeg", "image/png", "image/webp"].includes(file.type),
          ),
        {
          message:
            "Invalid file type. Only JPEG, WEBP, and PNG files are allowed.",
        },
      )
  : z.any();

//Renter Req Details
export const renterIdentitySchema = z.object({
  collegeIDPhoto: fileSchema,
  drivingLicencePhoto: fileSchema,
});

export type TrenterIdentitySchema = z.infer<typeof renterIdentitySchema>;

//Owner Req Details
export const ownerIdentitySchema = z.object({
  collegeIDPhoto: fileSchema,
  vehiclePhotoFront: fileSchema,
  vehiclePhotoSide: fileSchema,
  vehiclePhotoBack: fileSchema,
  QRPhoto: fileSchema,
  messageToRenter: z
    .string({ required_error: "Message is required" })
    .max(200, "message name can't be more than 200 characters")
    .min(40, "Message to renter must be atleast a 40 characters"),
  vehicleDescription: z
    .string({ required_error: "Message is required" })
    .max(200, "description can't be more than 200 characters")
    .min(50, "description for the vehicle should be atleast 50 characters"),
  vehicleName: z
    .string({ required_error: "Message is required" })
    .max(20, "name can't be more than 20 characters")
    .min(7, "vehicle name must be atleast 7 characters"),
  fuelType: z.enum(["petrol", "diesel", "electric", "cycle"]).default("petrol"),
});

export type TownerIdentitySchema = z.infer<typeof ownerIdentitySchema>;
