"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CalendarClock,
  ClipboardCheck,
  FileText,
  FolderKanban,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  LockKeyhole,
  MessageSquareText,
  Settings,
  Tags,
  Users,
  type LucideIcon,
} from "lucide-react";
import { RoleBadge } from "@/components/shared/role-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Profile } from "@/types/auth";
import type { DashboardIconName, DashboardRoute } from "@/types/dashboard";

const dashboardIcons: Record<DashboardIconName, LucideIcon> = {
  "bar-chart": BarChart3,
  "book-open": BookOpen,
  briefcase: BriefcaseBusiness,
  calendar: CalendarClock,
  "clipboard-check": ClipboardCheck,
  "file-text": FileText,
  folder: FolderKanban,
  "graduation-cap": GraduationCap,
  handshake: Handshake,
  "layout-dashboard": LayoutDashboard,
  lock: LockKeyhole,
  message: MessageSquareText,
  settings: Settings,
  tags: Tags,
  users: Users,
};

type DashboardSidebarProps = {
  profile: Profile;
  navigation: DashboardRoute[];
  className?: string;
  onNavigate?: () => void;
};

export function DashboardSidebar({
  profile,
  navigation,
  className,
  onNavigate,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const initials =
    profile.fullName
      ?.split(" ")
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "SU";

  return (
    <aside className={cn("flex h-full flex-col", className)}>
      <Link className="flex items-center gap-3 px-4 py-5" href="/dashboard">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="size-5" />
        </span>
        <div>
          <p className="font-semibold">SUClassroom</p>
          <p className="text-xs text-muted-foreground">Ejecución guiada</p>
        </div>
      </Link>

      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => {
          const Icon = dashboardIcons[item.icon];
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
              )}
              href={item.href}
              key={`${item.href}-${item.title}`}
              onClick={onNavigate}
            >
              <Icon className="size-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3">
        <Separator className="mb-3" />
        <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
          <Avatar className="size-9">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {profile.fullName ?? "Usuario SU"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {profile.email}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <RoleBadge role={profile.activeRole} />
        </div>
      </div>
    </aside>
  );
}
