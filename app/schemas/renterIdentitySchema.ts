import { z } from "zod";

const isClient = typeof window !== "undefined";

const fileSchema = isClient
    ? z.instanceof(File, { message: "Invalid file type" }).refine(file => ['image/jpeg', 'image/png'].includes(file.type), {
        message: "Invalid file type. Only JPEG and PNG files are allowed."
    })
    : z.any();

export const renterIdentitySchema = z.object({
    hostelBlock: z.string().max(2, "Block name can't be more than 2 characters"),
    hostelRoom: z.string(),
    collegeIDPhoto: fileSchema,
    hostelIDPhoto: fileSchema,
    profilePhoto: fileSchema,
    drivingLicencePhoto: fileSchema,
});

export type TrenterIdentitySchema = z.infer<typeof renterIdentitySchema>;
