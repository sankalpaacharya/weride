import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RenterForm() {
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
                            <Input id="password" type="file" placeholder='319' />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Hostel ID Card Photo (Both Side)</Label>
                            <Input id="password" type="file" placeholder='319' />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Driving Licence Photo (Both Side)</Label>
                            <Input id="password" type="file" placeholder='319' />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Profile Photo</Label>
                            <Input id="password" type="file" placeholder='319' />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Hostel Block</Label>
                            <Input id="email" type="text" placeholder='A1' />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Room no</Label>
                            <Input id="password" type="text" placeholder='319' />
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
