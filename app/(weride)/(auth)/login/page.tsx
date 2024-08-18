"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useForm } from "react-hook-form"
import type { FieldValues } from 'react-hook-form'

export default function Component() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, getValues } = useForm();

    const submitForm = (data: FieldValues) => {
        console.log('first')
    }

    return (
        <div className="w-full mt-20">
            <form action="" onSubmit={handleSubmit((data) => submitForm(data))}>
                <Card className="mx-auto max-w-sm">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Login</CardTitle>
                        <CardDescription>Enter your email and password to login to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input {...register("email", { required: "Email is required" })} id="email" type="email" placeholder="s@sot.pdpu.ac.in" />
                                {errors.email && <p className="text-red-500 text-sm">{`${errors.email.message}`}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input {...register("password", { required: "Password is required" })} id="password" type="password" />
                                {errors.password && <p className="text-red-500 text-sm">{`${errors.password.message}`}.</p>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <Link className="underline text-gray-600 text-sm" href={"/signup"}>Need an Account? signup</Link>
                                <Button type="submit" className="w-full bg-[#146eb4] hover:bg-[#1880cf]">
                                    Login
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}