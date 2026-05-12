import type { User } from "@supabase/supabase-js";
import { and, asc, eq } from "drizzle-orm";
import { getDb, hasDatabaseUrl } from "@/db/client";
import { profiles, userRoles } from "@/db/schema";
import {
  isUserRole,
  type UserRole,
} from "@/constants/roles";
import type { Profile } from "@/types/auth";
import {
  buildProfileFromSupabaseUser,
  getFullNameFromUserMetadata,
  getRoleFromUserMetadata,
} from "@/server/services/auth-service";

type ProfileRow = typeof profiles.$inferSelect;
type UserRoleRow = typeof userRoles.$inferSelect;

function toProfile(profile: ProfileRow, roles: UserRoleRow[]): Profile {
  const mappedRoles = roles
    .map((item) => item.role)
    .filter((role): role is UserRole => isUserRole(role));

  return {
    id: profile.id,
    authUserId: profile.authUserId,
    fullName: profile.fullName,
    email: profile.email,
    avatarUrl: profile.avatarUrl,
    activeRole: profile.activeRole,
    roles: mappedRoles.length > 0 ? mappedRoles : [profile.activeRole],
    status: profile.status,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
}

export async function findProfileByAuthUserId(authUserId: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const db = getDb();
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.authUserId, authUserId),
  });

  if (!profile) {
    return null;
  }

  const roles = await db.query.userRoles.findMany({
    where: eq(userRoles.profileId, profile.id),
  });

  return toProfile(profile, roles);
}

export async function assertProfileStorageAvailable() {
  if (!hasDatabaseUrl()) {
    return;
  }

  const db = getDb();
  await db.select({ id: profiles.id }).from(profiles).limit(1);
}

export async function upsertProfileFromAuthUser(
  user: User,
  defaults?: {
    fullName?: string | null;
    email?: string | null;
    role?: UserRole;
  },
) {
  if (!hasDatabaseUrl()) {
    return buildProfileFromSupabaseUser(user);
  }

  const db = getDb();
  const role = defaults?.role ?? getRoleFromUserMetadata(user);
  const fullName = defaults?.fullName ?? getFullNameFromUserMetadata(user);
  const email = defaults?.email ?? user.email ?? "";

  const [profile] = await db
    .insert(profiles)
    .values({
      authUserId: user.id,
      fullName,
      email,
      activeRole: role,
      status: "active",
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: profiles.authUserId,
      set: {
        fullName,
        email,
        activeRole: role,
        updatedAt: new Date(),
      },
    })
    .returning();

  await db
    .insert(userRoles)
    .values({
      profileId: profile.id,
      role,
    })
    .onConflictDoNothing({
      target: [userRoles.profileId, userRoles.role],
    });

  const roles = await db.query.userRoles.findMany({
    where: eq(userRoles.profileId, profile.id),
  });

  return toProfile(profile, roles);
}

export async function updateProfileByAuthUserId(
  authUserId: string,
  input: {
    fullName: string;
    avatarUrl?: string | null;
    activeRole: UserRole;
  },
) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const db = getDb();
  const current = await db.query.profiles.findFirst({
    where: eq(profiles.authUserId, authUserId),
  });

  if (!current) {
    return null;
  }

  const hasRole = await db.query.userRoles.findFirst({
    where: and(
      eq(userRoles.profileId, current.id),
      eq(userRoles.role, input.activeRole),
    ),
  });

  if (!hasRole) {
    await db
      .insert(userRoles)
      .values({
        profileId: current.id,
        role: input.activeRole,
      })
      .onConflictDoNothing({
        target: [userRoles.profileId, userRoles.role],
      });
  }

  const [profile] = await db
    .update(profiles)
    .set({
      fullName: input.fullName,
      avatarUrl: input.avatarUrl ?? null,
      activeRole: input.activeRole,
      updatedAt: new Date(),
    })
    .where(eq(profiles.authUserId, authUserId))
    .returning();

  const roles = await db.query.userRoles.findMany({
    where: eq(userRoles.profileId, profile.id),
  });

  return toProfile(profile, roles);
}

export async function getProfilesByRole(role: UserRole) {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const rows = await db
    .select({
      profile: profiles,
      role: userRoles,
    })
    .from(userRoles)
    .innerJoin(profiles, eq(profiles.id, userRoles.profileId))
    .where(and(eq(userRoles.role, role), eq(profiles.status, "active")))
    .orderBy(asc(profiles.fullName), asc(profiles.email));

  return rows.map((row) => toProfile(row.profile, [row.role]));
}

export async function getProfiles() {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const db = getDb();
  const [profileRows, roleRows] = await Promise.all([
    db
      .select()
      .from(profiles)
      .orderBy(asc(profiles.fullName), asc(profiles.email)),
    db.select().from(userRoles),
  ]);

  return profileRows.map((profile) =>
    toProfile(
      profile,
      roleRows.filter((role) => role.profileId === profile.id),
    ),
  );
}
