import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  await requireRole(["admin"]);

  return (
    <PlaceholderPage
      description="Vista administrativa de proyectos reales por alumno."
      title="Proyectos"
    />
  );
}
