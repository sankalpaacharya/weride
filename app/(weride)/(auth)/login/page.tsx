"use client";
import { Loader } from "lucide-react";
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
import { loginAction } from "@/lib/actions/auth";
import toast from "react-hot-toast";
import { PasswordInput } from "@/components/ui/password-input";

export default function LoginComponent() {
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
        toast.error(response.error);
        reset({ ...formData, password: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                    <Loader size={16} className="animate-spin" />
                  ) : null}
                  Login
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link className="text-primary hover:underline" href="/signup">
                    Sign up
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
