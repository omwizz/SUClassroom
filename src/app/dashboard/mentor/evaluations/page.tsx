import { PageHeader } from "@/components/dashboard/page-header";
import { EvaluationHistory } from "@/features/evaluations/components/evaluation-history";
import { requireRole } from "@/server/guards/role-guard";
import { getMentorEvaluationHistory } from "@/server/queries/evaluations";

export const dynamic = "force-dynamic";

export default async function MentorEvaluationsPage() {
  const profile = await requireRole(["mentor", "admin"]);
  const evaluations =
    profile.activeRole === "mentor"
      ? await getMentorEvaluationHistory(profile.id)
      : [];

  return (
    <div className="space-y-6">
      <PageHeader
        description="Historial de revisiones realizadas y decisiones registradas."
        eyebrow="Mentor"
        title="Evaluaciones"
      />
      <EvaluationHistory evaluations={evaluations} />
    </div>
  );
}
