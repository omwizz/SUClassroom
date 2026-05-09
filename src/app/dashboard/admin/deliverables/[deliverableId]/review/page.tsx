import { notFound } from "next/navigation";
import { DeliverableReviewLayout } from "@/features/evaluations/components/deliverable-review-layout";
import { requireRole } from "@/server/guards/role-guard";
import { getAdminDeliverableById } from "@/server/queries/deliverables";
import {
  getEvaluationCriteriaByCourse,
  getEvaluationHistory,
  getFeedbackByDeliverable,
} from "@/server/queries/evaluations";
import { EvaluationService } from "@/server/services/evaluation-service";

export const dynamic = "force-dynamic";

type AdminDeliverableReviewPageProps = {
  params: Promise<{ deliverableId: string }>;
};

export default async function AdminDeliverableReviewPage({
  params,
}: AdminDeliverableReviewPageProps) {
  await requireRole(["admin"]);
  const { deliverableId } = await params;
  const deliverable = await getAdminDeliverableById(deliverableId);

  if (!deliverable) {
    notFound();
  }

  const [criteria, evaluations, feedback] = await Promise.all([
    getEvaluationCriteriaByCourse(deliverable.courseId),
    getEvaluationHistory(deliverable.id),
    getFeedbackByDeliverable(deliverable.id),
  ]);

  return (
    <DeliverableReviewLayout
      backHref="/dashboard/admin/deliverables"
      canEvaluate={EvaluationService.canStartReview(deliverable.status)}
      criteria={criteria}
      deliverable={deliverable}
      evaluations={evaluations}
      feedback={feedback}
    />
  );
}
