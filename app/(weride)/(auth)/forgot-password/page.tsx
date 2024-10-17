"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
type Props = {};

export default function ForgotPassword({}: Props) {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sendForgotEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const supabase = await createClient();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      toast.error("Email not sent");
    }
    if (data) {
      setIsLoading(false);
      toast.success("Email sent, also check your spam folder");
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form action="#" onSubmit={sendForgotEmail}>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Forgot Password
            </CardTitle>
            <CardDescription>
              You will receive password reset link if you are a registered user
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="s@sot.pdpu.ac.in"
              />
            </div>
            <Button disabled={isLoading} className="mt-4 w-full">
              Submit
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
