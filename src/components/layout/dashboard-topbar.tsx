import { ROLE_LABELS } from "@/constants/roles";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { NotificationButton } from "@/components/layout/notification-button";
import { SearchBox } from "@/components/layout/search-box";
import { UserMenu } from "@/components/layout/user-menu";
import type { Profile } from "@/types/auth";
import type { DashboardRoute } from "@/types/dashboard";
import type { Notification } from "@/types/evaluations";

type DashboardTopbarProps = {
  profile: Profile;
  navigation: DashboardRoute[];
  notifications?: Notification[];
};

export function DashboardTopbar({
  profile,
  navigation,
  notifications = [],
}: DashboardTopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <MobileSidebar navigation={navigation} profile={profile} />
        <div className="hidden lg:block">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {ROLE_LABELS[profile.activeRole]}
          </p>
          <p className="text-sm font-medium">Panel operativo</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <SearchBox />
          <NotificationButton notifications={notifications} />
          <UserMenu profile={profile} />
        </div>
      </div>
    </header>
  );
}
