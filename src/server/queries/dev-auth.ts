import { sql } from "drizzle-orm";
import { getDb, hasDatabaseUrl } from "@/db/client";
import type { UserRole } from "@/constants/roles";

export async function createConfirmedDevelopmentAuthUser(input: {
  email: string;
  password: string;
  fullName: string;
  role: Exclude<UserRole, "admin">;
}) {
  if (!hasDatabaseUrl()) {
    return false;
  }

  const db = getDb();

  await db.execute(sql`
    SELECT private.dev_create_confirmed_auth_user(
      ${input.email},
      ${input.password},
      ${input.fullName},
      ${input.role}::public.user_role
    )
  `);

  return true;
}
