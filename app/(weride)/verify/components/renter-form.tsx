"use client"
import React from 'react'
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
        setValue, } = useForm({ resolver: zodResolver(renterIdentitySchema) });

    return (
        <form action="">
            <Card className="mx-auto max-w-md w-[100rem]">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Renter Identity Verification</CardTitle>
                    <CardDescription>Please fill in the details below. If you have already filled in the details, please wait for account verification. This is a manual process and may take several hours or up to a day</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">College ID Card Photo (Both Side)</Label>
                            <Input {...register("collegeIDPhoto")} id="collegeIDPhoto" type="file" placeholder='319' />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Hostel ID Card Photo (Both Side)</Label>
                            <Input {...register("hostelIDPhoto")} id="hostelIDPhoto" type="file" placeholder='319' />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Driving Licence Photo (Both Side)</Label>
                            <Input {...register("drivingLicencePhoto")} id="drivingLicencePhoto" type="file" placeholder='319' />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Profile Photo</Label>
                            <Input {...register("profilePhoto")} id="profilePhoto" type="file" placeholder='319' />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Hostel Block</Label>
                            <Input {...register("hostelBlock")} id="hostelBlock" type="text" placeholder='A1' />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Room no</Label>
                            <Input {...register("hostelRoom")} id="hostelRoom" type="text" placeholder='319' />
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button type="submit" className="w-full bg-[#146eb4] hover:bg-[#1880cf]">
                                Verify
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
