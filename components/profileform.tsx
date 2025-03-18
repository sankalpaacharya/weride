"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateUserAction } from "@/features/settings/actions/updateUserAction";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  hostelBlock: z.string().min(1, "Hostel block is required"),
  hostelRoom: z.string().min(1, "Room number is required"),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  userData: {
    id: string | null;
    name: string | null;
    created_at: string | null;
    phone: string | null;
    email: string | null;
    role: string | null;
    status: string | null;
    hostel_block: string | null;
    hostel_room: string | null;
    rollno: string | null;
  };
};

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button
      type="submit"
      className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
      disabled={pending}
    >
      {pending && <Loader2 size={15} className="animate-spin" />}
      Save Changes
    </Button>
  );
}

export default function ProfileForm({ userData }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: userData.id || "",
      name: userData.name || "",
      email: userData.email || "",
      hostelBlock: userData.hostel_block || "",
      hostelRoom: userData.hostel_room || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const result = await updateUserAction(data);
      toast.success("Profile has been updated");
      setIsLoading(false);
    } catch (error) {
      toast.error("Couldn't update the profile");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Profile Settings</CardTitle>
                  <CardDescription>
                    Manage how you appear to potential renters
                  </CardDescription>
                </div>
                <SubmitButton pending={isLoading} />
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Edit Your Information</CardTitle>
              <CardDescription>
                Make sure you have provided the correct details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Full Name" />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-gray-500">
                        This is your full name, and it can't be changed more
                        than once.
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled placeholder="Email" />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-gray-500">
                        Email can't be changed.
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hostelBlock"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Hostel Block</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Hostel Block" />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-gray-500">
                        Your hostel building block.
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hostelRoom"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Room No</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Room No" />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-gray-500">Your Room No.</p>
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Link
                    href={`https://weride-discord-backend-production.up.railway.app/auth/discord?userId=${userData.id}`}
                    target="_blank"
                  >
                    <Button
                      type="button"
                      className="bg-blue-600 flex gap-1.5 hover:bg-blue-500"
                    >
                      <FaDiscord size={20} />
                      Connect to Discord
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
