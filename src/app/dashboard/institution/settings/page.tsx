import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function InstitutionSettingsPage() {
  await requireRole(["institution", "admin"]);

  return (
    <PlaceholderPage
      description="Configuración institucional, permisos y preferencias."
      title="Configuración"
    />
  );
}
