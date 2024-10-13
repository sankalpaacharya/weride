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

export const renterIdentitySchema = z.object({
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
  drivingLicencePhoto: fileSchema,
});

export type TrenterIdentitySchema = z.infer<typeof renterIdentitySchema>;
