import { z } from 'zod';

export const signInSchema = z.object({
    name: z.string().min(4, "Name must be at least of 4 characters").max(100, "Name can't be more than 100 characters"),
    email: z.string().email("This is not a valid email").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:pdpu\.ac\.in)$/, "Email must be a college email"),
    password: z.string().min(8, "Password must be at least of 8 characters").max(200, "Password can't be more than 200 characters"),
    confirmPassword: z.string().min(8, "Password must be at least of 8 characters").max(200, "Password can't be more than 200 characters"),
    role: z.enum(['renter', 'owner'])
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"]
});

export type TsignSchema = z.infer<typeof signInSchema>;
