"use client";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginInSchema, TloginSchema } from "@/lib/schemas/logInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction, resendVerificationEmail } from "@/lib/actions/auth";
import toast from "react-hot-toast";
import { PasswordInput } from "@/components/ui/password-input";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { createClient } from "@/utils/supabase/client";

const OTPVerificationForm = ({
  email,
  onBack,
}: {
  email: string;
  onBack: () => void;
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
      toast.success("Email verified successfully! You can now login.");
      onBack();
    } catch (error) {
      toast.error("Invalid code. Please try again.");
      setOTPValue("");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await resendVerificationEmail(email);
      if (response.error) {
        toast.error(response.error);
      } else if (response.success) {
        toast.success(response.success);
      }
    } catch (error) {
      toast.error("Failed to resend verification email");
    }
  };

  return (
    <Card className="mx-auto max-w-sm shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={verifyOTP} className="space-y-4">
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
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResendCode}
                className="text-primary hover:underline font-medium"
              >
                Send again
              </button>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onBack}
            >
              Back to Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default function LoginComponent() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TloginSchema>({
    resolver: zodResolver(loginInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitForm = async (formData: TloginSchema) => {
    try {
      const response = await loginAction(formData);

      if (response?.error) {
        if (response.needsVerification) {
          console.log("email verification");
          setVerificationEmail(formData.email);
          setIsVerifying(true);
        } else {
          toast.error(response.error);
        }
        reset({ ...formData, password: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isVerifying) {
    return (
      <div className="w-full mt-20">
        <OTPVerificationForm
          email={verificationEmail}
          onBack={() => {
            setIsVerifying(false);
            setVerificationEmail("");
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full mt-20">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="animate-in fade-in duration-500"
      >
        <Card className="mx-auto max-w-sm shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="s@sot.pdpu.ac.in"
                  autoComplete="email"
                  disabled={isSubmitting}
                  aria-describedby="email-error"
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  {...register("password")}
                  placeholder="Password"
                  id="password"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  aria-describedby="password-error"
                />
                {errors.password && (
                  <p id="password-error" className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  href="/forgot-password"
                >
                  Forgot your password?
                </Link>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full flex gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : null}
                  Login
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    className="text-primary hover:underline"
                    href="/register"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
