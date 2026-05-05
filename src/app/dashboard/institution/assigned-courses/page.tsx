import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function InstitutionAssignedCoursesPage() {
  await requireRole(["institution", "admin"]);

  return (
    <PlaceholderPage
      description="Cursos asignados por cohorte institucional."
      title="Cursos asignados"
    />
  );
}
