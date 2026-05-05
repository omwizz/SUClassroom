import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { DEFAULT_ROLE, isUserRole } from "@/constants/roles";
import {
  getDashboardRouteForRole,
  isAuthRoute,
  isProtectedRoute,
} from "@/constants/routes";
import { hasSupabasePublicConfig } from "@/lib/supabase/env";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const pathname = request.nextUrl.pathname;

  if (!hasSupabasePublicConfig()) {
    if (isProtectedRoute(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
