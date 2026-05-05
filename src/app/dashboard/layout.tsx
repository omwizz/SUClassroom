import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireAuthProfile } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const profile = await requireAuthProfile();

  return <DashboardShell profile={profile}>{children}</DashboardShell>;
}
