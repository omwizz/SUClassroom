import { redirect } from "next/navigation";
import { getDashboardRouteForRole } from "@/constants/routes";
import type { UserRole } from "@/constants/roles";
import { getCurrentProfile } from "@/server/actions/auth-actions";

export async function requireAuthProfile() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  return profile;
}

export async function requireRole(allowedRoles: UserRole[]) {
  const profile = await requireAuthProfile();

  if (!allowedRoles.includes(profile.activeRole)) {
    redirect(getDashboardRouteForRole(profile.activeRole));
  }

  return profile;
}
