"use client";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
type Props = {
  userData: {
    name: string;
    created_at: string;
    phone: string;
    email: string;
    role: string;
    status: string;
    hostel_block: string;
    hostel_room: string;
    rollno: string;
  };
};

export default function ProfileForm({ userData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <div>
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="grid w-full max-w-sm items-center space-y-1 gap-1.5">
              <Label htmlFor="email">Full Name</Label>
              <Input
                defaultValue={userData.name}
                type="text"
                id="text"
                placeholder="Full Name"
              />
            </div>
            <p className="text-sm text-gray-500">
              This is your full name, and it can&apos;t be changed more than
              once.
            </p>
          </div>
          <div className="space-y-2">
            <div className="grid w-full max-w-sm items-center space-y-1 gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                disabled
                value={userData.email}
                type="text"
                id="text"
                placeholder="Email"
              />
            </div>
            <p className="text-sm text-gray-500">
              Email can&apos;t be changed.
            </p>
          </div>
          <div className="space-y-2">
            <div className="grid w-full max-w-sm items-center space-y-1 gap-1.5">
              <Label htmlFor="email">Hostel Block</Label>
              <Input
                defaultValue={userData.hostel_block}
                type="text"
                id="text"
                placeholder="Home Address"
              />
            </div>
            <p className="text-sm text-gray-500">Your hostel building block.</p>
          </div>
          <div className="space-y-2">
            <div className="grid w-full max-w-sm items-center space-y-1 gap-1.5">
              <Label htmlFor="email">Roll no</Label>
              <Input
                defaultValue={userData.rollno}
                type="text"
                id="text"
                placeholder="Roll No"
              />
            </div>
            <p className="text-sm text-gray-500">Your Roll No.</p>
          </div>
          <div className="space-y-2">
            <div className="grid w-full max-w-sm items-center space-y-1 gap-1.5">
              <Label htmlFor="email">Room no</Label>
              <Input
                defaultValue={userData.hostel_room}
                type="text"
                id="text"
                placeholder="Room No"
              />
            </div>
            <p className="text-sm text-gray-500">Your Room No.</p>
          </div>
          <Button>Update Profile</Button>
        </div>
      </div>
    </div>
  );
}
