"use client";
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
import { loginInSchema, TloginSchema } from "@/app/schemas/logInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "@/app/actions";
import toast from "react-hot-toast";
import { PasswordInput } from "@/components/ui/password-input";

export default function Component() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TloginSchema>({ resolver: zodResolver(loginInSchema) });

  const submitForm = async (formData: TloginSchema) => {
    const response = await loginAction(formData);
    if (response && response.error) {
      toast.error(response.error);
    }
  };

  return (
    <div className="w-full mt-20">
      <form action="" onSubmit={handleSubmit((data) => submitForm(data))}>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="s@sot.pdpu.ac.in"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{`${errors.email.message}`}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput {...register("password")} id="password" />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {`${errors.password.message}`}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  className="underline text-gray-600 text-sm"
                  href={"/forgot-password"}
                >
                  Forgot Password ?
                </Link>
                <Button disabled={isSubmitting} type="submit">
                  Login
                </Button>
                <Link
                  className="underline text-gray-600 text-sm"
                  href={"/signup"}
                >
                  Need an Account? signup
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
