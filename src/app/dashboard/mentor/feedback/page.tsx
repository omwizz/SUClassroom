import { PageHeader } from "@/components/dashboard/page-header";
import { FeedbackTimeline } from "@/features/evaluations/components/feedback-timeline";
import { requireRole } from "@/server/guards/role-guard";
import { getMentorEvaluationHistory } from "@/server/queries/evaluations";
import type { FeedbackDetail } from "@/types/evaluations";

export const dynamic = "force-dynamic";

export default async function MentorFeedbackPage() {
  const profile = await requireRole(["mentor", "admin"]);
  const evaluations =
    profile.activeRole === "mentor"
      ? await getMentorEvaluationHistory(profile.id)
      : [];
  const feedback: FeedbackDetail[] = evaluations.flatMap((evaluation) =>
    evaluation.feedback
      ? [
          {
            ...evaluation.feedback,
            evaluation,
            deliverable: evaluation.deliverable,
            author: evaluation.mentor,
          },
        ]
      : [],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        description="Feedback emitido a alumnos con prioridad y siguientes pasos."
        eyebrow="Mentor"
        title="Feedback emitido"
      />
      <FeedbackTimeline items={feedback} />
    </div>
  );
}
