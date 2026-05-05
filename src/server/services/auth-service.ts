import type { User } from "@supabase/supabase-js";
import { DEFAULT_ROLE, isUserRole, type UserRole } from "@/constants/roles";
import type { Profile } from "@/types/auth";

export function getRoleFromUserMetadata(user: User): UserRole {
  const metadataRole = user.user_metadata?.active_role;
  return isUserRole(metadataRole) ? metadataRole : DEFAULT_ROLE;
}

export function getFullNameFromUserMetadata(user: User) {
  const metadataName = user.user_metadata?.full_name;
  return typeof metadataName === "string" && metadataName.trim().length > 0
    ? metadataName
    : null;
}

export function buildProfileFromSupabaseUser(user: User): Profile {
  const activeRole = getRoleFromUserMetadata(user);

  return {
    id: user.id,
    authUserId: user.id,
    fullName: getFullNameFromUserMetadata(user),
    email: user.email ?? "",
    avatarUrl:
      typeof user.user_metadata?.avatar_url === "string"
        ? user.user_metadata.avatar_url
        : null,
    activeRole,
    roles: [activeRole],
    status: "active",
    createdAt: user.created_at,
    updatedAt: user.updated_at ?? user.created_at,
  };
}
