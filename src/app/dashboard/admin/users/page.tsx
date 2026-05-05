import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  await requireRole(["admin"]);

  return (
    <PlaceholderPage
      description="Gestión de perfiles, roles y estados de usuario."
      title="Usuarios"
    />
  );
}
