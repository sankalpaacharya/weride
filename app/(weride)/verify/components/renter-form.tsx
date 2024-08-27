"use client"
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { renterIdentitySchema, TrenterIdentitySchema } from '@/app/schemas/renterIdentitySchema'
export default function RenterForm() {

    const { register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue, } = useForm<TrenterIdentitySchema>({ resolver: zodResolver(renterIdentitySchema) });

    const submitForm = (data: TrenterIdentitySchema) => {
        console.log("data", data);
    }

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <Card className="mx-auto max-w-md w-[100rem]">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Renter Identity Verification</CardTitle>
                    <CardDescription>Please fill in the details below. If you have already filled in the details, please wait for account verification. This is a manual process and may take several hours or up to a day</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="collegeIDPhoto">College ID Card Photo (Both Side)</Label>
                            <Input {...register("collegeIDPhoto")} id="collegeIDPhoto" type="file" placeholder='319' />
                            {errors.collegeIDPhoto && (
                                <p className="text-red-500 text-sm">
                                    {`${errors.collegeIDPhoto.message}`}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hostelIDPhoto">Hostel ID Card Photo (Both Side)</Label>
                            <Input {...register("hostelIDPhoto")} id="hostelIDPhoto" type="file" placeholder='319' />
                            {errors.hostelIDPhoto && (
                                <p className="text-red-500 text-sm">
                                    {`${errors.hostelIDPhoto.message}`}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="drivingLicencePhoto">Driving Licence Photo (Both Side)</Label>
                            <Input {...register("drivingLicencePhoto")} id="drivingLicencePhoto" type="file" placeholder='319' />
                            {errors.drivingLicencePhoto && (
                                <p className="text-red-500 text-sm">
                                    {`${errors.drivingLicencePhoto.message}`}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Profile Photo</Label>
                            <Input {...register("profilePhoto")} id="profilePhoto" type="file" placeholder='319' />
                            {errors.profilePhoto && (
                                <p className="text-red-500 text-sm">
                                    {`${errors.profilePhoto.message}`}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="hostelBlock">Hostel Block</Label>
                            <Input {...register("hostelBlock")} id="hostelBlock" type="text" placeholder='A1' />
                            {errors.hostelBlock && (
                                <p className="text-red-500 text-sm">
                                    {`${errors.hostelBlock.message}`}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hostelRoom">Room no</Label>
                            <Input {...register("hostelRoom")} id="hostelRoom" type="text" placeholder='319' />
                            {errors.hostelRoom && (
                                <p className="text-red-500 text-sm">
                                    {`${errors.hostelRoom.message}`}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Button disabled={isSubmitting} type="submit" className="w-full bg-[#146eb4] hover:bg-[#1880cf]">
                                Verify
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
