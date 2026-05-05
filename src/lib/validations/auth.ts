import { z } from "zod";
import { PUBLIC_REGISTRATION_ROLES, USER_ROLES } from "@/constants/roles";

export const loginSchema = z.object({
  email: z.string().trim().email("Ingresa un email válido."),
  password: z.string().min(1, "Ingresa tu contraseña."),
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Ingresa tu nombre completo.")
    .max(120, "El nombre no puede superar 120 caracteres."),
  email: z.string().trim().email("Ingresa un email válido."),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
  role: z.enum(PUBLIC_REGISTRATION_ROLES),
});

export const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Ingresa tu nombre completo.")
    .max(120, "El nombre no puede superar 120 caracteres."),
  avatarUrl: z.string().url("Ingresa una URL válida.").optional().or(z.literal("")),
  activeRole: z.enum(USER_ROLES),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
