"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { SignupFormValues, signupSchema } from "@/constants/validation/auth";
import useSignUp from "@/hooks/mutations/use-signup";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function SignupForm({
  className,
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate, isPending } = useSignUp();
  const router = useRouter();

  const onSubmit = async (data: SignupFormValues) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/login");
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={cn("flex flex-col gap-6", className)}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl" data-testid="signup-heading">
            Create an Account
          </CardTitle>
          <CardDescription data-testid="signup-description">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  data-testid="signup-email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  {...register("password")}
                  data-testid="signup-password"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
                data-testid="signup-button"
              >
                {isPending ? "Creating account..." : "Create Account"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="underline underline-offset-4"
                data-testid="login-link"
              >
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <span className="sr-only">signup form</span>
    </motion.div>
  );
}
