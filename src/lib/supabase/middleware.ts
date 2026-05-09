import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { DEFAULT_ROLE, isUserRole } from "@/constants/roles";
import {
  getDashboardRouteForRole,
  isAuthRoute,
  isProtectedRoute,
} from "@/constants/routes";
import { getSupabasePublicConfigStatus } from "@/lib/supabase/env";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const pathname = request.nextUrl.pathname;
  const configStatus = getSupabasePublicConfigStatus();

  if (!configStatus.ok) {
    if (isProtectedRoute(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return response;
  }

  const { url, anonKey } = configStatus.config;
  const supabase = createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  let user: User | null = null;

  try {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();
    user = currentUser;
  } catch {
    if (isProtectedRoute(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return response;
  }

  if (!user && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && isAuthRoute(pathname)) {
    const metadataRole = user.user_metadata?.active_role;
    const role = isUserRole(metadataRole) ? metadataRole : DEFAULT_ROLE;
    return NextResponse.redirect(
      new URL(getDashboardRouteForRole(role), request.url),
    );
  }

  if (user && pathname === "/dashboard") {
    const metadataRole = user.user_metadata?.active_role;
    const role = isUserRole(metadataRole) ? metadataRole : DEFAULT_ROLE;
    return NextResponse.redirect(
      new URL(getDashboardRouteForRole(role), request.url),
    );
  }

  return response;
}
