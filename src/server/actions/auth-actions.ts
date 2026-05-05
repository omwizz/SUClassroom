"use server";

import { redirect } from "next/navigation";
import {
  DASHBOARD_ROUTES,
  getDashboardRouteForRole,
} from "@/constants/routes";
import { hasSupabasePublicConfig } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  loginSchema,
  profileSchema,
  registerSchema,
  type LoginInput,
  type ProfileInput,
  type RegisterInput,
} from "@/lib/validations/auth";
import {
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

function supabaseMissing(): AuthActionState {
  return {
    ok: false,
    message:
      "Supabase todavía no está configurado. Completa las variables de entorno para probar auth.",
  };
}

export async function registerUser(
  input: RegisterInput,
): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error.flatten().fieldErrors);
  }

  if (!hasSupabasePublicConfig()) {
    return supabaseMissing();
  }

  const supabase = await createSupabaseServerClient();
  const { email, password, fullName, role } = parsed.data;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        active_role: role,
      },
    },
  });

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
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
    redirectTo: "/verify-email",
  };
}

export async function loginUser(input: LoginInput): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(parsed.error.flatten().fieldErrors);
  }

  if (!hasSupabasePublicConfig()) {
    return supabaseMissing();
  }

  const supabase = await createSupabaseServerClient();
  const { email, password } = parsed.data;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return {
      ok: false,
      message: error?.message ?? "No se pudo iniciar sesión.",
    };
  }

  const profile = await upsertProfileFromAuthUser(data.user, {
    email: data.user.email,
    role: getRoleFromUserMetadata(data.user),
  });

  return {
    ok: true,
    message: "Sesión iniciada.",
    redirectTo: getDashboardRouteForRole(profile.activeRole),
  };
}

export async function logoutUser() {
  if (hasSupabasePublicConfig()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  redirect("/login");
}

export async function getCurrentUser() {
  if (!hasSupabasePublicConfig()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const profile = await findProfileByAuthUserId(user.id);

  if (profile) {
    return profile;
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
      message: "Inicia sesión para actualizar tu perfil.",
      redirectTo: "/login",
    };
  }

  await updateProfileByAuthUserId(user.id, {
    fullName: parsed.data.fullName,
    avatarUrl: parsed.data.avatarUrl || null,
    activeRole: parsed.data.activeRole,
  });

  return {
    ok: true,
    message: "Perfil actualizado.",
    redirectTo: getDashboardRouteForRole(parsed.data.activeRole),
  };
}
