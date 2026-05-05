import type { LucideIcon } from "lucide-react";
import type { UserRole } from "@/constants/roles";

export type DashboardRoute = {
  title: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
};

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
};
