import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").trim(),
  email: z.string().email("Enter a valid email.").trim(),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const LoginSchema = z.object({
  email: z.string().email("Enter a valid email.").trim(),
  password: z.string().min(1, "Password is required."),
});

export type AuthFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
} | undefined;