export const USER_ROLES = ["student", "mentor", "admin", "institution"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const DEFAULT_ROLE: UserRole = "student";

export const ROLE_LABELS: Record<UserRole, string> = {
  student: "Alumno",
  mentor: "Mentor",
  admin: "Administrador",
  institution: "Institución",
};

export const PUBLIC_REGISTRATION_ROLES = [
  "student",
  "mentor",
  "institution",
] as const satisfies readonly UserRole[];

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === "string" && USER_ROLES.includes(value as UserRole);
}
