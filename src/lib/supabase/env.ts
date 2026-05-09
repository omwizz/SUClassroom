type SupabasePublicConfig = {
  url: string;
  anonKey: string;
};

type NormalizedValueResult =
  | {
      ok: true;
      value: string;
    }
  | {
      ok: false;
      message: string;
    };

type SupabasePublicConfigStatus =
  | {
      ok: true;
      config: SupabasePublicConfig;
    }
  | {
      ok: false;
      message: string;
    };

function normalizeEnvValue(value: string | undefined) {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();
  const quote = trimmed[0];

  if (
    trimmed.length >= 2 &&
    (quote === '"' || quote === "'") &&
    trimmed.at(-1) === quote
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function normalizeSupabaseUrl(
  value: string | undefined,
): NormalizedValueResult {
  const normalized = normalizeEnvValue(value);

  if (!normalized) {
    return {
      ok: false,
      message:
        "Supabase no esta configurado. Completa NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }

  let parsed: URL;

  try {
    parsed = new URL(normalized);
  } catch {
    return {
      ok: false,
      message:
        "NEXT_PUBLIC_SUPABASE_URL debe ser una URL valida. Copia el Project URL de Supabase, por ejemplo https://tu-proyecto.supabase.co.",
    };
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return {
      ok: false,
      message:
        "NEXT_PUBLIC_SUPABASE_URL debe empezar con https:// o http://.",
    };
  }

  if (parsed.pathname !== "/" || parsed.search || parsed.hash) {
    return {
      ok: false,
      message:
        "NEXT_PUBLIC_SUPABASE_URL debe contener solo el origen del proyecto, sin rutas del dashboard, parametros ni fragmentos.",
    };
  }

  return {
    ok: true,
    value: parsed.origin,
  };
}

function normalizeSupabaseAnonKey(
  value: string | undefined,
): NormalizedValueResult {
  const normalized = normalizeEnvValue(value);

  if (!normalized) {
    return {
      ok: false,
      message:
        "Supabase no esta configurado. Completa NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }

  if (normalized.startsWith("sb_secret_")) {
    return {
      ok: false,
      message:
        "NEXT_PUBLIC_SUPABASE_ANON_KEY debe ser una clave publica anon/publishable. No uses claves secretas o service role en variables NEXT_PUBLIC.",
    };
  }

  return {
    ok: true,
    value: normalized,
  };
}

export function getSupabasePublicConfigStatus(): SupabasePublicConfigStatus {
  const url = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);

  if (!url.ok) {
    return url;
  }

  const anonKey = normalizeSupabaseAnonKey(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  if (!anonKey.ok) {
    return anonKey;
  }

  return {
    ok: true,
    config: {
      url: url.value,
      anonKey: anonKey.value,
    },
  };
}

export function hasSupabasePublicConfig() {
  return getSupabasePublicConfigStatus().ok;
}

export function getSupabasePublicConfig(): SupabasePublicConfig {
  const status = getSupabasePublicConfigStatus();

  if (!status.ok) {
    throw new Error(status.message);
  }

  return status.config;
}

export function getPublicAppUrl() {
  const configuredUrl = normalizeEnvValue(process.env.NEXT_PUBLIC_APP_URL);

  if (!configuredUrl) {
    return "http://localhost:3000";
  }

  try {
    return new URL(configuredUrl).origin;
  } catch {
    return "http://localhost:3000";
  }
}

export function getEmailConfirmationRedirectUrl(nextPath = "/login?verified=1") {
  const url = new URL("/auth/confirm", getPublicAppUrl());

  url.searchParams.set("next", nextPath);

  return url.toString();
}
