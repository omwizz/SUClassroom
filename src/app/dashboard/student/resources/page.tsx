import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function StudentResourcesPage() {
  await requireRole(["student", "admin"]);

  return (
    <PlaceholderPage
      description="Recursos, plantillas y materiales descargables se conectarán con cursos."
      title="Recursos"
    />
  );
}
