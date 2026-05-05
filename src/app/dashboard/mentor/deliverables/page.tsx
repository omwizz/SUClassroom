import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function MentorDeliverablesPage() {
  await requireRole(["mentor", "admin"]);

  return (
    <PlaceholderPage
      description="Bandeja de entregables asignados para revisión por mentor."
      title="Entregables pendientes"
    />
  );
}
