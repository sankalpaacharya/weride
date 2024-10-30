"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImSpinner3 } from "react-icons/im";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signInSchema, TsignInSchema } from "@/app/schemas/signInSchema";
import toast from "react-hot-toast";
import { signupAction } from "@/app/actions";
import { PasswordInput } from "@/components/ui/password-input";
import { createClient } from "@/utils/supabase/client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const SignupForm = ({
  setIsVerifying,
  setEmail,
}: {
  setIsVerifying: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TsignInSchema>({
    resolver: zodResolver(signInSchema),
  });
  const [selectValue, setSelectValue] = useState("renter");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/\D/g, "");
    setValue("phone", numericValue);
  };

  const onSubmit = async (data: TsignInSchema) => {
    setIsSubmitting(true);
    if (selectValue === "owner" || selectValue === "renter") {
      data.role = selectValue;
    }
    try {
      const response = await signupAction(data);
      if (response.error) {
        toast.error(response.error);
        setIsSubmitting(false);
      }
      if (response.success) {
        setEmail(data.email);
        setIsVerifying(true);
        setIsSubmitting(false);
        toast.success(response.success);
      }
    } catch (error) {
      toast.error("Failed to complete signup. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 md:px-0">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input {...register("name")} id="name" type="text" />
              {errors.name && (
                <p className="text-red-500 text-sm">{`${errors.name.message}`}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="s@sot.pdpu.ac.in (please use college email)"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{`${errors.email.message}`}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="flex items-center">
                <span className="py-[5px] px-2 border border-r-0 rounded-l-lg shadow flex items-center justify-center">
                  🇮🇳
                </span>
                <Input
                  {...register("phone")}
                  id="phone"
                  type="text"
                  onChange={handlePhoneInput}
                  className="rounded-l-none"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm">{`${errors.phone.message}`}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput {...register("password")} id="password" />
              {errors.password && (
                <p className="text-red-500 text-sm">{`${errors.password.message}`}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput
                {...register("confirmPassword")}
                id="confirmPassword"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {`${errors.confirmPassword.message}`}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                onValueChange={(value) => setSelectValue(value)}
                defaultValue="renter"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="owner">Vehicle Owner</SelectItem>
                    <SelectItem value="renter">Renter</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <Link
                className="text-center underline text-gray-600 text-sm hover:text-gray-800"
                href="/login"
              >
                Already have an account? Login
              </Link>
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full flex items-center justify-center gap-3"
              >
                {isSubmitting && <ImSpinner3 className="animate-spin" />}
                Sign up
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

const OTPVerificationForm = ({
  email,
  onResendCode,
}: {
  email: string;
  onResendCode: () => void;
}) => {
  const [OTPValue, setOTPValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (OTPValue.length !== 6) return;
    setIsVerifying(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: OTPValue,
        type: "signup",
      });

      if (error) throw error;
      toast.success("Email verified successfully!");
      window.location.href = "/";
    } catch (error) {
      toast.error("Invalid code. Please try again.");
      setOTPValue("");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <form onSubmit={verifyOTP} className="w-full px-4 md:px-0">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-sm">
            Enter the 6-digit code sent to{" "}
            <span className="font-medium">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={OTPValue}
              onChange={setOTPValue}
              disabled={isVerifying}
              className="gap-2"
            >
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              disabled={OTPValue.length !== 6 || isVerifying}
              className="w-full"
            >
              {isVerifying ? "Verifying..." : "Verify Email"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Didnapos;t receive the code?{" "}
              <button
                type="button"
                onClick={onResendCode}
                className="text-primary hover:underline font-medium"
              >
                Send again
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default function SignupPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [email, setEmail] = useState("");

  const handleResendCode = async () => {
    if (!email) return;
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
        options: {
          emailRedirectTo: "https://weride.live/",
        },
      });
      if (error) throw error;
      toast.success("Verification email resent!");
    } catch (error) {
      toast.error("Failed to resend verification email. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      {isVerifying ? (
        <OTPVerificationForm email={email} onResendCode={handleResendCode} />
      ) : (
        <SignupForm setEmail={setEmail} setIsVerifying={setIsVerifying} />
      )}
    </div>
  );
}
