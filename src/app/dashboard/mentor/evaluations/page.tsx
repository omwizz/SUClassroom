import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function MentorEvaluationsPage() {
  await requireRole(["mentor", "admin"]);

  return (
    <PlaceholderPage
      description="Formulario de evaluación, aprobación, rechazo y feedback estructurado."
      title="Evaluaciones"
    />
  );
}
