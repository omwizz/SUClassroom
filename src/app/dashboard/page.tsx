import { redirect } from "next/navigation";
import { getDashboardRouteForRole } from "@/constants/routes";
import { requireAuthProfile } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function DashboardIndexPage() {
  const profile = await requireAuthProfile();

  redirect(getDashboardRouteForRole(profile.activeRole));
}
