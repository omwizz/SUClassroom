"use server";

import { redirect } from "next/navigation";
import {
  DASHBOARD_ROUTES,
  getDashboardRouteForRole,
} from "@/constants/routes";
import {
  getEmailConfirmationRedirectUrl,
  getSupabasePublicConfigStatus,
} from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  loginSchema,
  profileSchema,
  registerSchema,
  resendConfirmationSchema,
  type LoginInput,
  type ProfileInput,
  type RegisterInput,
  type ResendConfirmationInput,
} from "@/lib/validations/auth";
import {
  assertProfileStorageAvailable,
  findProfileByAuthUserId,
  updateProfileByAuthUserId,
  upsertProfileFromAuthUser,
} from "@/server/queries/profiles";
import {
  buildProfileFromSupabaseUser,
  getRoleFromUserMetadata,
} from "@/server/services/auth-service";
import type { Profile } from "@/types/auth";

type FieldErrors = Record<string, string[] | undefined>;

export type AuthActionState = {
  ok: boolean;
  message: string;
  redirectTo?: (typeof DASHBOARD_ROUTES)[keyof typeof DASHBOARD_ROUTES] | string;
  fieldErrors?: FieldErrors;
};

function validationError(fieldErrors: FieldErrors): AuthActionState {
  return {
    ok: false,
    message: "Revisa los campos marcados.",
    fieldErrors,
  };
}

function actionError(message: string): AuthActionState {
  return {
    ok: false,
    message,
  };
}

function getCauseCode(error: unknown) {
  if (!error || typeof error !== "object") {
    return null;
  }

  if ("code" in error && typeof error.code === "string") {
    return error.code;
  }

  if (!("cause" in error)) {
    return null;
  }

  const cause = error.cause;

  if (!cause || typeof cause !== "object" || !("code" in cause)) {
    return null;
  }

  return typeof cause.code === "string" ? cause.code : null;
}

function getErrorMessage(error: unknown) {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return error instanceof Error ? error.message : String(error);
}

function supabaseRequestFailed(error: unknown): AuthActionState {
  const causeCode = getCauseCode(error);
  const message = getErrorMessage(error).toLowerCase();

  if (causeCode === "28P01") {
    return actionError(
      "DATABASE_URL no autentica con Supabase. Revisa la contrasena o usa el usuario dedicado de base de datos y reinicia npm run dev.",
    );
  }

  if (causeCode === "42501") {
    return actionError(
      "El usuario de DATABASE_URL no tiene permisos suficientes sobre las tablas de SUClassroom.",
    );
  }

  if (causeCode === "42P01") {
    return actionError(
      "Faltan tablas en Supabase. Ejecuta las migraciones antes de registrar usuarios.",
    );
  }

  if (causeCode === "ENOTFOUND") {
    return actionError(
      "No se pudo resolver el dominio de Supabase. Revisa que NEXT_PUBLIC_SUPABASE_URL sea el Project URL exacto de tu proyecto y reinicia npm run dev.",
    );
  }

  if (
    causeCode === "ECONNREFUSED" ||
    causeCode === "ECONNRESET" ||
    causeCode === "ETIMEDOUT" ||
    causeCode === "UND_ERR_CONNECT_TIMEOUT" ||
    message.includes("fetch failed")
  ) {
    return actionError(
      "No se pudo conectar con Supabase. Revisa tu conexion, NEXT_PUBLIC_SUPABASE_URL/NEXT_PUBLIC_SUPABASE_ANON_KEY y reinicia npm run dev si cambiaste .env.local.",
    );
  }

  return actionError(
    "No se pudo completar la operacion de autenticacion. Revisa la configuracion de Supabase y DATABASE_URL.",
  );
}

function supabaseAuthError(error: unknown, fallbackMessage: string) {
  const message = getErrorMessage(error);
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes("fetch failed")) {
    return supabaseRequestFailed(error);
  }

  if (normalizedMessage.includes("email not confirmed")) {
    return actionError(
      "Tu email todavia no esta confirmado. Revisa el ultimo correo de Supabase o reenvia la verificacion.",
    );
  }

  return actionError(message || fallbackMessage);
}

export async function registerUser(
  input: RegisterInput,
): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error.flatten().fieldErrors);
  }

  const configStatus = getSupabasePublicConfigStatus();

  if (!configStatus.ok) {
    return actionError(configStatus.message);
  }

  const { email, password, fullName, role } = parsed.data;

  try {
    await assertProfileStorageAvailable();

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          active_role: role,
        },
        emailRedirectTo: getEmailConfirmationRedirectUrl(),
      },
    });

    if (error) {
      return supabaseAuthError(error, "No se pudo crear la cuenta.");
    }

    if (data.user) {
      await upsertProfileFromAuthUser(data.user, {
        fullName,
        email,
        role,
      });
    }

    return {
      ok: true,
      message: "Cuenta creada. Revisa tu email para verificar el acceso.",
      redirectTo: `/verify-email?email=${encodeURIComponent(email)}`,
    };
  } catch (error) {
    return supabaseRequestFailed(error);
  }
}

export async function resendConfirmationEmail(
  input: ResendConfirmationInput,
): Promise<AuthActionState> {
  const parsed = resendConfirmationSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error.flatten().fieldErrors);
  }

  const configStatus = getSupabasePublicConfigStatus();

  if (!configStatus.ok) {
    return actionError(configStatus.message);
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.resend({
      email: parsed.data.email,
      type: "signup",
      options: {
        emailRedirectTo: getEmailConfirmationRedirectUrl(),
      },
    });

    if (error) {
      return supabaseAuthError(
        error,
        "No se pudo reenviar el correo de verificacion.",
      );
    }

    return {
      ok: true,
      message:
        "Te enviamos un nuevo correo. Usa el ultimo enlace recibido para confirmar tu cuenta.",
    };
  } catch (error) {
    return supabaseRequestFailed(error);
  }
}

export async function loginUser(input: LoginInput): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error.flatten().fieldErrors);
  }

  const configStatus = getSupabasePublicConfigStatus();

  if (!configStatus.ok) {
    return actionError(configStatus.message);
  }

  const { email, password } = parsed.data;

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return error
        ? supabaseAuthError(error, "No se pudo iniciar sesion.")
        : actionError("No se pudo iniciar sesion.");
    }

    const profile = await upsertProfileFromAuthUser(data.user, {
      email: data.user.email,
      role: getRoleFromUserMetadata(data.user),
    });

    return {
      ok: true,
      message: "Sesion iniciada.",
      redirectTo: getDashboardRouteForRole(profile.activeRole),
    };
  } catch (error) {
    return supabaseRequestFailed(error);
  }
}

export async function logoutUser() {
  const configStatus = getSupabasePublicConfigStatus();

  if (configStatus.ok) {
    try {
      const supabase = await createSupabaseServerClient();
      await supabase.auth.signOut();
    } catch {
      // The logout route should still return the visitor to the public login page.
    }
  }

  redirect("/login");
}

export async function getCurrentUser() {
  const configStatus = getSupabasePublicConfigStatus();

  if (!configStatus.ok) {
    return null;
  }

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  } catch {
    return null;
  }
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  try {
    const profile = await findProfileByAuthUserId(user.id);

    if (profile) {
      return profile;
    }
  } catch {
    return buildProfileFromSupabaseUser(user);
  }

  return buildProfileFromSupabaseUser(user);
}

export async function updateProfile(
  input: ProfileInput,
): Promise<AuthActionState> {
  const parsed = profileSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error.flatten().fieldErrors);
  }

  const user = await getCurrentUser();

  if (!user) {
    return {
      ok: false,
      message: "Inicia sesion para actualizar tu perfil.",
      redirectTo: "/login",
    };
  }

  try {
    await updateProfileByAuthUserId(user.id, {
      fullName: parsed.data.fullName,
      avatarUrl: parsed.data.avatarUrl || null,
      activeRole: parsed.data.activeRole,
    });
  } catch {
    return actionError(
      "No se pudo actualizar el perfil. Revisa la conexion de DATABASE_URL.",
    );
  }

  return {
    ok: true,
    message: "Perfil actualizado.",
    redirectTo: getDashboardRouteForRole(parsed.data.activeRole),
  };
}
