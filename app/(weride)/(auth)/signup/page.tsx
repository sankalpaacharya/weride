"use client";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImSpinner3 } from "react-icons/im";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { signInSchema, TsignInSchema } from "@/app/schemas/signInSchema";
import toast from "react-hot-toast";
import { signupAction } from "@/app/actions";
import { useState } from "react";

export default function Page() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
        setValue,
    } = useForm<TsignInSchema>({
        resolver: zodResolver(signInSchema),
    });
    const [selectValue, setSelectValue] = useState("renter");

    const submitForm = async (formData: TsignInSchema) => {
        if (selectValue === "owner" || selectValue === "renter") {
            formData.role = selectValue;
        }
        const response = await signupAction(formData);
        if (response.error) {
            toast.error(response.error);
        }
        if (response.success) {
            toast.success(response.success);
        }
    };

    const handlePhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = event.target.value.replace(/\D/g, "");
        setValue("phone", numericValue);
    };

    return (
        <div className="w-full mt-5">
            <form onSubmit={handleSubmit(submitForm)}>
                <Card className="mx-auto max-w-sm">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
                        <CardDescription>
                            Enter your email and password to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input {...register("name")} id="name" type="text" />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">
                                        {`${errors.name.message}`}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register("email")}
                                    id="email"
                                    type="email"
                                    placeholder="s@sot.pdpu.ac.in (please use college email)"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">
                                        {`${errors.email.message}`}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <div className="flex items-center">
                                    <span className="py-[5px] px-2 border border-r-0  rounded-l-lg shadow flex items-center justify-center">
                                        🇮🇳
                                    </span>
                                    <Input
                                        {...register("phone")}
                                        id="phone"
                                        type="text"
                                        onChange={handlePhoneInput}
                                        className="rounded-l-none"
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-red-500 text-sm">
                                        {`${errors.phone.message}`}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    {...register("password")}
                                    id="password"
                                    type="password"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">
                                        {`${errors.password.message}`}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    {...register("confirmPassword")}
                                    id="confirmPassword"
                                    type="password"
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm">
                                        {`${errors.confirmPassword.message}`}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select
                                    onValueChange={(value) => setSelectValue(value)}
                                    defaultValue="renter"
                                >
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
                                <Link
                                    className="underline text-gray-600 text-sm"
                                    href={"/login"}
                                >
                                    Already have an account? Login
                                </Link>
                                <Button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="w-full bg-[#146eb4] flex gap-3 hover:bg-[#1880cf]"
                                >
                                    {
                                        isSubmitting &&
                                        <ImSpinner3 className="animate-spin" />
                                    }
                                    Signup
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
