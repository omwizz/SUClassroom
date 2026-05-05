import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function MentorStudentsPage() {
  await requireRole(["mentor", "admin"]);

  return (
    <PlaceholderPage
      description="Listado de alumnos asignados y contexto del proyecto."
      title="Alumnos"
    />
  );
}
