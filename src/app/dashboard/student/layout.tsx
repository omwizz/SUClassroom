import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { requireRole } from "@/server/guards/role-guard";
import { findStudentOnboarding } from "@/server/queries/projects";

export const dynamic = "force-dynamic";

export default async function StudentDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const profile = await requireRole(["student", "admin"]);

  if (profile.activeRole === "student") {
    const onboarding = await findStudentOnboarding(profile.id);

    if (!onboarding?.completedAt) {
      redirect("/onboarding");
    }
  }

  return children;
}

