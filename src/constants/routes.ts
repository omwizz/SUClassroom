import { DEFAULT_ROLE, type UserRole } from "@/constants/roles";

export const PUBLIC_ROUTES = ["/", "/forgot-password", "/verify-email"] as const;

export const AUTH_ROUTES = ["/login", "/register"] as const;

export const PROTECTED_ROUTE_PREFIXES = ["/dashboard"] as const;

export const DASHBOARD_ROUTES: Record<UserRole, string> = {
  student: "/dashboard/student",
  mentor: "/dashboard/mentor",
  admin: "/dashboard/admin",
  institution: "/dashboard/institution",
};

export function getDashboardRouteForRole(role?: UserRole | null) {
  return DASHBOARD_ROUTES[role ?? DEFAULT_ROLE];
}

export function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((route) => pathname === route);
}

export function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
