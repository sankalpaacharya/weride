import { z } from 'zod';

export const signInValidation = z.object({
    email: z.string().email("This is not a valid email").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:pdpu\.ac\.in)$/, "Email must be a college email"),
    password: z.string().min(8).max(100),
})
