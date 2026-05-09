import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/page-header";
import { FeedbackTimeline } from "@/features/evaluations/components/feedback-timeline";
import { requireRole } from "@/server/guards/role-guard";
import { getStudentDeliverableById } from "@/server/queries/deliverables";
import { getFeedbackByDeliverable } from "@/server/queries/evaluations";

export const dynamic = "force-dynamic";

type StudentDeliverableFeedbackPageProps = {
  params: Promise<{ deliverableId: string }>;
};

export default async function StudentDeliverableFeedbackPage({
  params,
}: StudentDeliverableFeedbackPageProps) {
  const profile = await requireRole(["student"]);
  const { deliverableId } = await params;
  const deliverable = await getStudentDeliverableById(deliverableId, profile.id);

  if (!deliverable) {
    notFound();
  }

  const feedback = (await getFeedbackByDeliverable(deliverable.id)).filter(
    (item) => item.isVisibleToStudent,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        description="Feedback visible del mentor con fortalezas, mejoras y siguientes pasos."
        eyebrow="Alumno"
        title={`Feedback: ${deliverable.title}`}
      />
      <FeedbackTimeline items={feedback} />
    </div>
  );
}
