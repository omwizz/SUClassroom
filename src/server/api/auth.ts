import { createClient, type User } from "@supabase/supabase-js";
import type { UserRole } from "@/constants/roles";
import { getSupabasePublicConfigStatus } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { upsertProfileFromAuthUser } from "@/server/queries/profiles";
import { getRoleFromUserMetadata } from "@/server/services/auth-service";
import type { Profile } from "@/types/auth";

type ApiProfileResult =
  | {
      ok: true;
      profile: Profile;
      user: User;
    }
  | {
      ok: false;
      status: number;
      message: string;
    };

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.toLowerCase().startsWith("bearer ")) {
    return null;
  }

  return authorization.slice("bearer ".length).trim() || null;
}

async function getUserFromBearerToken(request: Request) {
  const token = getBearerToken(request);

  if (!token) {
    return null;
  }

  const config = getSupabasePublicConfigStatus();

  if (!config.ok) {
    throw new Error(config.message);
  }

  const supabase = createClient(config.config.url, config.config.anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return null;
  }

  return user;
}

async function getUserFromCookies() {
  const config = getSupabasePublicConfigStatus();

  if (!config.ok) {
    throw new Error(config.message);
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ?? null;
}

export async function requireApiProfile(
  request: Request,
  allowedRoles?: readonly UserRole[],
): Promise<ApiProfileResult> {
  try {
    const user =
      (await getUserFromCookies()) ?? (await getUserFromBearerToken(request));

    if (!user) {
      return {
        ok: false,
        status: 401,
        message: "Inicia sesion o envia un token Supabase valido.",
      };
    }

    const profile = await upsertProfileFromAuthUser(user, {
      email: user.email,
      role: getRoleFromUserMetadata(user),
    });

    if (allowedRoles && !allowedRoles.includes(profile.activeRole)) {
      return {
        ok: false,
        status: 403,
        message: "No tienes permisos para esta operacion.",
      };
    }

    return {
      ok: true,
      profile,
      user,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      message:
        error instanceof Error
          ? error.message
          : "No se pudo validar la sesion.",
    };
  }
}
