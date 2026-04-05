import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full Name must be at least 3 characters")
    .nonempty("Full Name is required"),
  phone: z
    .string()
    .min(11, "Phone number must be 11 digits")
    .max(11, "Phone number must be 11 digits")
    .regex(/^01[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number"),
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

export type RegistrationSchemaType = z.infer<typeof registrationSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email or phone is required")
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
        /^01[3-9]\d{8}$/.test(value),
      "Enter a valid email or Bangladeshi phone number",
    ),

  password: z.string().min(6, "Password must be at least 6 characters"),

  rememberMe: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
