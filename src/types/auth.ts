import type { UserRole } from "@/constants/roles";

export type ProfileStatus = "active" | "pending" | "suspended";

export type AuthUser = {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
};

export type Profile = {
  id: string;
  authUserId: string;
  fullName: string | null;
  email: string;
  avatarUrl: string | null;
  activeRole: UserRole;
  roles: UserRole[];
  status: ProfileStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Permission =
  | "dashboard:read"
  | "users:manage"
  | "courses:manage"
  | "deliverables:review"
  | "institution:read";
