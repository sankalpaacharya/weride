"use server"
import { TsignInSchema, signInSchema } from '@/app/schemas/signInSchema'
import { TloginSchema, loginInSchema } from '@/app/schemas/logInSchema'
export async function signupAction(data: TsignInSchema) {
    const result = signInSchema.safeParse(data)
    if (!result.success) {
        return { "error": result.error.issues[0].message }
    }
    return { "success": "Confirm your email" }

}

export async function loginAction(data: TloginSchema) {

    const result = loginInSchema.safeParse(data);
    if (!result.success) {
        return { "error": result.error.issues[0].message }
    }
    return { "success": "Confirm your email" }
}