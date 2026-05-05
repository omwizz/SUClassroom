import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { USER_ROLES } from "@/constants/roles";

export const userRoleEnum = pgEnum("user_role", USER_ROLES);

export const profileStatusEnum = pgEnum("profile_status", [
  "active",
  "pending",
  "suspended",
]);

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    authUserId: uuid("auth_user_id").notNull().unique(),
    fullName: varchar("full_name", { length: 120 }),
    email: varchar("email", { length: 255 }).notNull(),
    avatarUrl: text("avatar_url"),
    activeRole: userRoleEnum("active_role").default("student").notNull(),
    status: profileStatusEnum("status").default("active").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("profiles_auth_user_id_idx").on(table.authUserId),
    index("profiles_email_idx").on(table.email),
  ],
);

export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: userRoleEnum("name").notNull().unique(),
  description: text("description").notNull(),
  isSystem: boolean("is_system").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const userRoles = pgTable(
  "user_roles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    role: userRoleEnum("role").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("user_roles_profile_role_idx").on(table.profileId, table.role),
    index("user_roles_profile_idx").on(table.profileId),
  ],
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => profiles.id, {
      onDelete: "set null",
    }),
    action: varchar("action", { length: 120 }).notNull(),
    entityType: varchar("entity_type", { length: 120 }).notNull(),
    entityId: uuid("entity_id"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("audit_logs_user_idx").on(table.userId)],
);

export const profileRelations = relations(profiles, ({ many }) => ({
  roles: many(userRoles),
  auditLogs: many(auditLogs),
}));

export const userRoleRelations = relations(userRoles, ({ one }) => ({
  profile: one(profiles, {
    fields: [userRoles.profileId],
    references: [profiles.id],
  }),
}));

export const auditLogRelations = relations(auditLogs, ({ one }) => ({
  profile: one(profiles, {
    fields: [auditLogs.userId],
    references: [profiles.id],
  }),
}));
