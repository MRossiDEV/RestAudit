import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").trim(),
  email: z.string().email("Enter a valid email.").trim(),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const OwnerRegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").trim(),
  email: z.string().email("Enter a valid email.").trim(),
  password: z.string().min(8, "Password must be at least 8 characters."),
  businessName: z.string().min(2, "Restaurant name must be at least 2 characters.").trim(),
});

export const LoginSchema = z.object({
  email: z.string().email("Enter a valid email.").trim(),
  password: z.string().min(1, "Password is required."),
});

/**
 * Free VORA business account. This is the registration barrier for viewing a
 * full candidate profile — it is NOT a payment wall (PRD §4, §14).
 */
export const BusinessRegisterSchema = z.object({
  name: z.string().min(2, "Tu nombre debe tener al menos 2 caracteres.").trim(),
  email: z.string().email("Ingresá un email válido.").trim(),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
  businessName: z.string().min(2, "El nombre de la empresa es obligatorio.").trim(),
  businessType: z.string().trim().optional(),
  country: z.string().trim().optional(),
  city: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  returnTo: z.string().trim().optional(),
});

export type AuthFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    businessName?: string[];
    businessType?: string[];
    country?: string[];
    city?: string[];
    phone?: string[];
  };
  message?: string;
} | undefined;