import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string({ error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export const registerValidationSchema = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .min(2, "Name must be at least 2 characters long"),
    email: z
      .string({ error: "Email is required" })
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string({ error: "Password is required" })
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string({ error: "Please confirm your password" })
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
