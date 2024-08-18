"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useForm } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import toast from "react-hot-toast"

export default function Page() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, getValues } = useForm();

    const submitForm = (data: FieldValues) => {
        console.log(data)
    }

    return (
        <div className="w-full mt-5">
            <form onSubmit={handleSubmit((data) => submitForm(data))}>
                <Card className="mx-auto max-w-sm">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
                        <CardDescription>Enter your email and password to login to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input {...register('name', { required: "Name is required", minLength: { value: 4, message: "name must be at least of 4 characters" }, maxLength: { value: 100, message: "name can't be more then 200 characters" } })} id="name" type="text" />
                                {errors.name && <p className="text-red-500 text-sm">{`${errors.name.message}`}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input {...register('email', { required: "Email is required" })} id="email" type="email" placeholder="s@sot.pdpu.ac.in (please use college email)" />
                                {errors.email && <p className="text-red-500 text-sm">{`${errors.email.message}`}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input {...register('password', { required: "Password is required", minLength: { value: 8, message: "Password must be at least of 8 characters" }, maxLength: { value: 200, message: "Password can't be more then 200 characters" } })} id="password" type="password" />
                                {errors.password && <p className="text-red-500 text-sm">{`${errors.password.message}`}.</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input {...register('confirmPassword', { required: "Password is required", minLength: { value: 8, message: "Password must be at least of 8 characters" }, maxLength: { value: 200, message: "Password can't be more then 200 characters" }, validate: (data) => data.value == getValues("password") || "Password must match" })} id="confirmPassword" type="password" />
                                {errors.confirmPassword && <p className="text-red-500 text-sm">{`${errors.confirmPassword.message}`}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select defaultValue="renter">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Role</SelectLabel>
                                            <SelectItem value="owner">Vehicle Owner</SelectItem>
                                            <SelectItem value="renter">Renter</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Link className="underline text-gray-600 text-sm" href={"/login"}>Already have account? login</Link>
                                <Button disabled={isSubmitting} type="submit" className="w-full bg-[#146eb4] hover:bg-[#1880cf]">
                                    Signup
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
