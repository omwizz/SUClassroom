import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  await requireRole(["admin"]);

  return (
    <PlaceholderPage
      description="CRUD de cursos, módulos, lecciones y recursos llega en Fase 3."
      title="Cursos"
    />
  );
}
