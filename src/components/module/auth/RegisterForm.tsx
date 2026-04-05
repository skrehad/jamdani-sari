/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { registerUser } from "@/services/auth";
import { useAuth } from "@/provider/UserProvider";
import { registrationSchema, RegistrationSchemaType } from "@/types/schema";

export default function RegistrationForm() {
  const router = useRouter();
  const { setUser } = useAuth()!;
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { fullName: "", phone: "", email: "", password: "" },
  });
  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<RegistrationSchemaType> = async (data) => {
    try {
      const result = await registerUser(data);

      if (!result?.success) {
        toast.error(result?.message || "Registration failed");
        return;
      }

      // Save accessToken in localStorage
      if (result.data?.accessToken) {
        localStorage.setItem("accessToken", result.data.accessToken);
      }

      // Save role cookie (for middleware/route protection)
      if (result.data?.user?.role) {
        document.cookie = `role=${result.data.user.role}; path=/; SameSite=Lax`;
      }

      // ✅ Set user directly from registration response
      if (result.data?.user) {
        setUser(result.data.user);
      }

      toast.success("Account created successfully!");

      // Redirect based on role
      if (result.data.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-rose-50 to-white">
      <Card className="w-full max-w-md border border-rose-200 shadow-xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <img
              src="/image/logo/logo.png"
              alt="logo"
              className="w-20 h-20 rounded-full shadow-md"
            />
          </div>
          <CardTitle className="text-3xl font-semibold text-rose-900 tracking-wide">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-rose-600 text-sm">
            Join our Jamdani community & shop authentic sarees
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-rose-900">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your full name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-rose-900">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your phone number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-rose-900">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your email" />
                    </FormControl>
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
                    <FormLabel className="font-medium text-rose-900">
                      Password
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          placeholder="Create a password"
                          className="pr-10"
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute cursor-pointer right-3 top-2.5 text-rose-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full mt-4 bg-rose-600 hover:bg-rose-700 text-white shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Account"}
              </Button>
            </CardFooter>
          </form>
        </Form>

        <div className="pb-6 text-center text-sm text-rose-800">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-rose-600 underline cursor-pointer">
              Login
            </span>
          </Link>
        </div>
      </Card>
    </div>
  );
}
