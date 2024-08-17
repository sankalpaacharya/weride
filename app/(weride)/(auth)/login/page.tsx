import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
    return (
        <div className="w-full mt-20">

            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>Enter your email and password to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="s@sot.pdpu.ac.in" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link className="underline text-gray-600 text-sm" href={"/signin"}>Need an Account? signup</Link>
                            <Button type="submit" className="w-full bg-[#146eb4] hover:bg-[#1880cf]">
                                Login
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}