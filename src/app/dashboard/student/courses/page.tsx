import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function StudentCoursesPage() {
  await requireRole(["student", "admin"]);

  return (
    <PlaceholderPage
      description="Catálogo y curso gratuito inicial se implementan en Fase 3."
      title="Cursos"
    />
  );
}
