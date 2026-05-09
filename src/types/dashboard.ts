import type { UserRole } from "@/constants/roles";

export type DashboardIconName =
  | "bar-chart"
  | "book-open"
  | "briefcase"
  | "calendar"
  | "clipboard-check"
  | "file-text"
  | "folder"
  | "graduation-cap"
  | "handshake"
  | "layout-dashboard"
  | "message"
  | "settings"
  | "tags"
  | "users";

export type DashboardRoute = {
  title: string;
  href: string;
  icon: DashboardIconName;
  roles: UserRole[];
};

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
};
