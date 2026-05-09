import type { EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const allowedOtpTypes = new Set<EmailOtpType>([
  "email",
  "email_change",
  "invite",
  "magiclink",
  "recovery",
  "signup",
]);

function getSafeNextPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/login?verified=1";
  }

  return value;
}

function redirectTo(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, request.url));
}

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type") as EmailOtpType | null;
  const next = getSafeNextPath(request.nextUrl.searchParams.get("next"));
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    return redirectTo(request, "/verify-email?error=invalid-link");
  }

  if (!tokenHash && !type) {
    return redirectTo(request, next);
  }

  if (!tokenHash || !type || !allowedOtpTypes.has(type)) {
    return redirectTo(request, "/verify-email?error=invalid-link");
  }

  const supabase = await createSupabaseServerClient();
  const { error: verifyError } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type,
  });

  if (verifyError) {
    return redirectTo(request, "/verify-email?error=invalid-link");
  }

  return redirectTo(request, next);
}
