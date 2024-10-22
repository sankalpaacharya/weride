"use client";
import React, { useEffect, useState } from "react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type Props = {};
const ForgotPasswordInputForm = ({ setIsOTPInput }: { setIsOTPInput: any }) => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sendForgotEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "https://weride.live/",
      },
    });
    if (error) {
      toast.error("Email not sent");
    }
    if (data) {
      setIsLoading(false);
      toast.success("Email sent, also check your spam folder");
      setIsOTPInput(true);
    }
  };
  return (
    <form action="#" onSubmit={sendForgotEmail}>
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
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
  );
};

const OTPSubmitForm = () => {
  const [OTPValue, setOTValue] = useState("");

  useEffect(() => {
    const submitOTP = async (OTP: string) => {
      const supabase = await createClient();
    };

    if (OTPValue.length >= 6) {
    }
  }, [OTPValue]);

  return (
    <form action="#">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Enter 6 digit Pin
          </CardTitle>
          <CardDescription>Check your mail for the 6 digit pin</CardDescription>
        </CardHeader>
        <CardContent>
          <InputOTP
            disabled={true}
            onChange={(value) => setOTValue(value)}
            value={OTPValue}
            maxLength={6}
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
        </CardContent>
      </Card>
    </form>
  );
};

export default function ForgotPassword({}: Props) {
  const [isOTPInput, setIsOTPInput] = useState(true);
  return (
    <div className="w-full flex items-center justify-center">
      {isOTPInput ? (
        <OTPSubmitForm />
      ) : (
        <ForgotPasswordInputForm setIsOTPInput={setIsOTPInput} />
      )}
    </div>
  );
}
