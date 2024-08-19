"use server"
import { TsignInSchema, signInSchema } from '@/app/schemas/signInSchema'

export async function signupAction(data: TsignInSchema) {
    const result = signInSchema.safeParse(data)
    if (!result.success) {
        return result.error
    }
    return { "message": "testing" }

}  