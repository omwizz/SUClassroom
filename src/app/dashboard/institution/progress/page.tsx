import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function InstitutionProgressPage() {
  await requireRole(["institution", "admin"]);

  return (
    <PlaceholderPage
      description="Seguimiento agregado del avance por cohorte y participante."
      title="Progreso"
    />
  );
}
