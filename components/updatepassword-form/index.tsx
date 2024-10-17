"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";

export default function updatePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const supabase = await createClient();
    if (password === confirmPassword) {
      const { data, error } = await supabase.auth.updateUser({
        password: confirmPassword,
      });
      if (error) {
        console.log(error);
        toast.error(error.message);
        return;
      }
      if (data) {
        setIsLoading(false);
        toast.success("Password Changed");
        console.log(data);
        return;
      }
    }
    toast.error("Password not matched");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Update Password</CardTitle>
          <CardDescription>
            You will receive a password reset link if you are a registered user.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="new password"
            />
          </div>
          <div className="space-y-2 mt-10">
            <Label htmlFor="newPassword">Confirm Password</Label>
            <PasswordInput
              id="newPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
            />
          </div>
          <Button disabled={isLoading} type="submit" className="mt-4 w-full">
            Submit
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
