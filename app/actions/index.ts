"use server"
import { TsignInSchema, signInSchema } from '@/app/schemas/signInSchema'
import { error } from 'console'

export async function signupAction(data: TsignInSchema) {
    console.log('server action called')
    console.log(data)
    const result = signInSchema.safeParse(data)
    if (!result.success) {
        return { "error": result.error.issues[0].message }
    }
    return { "success": "Confirm your email" }

}  