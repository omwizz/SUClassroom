import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function AdminReportsPage() {
  await requireRole(["admin"]);

  return (
    <PlaceholderPage
      description="Reportes básicos y analítica operativa se conectarán cuando existan datos reales."
      title="Reportes"
    />
  );
}
