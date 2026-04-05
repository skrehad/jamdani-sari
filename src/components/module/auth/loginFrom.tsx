/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EyeIcon, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { loginSchema } from "@/types/schema";
import { loginUser } from "@/services/auth";
// import { saveToken } from "@/lib/auth";
import { useAuth } from "@/provider/UserProvider";

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth(); // ✅ get setUser from context
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const result = await loginUser(data);

      const accessToken = result?.accessToken || result?.data?.accessToken;
      const user = result?.user || result?.data?.user;

      if (!accessToken || !user) {
        toast.error("Login failed");
        return;
      }

      // ✅ Save token in localStorage
      if (typeof window !== "undefined") {
        // localStorage.setItem("accessToken", accessToken);

        // ✅ Safe cookie set inside if block
        document.cookie = `accessToken=${accessToken}; path=/; SameSite=Lax`;
        document.cookie = `role=${user.role}; path=/; SameSite=Lax`;
      }

      // ✅ Set user in context
      setUser(user);

      toast.success("Login successful");
      console.log(user);

      // ✅ Redirect based on role
      setTimeout(() => {
        if (user.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      }, 0);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Login to explore exclusive Jamdani collections
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email </FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter Your  Email "
                          className="pl-9"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forget-password"
                        className="text-xs text-muted-foreground hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="pl-9 pr-10"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-7 w-7"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex mt-4 flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-[#7A1F2B] hover:bg-[#641821]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-[#7A1F2B] font-medium hover:underline"
                >
                  Create account
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
