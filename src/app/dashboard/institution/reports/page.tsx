import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function InstitutionReportsPage() {
  await requireRole(["institution", "admin"]);

  return (
    <PlaceholderPage
      description="Reportes de avance, participación e impacto institucional."
      title="Reportes"
    />
  );
}
