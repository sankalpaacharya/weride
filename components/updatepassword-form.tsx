import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";

export default function UpdatePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      } else if (data) {
        toast.success("Password Changed");
        console.log(data);
      }
    } else {
      toast.error("Passwords do not match");
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Change Password</h3>
        <p className="text-sm text-muted-foreground">
          Change your account password here.
        </p>
      </div>
      <Separator />
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Enter your new password here.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <PasswordInput
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Re-enter your new password to confirm.
            </p>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
}
