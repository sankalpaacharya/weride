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
import { toast } from "react-hot-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const ForgotPasswordInputForm = ({
  setIsOTPInput,
  setEmail,
}: {
  setIsOTPInput: (value: boolean) => void;
  setEmail: (value: string) => void;
}) => {
  const [localEmail, setLocalEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendForgotEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: localEmail,
        options: {
          emailRedirectTo: "https://weride.live/",
        },
      });

      if (error) {
        throw error;
      }

      setEmail(localEmail);
      setIsOTPInput(true);
      toast.success("Email sent! Please check your inbox and spam folder");
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={sendForgotEmail}>
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to receive a verification code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={localEmail}
              onChange={(e) => setLocalEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <Button disabled={isLoading} className="mt-4 w-full">
            {isLoading ? "Sending..." : "Send Code"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

const OTPSubmitForm = ({ email }: { email: string }) => {
  const [OTPValue, setOTPValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyOTP = async () => {
    if (OTPValue.length !== 6) return;
    setIsVerifying(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: OTPValue,
        type: "email",
      });

      if (error) throw error;

      toast.success("Verification successful!");
      window.location.href = "/settings/update-password";
    } catch (error) {
      toast.error("Invalid code. Please try again.");
      setOTPValue("");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        verifyOTP();
      }}
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Enter OTP Code</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <InputOTP
            maxLength={6}
            value={OTPValue}
            onChange={setOTPValue}
            disabled={isVerifying}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button
            type="submit"
            disabled={OTPValue.length !== 6 || isVerifying}
            className="w-full"
          >
            {isVerifying ? "Verifying..." : "Verify Code"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default function ForgotPassword() {
  const [isOTPInput, setIsOTPInput] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="w-full flex items-center justify-center">
      {isOTPInput ? (
        <OTPSubmitForm email={email} />
      ) : (
        <ForgotPasswordInputForm
          setIsOTPInput={setIsOTPInput}
          setEmail={setEmail}
        />
      )}
    </div>
  );
}
