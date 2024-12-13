import { z } from "zod";

const isClient = typeof window !== "undefined";

const fileSchema = isClient
  ? z
      .instanceof(FileList)
      .refine((files) => files.length > 0, {
        message: "this field is required",
      })
      .refine(
        (files) =>
          Array.from(files).every((file) =>
            ["image/jpeg", "image/png"].includes(file.type),
          ),
        {
          message: "Invalid file type. Only JPEG and PNG files are allowed.",
        },
      )
  : z.any();

export const ownerIdentitySchema = z.object({
  hostelBlock: z
    .string({ required_error: "Hostel Block is required" })
    .max(2, "Block name can't be more than 2 characters")
    .min(1, "Hostel Block is required"),
  hostelRoom: z
    .string({ required_error: "Hostel Room is required" })
    .max(3, "Not a valid room number")
    .min(1, "Room no is required"),
  collegeIDPhoto: fileSchema,
  hostelIDPhoto: fileSchema,
  profilePhoto: fileSchema,
  vehiclePhoto: fileSchema,
  QRPhoto: fileSchema,
  messageToRenter: z
    .string({ required_error: "Message is required" })
    .max(500, "message name can't be more than 2 characters")
    .min(100, "Message to renter must be atleast a 100 characters"),
  rollno: z.string({ required_error: "Rollno is required" }),
  vehicleDescription: z
    .string({ required_error: "Message is required" })
    .max(500, "description can't be more than 5000 characters")
    .min(200, "description for the vehicle should be atleast 200 characters"),
  vehicleName: z
    .string({ required_error: "Message is required" })
    .max(40, "name can't be more than 2 characters")
    .min(20, "vehicle name must be atleast 20 characters"),
  fuelType: z.enum(["petrol", "diesel", "electric", "cycle"]).default("petrol"),
});

export type TownerIdentitySchema = z.infer<typeof ownerIdentitySchema>;
