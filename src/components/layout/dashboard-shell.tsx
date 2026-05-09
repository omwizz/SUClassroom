import type { ReactNode } from "react";
import { getNavigationForRole } from "@/config/dashboard-navigation";
import { DashboardContent } from "@/components/layout/dashboard-content";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { getUserNotifications } from "@/server/queries/evaluations";
import type { Profile } from "@/types/auth";

type DashboardShellProps = {
  profile: Profile;
  children: ReactNode;
};

export async function DashboardShell({ profile, children }: DashboardShellProps) {
  const navigation = getNavigationForRole(profile.activeRole);
  const notifications = await getUserNotifications(profile.id);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border bg-sidebar lg:block">
        <DashboardSidebar navigation={navigation} profile={profile} />
      </div>
      <div className="flex min-h-dvh flex-col lg:pl-72">
        <DashboardTopbar
          navigation={navigation}
          notifications={notifications}
          profile={profile}
        />
        <DashboardContent>{children}</DashboardContent>
      </div>
    </div>
  );
}
