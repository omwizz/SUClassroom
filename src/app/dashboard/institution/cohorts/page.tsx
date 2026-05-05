import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function InstitutionCohortsPage() {
  await requireRole(["institution", "admin"]);

  return (
    <PlaceholderPage
      description="Cohortes institucionales y asignaciones por programa."
      title="Cohortes"
    />
  );
}
